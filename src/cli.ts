import { readFileSync } from "node:fs";
import { Command, Option } from "commander";
import { executeRequest } from "./client.ts";
import { loadConfig, saveConfig } from "./config.ts";
import { CliError } from "./errors.ts";
import { flagName, functions, type FunctionDefinition, type Parameter } from "./functions.ts";

function parseInput(source: string | undefined): Record<string, unknown> {
  if (!source) return {};
  try {
    const value = JSON.parse(source.startsWith("@") ? readFileSync(source.slice(1), "utf8") : source) as unknown;
    if (!value || Array.isArray(value) || typeof value !== "object") throw new Error();
    return value as Record<string, unknown>;
  } catch {
    throw new CliError("validation_error", "--input must be a JSON object or @file containing one.", { nextSteps: ["Correct the input and retry."] });
  }
}

function parseValue(parameter: Parameter, value: unknown): unknown {
  if (value === undefined) return undefined;
  if (parameter.type === "string" || parameter.type === "file") {
    if (typeof value !== "string") throw new Error();
    if (parameter.choices && !parameter.choices.includes(value)) throw new Error();
    return value;
  }
  if (parameter.type === "boolean") {
    if (typeof value === "boolean") return value;
    if (value === "true") return true;
    if (value === "false") return false;
    throw new Error();
  }
  if (parameter.type === "string[]") {
    const items = Array.isArray(value) && value.every((item) => typeof item === "string") ? value : typeof value === "string" ? value.split(",").map((item) => item.trim()).filter(Boolean) : null;
    if (items?.length && (!parameter.maxItems || items.length <= parameter.maxItems)) return items;
    throw new Error();
  }
  if (parameter.type === "object" || parameter.type === "object[]") {
    const parsed = typeof value === "string" ? JSON.parse(value) as unknown : value;
    if (parameter.type === "object" && parsed && !Array.isArray(parsed) && typeof parsed === "object") return parsed;
    if (parameter.type === "object[]" && Array.isArray(parsed) && parsed.length && (!parameter.maxItems || parsed.length <= parameter.maxItems) && parsed.every((item) => item && !Array.isArray(item) && typeof item === "object")) return parsed;
    throw new Error();
  }
  const number = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(number) || (parameter.type === "integer" && !Number.isInteger(number)) || (parameter.type === "positive" && number <= 0)) throw new Error();
  return number;
}

function provided(value: unknown): boolean {
  return value !== undefined && value !== false && value !== "" && (!Array.isArray(value) || value.length > 0);
}

function validationError(message: string): CliError {
  return new CliError("validation_error", message, { nextSteps: ["Correct the input and retry."] });
}

function validateConsentFields(value: unknown): void {
  if (Array.isArray(value)) {
    for (const item of value) validateConsentFields(item);
    return;
  }
  if (!value || typeof value !== "object") return;
  const object = value as Record<string, unknown>;
  for (const name of ["email_subscribe", "push_subscribe"]) {
    if (object[name] !== undefined && !["opted_in", "subscribed", "unsubscribed"].includes(String(object[name]))) throw validationError(`Invalid consent state: ${name}.`);
  }
  if (object.subscription_groups !== undefined) {
    if (!Array.isArray(object.subscription_groups) || !object.subscription_groups.length) throw validationError("subscription_groups must be a non-empty array.");
    for (const item of object.subscription_groups) {
      if (!item || Array.isArray(item) || typeof item !== "object") throw validationError("Invalid subscription_groups item.");
      const group = item as Record<string, unknown>;
      if (typeof group.subscription_group_id !== "string" || !["subscribed", "unsubscribed"].includes(String(group.subscription_state))) throw validationError("Invalid subscription group id or state.");
      if (group.use_double_opt_in_logic !== undefined && typeof group.use_double_opt_in_logic !== "boolean") throw validationError("Invalid use_double_opt_in_logic value.");
    }
  }
  for (const nested of Object.values(object)) validateConsentFields(nested);
}

function validateEndpointInput(definition: FunctionDefinition, input: Record<string, unknown>): void {
  validateConsentFields(input);
  if (definition.mcp === "update_subscription_group_status_v2") {
    for (const item of input.subscription_groups as Record<string, unknown>[]) {
      const identifiers = ["external_ids", "emails", "phones"].filter((name) => provided(item[name]));
      if (identifiers.length !== 1 || !Array.isArray(item[identifiers[0] ?? ""]) || !(item[identifiers[0] ?? ""] as unknown[]).every((value) => typeof value === "string")) throw validationError("Each subscription_groups item must provide exactly one non-empty string array: external_ids, emails, or phones.");
      if ((item[identifiers[0] ?? ""] as unknown[]).length > 50) throw validationError("Subscription group updates accept at most 50 identifiers per item.");
    }
  }
  if (definition.mcp === "get_invalid_phone_numbers") {
    const hasDates = provided(input.start_date) && provided(input.end_date);
    if (!provided(input.phone_numbers) && !hasDates) throw validationError("Provide phone_numbers or both start_date and end_date.");
    if ((provided(input.start_date) !== provided(input.end_date)) && !provided(input.phone_numbers)) throw validationError("Provide both start_date and end_date.");
    if (typeof input.limit === "number" && input.limit > 500) throw validationError("limit must be 500 or less.");
  }
  if (definition.mcp === "track_users_sync") {
    for (const name of ["attributes", "events", "purchases"]) {
      if (Array.isArray(input[name]) && input[name].length > 1) throw validationError(`${name} accepts at most one object for synchronous tracking.`);
    }
  }
  if (definition.mcp === "track_users" && ["attributes", "events", "purchases"].reduce((total, name) => total + (Array.isArray(input[name]) ? input[name].length : 0), 0) > 75) throw validationError("User tracking accepts at most 75 objects per request.");
}

export function validateInput(definition: FunctionDefinition, raw: Record<string, unknown>): Record<string, unknown> {
  const allowed = new Set(definition.parameters.map(({ name }) => name));
  const unknown = Object.keys(raw).find((name) => !allowed.has(name));
  if (unknown) throw new CliError("validation_error", `Unknown input: ${unknown}.`, { nextSteps: ["Check the command help and retry."] });
  const input: Record<string, unknown> = {};
  for (const parameter of definition.parameters) {
    try {
      const value = parseValue(parameter, raw[parameter.name]);
      if (value !== undefined) input[parameter.name] = value;
      if (parameter.required && (value === undefined || value === "")) throw new Error();
    } catch {
      throw new CliError("validation_error", `Invalid or missing input: ${parameter.name}.`, { nextSteps: ["Check the command help and retry."] });
    }
  }
  for (const group of definition.exactlyOne ?? []) {
    if (group.filter((name) => provided(input[name])).length !== 1) throw validationError(`Provide exactly one of: ${group.join(", ")}.`);
  }
  for (const group of definition.atLeastOne ?? []) {
    if (!group.some((name) => provided(input[name]))) throw validationError(`Provide at least one of: ${group.join(", ")}.`);
  }
  for (const group of definition.notTogether ?? []) {
    if (group.filter((name) => provided(input[name])).length > 1) throw validationError(`Do not combine: ${group.join(", ")}.`);
  }
  validateEndpointInput(definition, input);
  return input;
}

function optionAttribute(option: Option): string {
  return option.attributeName();
}

function findOrCreate(parent: Command, name: string): Command {
  return parent.commands.find((command) => command.name() === name) ?? parent.command(name);
}

export function createProgram(version: string, write: (value: unknown) => void = (value) => console.log(JSON.stringify(value))): Command {
  const program = new Command()
    .name("braze")
    .description("Call the Braze REST API")
    .version(version)
    .exitOverride()
    .configureOutput({ writeErr: () => {} });
  for (const definition of functions) {
    let parent = program;
    for (const group of definition.command.slice(0, -1)) parent = findOrCreate(parent, group);
    const leaf = parent.command(definition.command.at(-1) ?? "").description(definition.description ?? `${definition.mcp} (${definition.permission})`);
    if (definition.mcp !== "login") leaf.addOption(new Option("--input <json|@file>", "JSON input object or @file"));
    if (definition.access === "write") leaf.addOption(new Option("--confirm", "confirm the write operation"));
    for (const parameter of definition.parameters) {
      leaf.addOption(new Option(`--${flagName(parameter)} <value>`, parameter.name));
    }
    leaf.action(async (options: Record<string, unknown>) => {
      if (definition.access === "write" && options.confirm !== true) throw new CliError("confirmation_required", "Write commands require --confirm.", { nextSteps: ["Review the request, then rerun with --confirm."] });
      const raw = parseInput(typeof options.input === "string" ? options.input : undefined);
      for (const parameter of definition.parameters) {
        const option = leaf.options.find((candidate) => candidate.long === `--${flagName(parameter)}`);
        const value = option ? options[optionAttribute(option)] : undefined;
        if (value !== undefined) raw[parameter.name] = value;
      }
      const config = loadConfig({ requireCredentials: definition.access !== "local" || definition.mcp === "login" });
      if (definition.mcp === "login") {
        const configFile = saveConfig(config);
        write({ logged_in: true, config_file: configFile, rest_endpoint_configured: true, app_id_configured: Boolean(config.appId), api_key_configured: true });
        return;
      }
      if (config.appId && definition.parameters.some(({ name }) => name === "app_id") && raw.app_id === undefined) raw.app_id = config.appId;
      const input = validateInput(definition, raw);
      write(definition.access === "local" ? { workspaces: [{ rest_endpoint: config.endpoint || null, app_id: config.appId ?? null, api_key_configured: Boolean(config.apiKey) }] } : await executeRequest(definition, input, config));
    });
  }
  return program;
}
