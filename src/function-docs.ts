export type FunctionDocumentation = {
  description: string;
  documentation: string;
  exampleInput?: Record<string, unknown>;
};

const api = "https://www.braze.com/docs/api/endpoints";
const packageDocs = "https://github.com/vanducng/braze-cli";

export const functionDocumentation = {
  login: {
    description: "Interactively save a Braze REST endpoint, API key, and optional App ID so commands work from any directory.",
    documentation: `${packageDocs}#configure`,
  },
  get_workspaces: {
    description: "Report whether the REST endpoint, optional app ID, and API key are configured without printing the API key or contacting Braze.",
    documentation: `${packageDocs}#configure`,
  },
  get_campaign_list: {
    description: "List campaigns in pages of 100 with identifiers, names, tags, API-campaign status, and optional archive filtering. Use returned IDs with campaign detail and analytics commands.",
    documentation: `${api}/export/campaigns/get_campaigns`,
    exampleInput: { page: 0, include_archived: false, sort_direction: "desc" },
  },
  get_campaign_details: {
    description: "Retrieve configuration and message metadata for one campaign, including status, schedule, channels, tags, and conversion behaviors.",
    documentation: `${api}/export/campaigns/get_campaign_details`,
    exampleInput: { campaign_id: "<campaign-id>" },
  },
  get_campaign_dataseries: {
    description: "Retrieve daily delivery, engagement, conversion, and revenue metrics for one campaign over a bounded date range.",
    documentation: `${api}/export/campaigns/get_campaign_analytics`,
    exampleInput: { campaign_id: "<campaign-id>", length: 7 },
  },
  get_canvas_list: {
    description: "List Canvases in pages of 100 with identifiers, names, tags, and optional archive filtering. Use returned IDs with Canvas detail and analytics commands.",
    documentation: `${api}/export/canvas/get_canvases`,
    exampleInput: { page: 0, include_archived: false, sort_direction: "desc" },
  },
  get_canvas_details: {
    description: "Retrieve configuration, steps, variants, schedule, tags, and status metadata for one Canvas.",
    documentation: `${api}/export/canvas/get_canvas_details`,
    exampleInput: { canvas_id: "<canvas-id>" },
  },
  get_canvas_data_series: {
    description: "Retrieve time-series Canvas performance metrics with optional variant, step, and deleted-step breakdowns.",
    documentation: `${api}/export/canvas/get_canvas_analytics`,
    exampleInput: { canvas_id: "<canvas-id>", ending_at: "2026-08-01T00:00:00Z", length: 7 },
  },
  get_canvas_data_summary: {
    description: "Retrieve aggregate Canvas performance over a bounded range with optional variant, step, and deleted-step breakdowns.",
    documentation: `${api}/export/canvas/get_canvas_analytics_summary`,
    exampleInput: { canvas_id: "<canvas-id>", ending_at: "2026-08-01T00:00:00Z", length: 7 },
  },
  get_catalogs: {
    description: "List all catalogs available in the workspace. Use a returned catalog name to query its items.",
    documentation: `${api}/catalogs/catalog_management/synchronous/get_list_catalogs`,
    exampleInput: {},
  },
  get_catalog_items: {
    description: "List item values from one catalog with cursor-based pagination. This returns item content as stored in the selected catalog.",
    documentation: `${api}/catalogs/catalog_items/synchronous/get_catalog_items_details_bulk`,
    exampleInput: { catalog_name: "products" },
  },
  get_catalog_item: {
    description: "Retrieve one catalog item and its complete stored content by catalog name and item identifier.",
    documentation: `${api}/catalogs/catalog_items/synchronous/get_catalog_item_details`,
    exampleInput: { catalog_name: "products", item_id: "sku-123" },
  },
  get_custom_attributes: {
    description: "Export custom-attribute definitions in alphabetical pages, including names, data types, status, descriptions, and tags.",
    documentation: `${api}/export/custom_attributes/get_custom_attributes`,
    exampleInput: {},
  },
  get_events: {
    description: "Export detailed custom-event definitions in cursor-based pages, including status, descriptions, analytics inclusion, and tags.",
    documentation: `${api}/export/custom_events/get_custom_events_data`,
    exampleInput: {},
  },
  get_events_list: {
    description: "List custom-event names in alphabetical pages. Use a returned name with the event analytics command.",
    documentation: `${api}/export/custom_events/get_custom_events`,
    exampleInput: { page: 0 },
  },
  get_events_data_series: {
    description: "Retrieve occurrence counts for one custom event by day or hour, optionally limited to an app and analytics-enabled segment.",
    documentation: `${api}/export/custom_events/get_custom_events_analytics`,
    exampleInput: { event: "purchase_completed", length: 7, unit: "day" },
  },
  list_integrations: {
    description: "List Cloud Data Ingestion integrations and their identifiers with cursor-based pagination.",
    documentation: `${api}/cdi/get_integration_list`,
    exampleInput: {},
  },
  get_integration_job_sync_status: {
    description: "Retrieve recent synchronization job states for one Cloud Data Ingestion integration.",
    documentation: `${api}/cdi/get_job_sync_status`,
    exampleInput: { integration_id: "<integration-id>" },
  },
  get_dau_data_series: {
    description: "Retrieve daily unique active-user counts for the workspace or configured app over a bounded range.",
    documentation: `${api}/export/kpi/get_kpi_dau_date`,
    exampleInput: { length: 7 },
  },
  get_mau_data_series: {
    description: "Retrieve rolling 30-day monthly active-user counts for the workspace or configured app over a bounded range.",
    documentation: `${api}/export/kpi/get_kpi_mau_30_days`,
    exampleInput: { length: 7 },
  },
  get_new_users_data_series: {
    description: "Retrieve daily new-user counts for the workspace or configured app over a bounded range.",
    documentation: `${api}/export/kpi/get_kpi_daily_new_users_date`,
    exampleInput: { length: 7 },
  },
  get_uninstalls_data_series: {
    description: "Retrieve daily app-uninstall counts for the workspace or configured app over a bounded range.",
    documentation: `${api}/export/kpi/get_kpi_uninstalls_date`,
    exampleInput: { length: 7 },
  },
  create_media_library_asset: {
    description: "Upload a media-library asset from one public URL or one local file. The request must provide exactly one source.",
    documentation: `${api}/media_library/manage_assets/create`,
    exampleInput: { asset_url: "https://example.com/banner.png", name: "banner.png" },
  },
  get_scheduled_broadcasts: {
    description: "List campaigns and Canvases scheduled between now and the requested end time, including each next send time and schedule type.",
    documentation: `${api}/messaging/schedule_messages/get_messages_scheduled`,
    exampleInput: { end_time: "2026-08-08T00:00:00Z" },
  },
  delete_scheduled_messages: {
    description: "Cancel one message created by the API-only scheduling endpoint before Braze sends it.",
    documentation: `${api}/messaging/schedule_messages/post_delete_scheduled_messages`,
    exampleInput: { schedule_id: "<schedule-id>" },
  },
  delete_scheduled_campaign_messages: {
    description: "Cancel one scheduled API-triggered campaign dispatch. Last-second cancellation is best effort after delivery processing begins.",
    documentation: `${api}/messaging/schedule_messages/post_delete_scheduled_triggered_messages`,
    exampleInput: { campaign_id: "<campaign-id>", schedule_id: "<schedule-id>" },
  },
  delete_scheduled_canvas_messages: {
    description: "Cancel one scheduled API-triggered Canvas dispatch. Last-second cancellation is best effort after delivery processing begins.",
    documentation: `${api}/messaging/schedule_messages/post_delete_scheduled_triggered_canvases`,
    exampleInput: { canvas_id: "<canvas-id>", schedule_id: "<schedule-id>" },
  },
  create_scheduled_messages: {
    description: "Schedule an API-defined message for specific users, aliases, a segment, or a connected audience and return a schedule identifier for later changes.",
    documentation: `${api}/messaging/schedule_messages/post_schedule_messages`,
    exampleInput: { external_user_ids: ["<external-id>"], recipient_subscription_state: "subscribed", schedule: { time: "2026-08-02T12:00:00Z" }, messages: { email: { app_id: "<app-id>", from: "sender@example.com", subject: "Example subject", body: "<p>Example body</p>" } } },
  },
  schedule_triggered_campaigns: {
    description: "Schedule an existing API-triggered campaign for explicit recipients, a connected audience, or its configured audience.",
    documentation: `${api}/messaging/schedule_messages/post_schedule_triggered_campaigns`,
    exampleInput: { campaign_id: "<campaign-id>", recipients: [{ external_user_id: "<external-id>" }], schedule: { time: "2026-08-02T12:00:00Z" } },
  },
  schedule_triggered_canvases: {
    description: "Schedule an existing API-triggered Canvas for explicit recipients, a connected audience, or its configured audience.",
    documentation: `${api}/messaging/schedule_messages/post_schedule_triggered_canvases`,
    exampleInput: { canvas_id: "<canvas-id>", recipients: [{ external_user_id: "<external-id>" }], schedule: { time: "2026-08-02T12:00:00Z" } },
  },
  update_scheduled_messages: {
    description: "Change the delivery schedule or message payload for a previously scheduled API-only message.",
    documentation: `${api}/messaging/schedule_messages/post_update_scheduled_messages`,
    exampleInput: { schedule_id: "<schedule-id>", schedule: { time: "2026-08-03T12:00:00Z" } },
  },
  update_scheduled_triggered_campaigns: {
    description: "Change the delivery time for one previously scheduled API-triggered campaign dispatch.",
    documentation: `${api}/messaging/schedule_messages/post_update_scheduled_triggered_campaigns`,
    exampleInput: { campaign_id: "<campaign-id>", schedule_id: "<schedule-id>", schedule: { time: "2026-08-03T12:00:00Z" } },
  },
  update_scheduled_triggered_canvases: {
    description: "Change the delivery time for one previously scheduled API-triggered Canvas dispatch.",
    documentation: `${api}/messaging/schedule_messages/post_update_scheduled_triggered_canvases`,
    exampleInput: { canvas_id: "<canvas-id>", schedule_id: "<schedule-id>", schedule: { time: "2026-08-03T12:00:00Z" } },
  },
  create_send_id: {
    description: "Create or reserve a send identifier for an API campaign so subsequent send-level analytics can be queried independently.",
    documentation: `${api}/messaging/send_messages/post_create_send_ids`,
    exampleInput: { campaign_id: "<campaign-id>", send_id: "example-send-20260801" },
  },
  send_messages: {
    description: "Send an API-defined message immediately to specific users, aliases, a segment, or a connected audience.",
    documentation: `${api}/messaging/send_messages/post_send_messages`,
    exampleInput: { external_user_ids: ["<external-id>"], recipient_subscription_state: "subscribed", messages: { email: { app_id: "<app-id>", from: "sender@example.com", subject: "Example subject", body: "<p>Example body</p>" } } },
  },
  send_triggered_campaigns: {
    description: "Trigger an existing API campaign immediately for explicit recipients, a connected audience, or its configured audience.",
    documentation: `${api}/messaging/send_messages/post_send_triggered_campaigns`,
    exampleInput: { campaign_id: "<campaign-id>", recipients: [{ external_user_id: "<external-id>" }] },
  },
  send_triggered_canvases: {
    description: "Trigger an existing API Canvas immediately for explicit recipients, a connected audience, or its configured audience.",
    documentation: `${api}/messaging/send_messages/post_send_triggered_canvases`,
    exampleInput: { canvas_id: "<canvas-id>", recipients: [{ external_user_id: "<external-id>" }] },
  },
  duplicate_campaign: {
    description: "Create a new draft campaign by copying an existing campaign into the same workspace with a new name.",
    documentation: `${api}/messaging/duplicate_messages/post_duplicate_campaigns`,
    exampleInput: { campaign_id: "<campaign-id>", name: "Copy of onboarding campaign" },
  },
  duplicate_canvas: {
    description: "Create a new draft Canvas by copying an existing Canvas into the same workspace with a new name.",
    documentation: `${api}/messaging/duplicate_messages/post_duplicate_canvases`,
    exampleInput: { canvas_id: "<canvas-id>", name: "Copy of onboarding Canvas" },
  },
  update_live_activity: {
    description: "Update the content state, notification, stale date, dismissal date, or completion state for one Live Activity.",
    documentation: `${api}/messaging/live_activity/update`,
    exampleInput: { app_id: "<app-id>", activity_id: "<activity-id>", content_state: { status: "active" } },
  },
  get_product_list: {
    description: "List product identifiers recorded from purchase events in paginated alphabetical order.",
    documentation: `${api}/export/purchases/get_list_product_id`,
    exampleInput: { page: "0" },
  },
  get_quantity_series: {
    description: "Retrieve purchase counts by day or hour, optionally limited to an app and product identifier.",
    documentation: `${api}/export/purchases/get_number_of_purchases`,
    exampleInput: { length: 7, unit: "day", product: "example-product" },
  },
  get_revenue_series: {
    description: "Retrieve purchase revenue by day or hour, optionally limited to an app and product identifier.",
    documentation: `${api}/export/purchases/get_revenue_series`,
    exampleInput: { length: 7, unit: "day", product: "example-product" },
  },
  get_sdk_authentication_keys: {
    description: "List SDK Authentication public keys for one app, including identifiers, descriptions, and primary-key status.",
    documentation: `${api}/sdk_authentication/get_sdk_authentication_keys`,
    exampleInput: { app_id: "<app-id>" },
  },
  get_segment_list: {
    description: "List non-archived segments in pages of 100 with identifiers, names, tags, and analytics-tracking status.",
    documentation: `${api}/export/segments/get_segment`,
    exampleInput: { page: 0, sort_direction: "desc" },
  },
  get_segment_details: {
    description: "Retrieve one segment's name, filter description, tags, teams, and creation or update timestamps.",
    documentation: `${api}/export/segments/get_segment_details`,
    exampleInput: { segment_id: "<segment-id>" },
  },
  get_segment_data_series: {
    description: "Retrieve the estimated daily size of one analytics-enabled segment over a bounded range.",
    documentation: `${api}/export/segments/get_segment_analytics`,
    exampleInput: { segment_id: "<segment-id>", length: 7 },
  },
  get_send_data_series: {
    description: "Retrieve up to 14 days of delivery, engagement, conversion, and revenue metrics for one tracked API-campaign send identifier.",
    documentation: `${api}/export/campaigns/get_send_analytics`,
    exampleInput: { campaign_id: "<campaign-id>", send_id: "<send-id>", length: 7 },
  },
  get_session_data_series: {
    description: "Retrieve app session counts by day or hour, optionally limited to an app and analytics-enabled segment.",
    documentation: `${api}/export/sessions/get_sessions_analytics`,
    exampleInput: { length: 7, unit: "day" },
  },
  get_invalid_phone_numbers: {
    description: "Query phone numbers Braze marked invalid by date range or explicit E.164 numbers, optionally filtering by invalidation reason.",
    documentation: `${api}/sms/get_query_invalid_numbers`,
    exampleInput: { start_date: "2026-07-01", end_date: "2026-08-01", limit: 100 },
  },
  remove_invalid_phone_numbers: {
    description: "Remove up to 50 E.164 phone numbers from Braze's invalid-number list so future SMS eligibility can be reevaluated.",
    documentation: `${api}/sms/post_remove_invalid_numbers`,
    exampleInput: { phone_numbers: ["+15555550123"] },
  },
  query_unsubscribed_emails: {
    description: "List email addresses that unsubscribed in a date range, each with its unsubscribed_at timestamp. Use for opt-out reconciliation and backfill; the payload carries no external ID, channel, or subscription group.",
    documentation: `${api}/email/get_query_unsubscribed_email_addresses`,
    exampleInput: { start_date: "2026-07-01", end_date: "2026-08-01", limit: 500 },
  },
  query_hard_bounced_emails: {
    description: "List email addresses that hard bounced in a date range, each with its hard_bounced_at timestamp. Hard bounces are deliverability failures, not consent withdrawals.",
    documentation: `${api}/email/get_query_hard_bounces`,
    exampleInput: { start_date: "2026-07-01", end_date: "2026-08-01", limit: 500 },
  },
  change_email_subscription_status: {
    description: "Set the account-level email subscription state for one or more addresses. This global state supersedes subscription groups on send, so a group-level unsubscribe alone does not globally unsubscribe a user.",
    documentation: `${api}/email/post_email_subscription_status`,
    exampleInput: { email: ["<email>"], subscription_state: "unsubscribed" },
  },
  get_subscription_group_status: {
    description: "Read each identified user's subscribed or unsubscribed state within one email, SMS, or WhatsApp subscription group.",
    documentation: `${api}/subscription_groups/get_list_user_subscription_group_status`,
    exampleInput: { subscription_group_id: "<subscription-group-id>", external_id: ["<external-id>"] },
  },
  get_user_subscription_groups: {
    description: "List subscription-group membership and history for users identified by external ID, email address, or phone number.",
    documentation: `${api}/subscription_groups/get_list_user_subscription_groups`,
    exampleInput: { external_id: ["<external-id>"], limit: 100 },
  },
  update_subscription_group_status: {
    description: "Subscribe or unsubscribe up to 50 users in one subscription group, with optional Braze double opt-in handling.",
    documentation: `${api}/subscription_groups/post_update_user_subscription_group_status`,
    exampleInput: { subscription_group_id: "<subscription-group-id>", subscription_state: "subscribed", external_id: ["<external-id>"], use_double_opt_in_logic: false },
  },
  update_subscription_group_status_v2: {
    description: "Apply subscription state changes across multiple groups, using exactly one identifier type per group update.",
    documentation: `${api}/subscription_groups/post_update_user_subscription_group_status_v2`,
    exampleInput: { subscription_groups: [{ subscription_group_id: "<subscription-group-id>", subscription_state: "subscribed", external_ids: ["<external-id>"] }] },
  },
  export_users_by_identifier: {
    description: "Export user profiles by identifier, including the account-level email_subscribe and push_subscribe states and subscription group membership. This is the only way to read a user's global subscription state, which overrides group-level status on send.",
    documentation: `${api}/export/user_data/post_users_identifier`,
    exampleInput: { external_ids: ["<external-id>"], fields_to_export: ["external_id", "email", "email_subscribe", "subscription_groups"] },
  },
  create_user_alias: {
    description: "Attach one or more alias name and label pairs to existing user profiles identified by external ID or user alias.",
    documentation: `${api}/user_data/post_user_alias`,
    exampleInput: { user_aliases: [{ external_id: "<external-id>", alias_name: "example-alias", alias_label: "legacy-id" }] },
  },
  update_user_alias: {
    description: "Rename one or more existing user aliases while preserving their associated Braze user profiles.",
    documentation: `${api}/user_data/post_users_alias_update`,
    exampleInput: { alias_updates: [{ alias_label: "legacy-id", old_alias_name: "old-alias", new_alias_name: "new-alias" }] },
  },
  delete_users: {
    description: "Permanently delete up to 50 users selected by exactly one supported identifier type.",
    documentation: `${api}/user_data/post_user_delete`,
    exampleInput: { external_ids: ["<external-id>"] },
  },
  identify_users: {
    description: "Merge anonymous alias, email-only, or phone-only profiles into identified user profiles with external IDs.",
    documentation: `${api}/user_data/post_user_identify`,
    exampleInput: { aliases_to_identify: [{ external_id: "<external-id>", user_alias: { alias_name: "example-alias", alias_label: "legacy-id" } }] },
  },
  track_users: {
    description: "Asynchronously create or update user attributes and record custom events or purchases, with up to 75 combined objects per request.",
    documentation: `${api}/user_data/post_user_track`,
    exampleInput: { attributes: [{ external_id: "<external-id>", first_name: "Example", email_subscribe: "subscribed" }] },
  },
  track_users_sync: {
    description: "Synchronously create or update one user attribute, event, or purchase object and return item-level processing results.",
    documentation: `${api}/user_data/post_user_track_synchronous`,
    exampleInput: { attributes: [{ external_id: "<external-id>", first_name: "Example", email_subscribe: "subscribed" }] },
  },
  merge_users: {
    description: "Merge data from one user profile into another retained profile using supported identifiers for both records.",
    documentation: `${api}/user_data/post_users_merge`,
    exampleInput: { merge_updates: [{ identifier_to_merge: { external_id: "<old-external-id>" }, identifier_to_keep: { external_id: "<retained-external-id>" } }] },
  },
  rename_external_ids: {
    description: "Rename external identifiers while preserving the associated users, histories, attributes, and engagement data.",
    documentation: `${api}/user_data/external_id_migration/post_external_ids_rename`,
    exampleInput: { external_id_renames: [{ current_external_id: "<old-external-id>", new_external_id: "<new-external-id>" }] },
  },
  remove_external_ids: {
    description: "Remove deprecated external identifiers from users without deleting their Braze profiles or accumulated data.",
    documentation: `${api}/user_data/external_id_migration/post_external_ids_remove`,
    exampleInput: { external_ids: ["<external-id>"] },
  },
  get_email_templates: {
    description: "List email templates with optional modification-time filters and positive limit or offset pagination.",
    documentation: `${api}/templates/email_templates/get_list_email_templates`,
    exampleInput: { limit: 50, offset: 1 },
  },
  get_email_template_info: {
    description: "Retrieve one email template's name, subject, HTML and plaintext bodies, preheader, tags, and CSS settings.",
    documentation: `${api}/templates/email_templates/get_see_email_template_information`,
    exampleInput: { email_template_id: "<email-template-id>" },
  },
  create_email_template: {
    description: "Create a reusable email template with required name, subject, and HTML body plus optional plaintext, preheader, tags, and CSS inlining.",
    documentation: `${api}/templates/email_templates/post_create_email_template`,
    exampleInput: { template_name: "Example template", subject: "Example subject", body: "<p>Example body</p>", plaintext_body: "Example body" },
  },
  update_email_template: {
    description: "Update one reusable email template by identifier with at least one changed content or metadata field.",
    documentation: `${api}/templates/email_templates/post_update_email_template`,
    exampleInput: { email_template_id: "<email-template-id>", subject: "Updated subject" },
  },
  get_content_blocks: {
    description: "List reusable content blocks with optional modification-time filters and positive limit or offset pagination.",
    documentation: `${api}/templates/content_blocks_templates/get_list_email_content_blocks`,
    exampleInput: { limit: 50, offset: 1 },
  },
  get_content_block_info: {
    description: "Retrieve one content block's content and metadata, optionally including where the block is used.",
    documentation: `${api}/templates/content_blocks_templates/get_see_email_content_blocks_information`,
    exampleInput: { content_block_id: "<content-block-id>", include_inclusion_data: true },
  },
  create_content_block: {
    description: "Create a reusable active or draft content block with required name and content plus optional description and tags.",
    documentation: `${api}/templates/content_blocks_templates/post_create_email_content_block`,
    exampleInput: { name: "Example block", content: "<p>Example content</p>", state: "draft", tags: ["example"] },
  },
  update_content_block: {
    description: "Update one reusable content block by identifier with at least one changed content, metadata, state, or tags field.",
    documentation: `${api}/templates/content_blocks_templates/post_update_content_block`,
    exampleInput: { content_block_id: "<content-block-id>", content: "<p>Updated content</p>" },
  },
} satisfies Record<string, FunctionDocumentation>;
