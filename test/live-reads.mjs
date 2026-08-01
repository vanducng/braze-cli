import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { commandPath, functions } from "../lib/functions.js";

const binary = new URL("../lib/index.js", import.meta.url).pathname;
const definitions = new Map(functions.filter(({ access }) => access === "read").map((definition) => [commandPath(definition), definition]));
const results = [];
const payloads = new Map();
const missingFixture = "braze-cli-missing-fixture";

function run(command, input) {
  return new Promise((done) => {
    const child = spawn(process.execPath, [binary, ...command.split(" "), "--input", JSON.stringify(input)], { cwd: new URL("..", import.meta.url), env: process.env });
    let stdout = "";
    let stderr = "";
    child.stdout.setEncoding("utf8").on("data", (chunk) => { stdout += chunk; });
    child.stderr.setEncoding("utf8").on("data", (chunk) => { stderr += chunk; });
    child.on("error", () => done({ status: 1, stdout, stderr: JSON.stringify({ error: { code: "spawn_error" } }) }));
    child.on("close", (status) => done({ status, stdout, stderr }));
  });
}

function responseSummary(payload) {
  if (payload === null) return { response_type: "null", has_data: false };
  if (Array.isArray(payload)) return { response_type: "array", records: payload.length, has_data: payload.length > 0 };
  if (typeof payload !== "object") return { response_type: typeof payload, has_data: true };
  const responseKeys = Object.keys(payload).sort();
  const collectionCounts = responseKeys.filter((key) => Array.isArray(payload[key])).map((key) => payload[key].length);
  const dataKeys = responseKeys.filter((key) => !["message", "notice"].includes(key));
  const hasData = dataKeys.some((key) => Array.isArray(payload[key]) ? payload[key].length > 0 : payload[key] && typeof payload[key] === "object" ? Object.keys(payload[key]).length > 0 : payload[key] !== null && payload[key] !== undefined);
  return { response_type: "object", ...(collectionCounts.length ? { records: Math.max(...collectionCounts) } : {}), has_data: hasData };
}

function safeError(stderr, exitStatus) {
  try {
    const error = JSON.parse(stderr).error;
    return { code: error?.code ?? "unknown_error", ...(error?.details?.status ? { http_status: error.details.status } : {}) };
  } catch {
    return { code: "invalid_error_output", exit_status: exitStatus };
  }
}

function definition(command) {
  const value = definitions.get(command);
  assert.ok(value, `Unknown read command: ${command}`);
  return value;
}

async function request(command, input) {
  const result = await run(command, input);
  if (result.status !== 0) return { ok: false, error: safeError(result.stderr, result.status) };
  let payload;
  try {
    payload = JSON.parse(result.stdout);
  } catch {
    return { ok: false, error: { code: "invalid_success_output" } };
  }
  if (Array.isArray(payload?.errors) && payload.errors.length > 0) return { ok: false, error: { code: "provider_item_error", item_errors: payload.errors.length } };
  return { ok: true, payload };
}

async function probe(command, input = {}) {
  const value = await request(command, input);
  const permission = definition(command).permission;
  if (!value.ok) {
    results.push({ command, permission, status: "failed", error: value.error });
    return;
  }
  payloads.set(command, value.payload);
  results.push({ command, permission, status: "passed", ...responseSummary(value.payload) });
}

async function probeCandidates(command, inputs, prefer = () => true, synthetic = false) {
  const permission = definition(command).permission;
  if (!inputs.length) {
    results.push({ command, permission, status: "blocked", reason: "missing_fixture" });
    return;
  }
  let last;
  for (const input of inputs.slice(0, 10)) {
    const value = await request(command, input);
    if (synthetic) {
      const authorized = !value.ok && [400, 404].includes(value.error.http_status) && ["provider_error", "not_found"].includes(value.error.code);
      results.push(value.ok
        ? { command, permission, status: "passed", verification: "authorized_no_fixture", ...responseSummary(value.payload) }
        : authorized
          ? { command, permission, status: "passed", verification: "authorized_no_fixture", http_status: value.error.http_status }
          : { command, permission, status: "failed", error: value.error });
      return;
    }
    if (!value.ok) {
      if (["provider_error", "not_found"].includes(value.error.code)) {
        last = value;
        continue;
      }
      results.push({ command, permission, status: "failed", error: value.error });
      return;
    }
    last = value.payload;
    if (prefer(value.payload)) break;
  }
  if (last?.ok === false) {
    results.push({ command, permission, status: "failed", error: last.error });
  } else {
    payloads.set(command, last);
    results.push({ command, permission, status: "passed", ...responseSummary(last) });
  }
}

function objects(command, key) {
  const items = payloads.get(command)?.[key];
  return Array.isArray(items) ? items.filter((item) => item && typeof item === "object" && !Array.isArray(item)) : [];
}

function values(command, key) {
  const items = payloads.get(command)?.[key];
  return Array.isArray(items) ? items : [];
}

function firstString(...valuesToCheck) {
  return valuesToCheck.find((value) => typeof value === "string" && value.length > 0);
}

const now = new Date();
const today = now.toISOString().slice(0, 10);
const weekAgo = new Date(now.getTime() - 7 * 86_400_000).toISOString().slice(0, 10);
const tomorrow = new Date(now.getTime() + 86_400_000).toISOString();

await probe("campaign list");
const campaigns = objects("campaign list", "campaigns");
const campaignId = firstString(process.env.BRAZE_LIVE_CAMPAIGN_ID, campaigns[0]?.id);
await probeCandidates("campaign get", [{ campaign_id: campaignId ?? missingFixture }], undefined, !campaignId);
await probeCandidates("campaign data-series", [{ campaign_id: campaignId ?? missingFixture, length: 1 }], undefined, !campaignId);

await probe("canvas list");
const canvases = objects("canvas list", "canvases");
const canvasIds = [process.env.BRAZE_LIVE_CANVAS_ID, ...canvases.map(({ id }) => id)].filter((id) => typeof id === "string");
const canvasInputs = (canvasIds.length ? canvasIds : [missingFixture]).map((canvas_id) => ({ canvas_id }));
await probeCandidates("canvas get", canvasInputs, undefined, !canvasIds.length);
await probeCandidates("canvas data-series", canvasInputs.map(({ canvas_id }) => ({ canvas_id, ending_at: now.toISOString(), length: 7 })), (payload) => payload && typeof payload === "object" && Object.hasOwn(payload, "data"), !canvasIds.length);
await probeCandidates("canvas data-summary", canvasInputs.map(({ canvas_id }) => ({ canvas_id, ending_at: now.toISOString(), length: 7 })), (payload) => payload && typeof payload === "object" && Object.hasOwn(payload, "data"), !canvasIds.length);

await probe("catalog list");
const catalogs = values("catalog list", "catalogs");
const firstCatalog = catalogs[0];
const catalogName = firstString(process.env.BRAZE_LIVE_CATALOG_NAME, typeof firstCatalog === "string" ? firstCatalog : firstCatalog?.name, firstCatalog?.catalog_name);
await probeCandidates("catalog items", [{ catalog_name: catalogName ?? missingFixture }], undefined, !catalogName);
const catalogItems = values("catalog items", "items");
const firstCatalogItem = catalogItems[0];
const catalogItemId = firstString(process.env.BRAZE_LIVE_CATALOG_ITEM_ID, typeof firstCatalogItem === "string" ? firstCatalogItem : firstCatalogItem?.id, firstCatalogItem?.item_id);
await probeCandidates("catalog item", [{ catalog_name: catalogName ?? missingFixture, item_id: catalogItemId ?? missingFixture }], undefined, !(catalogName && catalogItemId));

await probe("custom-attribute list");
await probe("event export");
await probe("event list");
const eventNames = [process.env.BRAZE_LIVE_EVENT_NAME, ...values("event list", "events")].filter((event) => typeof event === "string");
await probeCandidates("event data-series", (eventNames.length ? eventNames : [missingFixture]).map((event) => ({ event, length: 100 })), (payload) => Array.isArray(payload?.data) && payload.data.length > 0, !eventNames.length);

await probe("cdi integration list");
const integrations = objects("cdi integration list", "results");
const integrationId = firstString(process.env.BRAZE_LIVE_CDI_INTEGRATION_ID, integrations[0]?.integration_id, integrations[0]?.id);
await probeCandidates("cdi integration sync-status", [{ integration_id: integrationId ?? missingFixture }], undefined, !integrationId);

await probe("kpi dau", { length: 1 });
await probe("kpi mau", { length: 1 });
await probe("kpi new-users", { length: 1 });
await probe("kpi uninstalls", { length: 1 });
await probe("message scheduled-broadcasts", { end_time: tomorrow });
await probe("purchase products");
await probe("purchase quantity-series", { length: 1 });
await probe("purchase revenue-series", { length: 1 });
await probe("sdk-authentication keys", process.env.BRAZE_LIVE_APP_ID ? { app_id: process.env.BRAZE_LIVE_APP_ID } : {});

await probe("segment list");
const segments = objects("segment list", "segments");
const segmentId = firstString(process.env.BRAZE_LIVE_SEGMENT_ID, segments[0]?.id);
await probeCandidates("segment get", [{ segment_id: segmentId ?? missingFixture }], undefined, !segmentId);
await probeCandidates("segment data-series", [{ segment_id: segmentId ?? missingFixture, length: 1 }], undefined, !segmentId);

const sendId = firstString(process.env.BRAZE_LIVE_SEND_ID);
const sendCampaignId = firstString(process.env.BRAZE_LIVE_SEND_CAMPAIGN_ID, campaigns.find(({ is_api_campaign }) => is_api_campaign)?.id, campaignId);
await probeCandidates("send data-series", [{ campaign_id: sendCampaignId ?? missingFixture, send_id: sendId ?? missingFixture, length: 1 }], undefined, !(sendId && sendCampaignId));
await probe("session data-series", { length: 1 });
await probe("sms invalid-phone list", { start_date: weekAgo, end_date: today, limit: 1 });

const invalidPhones = objects("sms invalid-phone list", "sms");
const identifier = process.env.BRAZE_LIVE_EXTERNAL_ID ? { external_id: [process.env.BRAZE_LIVE_EXTERNAL_ID] }
  : process.env.BRAZE_LIVE_EMAIL ? { email: [process.env.BRAZE_LIVE_EMAIL] }
    : process.env.BRAZE_LIVE_PHONE ? { phone: [process.env.BRAZE_LIVE_PHONE] }
      : typeof invalidPhones[0]?.phone === "string" ? { phone: [invalidPhones[0].phone] }
        : undefined;
const subscriptionGroupId = firstString(process.env.BRAZE_LIVE_SUBSCRIPTION_GROUP_ID);
await probeCandidates("subscription group-status", [{ subscription_group_id: subscriptionGroupId ?? missingFixture, ...(identifier ?? { external_id: [missingFixture] }) }], undefined, !(subscriptionGroupId && identifier));
await probeCandidates("subscription user-groups", [identifier ?? { external_id: [missingFixture] }], undefined, !identifier);

await probe("template email list", { limit: 1 });
const emailTemplates = objects("template email list", "templates");
const emailTemplateId = firstString(process.env.BRAZE_LIVE_EMAIL_TEMPLATE_ID, emailTemplates[0]?.email_template_id, emailTemplates[0]?.id);
await probeCandidates("template email get", [{ email_template_id: emailTemplateId ?? missingFixture }], undefined, !emailTemplateId);

await probe("content-block list", { limit: 1 });
const contentBlocks = objects("content-block list", "content_blocks");
const contentBlockId = firstString(process.env.BRAZE_LIVE_CONTENT_BLOCK_ID, contentBlocks[0]?.content_block_id, contentBlocks[0]?.id);
await probeCandidates("content-block get", [{ content_block_id: contentBlockId ?? missingFixture }], undefined, !contentBlockId);

assert.deepEqual(results.map(({ command }) => command).sort(), [...definitions.keys()].sort());
const passed = results.filter(({ status }) => status === "passed").length;
const failed = results.filter(({ status }) => status === "failed").length;
const blocked = results.filter(({ status }) => status === "blocked").length;
process.stdout.write(`${JSON.stringify({ ok: failed === 0 && blocked === 0, total: results.length, passed, failed, blocked, results }, null, 2)}\n`);
if (failed > 0 || blocked > 0) process.exitCode = 1;
