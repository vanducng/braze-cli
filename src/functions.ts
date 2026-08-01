export type Access = "read" | "write" | "local";
export type ParameterType = "string" | "integer" | "positive" | "boolean" | "string[]" | "file";

export type Parameter = {
  name: string;
  type: ParameterType;
  required?: boolean;
  flag?: string;
  choices?: string[];
};

export type FunctionDefinition = {
  command: string[];
  mcp: string;
  permission: string;
  access: Access;
  method?: "GET" | "POST";
  path?: string;
  parameters: Parameter[];
  exactlyOne?: string[][];
  atLeastOne?: string[][];
};

const s = (name: string, required = false, flag?: string): Parameter => ({ name, type: "string", required, flag });
const i = (name: string, required = false): Parameter => ({ name, type: "integer", required });
const n = (name: string): Parameter => ({ name, type: "positive" });
const b = (name: string): Parameter => ({ name, type: "boolean" });
const a = (name: string): Parameter => ({ name, type: "string[]" });
const read = (
  command: string,
  mcp: string,
  permission: string,
  path: string,
  parameters: Parameter[] = [],
  rules: Pick<FunctionDefinition, "exactlyOne" | "atLeastOne"> = {},
): FunctionDefinition => ({ command: command.split(" "), mcp, permission, access: "read", method: "GET", path, parameters, ...rules });
const write = (
  command: string,
  mcp: string,
  permission: string,
  path: string,
  parameters: Parameter[],
  rules: Pick<FunctionDefinition, "exactlyOne" | "atLeastOne"> = {},
): FunctionDefinition => ({ command: command.split(" "), mcp, permission, access: "write", method: "POST", path, parameters, ...rules });

const listParams = [i("page"), b("include_archived"), s("sort_direction"), s("last_edit.time[gt]", false, "last-edit-time-gt")];
const rangeParams = [i("length", true), s("ending_at"), s("app_id")];
const emailFields = [s("template_name"), s("subject"), s("body"), s("plaintext_body"), s("preheader"), a("tags"), b("should_inline_css")];
const blockState = { ...s("state"), choices: ["active", "draft"] };
const blockFields = [s("name"), s("content"), s("description"), blockState, a("tags")];

export const functions: FunctionDefinition[] = [
  { command: ["workspace", "list"], mcp: "get_workspaces", permission: "local", access: "local", parameters: [] },
  read("campaign list", "get_campaign_list", "campaigns.list", "/campaigns/list", listParams),
  read("campaign get", "get_campaign_details", "campaigns.details", "/campaigns/details", [s("campaign_id", true), b("post_launch_draft_version"), b("include_has_translatable_content")]),
  read("campaign data-series", "get_campaign_dataseries", "campaigns.data_series", "/campaigns/data_series", [s("campaign_id", true), i("length", true), s("ending_at")]),
  read("canvas list", "get_canvas_list", "canvas.list", "/canvas/list", listParams),
  read("canvas get", "get_canvas_details", "canvas.details", "/canvas/details", [s("canvas_id", true), b("post_launch_draft_version"), b("include_has_translatable_content")]),
  read("canvas data-series", "get_canvas_data_series", "canvas.data_series", "/canvas/data_series", [s("canvas_id", true), s("ending_at", true), s("starting_at"), s("length"), b("include_variant_breakdown"), b("include_step_breakdown"), b("include_deleted_step_data")], { atLeastOne: [["starting_at", "length"]] }),
  read("canvas data-summary", "get_canvas_data_summary", "canvas.data_summary", "/canvas/data_summary", [s("canvas_id", true), s("ending_at", true), s("starting_at"), s("length"), b("include_variant_breakdown"), b("include_step_breakdown"), b("include_deleted_step_data")], { atLeastOne: [["starting_at", "length"]] }),
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
  read("purchase products", "get_product_list", "purchases.product_list", "/purchases/product_list", [s("page")]),
  read("purchase quantity-series", "get_quantity_series", "purchases.quantity_series", "/purchases/quantity_series", [...rangeParams, s("unit"), s("product")]),
  read("purchase revenue-series", "get_revenue_series", "purchases.revenue_series", "/purchases/revenue_series", [...rangeParams, s("unit"), s("product")]),
  read("sdk-authentication keys", "get_sdk_authentication_keys", "sdk_authentication.keys", "/app_group/sdk_authentication/keys", [s("app_id", true)]),
  read("segment list", "get_segment_list", "segments.list", "/segments/list", [i("page"), s("sort_direction")]),
  read("segment get", "get_segment_details", "segments.details", "/segments/details", [s("segment_id", true)]),
  read("segment data-series", "get_segment_data_series", "segments.data_series", "/segments/data_series", [s("segment_id", true), i("length", true), s("ending_at")]),
  read("send data-series", "get_send_data_series", "sends.data_series", "/sends/data_series", [s("campaign_id", true), s("send_id", true), i("length", true), s("ending_at")]),
  read("session data-series", "get_session_data_series", "sessions.data_series", "/sessions/data_series", [...rangeParams, s("unit"), s("segment_id")]),
  read("subscription group-status", "get_subscription_group_status", "subscription.status.get", "/subscription/status/get", [s("subscription_group_id", true), s("external_id"), s("email"), s("phone")], { exactlyOne: [["external_id", "email", "phone"]] }),
  read("subscription user-groups", "get_user_subscription_groups", "subscription.groups.get", "/subscription/user/status", [s("external_id"), s("email"), s("phone"), i("limit"), i("offset")], { exactlyOne: [["external_id", "email", "phone"]] }),
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
