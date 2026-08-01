import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { loadSavedConfig, validateConfig } from "../lib/config.js";
import { CliError, errorPayload } from "../lib/errors.js";

test("saved configuration is the only credential source", () => {
  const directory = mkdtempSync(join(tmpdir(), "braze-config-"));
  const configFile = join(directory, "braze", "config.json");
  mkdirSync(join(directory, "braze"));
  writeFileSync(configFile, JSON.stringify({ BRAZE_REST_ENDPOINT: "https://saved.example.com", BRAZE_API_KEY: "saved-key", BRAZE_APP_ID: "saved-app" }));

  assert.deepEqual(loadSavedConfig({ XDG_CONFIG_HOME: directory }), {
    endpoint: "https://saved.example.com",
    apiKey: "saved-key",
    appId: "saved-app",
  });
});

test("configuration errors are structured and redacted", () => {
  assert.throws(() => loadSavedConfig({ XDG_CONFIG_HOME: "/missing" }), (error) => {
    assert.ok(error instanceof CliError);
    assert.equal(error.code, "configuration_error");
    assert.doesNotMatch(JSON.stringify(errorPayload(error)), /secret/u);
    return true;
  });
  assert.throws(() => validateConfig({ endpoint: "not-a-url", apiKey: "secret" }), /valid URL/u);
  const directory = mkdtempSync(join(tmpdir(), "braze-invalid-config-"));
  const configFile = join(directory, "braze", "config.json");
  mkdirSync(join(directory, "braze"));
  writeFileSync(configFile, '{"BRAZE_API_KEY":{"secret":"must-not-print"}}');
  assert.throws(() => loadSavedConfig({ XDG_CONFIG_HOME: directory }), (error) => {
    assert.ok(error instanceof CliError);
    assert.equal(error.code, "configuration_error");
    assert.doesNotMatch(JSON.stringify(errorPayload(error)), /must-not-print/u);
    return true;
  });
});

test("unexpected failures do not expose their source message", () => {
  const payload = JSON.stringify(errorPayload(new Error("secret provider payload")));
  assert.doesNotMatch(payload, /secret provider payload/u);
  assert.match(payload, /unexpected_error/u);
});
