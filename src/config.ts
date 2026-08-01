import { randomUUID } from "node:crypto";
import { chmodSync, existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { CliError } from "./errors.ts";

export type BrazeConfig = {
  endpoint: string;
  apiKey: string;
  appId?: string;
};

type ConfigOptions = {
  env?: NodeJS.ProcessEnv;
  envFile?: string;
  configFile?: string;
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

export function configFilePath(env: NodeJS.ProcessEnv = process.env): string {
  const root = env.XDG_CONFIG_HOME || (process.platform === "win32" ? env.APPDATA : undefined) || join(homedir(), ".config");
  return resolve(root, "braze", "config.json");
}

function parseConfigFile(path: string): Record<string, string> {
  if (!existsSync(path)) return {};
  try {
    const value = JSON.parse(readFileSync(path, "utf8")) as unknown;
    if (!value || Array.isArray(value) || typeof value !== "object") throw new Error();
    const config = value as Record<string, unknown>;
    for (const name of ["BRAZE_APP_ID", "BRAZE_REST_ENDPOINT", "BRAZE_API_KEY"]) {
      if (config[name] !== undefined && typeof config[name] !== "string") throw new Error();
    }
    return Object.fromEntries(Object.entries(config).filter((entry): entry is [string, string] => typeof entry[1] === "string"));
  } catch {
    throw new CliError("configuration_error", "Saved Braze configuration is invalid.", {
      nextSteps: ["Correct or remove the saved config file, then run braze login again."],
    });
  }
}

export function saveConfig(config: BrazeConfig, path = configFilePath()): string {
  const directory = dirname(path);
  mkdirSync(directory, { mode: 0o700, recursive: true });
  chmodSync(directory, 0o700);
  const temporary = join(directory, `.config-${process.pid}-${randomUUID()}.tmp`);
  const payload = `${JSON.stringify({
    ...(config.appId ? { BRAZE_APP_ID: config.appId } : {}),
    BRAZE_REST_ENDPOINT: config.endpoint,
    BRAZE_API_KEY: config.apiKey,
  }, null, 2)}\n`;
  try {
    writeFileSync(temporary, payload, { encoding: "utf8", flag: "wx", mode: 0o600 });
    renameSync(temporary, path);
    chmodSync(path, 0o600);
  } finally {
    rmSync(temporary, { force: true });
  }
  return path;
}

export function loadConfig(options: ConfigOptions = {}): BrazeConfig {
  const env = options.env ?? process.env;
  const file = parseEnvFile(resolve(options.envFile ?? ".env"));
  const saved = parseConfigFile(resolve(options.configFile ?? configFilePath(env)));
  const endpoint = first(
    env.BRAZE_REST_ENDPOINT,
    env.braze_host,
    file.BRAZE_REST_ENDPOINT,
    file.braze_host,
    saved.BRAZE_REST_ENDPOINT,
  );
  const apiKey = first(
    env.BRAZE_API_KEY,
    env.braze_api_token,
    file.BRAZE_API_KEY,
    file.braze_api_token,
    saved.BRAZE_API_KEY,
  );
  const appId = first(
    env.BRAZE_APP_ID,
    env.braze_login,
    file.BRAZE_APP_ID,
    file.braze_login,
    saved.BRAZE_APP_ID,
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
