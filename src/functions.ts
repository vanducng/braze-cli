import { functionDocumentation } from "./function-docs.ts";

export type Access = "read" | "write" | "local";
export type ParameterType = "string" | "integer" | "positive" | "boolean" | "string[]" | "object" | "object[]" | "file";

export type Parameter = {
  name: string;
  type: ParameterType;
  required?: boolean;
  flag?: string;
  choices?: string[];
  maxItems?: number;
};

export type FunctionDefinition = {
  command: string[];
  mcp: string;
  permission: string;
  access: Access;
  description: string;
  documentation: string;
  exampleInput?: Record<string, unknown>;
  method?: "GET" | "POST";
  path?: string;
  parameters: Parameter[];
  exactlyOne?: string[][];
  atLeastOne?: string[][];
  notTogether?: string[][];
};

type UndocumentedFunction = Omit<FunctionDefinition, "description" | "documentation" | "exampleInput">;

const s = (name: string, required = false, flag?: string): Parameter => ({ name, type: "string", required, flag });
const i = (name: string, required = false): Parameter => ({ name, type: "integer", required });
const n = (name: string): Parameter => ({ name, type: "positive" });
const b = (name: string): Parameter => ({ name, type: "boolean" });
const a = (name: string, required = false, maxItems?: number): Parameter => ({ name, type: "string[]", required, maxItems });
const o = (name: string, required = false): Parameter => ({ name, type: "object", required });
const oa = (name: string, required = false, maxItems?: number): Parameter => ({ name, type: "object[]", required, maxItems });
const documented = (definition: UndocumentedFunction): FunctionDefinition => {
  const documentation = functionDocumentation[definition.mcp as keyof typeof functionDocumentation];
  if (!documentation) throw new Error(`Missing documentation for ${definition.mcp}.`);
  return { ...definition, ...documentation };
};
const read = (
  command: string,
  mcp: string,
  permission: string,
  path: string,
  parameters: Parameter[] = [],
  rules: Pick<FunctionDefinition, "exactlyOne" | "atLeastOne" | "notTogether"> = {},
): FunctionDefinition => documented({ command: command.split(" "), mcp, permission, access: "read", method: "GET", path, parameters, ...rules });
const write = (
  command: string,
  mcp: string,
  permission: string,
  path: string,
  parameters: Parameter[],
  rules: Pick<FunctionDefinition, "exactlyOne" | "atLeastOne" | "notTogether"> = {},
): FunctionDefinition => documented({ command: command.split(" "), mcp, permission, access: "write", method: "POST", path, parameters, ...rules });

const listParams = [i("page"), b("include_archived"), s("sort_direction"), s("last_edit.time[gt]", false, "last-edit-time-gt")];
const rangeParams = [i("length", true), s("ending_at"), s("app_id")];
const emailFields = [s("template_name"), s("subject"), s("body"), s("plaintext_body"), s("preheader"), a("tags"), b("should_inline_css")];
const blockState = { ...s("state"), choices: ["active", "draft"] };
const blockFields = [s("name"), s("content"), s("description"), blockState, a("tags")];

export const functions: FunctionDefinition[] = [
  documented({ command: ["login"], mcp: "login", permission: "local", access: "local", parameters: [] }),
  documented({ command: ["workspace", "list"], mcp: "get_workspaces", permission: "local", access: "local", parameters: [] }),
  read("campaign list", "get_campaign_list", "campaigns.list", "/campaigns/list", listParams),
  read("campaign get", "get_campaign_details", "campaigns.details", "/campaigns/details", [s("campaign_id", true), b("post_launch_draft_version"), b("include_has_translatable_content")]),
  read("campaign data-series", "get_campaign_dataseries", "campaigns.data_series", "/campaigns/data_series", [s("campaign_id", true), i("length", true), s("ending_at")]),
  read("canvas list", "get_canvas_list", "canvas.list", "/canvas/list", listParams),
  read("canvas get", "get_canvas_details", "canvas.details", "/canvas/details", [s("canvas_id", true), b("post_launch_draft_version"), b("include_has_translatable_content")]),
  read("canvas data-series", "get_canvas_data_series", "canvas.data_series", "/canvas/data_series", [s("canvas_id", true), s("ending_at", true), s("starting_at"), i("length"), b("include_variant_breakdown"), b("include_step_breakdown"), b("include_deleted_step_data")], { atLeastOne: [["starting_at", "length"]] }),
  read("canvas data-summary", "get_canvas_data_summary", "canvas.data_summary", "/canvas/data_summary", [s("canvas_id", true), s("ending_at", true), s("starting_at"), i("length"), b("include_variant_breakdown"), b("include_step_breakdown"), b("include_deleted_step_data")], { atLeastOne: [["starting_at", "length"]] }),
  read("catalog list", "get_catalogs", "catalogs.get", "/catalogs"),
  read("catalog items", "get_catalog_items", "catalogs.get_items", "/catalogs/{catalog_name}/items", [s("catalog_name", true), s("cursor")]),
  read("catalog item", "get_catalog_item", "catalogs.get_item", "/catalogs/{catalog_name}/items/{item_id}", [s("catalog_name", true), s("item_id", true)]),
  read("custom-attribute list", "get_custom_attributes", "custom_attributes.get", "/custom_attributes", [s("cursor")]),
  read("event export", "get_events", "events.get", "/events", [s("cursor")]),
  read("event list", "get_events_list", "events.list", "/events/list", [i("page")]),
  read("event data-series", "get_events_data_series", "events.data_series", "/events/data_series", [s("event", true), ...rangeParams, s("unit"), s("segment_id")]),
  read("cdi integration list", "list_integrations", "cdi.integration_list", "/cdi/integrations", [s("cursor")]),
  read("cdi integration sync-status", "get_integration_job_sync_status", "cdi.integration_job_status", "/cdi/integrations/{integration_id}/job_sync_status", [s("integration_id", true), s("cursor")]),
  read("kpi dau", "get_dau_data_series", "kpi.dau.data_series", "/kpi/dau/data_series", rangeParams),
  read("kpi mau", "get_mau_data_series", "kpi.mau.data_series", "/kpi/mau/data_series", rangeParams),
  read("kpi new-users", "get_new_users_data_series", "kpi.new_users.data_series", "/kpi/new_users/data_series", rangeParams),
  read("kpi uninstalls", "get_uninstalls_data_series", "kpi.uninstalls.data_series", "/kpi/uninstalls/data_series", rangeParams),
  write("media-library create", "create_media_library_asset", "media_library.create", "/media_library/create", [s("asset_url"), { name: "asset_file", type: "file" }, s("name")], { exactlyOne: [["asset_url", "asset_file"]] }),
  read("message scheduled-broadcasts", "get_scheduled_broadcasts", "messages.schedule_broadcasts", "/messages/scheduled_broadcasts", [s("end_time", true)]),
  write("message schedule delete", "delete_scheduled_messages", "messages.schedule.delete", "/messages/schedule/delete", [s("schedule_id", true)]),
  write("message schedule campaign delete", "delete_scheduled_campaign_messages", "campaigns.trigger.schedule.delete", "/campaigns/trigger/schedule/delete", [s("campaign_id", true), s("schedule_id", true)]),
  write("message schedule canvas delete", "delete_scheduled_canvas_messages", "canvas.trigger.schedule.delete", "/canvas/trigger/schedule/delete", [s("canvas_id", true), s("schedule_id", true)]),
  write("message schedule create", "create_scheduled_messages", "messages.schedule.create", "/messages/schedule/create", [b("broadcast"), a("external_user_ids", false, 50), oa("user_aliases", false, 50), s("segment_id"), o("audience"), s("campaign_id"), s("send_id"), b("override_messaging_limits"), { ...s("recipient_subscription_state"), choices: ["opted_in", "subscribed", "all"] }, o("schedule", true), o("messages")], { atLeastOne: [["external_user_ids", "user_aliases", "segment_id", "audience"]], notTogether: [["broadcast", "external_user_ids"], ["broadcast", "user_aliases"]] }),
  write("message schedule campaign create", "schedule_triggered_campaigns", "campaigns.trigger.schedule.create", "/campaigns/trigger/schedule/create", [s("campaign_id", true), s("send_id"), oa("recipients", false, 50), o("audience"), b("broadcast"), o("trigger_properties"), o("schedule", true)], { atLeastOne: [["recipients", "audience", "broadcast"]], notTogether: [["broadcast", "recipients"]] }),
  write("message schedule canvas create", "schedule_triggered_canvases", "canvas.trigger.schedule.create", "/canvas/trigger/schedule/create", [s("canvas_id", true), oa("recipients", false, 50), o("audience"), b("broadcast"), o("context"), o("schedule", true)], { atLeastOne: [["recipients", "audience", "broadcast"]], notTogether: [["broadcast", "recipients"]] }),
  write("message schedule update", "update_scheduled_messages", "messages.schedule.update", "/messages/schedule/update", [s("schedule_id", true), o("schedule"), o("messages")], { atLeastOne: [["schedule", "messages"]] }),
  write("message schedule campaign update", "update_scheduled_triggered_campaigns", "campaigns.trigger.schedule.update", "/campaigns/trigger/schedule/update", [s("campaign_id", true), s("schedule_id", true), o("schedule", true)]),
  write("message schedule canvas update", "update_scheduled_triggered_canvases", "canvas.trigger.schedule.update", "/canvas/trigger/schedule/update", [s("canvas_id", true), s("schedule_id", true), o("schedule", true)]),
  write("message send-id create", "create_send_id", "sends.id.create", "/sends/id/create", [s("campaign_id", true), s("send_id")]),
  write("message send immediate", "send_messages", "messages.send", "/messages/send", [b("broadcast"), a("external_user_ids", false, 50), oa("user_aliases", false, 50), s("segment_id"), o("audience"), s("campaign_id"), s("send_id"), b("override_frequency_capping"), { ...s("recipient_subscription_state"), choices: ["opted_in", "subscribed", "all"] }, o("messages")], { atLeastOne: [["external_user_ids", "user_aliases", "segment_id", "audience"]], notTogether: [["broadcast", "external_user_ids"], ["broadcast", "user_aliases"]] }),
  write("message send campaign", "send_triggered_campaigns", "campaigns.trigger.send", "/campaigns/trigger/send", [s("campaign_id", true), s("send_id"), o("trigger_properties"), b("broadcast"), o("audience"), oa("recipients", false, 50), oa("attachments")], { atLeastOne: [["broadcast", "audience", "recipients"]], notTogether: [["broadcast", "recipients"], ["broadcast", "attachments"]] }),
  write("message send canvas", "send_triggered_canvases", "canvas.trigger.send", "/canvas/trigger/send", [s("canvas_id", true), o("context"), b("broadcast"), o("audience"), oa("recipients", false, 50)], { atLeastOne: [["broadcast", "audience", "recipients"]], notTogether: [["broadcast", "recipients"]] }),
  write("message duplicate campaign", "duplicate_campaign", "campaigns.duplicate", "/campaigns/duplicate", [s("campaign_id", true), s("name", true), s("description"), s("tag_names")]),
  write("message duplicate canvas", "duplicate_canvas", "canvas.duplicate", "/canvas/duplicate", [s("canvas_id", true), s("name", true), s("description"), a("tag_names")]),
  write("message live-activity update", "update_live_activity", "messages.live_activity.update", "/messages/live_activity/update", [s("app_id", true), s("activity_id", true), o("content_state", true), b("end_activity"), s("dismissal_date"), s("stale_date"), o("notification")]),
  read("purchase products", "get_product_list", "purchases.product_list", "/purchases/product_list", [s("page")]),
  read("purchase quantity-series", "get_quantity_series", "purchases.quantity_series", "/purchases/quantity_series", [...rangeParams, s("unit"), s("product")]),
  read("purchase revenue-series", "get_revenue_series", "purchases.revenue_series", "/purchases/revenue_series", [...rangeParams, s("unit"), s("product")]),
  read("sdk-authentication keys", "get_sdk_authentication_keys", "sdk_authentication.keys", "/app_group/sdk_authentication/keys", [s("app_id", true)]),
  read("segment list", "get_segment_list", "segments.list", "/segments/list", [i("page"), s("sort_direction")]),
  read("segment get", "get_segment_details", "segments.details", "/segments/details", [s("segment_id", true)]),
  read("segment data-series", "get_segment_data_series", "segments.data_series", "/segments/data_series", [s("segment_id", true), i("length", true), s("ending_at")]),
  read("send data-series", "get_send_data_series", "sends.data_series", "/sends/data_series", [s("campaign_id", true), s("send_id", true), i("length", true), s("ending_at")]),
  read("session data-series", "get_session_data_series", "sessions.data_series", "/sessions/data_series", [...rangeParams, s("unit"), s("segment_id")]),
  read("sms invalid-phone list", "get_invalid_phone_numbers", "sms.invalid_phone_numbers", "/sms/invalid_phone_numbers", [s("start_date"), s("end_date"), i("limit"), i("offset"), a("phone_numbers", false, 50), { ...s("reason"), choices: ["provider_error", "deactivated"] }]),
  write("sms invalid-phone remove", "remove_invalid_phone_numbers", "sms.invalid_phone_numbers.remove", "/sms/invalid_phone_numbers/remove", [a("phone_numbers", true, 50)]),
  read("subscription group-status", "get_subscription_group_status", "subscription.status.get", "/subscription/status/get", [s("subscription_group_id", true), a("external_id", false, 50), a("email", false, 50), a("phone", false, 50)], { atLeastOne: [["external_id", "email", "phone"]], notTogether: [["email", "phone"]] }),
  read("subscription user-groups", "get_user_subscription_groups", "subscription.groups.get", "/subscription/user/status", [a("external_id", false, 50), a("email", false, 50), a("phone", false, 50), i("limit"), i("offset")], { atLeastOne: [["external_id", "email", "phone"]], notTogether: [["email", "phone"]] }),
  write("subscription update", "update_subscription_group_status", "subscription.status.set", "/subscription/status/set", [s("subscription_group_id", true), { ...s("subscription_state", true), choices: ["subscribed", "unsubscribed"] }, a("external_id", false, 50), a("email", false, 50), a("phone", false, 50), b("use_double_opt_in_logic")], { atLeastOne: [["external_id", "email", "phone"]], notTogether: [["email", "phone"]] }),
  write("subscription update-v2", "update_subscription_group_status_v2", "subscription.status.set", "/v2/subscription/status/set", [oa("subscription_groups", true)]),
  write("user alias create", "create_user_alias", "users.alias.new", "/users/alias/new", [oa("user_aliases", true, 50)]),
  write("user alias update", "update_user_alias", "users.alias.update", "/users/alias/update", [oa("alias_updates", true, 50)]),
  write("user delete", "delete_users", "users.delete", "/users/delete", [a("external_ids", false, 50), oa("user_aliases", false, 50), a("braze_ids", false, 50), a("email_addresses", false, 50), a("phone_numbers", false, 50)], { exactlyOne: [["external_ids", "user_aliases", "braze_ids", "email_addresses", "phone_numbers"]] }),
  write("user identify", "identify_users", "users.identify", "/users/identify", [oa("aliases_to_identify", false, 50), oa("emails_to_identify", false, 50), oa("phone_numbers_to_identify", false, 50)], { atLeastOne: [["aliases_to_identify", "emails_to_identify", "phone_numbers_to_identify"]] }),
  write("user track", "track_users", "users.track", "/users/track", [oa("attributes", false, 75), oa("events", false, 75), oa("purchases", false, 75)], { atLeastOne: [["attributes", "events", "purchases"]] }),
  write("user track-sync", "track_users_sync", "users.track.sync", "/users/track/sync", [oa("attributes", false, 1), oa("events", false, 1), oa("purchases", false, 1)], { atLeastOne: [["attributes", "events", "purchases"]] }),
  write("user merge", "merge_users", "users.merge", "/users/merge", [oa("merge_updates", true, 50)]),
  write("user external-id rename", "rename_external_ids", "users.external_ids.rename", "/users/external_ids/rename", [oa("external_id_renames", true, 50)]),
  write("user external-id remove", "remove_external_ids", "users.external_ids.remove", "/users/external_ids/remove", [a("external_ids", true, 50)]),
  read("template email list", "get_email_templates", "templates.email.list", "/templates/email/list", [s("modified_after"), s("modified_before"), n("limit"), n("offset")]),
  read("template email get", "get_email_template_info", "templates.email.info", "/templates/email/info", [s("email_template_id", true)]),
  write("template email create", "create_email_template", "templates.email.create", "/templates/email/create", [s("template_name", true), s("subject", true), s("body", true), s("plaintext_body"), s("preheader"), a("tags"), b("should_inline_css")]),
  write("template email update", "update_email_template", "templates.email.update", "/templates/email/update", [s("email_template_id", true), ...emailFields], { atLeastOne: [emailFields.map(({ name }) => name)] }),
  read("content-block list", "get_content_blocks", "content_blocks.list", "/content_blocks/list", [s("modified_after"), s("modified_before"), n("limit"), n("offset")]),
  read("content-block get", "get_content_block_info", "content_blocks.info", "/content_blocks/info", [s("content_block_id", true), b("include_inclusion_data")]),
  write("content-block create", "create_content_block", "content_blocks.create", "/content_blocks/create", [s("name", true), s("content", true), s("description"), blockState, a("tags")]),
  write("content-block update", "update_content_block", "content_blocks.update", "/content_blocks/update", [s("content_block_id", true), ...blockFields], { atLeastOne: [blockFields.map(({ name }) => name)] }),
];

export function commandPath(definition: FunctionDefinition): string {
  return definition.command.join(" ");
}

export function flagName(parameter: Parameter): string {
  return parameter.flag ?? parameter.name.replaceAll("_", "-").replace(/[.\[\]]+/gu, "-").replace(/-+$/u, "");
}
