import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

function response(path) {
  if (path === "/campaigns/list") return { campaigns: [{ id: "campaign", is_api_campaign: true }] };
  if (path === "/canvas/list") return { canvases: [{ id: "canvas" }] };
  if (path === "/catalogs") return { catalogs: [] };
  if (path === "/catalogs/catalog/items") return { items: [{ id: "item" }] };
  if (path === "/events/list") return { events: ["event"] };
  if (path === "/cdi/integrations") return { results: [{ integration_id: "integration" }] };
  if (path === "/messages/scheduled_broadcasts") return { scheduled_broadcasts: [] };
  if (path === "/purchases/product_list") return { products: [] };
  if (path === "/app_group/sdk_authentication/keys") return { keys: [] };
  if (path === "/segments/list") return { segments: [{ id: "segment" }] };
  if (path === "/sms/invalid_phone_numbers") return { sms: [] };
  if (path === "/subscription/status/get") return { status: "subscribed" };
  if (path === "/subscription/user/status") return { users: [] };
  if (path === "/templates/email/list") return { templates: [{ email_template_id: "template" }] };
  if (path === "/content_blocks/list") return { content_blocks: [{ content_block_id: "block" }] };
  return { data: [] };
}

test("live-read runner exercises all 40 reads without exposing fixtures", async (t) => {
  const server = createServer((request, reply) => {
    const url = new URL(request.url, "http://localhost");
    const missingFixture = url.pathname.includes("braze-cli-missing-fixture") || [...url.searchParams.values()].includes("braze-cli-missing-fixture");
    reply.writeHead(missingFixture ? (url.pathname === "/sends/data_series" ? 400 : 404) : 200, { "Content-Type": "application/json" });
    reply.end(JSON.stringify(missingFixture ? { message: "fixture unavailable" } : response(url.pathname)));
  });
  await new Promise((done) => server.listen(0, "127.0.0.1", done));
  t.after(() => server.close());
  const secret = "must-not-print";
  const configRoot = mkdtempSync(join(tmpdir(), "braze-live-reads-"));
  mkdirSync(join(configRoot, "braze"));
  writeFileSync(join(configRoot, "braze", "config.json"), JSON.stringify({ BRAZE_REST_ENDPOINT: `http://127.0.0.1:${server.address().port}`, BRAZE_API_KEY: secret, BRAZE_APP_ID: "app" }));
  const env = {
    ...process.env,
    XDG_CONFIG_HOME: configRoot,
    BRAZE_LIVE_SUBSCRIPTION_GROUP_ID: "group",
    BRAZE_LIVE_EXTERNAL_ID: "user",
  };
  const result = await new Promise((done) => {
    const child = spawn(process.execPath, [new URL("live-reads.mjs", import.meta.url).pathname], { cwd: new URL("..", import.meta.url), env });
    let stdout = "";
    let stderr = "";
    child.stdout.setEncoding("utf8").on("data", (chunk) => { stdout += chunk; });
    child.stderr.setEncoding("utf8").on("data", (chunk) => { stderr += chunk; });
    child.on("close", (status) => done({ status, stdout, stderr }));
  });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stderr, "");
  assert.doesNotMatch(result.stdout, new RegExp(secret, "u"));
  const summary = JSON.parse(result.stdout);
  assert.deepEqual({ ok: summary.ok, total: summary.total, passed: summary.passed, failed: summary.failed, blocked: summary.blocked }, { ok: true, total: 40, passed: 40, failed: 0, blocked: 0 });
  assert.equal(summary.results.filter(({ verification }) => verification === "authorized_no_fixture").length, 3);
});
