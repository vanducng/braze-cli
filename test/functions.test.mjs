import assert from "node:assert/strict";
import test from "node:test";
import { commandPath, functions } from "../lib/functions.js";
import { validateInput } from "../lib/cli.js";

const expected = `
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
purchase products
purchase quantity-series
purchase revenue-series
sdk-authentication keys
segment list
segment get
segment data-series
send data-series
session data-series
subscription group-status
subscription user-groups
template email list
template email get
template email create
template email update
content-block list
content-block get
content-block create
content-block update
`.trim().split("\n");

test("catalog exactly matches the approved 42-command contract", () => {
  assert.deepEqual(functions.map(commandPath), expected);
  assert.equal(new Set(functions.map(({ mcp }) => mcp)).size, 42);
  assert.equal(functions.filter(({ access }) => access === "write").length, 5);
  assert.equal(functions.filter(({ method }) => method).length, 41);
});

test("every path placeholder has a required parameter", () => {
  for (const definition of functions) {
    for (const name of definition.path?.matchAll(/\{([^}]+)\}/gu) ?? []) {
      assert.equal(definition.parameters.find((parameter) => parameter.name === name[1])?.required, true, `${commandPath(definition)}: ${name[1]}`);
    }
  }
});

test("validation enforces types and cross-field rules", () => {
  const subscriptions = functions.find(({ mcp }) => mcp === "get_subscription_group_status");
  const update = functions.find(({ mcp }) => mcp === "update_content_block");
  const createBlock = functions.find(({ mcp }) => mcp === "create_content_block");
  const createEmail = functions.find(({ mcp }) => mcp === "create_email_template");
  const media = functions.find(({ mcp }) => mcp === "create_media_library_asset");
  assert.ok(subscriptions && update && createBlock && createEmail && media);
  assert.deepEqual(validateInput(subscriptions, { subscription_group_id: "group", email: "a@example.com" }), { subscription_group_id: "group", email: "a@example.com" });
  assert.throws(() => validateInput(subscriptions, { subscription_group_id: "group", email: "a@example.com", phone: "+1" }), /exactly one/u);
  assert.throws(() => validateInput(update, { content_block_id: "block" }), /at least one/u);
  assert.throws(() => validateInput(media, { asset_url: "https://asset", asset_file: "file" }), /exactly one/u);
  assert.throws(() => validateInput(update, { content_block_id: "block", state: "invalid" }), /Invalid or missing input/u);
  assert.throws(() => validateInput(createBlock, { name: "block", content: "body", state: "invalid" }), /Invalid or missing input/u);
  assert.deepEqual(validateInput(createEmail, { template_name: "email", subject: "subject", body: "body", tags: ["one", "two"] }).tags, ["one", "two"]);
});
