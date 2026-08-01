import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { executeRequest } from "../lib/client.js";
import { commandPath, functions } from "../lib/functions.js";

const binary = new URL("../lib/index.js", import.meta.url);

function run(args, options) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [binary.pathname, ...args], options);
    let stdout = "";
    let stderr = "";
    child.stdout.setEncoding("utf8").on("data", (chunk) => { stdout += chunk; });
    child.stderr.setEncoding("utf8").on("data", (chunk) => { stderr += chunk; });
    child.on("close", (status) => resolve({ status, stdout, stderr }));
  });
}

function sample(parameter) {
  if (parameter.type === "integer" || parameter.type === "positive") return 1;
  if (parameter.type === "boolean") return true;
  if (parameter.type === "string[]") return ["tag"];
  if (parameter.type === "object") return { value: "sample" };
  if (parameter.type === "object[]") return [{ value: "sample" }];
  if (parameter.name.endsWith("_at") || parameter.name.includes("time")) return "2026-01-01T00:00:00Z";
  return `${parameter.name}/value`;
}

function minimalInput(definition) {
  const input = {};
  for (const parameter of definition.parameters.filter(({ required }) => required)) input[parameter.name] = sample(parameter);
  for (const group of definition.exactlyOne ?? []) input[group[0]] = sample(definition.parameters.find(({ name }) => name === group[0]));
  for (const group of definition.atLeastOne ?? []) input[group[0]] = sample(definition.parameters.find(({ name }) => name === group[0]));
  return input;
}

async function serverFixture(t) {
  const requests = [];
  let response = { status: 200, body: '{"accepted":true}', delay: 0, headers: {} };
  const server = createServer(async (request, reply) => {
    const chunks = [];
    for await (const chunk of request) chunks.push(chunk);
    requests.push({ method: request.method, url: request.url, headers: request.headers, body: Buffer.concat(chunks).toString("utf8") });
    setTimeout(() => {
      reply.writeHead(response.status, { "Content-Type": "application/json", ...response.headers });
      reply.end(response.body);
    }, response.delay);
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  t.after(() => server.close());
  return {
    endpoint: `http://127.0.0.1:${server.address().port}`,
    requests,
    respond(next) { response = { ...response, ...next }; },
  };
}

test("all 70 REST functions construct and send their documented request", async (t) => {
  const fixture = await serverFixture(t);
  const config = { endpoint: fixture.endpoint, apiKey: "test-key" };
  for (const definition of functions.filter(({ method }) => method)) {
    const input = minimalInput(definition);
    const result = await executeRequest(definition, input, config);
    assert.deepEqual(result, { accepted: true }, commandPath(definition));
    const request = fixture.requests.at(-1);
    assert.equal(request.method, definition.method, commandPath(definition));
    assert.equal(request.headers.authorization, "Bearer test-key", commandPath(definition));
    const url = new URL(request.url, fixture.endpoint);
    const expectedPath = definition.path.replace(/\{([^}]+)\}/gu, (_, name) => encodeURIComponent(String(input[name])));
    assert.equal(url.pathname, expectedPath, commandPath(definition));
    const pathNames = new Set([...definition.path.matchAll(/\{([^}]+)\}/gu)].map((match) => match[1]));
    const expectedValues = Object.entries(input).filter(([name]) => !pathNames.has(name));
    if (definition.method === "GET") {
      const expected = new URLSearchParams();
      for (const [key, value] of expectedValues) {
        if (Array.isArray(value)) for (const item of value) expected.append(`${key}[]`, String(item));
        else expected.append(key, String(value));
      }
      assert.deepEqual([...url.searchParams], [...expected], commandPath(definition));
    } else {
      assert.deepEqual(JSON.parse(request.body), Object.fromEntries(expectedValues), commandPath(definition));
    }
  }
  assert.equal(fixture.requests.length, 70);
});

test("media file input uses multipart", async (t) => {
  const fixture = await serverFixture(t);
  const directory = mkdtempSync(join(tmpdir(), "braze-media-"));
  const file = join(directory, "asset.txt");
  writeFileSync(file, "asset bytes");
  const definition = functions.find(({ mcp }) => mcp === "create_media_library_asset");
  await executeRequest(definition, { asset_file: file, name: "asset" }, { endpoint: fixture.endpoint, apiKey: "test-key" });
  const request = fixture.requests.at(-1);
  assert.match(request.headers["content-type"], /^multipart\/form-data; boundary=/u);
  assert.match(request.body, /asset bytes/u);
});

test("provider failures are classified without leaking credentials or payloads", async (t) => {
  const fixture = await serverFixture(t);
  const definition = functions.find(({ mcp }) => mcp === "get_campaign_list");
  const cases = [[400, "provider_error", false], [401, "authentication_error", false], [403, "permission_error", false], [404, "not_found", false], [429, "rate_limited", true], [500, "provider_unavailable", true]];
  for (const [status, code, retryable] of cases) {
    fixture.respond({ status, body: '{"secret":"provider details"}', headers: status === 429 ? { "Retry-After": "2" } : {} });
    await assert.rejects(() => executeRequest(definition, {}, { endpoint: fixture.endpoint, apiKey: "test-secret" }), (error) => {
      assert.equal(error.code, code);
      assert.equal(error.retryable, retryable);
      assert.doesNotMatch(JSON.stringify(error), /test-secret|provider details/u);
      return true;
    });
  }
  fixture.respond({ status: 200, body: "not json", headers: {} });
  await assert.rejects(() => executeRequest(definition, {}, { endpoint: fixture.endpoint, apiKey: "key" }), { code: "invalid_response" });
  fixture.respond({ status: 200, body: '{}', delay: 50 });
  await assert.rejects(() => executeRequest(definition, {}, { endpoint: fixture.endpoint, apiKey: "key" }, 5), { code: "timeout" });
});

test("write failures never invite an unsafe retry and headers are bounded", async (t) => {
  const fixture = await serverFixture(t);
  const definition = functions.find(({ mcp }) => mcp === "create_email_template");
  const input = { template_name: "template", subject: "subject", body: "body" };
  fixture.respond({ status: 429, body: '{"secret":"provider details"}', headers: { "Retry-After": "private header" } });
  await assert.rejects(() => executeRequest(definition, input, { endpoint: fixture.endpoint, apiKey: "key" }), (error) => {
    assert.equal(error.retryable, false);
    assert.deepEqual(error.details, { status: 429 });
    return true;
  });
  fixture.respond({ status: 500, body: '{}', headers: {} });
  await assert.rejects(() => executeRequest(definition, input, { endpoint: fixture.endpoint, apiKey: "key" }), { retryable: false });
  fixture.respond({ status: 200, body: '{}', delay: 50 });
  await assert.rejects(() => executeRequest(definition, input, { endpoint: fixture.endpoint, apiKey: "key" }, 5), { code: "timeout", retryable: false });
});

test("all write commands require confirmation before config or validation", () => {
  for (const definition of functions.filter(({ access }) => access === "write")) {
    const result = spawnSync(process.execPath, [binary.pathname, ...definition.command], { encoding: "utf8", env: {} });
    assert.equal(result.status, 1, commandPath(definition));
    assert.equal(result.stdout, "", commandPath(definition));
    assert.equal(JSON.parse(result.stderr).error.code, "confirmation_required", commandPath(definition));
  }
});

test("JSON input works, explicit flags win, and errors use stderr only", async (t) => {
  const fixture = await serverFixture(t);
  const directory = mkdtempSync(join(tmpdir(), "braze-cli-"));
  const env = { ...process.env, BRAZE_REST_ENDPOINT: fixture.endpoint, BRAZE_API_KEY: "test-key" };
  const success = await run(["campaign", "get", "--input", '{"campaign_id":"from-json"}', "--campaign-id", "from-flag"], { cwd: directory, env });
  assert.equal(success.status, 0, success.stderr);
  assert.equal(success.stderr, "");
  assert.deepEqual(JSON.parse(success.stdout), { accepted: true });
  assert.match(fixture.requests.at(-1).url, /campaign_id=from-flag/u);

  const failure = spawnSync(process.execPath, [binary.pathname, "campaign", "get"], { cwd: directory, env, encoding: "utf8" });
  assert.equal(failure.status, 1);
  assert.equal(failure.stdout, "");
  assert.equal(JSON.parse(failure.stderr).error.code, "validation_error");
});

test("workspace output is useful and never exposes the API key", () => {
  const directory = mkdtempSync(join(tmpdir(), "braze-workspace-"));
  writeFileSync(join(directory, ".env"), "braze_host:https://rest.example.com\nbraze_api_token:do-not-print\nbraze_login:app-id\n");
  const result = spawnSync(process.execPath, [binary.pathname, "workspace", "list"], { cwd: directory, env: {}, encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stderr, "");
  assert.doesNotMatch(result.stdout, /do-not-print/u);
  assert.deepEqual(JSON.parse(result.stdout), { workspaces: [{ rest_endpoint: "https://rest.example.com", app_id: "app-id", api_key_configured: true }] });
});
