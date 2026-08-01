import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { loadConfig } from "../lib/config.js";
import { CliError, errorPayload } from "../lib/errors.js";

test("configuration precedence and colon compatibility", () => {
  const directory = mkdtempSync(join(tmpdir(), "braze-config-"));
  const envFile = join(directory, ".env");
  writeFileSync(envFile, [
    "BRAZE_REST_ENDPOINT=https://file.example.com",
    "BRAZE_API_KEY=file-upper",
    "BRAZE_APP_ID=file-app",
    "braze_host:https://compat.example.com/path",
    "braze_api_token:compat-key",
    "braze_login:compat-app",
  ].join("\n"));

  assert.deepEqual(loadConfig({ env: {}, envFile }), {
    endpoint: "https://file.example.com",
    apiKey: "file-upper",
    appId: "file-app",
  });
  assert.deepEqual(loadConfig({ env: { braze_host: "https://process.example.com", braze_api_token: "process-key", braze_login: "process-app" }, envFile }), {
    endpoint: "https://process.example.com",
    apiKey: "process-key",
    appId: "process-app",
  });
  assert.deepEqual(loadConfig({ env: { BRAZE_REST_ENDPOINT: "https://upper.example.com", BRAZE_API_KEY: "upper-key", BRAZE_APP_ID: "upper-app", braze_host: "https://compat.example.com", braze_api_token: "compat" }, envFile }), {
    endpoint: "https://upper.example.com",
    apiKey: "upper-key",
    appId: "upper-app",
  });
});

test("configuration errors are structured and redacted", () => {
  assert.throws(() => loadConfig({ env: {}, envFile: "/missing" }), (error) => {
    assert.ok(error instanceof CliError);
    assert.equal(error.code, "configuration_error");
    assert.doesNotMatch(JSON.stringify(errorPayload(error)), /secret/u);
    return true;
  });
  assert.throws(() => loadConfig({ env: { BRAZE_REST_ENDPOINT: "not-a-url", BRAZE_API_KEY: "secret" }, envFile: "/missing" }), /valid URL/u);
});

test("unexpected failures do not expose their source message", () => {
  const payload = JSON.stringify(errorPayload(new Error("secret provider payload")));
  assert.doesNotMatch(payload, /secret provider payload/u);
  assert.match(payload, /unexpected_error/u);
});
