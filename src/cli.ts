import { readFileSync } from "node:fs";
import { Command, Option } from "commander";
import { executeRequest } from "./client.ts";
import { loadConfig } from "./config.ts";
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
    if (Array.isArray(value) && value.every((item) => typeof item === "string")) return value;
    if (typeof value === "string") return value.split(",").map((item) => item.trim()).filter(Boolean);
    throw new Error();
  }
  const number = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(number) || (parameter.type === "integer" && !Number.isInteger(number)) || (parameter.type === "positive" && number <= 0)) throw new Error();
  return number;
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
    if (group.filter((name) => input[name] !== undefined).length !== 1) throw new CliError("validation_error", `Provide exactly one of: ${group.join(", ")}.`, { nextSteps: ["Correct the input and retry."] });
  }
  for (const group of definition.atLeastOne ?? []) {
    if (!group.some((name) => input[name] !== undefined)) throw new CliError("validation_error", `Provide at least one of: ${group.join(", ")}.`, { nextSteps: ["Correct the input and retry."] });
  }
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
    const leaf = parent.command(definition.command.at(-1) ?? "").description(`${definition.mcp} (${definition.permission})`);
    leaf.addOption(new Option("--input <json|@file>", "JSON input object or @file"));
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
      const config = loadConfig({ requireCredentials: definition.access !== "local" });
      if (config.appId && definition.parameters.some(({ name }) => name === "app_id") && raw.app_id === undefined) raw.app_id = config.appId;
      const input = validateInput(definition, raw);
      write(definition.access === "local" ? { workspaces: [{ rest_endpoint: config.endpoint || null, app_id: config.appId ?? null, api_key_configured: Boolean(config.apiKey) }] } : await executeRequest(definition, input, config));
    });
  }
  return program;
}
