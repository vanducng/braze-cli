import assert from "node:assert/strict";
import test from "node:test";
import { commandPath, functions } from "../lib/functions.js";
import { validateInput } from "../lib/cli.js";

const expected = `
login
workspace list
campaign list
campaign get
campaign data-series
canvas list
canvas get
canvas data-series
canvas data-summary
catalog list
catalog items
catalog item
custom-attribute list
event export
event list
event data-series
cdi integration list
cdi integration sync-status
kpi dau
kpi mau
kpi new-users
kpi uninstalls
media-library create
message scheduled-broadcasts
message schedule delete
message schedule campaign delete
message schedule canvas delete
message schedule create
message schedule campaign create
message schedule canvas create
message schedule update
message schedule campaign update
message schedule canvas update
message send-id create
message send immediate
message send campaign
message send canvas
message duplicate campaign
message duplicate canvas
message live-activity update
purchase products
purchase quantity-series
purchase revenue-series
sdk-authentication keys
segment list
segment get
segment data-series
send data-series
session data-series
sms invalid-phone list
sms invalid-phone remove
subscription group-status
subscription user-groups
subscription update
subscription update-v2
user alias create
user alias update
user delete
user identify
user track
user track-sync
user merge
user external-id rename
user external-id remove
template email list
template email get
template email create
template email update
content-block list
content-block get
content-block create
content-block update
`.trim().split("\n");

test("catalog exactly matches the approved 72-command contract", () => {
  assert.deepEqual(functions.map(commandPath), expected);
  assert.equal(new Set(functions.map(({ mcp }) => mcp)).size, 72);
  assert.equal(functions.filter(({ access }) => access === "write").length, 33);
  assert.equal(functions.filter(({ method }) => method).length, 70);
});

test("linked Braze categories include every indexed endpoint", () => {
  const paths = (category) => functions.filter(({ command }) => command[0] === category).map(({ path }) => path);
  assert.deepEqual(paths("subscription"), ["/subscription/status/get", "/subscription/user/status", "/subscription/status/set", "/v2/subscription/status/set"]);
  assert.deepEqual(paths("sms"), ["/sms/invalid_phone_numbers", "/sms/invalid_phone_numbers/remove"]);
  assert.deepEqual(paths("message"), [
    "/messages/scheduled_broadcasts",
    "/messages/schedule/delete",
    "/campaigns/trigger/schedule/delete",
    "/canvas/trigger/schedule/delete",
    "/messages/schedule/create",
    "/campaigns/trigger/schedule/create",
    "/canvas/trigger/schedule/create",
    "/messages/schedule/update",
    "/campaigns/trigger/schedule/update",
    "/canvas/trigger/schedule/update",
    "/sends/id/create",
    "/messages/send",
    "/campaigns/trigger/send",
    "/canvas/trigger/send",
    "/campaigns/duplicate",
    "/canvas/duplicate",
    "/messages/live_activity/update",
  ]);
  assert.deepEqual(paths("user"), [
    "/users/alias/new",
    "/users/alias/update",
    "/users/delete",
    "/users/identify",
    "/users/track",
    "/users/track/sync",
    "/users/merge",
    "/users/external_ids/rename",
    "/users/external_ids/remove",
  ]);
});

test("every path placeholder has a required parameter", () => {
  for (const definition of functions) {
    for (const name of definition.path?.matchAll(/\{([^}]+)\}/gu) ?? []) {
      assert.equal(definition.parameters.find((parameter) => parameter.name === name[1])?.required, true, `${commandPath(definition)}: ${name[1]}`);
    }
  }
});

test("analytics lengths are validated as integers", () => {
  for (const command of ["campaign data-series", "canvas data-series", "canvas data-summary", "event data-series", "kpi dau", "kpi mau", "kpi new-users", "kpi uninstalls", "purchase quantity-series", "purchase revenue-series", "segment data-series", "send data-series", "session data-series"]) {
    const definition = functions.find((candidate) => commandPath(candidate) === command);
    assert.equal(definition?.parameters.find(({ name }) => name === "length")?.type, "integer", command);
  }
});

test("validation enforces types and cross-field rules", () => {
  const subscriptions = functions.find(({ mcp }) => mcp === "get_subscription_group_status");
  const update = functions.find(({ mcp }) => mcp === "update_content_block");
  const createBlock = functions.find(({ mcp }) => mcp === "create_content_block");
  const createEmail = functions.find(({ mcp }) => mcp === "create_email_template");
  const media = functions.find(({ mcp }) => mcp === "create_media_library_asset");
  assert.ok(subscriptions && update && createBlock && createEmail && media);
  assert.deepEqual(validateInput(subscriptions, { subscription_group_id: "group", email: "a@example.com" }), { subscription_group_id: "group", email: ["a@example.com"] });
  assert.deepEqual(validateInput(subscriptions, { subscription_group_id: "group", external_id: "user", email: "a@example.com" }).external_id, ["user"]);
  assert.throws(() => validateInput(subscriptions, { subscription_group_id: "group", email: "a@example.com", phone: "+1" }), /Do not combine/u);
  assert.throws(() => validateInput(update, { content_block_id: "block" }), /at least one/u);
  assert.throws(() => validateInput(media, { asset_url: "https://asset", asset_file: "file" }), /exactly one/u);
  assert.throws(() => validateInput(update, { content_block_id: "block", state: "invalid" }), /Invalid or missing input/u);
  assert.throws(() => validateInput(createBlock, { name: "block", content: "body", state: "invalid" }), /Invalid or missing input/u);
  assert.deepEqual(validateInput(createEmail, { template_name: "email", subject: "subject", body: "body", tags: ["one", "two"] }).tags, ["one", "two"]);
});

test("opt-in and opt-out inputs are validated before writes", () => {
  const update = functions.find(({ mcp }) => mcp === "update_subscription_group_status");
  const updateV2 = functions.find(({ mcp }) => mcp === "update_subscription_group_status_v2");
  const track = functions.find(({ mcp }) => mcp === "track_users");
  const send = functions.find(({ mcp }) => mcp === "send_messages");
  const invalidPhones = functions.find(({ mcp }) => mcp === "get_invalid_phone_numbers");
  assert.ok(update && updateV2 && track && send && invalidPhones);
  assert.deepEqual(validateInput(update, { subscription_group_id: "group", subscription_state: "subscribed", phone: "+15555550123", use_double_opt_in_logic: true }).phone, ["+15555550123"]);
  assert.throws(() => validateInput(update, { subscription_group_id: "group", subscription_state: "subscribed", email: "a@example.com", phone: "+15555550123" }), /Do not combine/u);
  assert.throws(() => validateInput(updateV2, { subscription_groups: [{ subscription_group_id: "group", subscription_state: "unknown", phones: ["+15555550123"] }] }), /Invalid subscription group/u);
  assert.throws(() => validateInput(updateV2, { subscription_groups: [{ subscription_group_id: "group", subscription_state: "subscribed", emails: ["a@example.com"], phones: ["+15555550123"] }] }), /exactly one/u);
  assert.throws(() => validateInput(track, { attributes: [{ external_id: "user", email_subscribe: "invalid" }] }), /Invalid consent state/u);
  assert.throws(() => validateInput(track, { attributes: [{ external_id: "user", subscription_groups: [{ subscription_group_id: "group", subscription_state: "invalid" }] }] }), /Invalid subscription group/u);
  assert.throws(() => validateInput(track, { attributes: Array.from({ length: 75 }, () => ({})), events: [{}] }), /at most 75/u);
  assert.throws(() => validateInput(send, { broadcast: true }), /at least one/u);
  assert.throws(() => validateInput(send, { external_user_ids: ["user"], recipient_subscription_state: "invalid" }), /Invalid or missing input/u);
  assert.throws(() => validateInput(invalidPhones, {}), /phone_numbers or both/u);
  assert.deepEqual(validateInput(invalidPhones, { phone_numbers: "+15555550123" }).phone_numbers, ["+15555550123"]);
});
