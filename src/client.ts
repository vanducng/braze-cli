import { readFile } from "node:fs/promises";
import { basename } from "node:path";
import { CliError } from "./errors.ts";
import type { BrazeConfig } from "./config.ts";
import type { FunctionDefinition } from "./functions.ts";

function valueToString(value: unknown): string {
  return typeof value === "string" ? value : String(value);
}

function providerError(status: number, retryAfter: string | null, allowRetry: boolean): CliError {
  const retryable = allowRetry && (status === 429 || status >= 500);
  const retryAfterSeconds = retryAfter && /^\d{1,5}$/u.test(retryAfter) && Number(retryAfter) <= 86_400 ? Number(retryAfter) : undefined;
  const code = status === 401 ? "authentication_error" : status === 403 ? "permission_error" : status === 404 ? "not_found" : status === 429 ? "rate_limited" : status >= 500 ? "provider_unavailable" : "provider_error";
  const message = status === 401 ? "Braze rejected the API key." : status === 403 ? "The API key lacks permission for this command." : status === 404 ? "The requested Braze resource was not found." : status === 429 ? "Braze rate-limited the request." : status >= 500 ? "Braze is temporarily unavailable." : "Braze rejected the request.";
  return new CliError(code, message, {
    retryable,
    nextSteps: retryable ? ["Retry the command after the provider recovers."] : status === 429 || status >= 500 ? ["Check Braze for a completed write before taking further action."] : ["Check the command inputs and API key permission."],
    details: { status, ...(retryAfterSeconds === undefined ? {} : { retry_after_seconds: retryAfterSeconds }) },
  });
}

export async function executeRequest(
  definition: FunctionDefinition,
  input: Record<string, unknown>,
  config: BrazeConfig,
  timeoutMs = 30_000,
): Promise<unknown> {
  let path = definition.path ?? "";
  const pathNames = new Set<string>();
  path = path.replace(/\{([^}]+)\}/gu, (_, name: string) => {
    pathNames.add(name);
    return encodeURIComponent(valueToString(input[name]));
  });
  const url = new URL(`${config.endpoint}${path}`);
  const values = Object.entries(input).filter(([key, value]) => value !== undefined && !pathNames.has(key));
  const headers: Record<string, string> = { Authorization: `Bearer ${config.apiKey}`, Accept: "application/json" };
  let body: BodyInit | undefined;

  if (definition.method === "GET") {
    for (const [key, value] of values) {
      if (Array.isArray(value)) for (const item of value) url.searchParams.append(`${key}[]`, valueToString(item));
      else url.searchParams.append(key, valueToString(value));
    }
  } else if (definition.mcp === "create_media_library_asset" && input.asset_file) {
    const form = new FormData();
    const filePath = valueToString(input.asset_file);
    form.append("asset_file", new Blob([await readFile(filePath)]), basename(filePath));
    if (input.name !== undefined) form.append("name", valueToString(input.name));
    body = form;
  } else {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(Object.fromEntries(values));
  }

  let response: Response;
  try {
    response = await fetch(url, { method: definition.method, headers, body, signal: AbortSignal.timeout(timeoutMs) });
  } catch (error) {
    const retryable = definition.access === "read";
    if (error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError")) {
      throw new CliError("timeout", "The Braze request timed out.", { retryable, nextSteps: retryable ? ["Retry the command."] : ["Check Braze for a completed write before taking further action."] });
    }
    throw new CliError("network_error", "The Braze request could not be completed.", { retryable, nextSteps: retryable ? ["Check the endpoint and network, then retry."] : ["Check Braze for a completed write before taking further action."] });
  }

  if (!response.ok) throw providerError(response.status, response.headers.get("retry-after"), definition.access === "read");
  if (response.status === 204) return null;
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    const retryable = definition.access === "read";
    throw new CliError("invalid_response", "Braze returned an invalid JSON response.", { retryable, nextSteps: retryable ? ["Retry the command or contact Braze support."] : ["Check Braze for a completed write before taking further action."] });
  }
}
