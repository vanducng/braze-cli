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

type BrazeConfigInput = {
  endpoint?: string;
  apiKey?: string;
  appId?: string;
};

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

export function loadSavedConfig(env: NodeJS.ProcessEnv = process.env, requireCredentials = true): BrazeConfig {
  const saved = parseConfigFile(configFilePath(env));
  return validateConfig({
    endpoint: saved.BRAZE_REST_ENDPOINT,
    apiKey: saved.BRAZE_API_KEY,
    appId: saved.BRAZE_APP_ID,
  }, requireCredentials);
}

export function validateConfig(config: BrazeConfigInput, requireCredentials = true): BrazeConfig {
  const endpoint = config.endpoint?.trim() ?? "";
  const apiKey = config.apiKey?.trim() ?? "";
  const appId = config.appId?.trim();

  if (requireCredentials && (!endpoint || !apiKey)) {
    throw new CliError(
      "configuration_error",
      "Braze endpoint and API key are required.",
      {
        nextSteps: ["Run braze login to configure credentials."],
      },
    );
  }

  if (endpoint) {
    let url: URL;
    try {
      url = new URL(endpoint);
    } catch {
      throw new CliError("configuration_error", "Braze endpoint is not a valid URL.", {
        nextSteps: ["Run braze login and enter the REST endpoint shown in Braze."],
      });
    }
    const local = url.hostname === "localhost" || url.hostname === "127.0.0.1" || url.hostname === "::1";
    if (url.protocol !== "https:" && !(url.protocol === "http:" && local)) {
      throw new CliError("configuration_error", "Braze endpoint must use HTTPS.", {
        nextSteps: ["Run braze login and enter an HTTPS REST endpoint."],
      });
    }
  }

  return {
    endpoint: endpoint.replace(/\/+$/u, ""),
    apiKey,
    ...(appId ? { appId } : {}),
  };
}
