import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import { readFileSync, rmSync, mkdtempSync } from "node:fs";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

function run(binary, args, options) {
  return new Promise((done) => {
    const child = spawn(binary, args, options);
    let stdout = "";
    let stderr = "";
    child.stdout.setEncoding("utf8").on("data", (chunk) => { stdout += chunk; });
    child.stderr.setEncoding("utf8").on("data", (chunk) => { stderr += chunk; });
    child.on("close", (status) => done({ status, stdout, stderr }));
  });
}

const packed = spawnSync("npm", ["pack", "--json", "--silent"], { encoding: "utf8" });
assert.equal(packed.status, 0, packed.stderr);
const packedMetadata = JSON.parse(packed.stdout);
const [pack] = Array.isArray(packedMetadata) ? packedMetadata : Object.values(packedMetadata);
assert.ok(pack?.filename && Array.isArray(pack.files), "npm pack did not return package metadata");
const archive = resolve(pack.filename);
const packageVersion = JSON.parse(readFileSync("package.json", "utf8")).version;
let prefix;
try {
  const paths = pack.files.map(({ path }) => path);
  assert.ok(paths.includes("lib/index.js"));
  assert.ok(paths.includes("docs/commands.md"));
  assert.ok(paths.includes("docs/live-read-validation.md"));
  assert.ok(paths.includes("skills/braze/SKILL.md"));
  assert.ok(paths.includes("skills/braze/agents/openai.yaml"));
  assert.ok(!paths.some((path) => path === ".env" || path.startsWith("test/") || path.startsWith("src/")));
  assert.equal(readFileSync("lib/index.js", "utf8").split("\n")[0], "#!/usr/bin/env node");

  prefix = mkdtempSync(join(tmpdir(), "braze-package-"));
  const installed = spawnSync("npm", ["install", "--ignore-scripts", "--prefix", prefix, archive], { encoding: "utf8" });
  assert.equal(installed.status, 0, installed.stderr);
  const binary = join(prefix, "node_modules", ".bin", "braze");
  const cleanEnv = { PATH: process.env.PATH, XDG_CONFIG_HOME: join(prefix, "config") };
  assert.equal(spawnSync(binary, ["--version"], { encoding: "utf8" }).stdout.trim(), packageVersion);
  const help = spawnSync(binary, ["--help"], { encoding: "utf8" }).stdout;
  assert.match(help, /campaign/u);
  assert.match(help, /login/u);
  const leafHelp = spawnSync(binary, ["subscription", "update", "--help"], { encoding: "utf8" }).stdout;
  assert.match(leafHelp, /Documentation: https:\/\/www\.braze\.com\/docs\/api\/endpoints\/subscription_groups/u);
  assert.match(leafHelp, /Example JSON input:/u);
  assert.match(leafHelp, /--input .* --confirm/u);
  const workspace = spawnSync(binary, ["workspace", "list"], { cwd: prefix, env: cleanEnv, encoding: "utf8" });
  assert.equal(workspace.status, 0, workspace.stderr);
  assert.deepEqual(JSON.parse(workspace.stdout), { workspaces: [{ rest_endpoint: null, app_id: null, api_key_configured: false }] });
  const loginEnv = { ...cleanEnv, BRAZE_APP_ID: "package-app", BRAZE_REST_ENDPOINT: "https://rest.example.com", BRAZE_API_KEY: "package-login-secret" };
  const login = spawnSync(binary, ["login"], { cwd: prefix, env: loginEnv, encoding: "utf8" });
  assert.equal(login.status, 0, login.stderr);
  assert.doesNotMatch(login.stdout, /package-login-secret/u);
  const savedWorkspace = spawnSync(binary, ["workspace", "list"], { cwd: prefix, env: cleanEnv, encoding: "utf8" });
  assert.equal(savedWorkspace.status, 0, savedWorkspace.stderr);
  assert.deepEqual(JSON.parse(savedWorkspace.stdout), { workspaces: [{ rest_endpoint: "https://rest.example.com", app_id: "package-app", api_key_configured: true }] });
  const invalid = spawnSync(binary, ["not-a-command"], { cwd: prefix, env: { ...cleanEnv, BRAZE_API_KEY: "must-not-print" }, encoding: "utf8" });
  assert.equal(invalid.status, 1);
  assert.equal(invalid.stdout, "");
  assert.equal(JSON.parse(invalid.stderr).error.code, "usage_error");
  assert.doesNotMatch(invalid.stderr, /must-not-print/u);

  let status = 200;
  const server = createServer((request, response) => {
    response.writeHead(status, { "Content-Type": "application/json" });
    response.end(status === 200 ? '{"campaigns":[]}' : '{"secret":"provider payload"}');
  });
  await new Promise((done) => server.listen(0, "127.0.0.1", done));
  const env = { ...process.env, BRAZE_REST_ENDPOINT: `http://127.0.0.1:${server.address().port}`, BRAZE_API_KEY: "package-secret" };
  const success = await run(binary, ["campaign", "list"], { cwd: prefix, env });
  assert.equal(success.status, 0, success.stderr);
  assert.equal(success.stderr, "");
  assert.deepEqual(JSON.parse(success.stdout), { campaigns: [] });
  status = 401;
  const failure = await run(binary, ["campaign", "list"], { cwd: prefix, env });
  assert.equal(failure.status, 1);
  assert.equal(failure.stdout, "");
  assert.equal(JSON.parse(failure.stderr).error.code, "authentication_error");
  assert.doesNotMatch(failure.stderr, /package-secret|provider payload/u);
  server.close();
  process.stdout.write(`Package smoke passed: ${pack.files.length} files.\n`);
} finally {
  rmSync(archive, { force: true });
  if (prefix) rmSync(prefix, { force: true, recursive: true });
}
