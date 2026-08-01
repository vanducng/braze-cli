import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { CliError } from "./errors.ts";

export type BrazeConfig = {
  endpoint: string;
  apiKey: string;
  appId?: string;
};

type ConfigOptions = {
  env?: NodeJS.ProcessEnv;
  envFile?: string;
  requireCredentials?: boolean;
};

function parseEnvFile(path: string): Record<string, string> {
  if (!existsSync(path)) return {};
  const values: Record<string, string> = {};
  for (const sourceLine of readFileSync(path, "utf8").split(/\r?\n/u)) {
    const line = sourceLine.trim();
    if (!line || line.startsWith("#")) continue;
    const match = line.match(/^(?:export\s+)?([^:=\s]+)\s*[:=]\s*(.*)$/u);
    if (!match?.[1]) continue;
    let value = match[2] ?? "";
    if (
      value.length >= 2 &&
      ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'")))
    ) {
      value = value.slice(1, -1);
    }
    values[match[1]] = value;
  }
  return values;
}

function first(...values: Array<string | undefined>): string | undefined {
  return values.find((value) => value !== undefined && value !== "");
}

export function loadConfig(options: ConfigOptions = {}): BrazeConfig {
  const env = options.env ?? process.env;
  const file = parseEnvFile(resolve(options.envFile ?? ".env"));
  const endpoint = first(
    env.BRAZE_REST_ENDPOINT,
    env.braze_host,
    file.BRAZE_REST_ENDPOINT,
    file.braze_host,
  );
  const apiKey = first(
    env.BRAZE_API_KEY,
    env.braze_api_token,
    file.BRAZE_API_KEY,
    file.braze_api_token,
  );
  const appId = first(
    env.BRAZE_APP_ID,
    env.braze_login,
    file.BRAZE_APP_ID,
    file.braze_login,
  );

  if (options.requireCredentials !== false && (!endpoint || !apiKey)) {
    throw new CliError(
      "configuration_error",
      "Braze endpoint and API key are required.",
      {
        nextSteps: [
          "Set BRAZE_REST_ENDPOINT and BRAZE_API_KEY in the environment or .env file.",
        ],
      },
    );
  }

  if (endpoint) {
    let url: URL;
    try {
      url = new URL(endpoint);
    } catch {
      throw new CliError("configuration_error", "Braze endpoint is not a valid URL.", {
        nextSteps: ["Set BRAZE_REST_ENDPOINT to the workspace REST endpoint."],
      });
    }
    const local = url.hostname === "localhost" || url.hostname === "127.0.0.1" || url.hostname === "::1";
    if (url.protocol !== "https:" && !(url.protocol === "http:" && local)) {
      throw new CliError("configuration_error", "Braze endpoint must use HTTPS.", {
        nextSteps: ["Use HTTPS, except for a local test server."],
      });
    }
  }

  return {
    endpoint: endpoint?.replace(/\/+$/u, "") ?? "",
    apiKey: apiKey ?? "",
    ...(appId ? { appId } : {}),
  };
}
