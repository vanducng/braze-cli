import assert from "node:assert/strict";
import { spawn } from "node:child_process";

const result = await new Promise((done) => {
  const child = spawn(process.execPath, [new URL("../lib/index.js", import.meta.url).pathname, "campaign", "list"], { cwd: new URL("..", import.meta.url), env: process.env });
  let stdout = "";
  let stderr = "";
  child.stdout.setEncoding("utf8").on("data", (chunk) => { stdout += chunk; });
  child.stderr.setEncoding("utf8").on("data", (chunk) => { stderr += chunk; });
  child.on("close", (status) => done({ status, stdout, stderr }));
});

assert.equal(result.status, 0, result.stderr);
const payload = JSON.parse(result.stdout);
assert.ok(Array.isArray(payload.campaigns), "campaigns must be an array");
process.stdout.write(`${JSON.stringify({ ok: true, command: "campaign list", campaign_count: payload.campaigns.length })}\n`);
