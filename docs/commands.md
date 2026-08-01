# Command reference

Generated from the CLI catalog. Run `npm run docs:generate` after changing commands.

## `braze workspace list`

- MCP function: `get_workspaces`
- Permission: `local`
- Access: `local`

Options:

- `--input <json|@file>` - load a JSON input object

## `braze campaign list`

- MCP function: `get_campaign_list`
- Permission: `campaigns.list`
- Request: `GET /campaigns/list`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--page <value>` - `page`, integer
- `--include-archived <value>` - `include_archived`, boolean
- `--sort-direction <value>` - `sort_direction`, string
- `--last-edit-time-gt <value>` - `last_edit.time[gt]`, string

## `braze campaign get`

- MCP function: `get_campaign_details`
- Permission: `campaigns.details`
- Request: `GET /campaigns/details`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--campaign-id <value>` - `campaign_id`, string, required
- `--post-launch-draft-version <value>` - `post_launch_draft_version`, boolean
- `--include-has-translatable-content <value>` - `include_has_translatable_content`, boolean

## `braze campaign data-series`

- MCP function: `get_campaign_dataseries`
- Permission: `campaigns.data_series`
- Request: `GET /campaigns/data_series`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--campaign-id <value>` - `campaign_id`, string, required
- `--length <value>` - `length`, integer, required
- `--ending-at <value>` - `ending_at`, string

## `braze canvas list`

- MCP function: `get_canvas_list`
- Permission: `canvas.list`
- Request: `GET /canvas/list`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--page <value>` - `page`, integer
- `--include-archived <value>` - `include_archived`, boolean
- `--sort-direction <value>` - `sort_direction`, string
- `--last-edit-time-gt <value>` - `last_edit.time[gt]`, string

## `braze canvas get`

- MCP function: `get_canvas_details`
- Permission: `canvas.details`
- Request: `GET /canvas/details`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--canvas-id <value>` - `canvas_id`, string, required
- `--post-launch-draft-version <value>` - `post_launch_draft_version`, boolean
- `--include-has-translatable-content <value>` - `include_has_translatable_content`, boolean

## `braze canvas data-series`

- MCP function: `get_canvas_data_series`
- Permission: `canvas.data_series`
- Request: `GET /canvas/data_series`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--canvas-id <value>` - `canvas_id`, string, required
- `--ending-at <value>` - `ending_at`, string, required
- `--starting-at <value>` - `starting_at`, string
- `--length <value>` - `length`, string
- `--include-variant-breakdown <value>` - `include_variant_breakdown`, boolean
- `--include-step-breakdown <value>` - `include_step_breakdown`, boolean
- `--include-deleted-step-data <value>` - `include_deleted_step_data`, boolean

## `braze canvas data-summary`

- MCP function: `get_canvas_data_summary`
- Permission: `canvas.data_summary`
- Request: `GET /canvas/data_summary`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--canvas-id <value>` - `canvas_id`, string, required
- `--ending-at <value>` - `ending_at`, string, required
- `--starting-at <value>` - `starting_at`, string
- `--length <value>` - `length`, string
- `--include-variant-breakdown <value>` - `include_variant_breakdown`, boolean
- `--include-step-breakdown <value>` - `include_step_breakdown`, boolean
- `--include-deleted-step-data <value>` - `include_deleted_step_data`, boolean

## `braze catalog list`

- MCP function: `get_catalogs`
- Permission: `catalogs.get`
- Request: `GET /catalogs`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object

## `braze catalog items`

- MCP function: `get_catalog_items`
- Permission: `catalogs.get_items`
- Request: `GET /catalogs/{catalog_name}/items`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--catalog-name <value>` - `catalog_name`, string, required
- `--cursor <value>` - `cursor`, string

## `braze catalog item`

- MCP function: `get_catalog_item`
- Permission: `catalogs.get_item`
- Request: `GET /catalogs/{catalog_name}/items/{item_id}`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--catalog-name <value>` - `catalog_name`, string, required
- `--item-id <value>` - `item_id`, string, required

## `braze custom-attribute list`

- MCP function: `get_custom_attributes`
- Permission: `custom_attributes.get`
- Request: `GET /custom_attributes`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--cursor <value>` - `cursor`, string

## `braze event export`

- MCP function: `get_events`
- Permission: `events.get`
- Request: `GET /events`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--cursor <value>` - `cursor`, string

## `braze event list`

- MCP function: `get_events_list`
- Permission: `events.list`
- Request: `GET /events/list`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--page <value>` - `page`, integer

## `braze event data-series`

- MCP function: `get_events_data_series`
- Permission: `events.data_series`
- Request: `GET /events/data_series`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--event <value>` - `event`, string, required
- `--length <value>` - `length`, integer, required
- `--ending-at <value>` - `ending_at`, string
- `--app-id <value>` - `app_id`, string
- `--unit <value>` - `unit`, string
- `--segment-id <value>` - `segment_id`, string

## `braze cdi integration list`

- MCP function: `list_integrations`
- Permission: `cdi.integration_list`
- Request: `GET /cdi/integrations`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--cursor <value>` - `cursor`, string

## `braze cdi integration sync-status`

- MCP function: `get_integration_job_sync_status`
- Permission: `cdi.integration_job_status`
- Request: `GET /cdi/integrations/{integration_id}/job_sync_status`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--integration-id <value>` - `integration_id`, string, required
- `--cursor <value>` - `cursor`, string

## `braze kpi dau`

- MCP function: `get_dau_data_series`
- Permission: `kpi.dau.data_series`
- Request: `GET /kpi/dau/data_series`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--length <value>` - `length`, integer, required
- `--ending-at <value>` - `ending_at`, string
- `--app-id <value>` - `app_id`, string

## `braze kpi mau`

- MCP function: `get_mau_data_series`
- Permission: `kpi.mau.data_series`
- Request: `GET /kpi/mau/data_series`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--length <value>` - `length`, integer, required
- `--ending-at <value>` - `ending_at`, string
- `--app-id <value>` - `app_id`, string

## `braze kpi new-users`

- MCP function: `get_new_users_data_series`
- Permission: `kpi.new_users.data_series`
- Request: `GET /kpi/new_users/data_series`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--length <value>` - `length`, integer, required
- `--ending-at <value>` - `ending_at`, string
- `--app-id <value>` - `app_id`, string

## `braze kpi uninstalls`

- MCP function: `get_uninstalls_data_series`
- Permission: `kpi.uninstalls.data_series`
- Request: `GET /kpi/uninstalls/data_series`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--length <value>` - `length`, integer, required
- `--ending-at <value>` - `ending_at`, string
- `--app-id <value>` - `app_id`, string

## `braze media-library create`

- MCP function: `create_media_library_asset`
- Permission: `media_library.create`
- Request: `POST /media_library/create`
- Access: `write`

Options:

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--asset-url <value>` - `asset_url`, string
- `--asset-file <value>` - `asset_file`, file
- `--name <value>` - `name`, string

## `braze message scheduled-broadcasts`

- MCP function: `get_scheduled_broadcasts`
- Permission: `messages.schedule_broadcasts`
- Request: `GET /messages/scheduled_broadcasts`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--end-time <value>` - `end_time`, string, required

## `braze purchase products`

- MCP function: `get_product_list`
- Permission: `purchases.product_list`
- Request: `GET /purchases/product_list`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--page <value>` - `page`, string

## `braze purchase quantity-series`

- MCP function: `get_quantity_series`
- Permission: `purchases.quantity_series`
- Request: `GET /purchases/quantity_series`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--length <value>` - `length`, integer, required
- `--ending-at <value>` - `ending_at`, string
- `--app-id <value>` - `app_id`, string
- `--unit <value>` - `unit`, string
- `--product <value>` - `product`, string

## `braze purchase revenue-series`

- MCP function: `get_revenue_series`
- Permission: `purchases.revenue_series`
- Request: `GET /purchases/revenue_series`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--length <value>` - `length`, integer, required
- `--ending-at <value>` - `ending_at`, string
- `--app-id <value>` - `app_id`, string
- `--unit <value>` - `unit`, string
- `--product <value>` - `product`, string

## `braze sdk-authentication keys`

- MCP function: `get_sdk_authentication_keys`
- Permission: `sdk_authentication.keys`
- Request: `GET /app_group/sdk_authentication/keys`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--app-id <value>` - `app_id`, string, required

## `braze segment list`

- MCP function: `get_segment_list`
- Permission: `segments.list`
- Request: `GET /segments/list`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--page <value>` - `page`, integer
- `--sort-direction <value>` - `sort_direction`, string

## `braze segment get`

- MCP function: `get_segment_details`
- Permission: `segments.details`
- Request: `GET /segments/details`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--segment-id <value>` - `segment_id`, string, required

## `braze segment data-series`

- MCP function: `get_segment_data_series`
- Permission: `segments.data_series`
- Request: `GET /segments/data_series`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--segment-id <value>` - `segment_id`, string, required
- `--length <value>` - `length`, integer, required
- `--ending-at <value>` - `ending_at`, string

## `braze send data-series`

- MCP function: `get_send_data_series`
- Permission: `sends.data_series`
- Request: `GET /sends/data_series`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--campaign-id <value>` - `campaign_id`, string, required
- `--send-id <value>` - `send_id`, string, required
- `--length <value>` - `length`, integer, required
- `--ending-at <value>` - `ending_at`, string

## `braze session data-series`

- MCP function: `get_session_data_series`
- Permission: `sessions.data_series`
- Request: `GET /sessions/data_series`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--length <value>` - `length`, integer, required
- `--ending-at <value>` - `ending_at`, string
- `--app-id <value>` - `app_id`, string
- `--unit <value>` - `unit`, string
- `--segment-id <value>` - `segment_id`, string

## `braze subscription group-status`

- MCP function: `get_subscription_group_status`
- Permission: `subscription.status.get`
- Request: `GET /subscription/status/get`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--subscription-group-id <value>` - `subscription_group_id`, string, required
- `--external-id <value>` - `external_id`, string
- `--email <value>` - `email`, string
- `--phone <value>` - `phone`, string

## `braze subscription user-groups`

- MCP function: `get_user_subscription_groups`
- Permission: `subscription.groups.get`
- Request: `GET /subscription/user/status`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--external-id <value>` - `external_id`, string
- `--email <value>` - `email`, string
- `--phone <value>` - `phone`, string
- `--limit <value>` - `limit`, integer
- `--offset <value>` - `offset`, integer

## `braze template email list`

- MCP function: `get_email_templates`
- Permission: `templates.email.list`
- Request: `GET /templates/email/list`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--modified-after <value>` - `modified_after`, string
- `--modified-before <value>` - `modified_before`, string
- `--limit <value>` - `limit`, positive
- `--offset <value>` - `offset`, positive

## `braze template email get`

- MCP function: `get_email_template_info`
- Permission: `templates.email.info`
- Request: `GET /templates/email/info`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--email-template-id <value>` - `email_template_id`, string, required

## `braze template email create`

- MCP function: `create_email_template`
- Permission: `templates.email.create`
- Request: `POST /templates/email/create`
- Access: `write`

Options:

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--template-name <value>` - `template_name`, string, required
- `--subject <value>` - `subject`, string, required
- `--body <value>` - `body`, string, required
- `--plaintext-body <value>` - `plaintext_body`, string
- `--preheader <value>` - `preheader`, string
- `--tags <value>` - `tags`, string[]
- `--should-inline-css <value>` - `should_inline_css`, boolean

## `braze template email update`

- MCP function: `update_email_template`
- Permission: `templates.email.update`
- Request: `POST /templates/email/update`
- Access: `write`

Options:

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--email-template-id <value>` - `email_template_id`, string, required
- `--template-name <value>` - `template_name`, string
- `--subject <value>` - `subject`, string
- `--body <value>` - `body`, string
- `--plaintext-body <value>` - `plaintext_body`, string
- `--preheader <value>` - `preheader`, string
- `--tags <value>` - `tags`, string[]
- `--should-inline-css <value>` - `should_inline_css`, boolean

## `braze content-block list`

- MCP function: `get_content_blocks`
- Permission: `content_blocks.list`
- Request: `GET /content_blocks/list`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--modified-after <value>` - `modified_after`, string
- `--modified-before <value>` - `modified_before`, string
- `--limit <value>` - `limit`, positive
- `--offset <value>` - `offset`, positive

## `braze content-block get`

- MCP function: `get_content_block_info`
- Permission: `content_blocks.info`
- Request: `GET /content_blocks/info`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--content-block-id <value>` - `content_block_id`, string, required
- `--include-inclusion-data <value>` - `include_inclusion_data`, boolean

## `braze content-block create`

- MCP function: `create_content_block`
- Permission: `content_blocks.create`
- Request: `POST /content_blocks/create`
- Access: `write`

Options:

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--name <value>` - `name`, string, required
- `--content <value>` - `content`, string, required
- `--description <value>` - `description`, string
- `--state <value>` - `state`, string
- `--tags <value>` - `tags`, string[]

## `braze content-block update`

- MCP function: `update_content_block`
- Permission: `content_blocks.update`
- Request: `POST /content_blocks/update`
- Access: `write`

Options:

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--content-block-id <value>` - `content_block_id`, string, required
- `--name <value>` - `name`, string
- `--content <value>` - `content`, string
- `--description <value>` - `description`, string
- `--state <value>` - `state`, string
- `--tags <value>` - `tags`, string[]
