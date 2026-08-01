# Command reference

Generated from the CLI catalog. Run `npm run docs:generate` after changing commands.

## `braze login`

- Function: `login`
- Permission: `local`
- Description: Save the current Braze credentials for use from any directory
- Access: `local`

Options:


## `braze workspace list`

- Function: `get_workspaces`
- Permission: `local`
- Access: `local`

Options:

- `--input <json|@file>` - load a JSON input object

## `braze campaign list`

- Function: `get_campaign_list`
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

- Function: `get_campaign_details`
- Permission: `campaigns.details`
- Request: `GET /campaigns/details`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--campaign-id <value>` - `campaign_id`, string, required
- `--post-launch-draft-version <value>` - `post_launch_draft_version`, boolean
- `--include-has-translatable-content <value>` - `include_has_translatable_content`, boolean

## `braze campaign data-series`

- Function: `get_campaign_dataseries`
- Permission: `campaigns.data_series`
- Request: `GET /campaigns/data_series`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--campaign-id <value>` - `campaign_id`, string, required
- `--length <value>` - `length`, integer, required
- `--ending-at <value>` - `ending_at`, string

## `braze canvas list`

- Function: `get_canvas_list`
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

- Function: `get_canvas_details`
- Permission: `canvas.details`
- Request: `GET /canvas/details`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--canvas-id <value>` - `canvas_id`, string, required
- `--post-launch-draft-version <value>` - `post_launch_draft_version`, boolean
- `--include-has-translatable-content <value>` - `include_has_translatable_content`, boolean

## `braze canvas data-series`

- Function: `get_canvas_data_series`
- Permission: `canvas.data_series`
- Request: `GET /canvas/data_series`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--canvas-id <value>` - `canvas_id`, string, required
- `--ending-at <value>` - `ending_at`, string, required
- `--starting-at <value>` - `starting_at`, string
- `--length <value>` - `length`, integer
- `--include-variant-breakdown <value>` - `include_variant_breakdown`, boolean
- `--include-step-breakdown <value>` - `include_step_breakdown`, boolean
- `--include-deleted-step-data <value>` - `include_deleted_step_data`, boolean

## `braze canvas data-summary`

- Function: `get_canvas_data_summary`
- Permission: `canvas.data_summary`
- Request: `GET /canvas/data_summary`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--canvas-id <value>` - `canvas_id`, string, required
- `--ending-at <value>` - `ending_at`, string, required
- `--starting-at <value>` - `starting_at`, string
- `--length <value>` - `length`, integer
- `--include-variant-breakdown <value>` - `include_variant_breakdown`, boolean
- `--include-step-breakdown <value>` - `include_step_breakdown`, boolean
- `--include-deleted-step-data <value>` - `include_deleted_step_data`, boolean

## `braze catalog list`

- Function: `get_catalogs`
- Permission: `catalogs.get`
- Request: `GET /catalogs`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object

## `braze catalog items`

- Function: `get_catalog_items`
- Permission: `catalogs.get_items`
- Request: `GET /catalogs/{catalog_name}/items`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--catalog-name <value>` - `catalog_name`, string, required
- `--cursor <value>` - `cursor`, string

## `braze catalog item`

- Function: `get_catalog_item`
- Permission: `catalogs.get_item`
- Request: `GET /catalogs/{catalog_name}/items/{item_id}`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--catalog-name <value>` - `catalog_name`, string, required
- `--item-id <value>` - `item_id`, string, required

## `braze custom-attribute list`

- Function: `get_custom_attributes`
- Permission: `custom_attributes.get`
- Request: `GET /custom_attributes`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--cursor <value>` - `cursor`, string

## `braze event export`

- Function: `get_events`
- Permission: `events.get`
- Request: `GET /events`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--cursor <value>` - `cursor`, string

## `braze event list`

- Function: `get_events_list`
- Permission: `events.list`
- Request: `GET /events/list`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--page <value>` - `page`, integer

## `braze event data-series`

- Function: `get_events_data_series`
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

- Function: `list_integrations`
- Permission: `cdi.integration_list`
- Request: `GET /cdi/integrations`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--cursor <value>` - `cursor`, string

## `braze cdi integration sync-status`

- Function: `get_integration_job_sync_status`
- Permission: `cdi.integration_job_status`
- Request: `GET /cdi/integrations/{integration_id}/job_sync_status`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--integration-id <value>` - `integration_id`, string, required
- `--cursor <value>` - `cursor`, string

## `braze kpi dau`

- Function: `get_dau_data_series`
- Permission: `kpi.dau.data_series`
- Request: `GET /kpi/dau/data_series`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--length <value>` - `length`, integer, required
- `--ending-at <value>` - `ending_at`, string
- `--app-id <value>` - `app_id`, string

## `braze kpi mau`

- Function: `get_mau_data_series`
- Permission: `kpi.mau.data_series`
- Request: `GET /kpi/mau/data_series`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--length <value>` - `length`, integer, required
- `--ending-at <value>` - `ending_at`, string
- `--app-id <value>` - `app_id`, string

## `braze kpi new-users`

- Function: `get_new_users_data_series`
- Permission: `kpi.new_users.data_series`
- Request: `GET /kpi/new_users/data_series`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--length <value>` - `length`, integer, required
- `--ending-at <value>` - `ending_at`, string
- `--app-id <value>` - `app_id`, string

## `braze kpi uninstalls`

- Function: `get_uninstalls_data_series`
- Permission: `kpi.uninstalls.data_series`
- Request: `GET /kpi/uninstalls/data_series`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--length <value>` - `length`, integer, required
- `--ending-at <value>` - `ending_at`, string
- `--app-id <value>` - `app_id`, string

## `braze media-library create`

- Function: `create_media_library_asset`
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

- Function: `get_scheduled_broadcasts`
- Permission: `messages.schedule_broadcasts`
- Request: `GET /messages/scheduled_broadcasts`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--end-time <value>` - `end_time`, string, required

## `braze message schedule delete`

- Function: `delete_scheduled_messages`
- Permission: `messages.schedule.delete`
- Request: `POST /messages/schedule/delete`
- Access: `write`

Options:

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--schedule-id <value>` - `schedule_id`, string, required

## `braze message schedule campaign delete`

- Function: `delete_scheduled_campaign_messages`
- Permission: `campaigns.trigger.schedule.delete`
- Request: `POST /campaigns/trigger/schedule/delete`
- Access: `write`

Options:

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--campaign-id <value>` - `campaign_id`, string, required
- `--schedule-id <value>` - `schedule_id`, string, required

## `braze message schedule canvas delete`

- Function: `delete_scheduled_canvas_messages`
- Permission: `canvas.trigger.schedule.delete`
- Request: `POST /canvas/trigger/schedule/delete`
- Access: `write`

Options:

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--canvas-id <value>` - `canvas_id`, string, required
- `--schedule-id <value>` - `schedule_id`, string, required

## `braze message schedule create`

- Function: `create_scheduled_messages`
- Permission: `messages.schedule.create`
- Request: `POST /messages/schedule/create`
- Access: `write`

Options:

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--broadcast <value>` - `broadcast`, boolean
- `--external-user-ids <value>` - `external_user_ids`, string[], maximum 50 items
- `--user-aliases <value>` - `user_aliases`, object[], maximum 50 items
- `--segment-id <value>` - `segment_id`, string
- `--audience <value>` - `audience`, object
- `--campaign-id <value>` - `campaign_id`, string
- `--send-id <value>` - `send_id`, string
- `--override-messaging-limits <value>` - `override_messaging_limits`, boolean
- `--recipient-subscription-state <value>` - `recipient_subscription_state`, string
- `--schedule <value>` - `schedule`, object, required
- `--messages <value>` - `messages`, object

## `braze message schedule campaign create`

- Function: `schedule_triggered_campaigns`
- Permission: `campaigns.trigger.schedule.create`
- Request: `POST /campaigns/trigger/schedule/create`
- Access: `write`

Options:

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--campaign-id <value>` - `campaign_id`, string, required
- `--send-id <value>` - `send_id`, string
- `--recipients <value>` - `recipients`, object[], maximum 50 items
- `--audience <value>` - `audience`, object
- `--broadcast <value>` - `broadcast`, boolean
- `--trigger-properties <value>` - `trigger_properties`, object
- `--schedule <value>` - `schedule`, object, required

## `braze message schedule canvas create`

- Function: `schedule_triggered_canvases`
- Permission: `canvas.trigger.schedule.create`
- Request: `POST /canvas/trigger/schedule/create`
- Access: `write`

Options:

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--canvas-id <value>` - `canvas_id`, string, required
- `--recipients <value>` - `recipients`, object[], maximum 50 items
- `--audience <value>` - `audience`, object
- `--broadcast <value>` - `broadcast`, boolean
- `--context <value>` - `context`, object
- `--schedule <value>` - `schedule`, object, required

## `braze message schedule update`

- Function: `update_scheduled_messages`
- Permission: `messages.schedule.update`
- Request: `POST /messages/schedule/update`
- Access: `write`

Options:

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--schedule-id <value>` - `schedule_id`, string, required
- `--schedule <value>` - `schedule`, object
- `--messages <value>` - `messages`, object

## `braze message schedule campaign update`

- Function: `update_scheduled_triggered_campaigns`
- Permission: `campaigns.trigger.schedule.update`
- Request: `POST /campaigns/trigger/schedule/update`
- Access: `write`

Options:

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--campaign-id <value>` - `campaign_id`, string, required
- `--schedule-id <value>` - `schedule_id`, string, required
- `--schedule <value>` - `schedule`, object, required

## `braze message schedule canvas update`

- Function: `update_scheduled_triggered_canvases`
- Permission: `canvas.trigger.schedule.update`
- Request: `POST /canvas/trigger/schedule/update`
- Access: `write`

Options:

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--canvas-id <value>` - `canvas_id`, string, required
- `--schedule-id <value>` - `schedule_id`, string, required
- `--schedule <value>` - `schedule`, object, required

## `braze message send-id create`

- Function: `create_send_id`
- Permission: `sends.id.create`
- Request: `POST /sends/id/create`
- Access: `write`

Options:

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--campaign-id <value>` - `campaign_id`, string, required
- `--send-id <value>` - `send_id`, string

## `braze message send immediate`

- Function: `send_messages`
- Permission: `messages.send`
- Request: `POST /messages/send`
- Access: `write`

Options:

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--broadcast <value>` - `broadcast`, boolean
- `--external-user-ids <value>` - `external_user_ids`, string[], maximum 50 items
- `--user-aliases <value>` - `user_aliases`, object[], maximum 50 items
- `--segment-id <value>` - `segment_id`, string
- `--audience <value>` - `audience`, object
- `--campaign-id <value>` - `campaign_id`, string
- `--send-id <value>` - `send_id`, string
- `--override-frequency-capping <value>` - `override_frequency_capping`, boolean
- `--recipient-subscription-state <value>` - `recipient_subscription_state`, string
- `--messages <value>` - `messages`, object

## `braze message send campaign`

- Function: `send_triggered_campaigns`
- Permission: `campaigns.trigger.send`
- Request: `POST /campaigns/trigger/send`
- Access: `write`

Options:

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--campaign-id <value>` - `campaign_id`, string, required
- `--send-id <value>` - `send_id`, string
- `--trigger-properties <value>` - `trigger_properties`, object
- `--broadcast <value>` - `broadcast`, boolean
- `--audience <value>` - `audience`, object
- `--recipients <value>` - `recipients`, object[], maximum 50 items
- `--attachments <value>` - `attachments`, object[]

## `braze message send canvas`

- Function: `send_triggered_canvases`
- Permission: `canvas.trigger.send`
- Request: `POST /canvas/trigger/send`
- Access: `write`

Options:

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--canvas-id <value>` - `canvas_id`, string, required
- `--context <value>` - `context`, object
- `--broadcast <value>` - `broadcast`, boolean
- `--audience <value>` - `audience`, object
- `--recipients <value>` - `recipients`, object[], maximum 50 items

## `braze message duplicate campaign`

- Function: `duplicate_campaign`
- Permission: `campaigns.duplicate`
- Request: `POST /campaigns/duplicate`
- Access: `write`

Options:

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--campaign-id <value>` - `campaign_id`, string, required
- `--name <value>` - `name`, string, required
- `--description <value>` - `description`, string
- `--tag-names <value>` - `tag_names`, string

## `braze message duplicate canvas`

- Function: `duplicate_canvas`
- Permission: `canvas.duplicate`
- Request: `POST /canvas/duplicate`
- Access: `write`

Options:

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--canvas-id <value>` - `canvas_id`, string, required
- `--name <value>` - `name`, string, required
- `--description <value>` - `description`, string
- `--tag-names <value>` - `tag_names`, string[]

## `braze message live-activity update`

- Function: `update_live_activity`
- Permission: `messages.live_activity.update`
- Request: `POST /messages/live_activity/update`
- Access: `write`

Options:

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--app-id <value>` - `app_id`, string, required
- `--activity-id <value>` - `activity_id`, string, required
- `--content-state <value>` - `content_state`, object, required
- `--end-activity <value>` - `end_activity`, boolean
- `--dismissal-date <value>` - `dismissal_date`, string
- `--stale-date <value>` - `stale_date`, string
- `--notification <value>` - `notification`, object

## `braze purchase products`

- Function: `get_product_list`
- Permission: `purchases.product_list`
- Request: `GET /purchases/product_list`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--page <value>` - `page`, string

## `braze purchase quantity-series`

- Function: `get_quantity_series`
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

- Function: `get_revenue_series`
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

- Function: `get_sdk_authentication_keys`
- Permission: `sdk_authentication.keys`
- Request: `GET /app_group/sdk_authentication/keys`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--app-id <value>` - `app_id`, string, required

## `braze segment list`

- Function: `get_segment_list`
- Permission: `segments.list`
- Request: `GET /segments/list`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--page <value>` - `page`, integer
- `--sort-direction <value>` - `sort_direction`, string

## `braze segment get`

- Function: `get_segment_details`
- Permission: `segments.details`
- Request: `GET /segments/details`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--segment-id <value>` - `segment_id`, string, required

## `braze segment data-series`

- Function: `get_segment_data_series`
- Permission: `segments.data_series`
- Request: `GET /segments/data_series`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--segment-id <value>` - `segment_id`, string, required
- `--length <value>` - `length`, integer, required
- `--ending-at <value>` - `ending_at`, string

## `braze send data-series`

- Function: `get_send_data_series`
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

- Function: `get_session_data_series`
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

## `braze sms invalid-phone list`

- Function: `get_invalid_phone_numbers`
- Permission: `sms.invalid_phone_numbers`
- Request: `GET /sms/invalid_phone_numbers`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--start-date <value>` - `start_date`, string
- `--end-date <value>` - `end_date`, string
- `--limit <value>` - `limit`, integer
- `--offset <value>` - `offset`, integer
- `--phone-numbers <value>` - `phone_numbers`, string[], maximum 50 items
- `--reason <value>` - `reason`, string

## `braze sms invalid-phone remove`

- Function: `remove_invalid_phone_numbers`
- Permission: `sms.invalid_phone_numbers.remove`
- Request: `POST /sms/invalid_phone_numbers/remove`
- Access: `write`

Options:

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--phone-numbers <value>` - `phone_numbers`, string[], required, maximum 50 items

## `braze subscription group-status`

- Function: `get_subscription_group_status`
- Permission: `subscription.status.get`
- Request: `GET /subscription/status/get`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--subscription-group-id <value>` - `subscription_group_id`, string, required
- `--external-id <value>` - `external_id`, string[], maximum 50 items
- `--email <value>` - `email`, string[], maximum 50 items
- `--phone <value>` - `phone`, string[], maximum 50 items

## `braze subscription user-groups`

- Function: `get_user_subscription_groups`
- Permission: `subscription.groups.get`
- Request: `GET /subscription/user/status`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--external-id <value>` - `external_id`, string[], maximum 50 items
- `--email <value>` - `email`, string[], maximum 50 items
- `--phone <value>` - `phone`, string[], maximum 50 items
- `--limit <value>` - `limit`, integer
- `--offset <value>` - `offset`, integer

## `braze subscription update`

- Function: `update_subscription_group_status`
- Permission: `subscription.status.set`
- Request: `POST /subscription/status/set`
- Access: `write`

Options:

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--subscription-group-id <value>` - `subscription_group_id`, string, required
- `--subscription-state <value>` - `subscription_state`, string, required
- `--external-id <value>` - `external_id`, string[], maximum 50 items
- `--email <value>` - `email`, string[], maximum 50 items
- `--phone <value>` - `phone`, string[], maximum 50 items
- `--use-double-opt-in-logic <value>` - `use_double_opt_in_logic`, boolean

## `braze subscription update-v2`

- Function: `update_subscription_group_status_v2`
- Permission: `subscription.status.set`
- Request: `POST /v2/subscription/status/set`
- Access: `write`

Options:

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--subscription-groups <value>` - `subscription_groups`, object[], required

## `braze user alias create`

- Function: `create_user_alias`
- Permission: `users.alias.new`
- Request: `POST /users/alias/new`
- Access: `write`

Options:

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--user-aliases <value>` - `user_aliases`, object[], required, maximum 50 items

## `braze user alias update`

- Function: `update_user_alias`
- Permission: `users.alias.update`
- Request: `POST /users/alias/update`
- Access: `write`

Options:

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--alias-updates <value>` - `alias_updates`, object[], required, maximum 50 items

## `braze user delete`

- Function: `delete_users`
- Permission: `users.delete`
- Request: `POST /users/delete`
- Access: `write`

Options:

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--external-ids <value>` - `external_ids`, string[], maximum 50 items
- `--user-aliases <value>` - `user_aliases`, object[], maximum 50 items
- `--braze-ids <value>` - `braze_ids`, string[], maximum 50 items
- `--email-addresses <value>` - `email_addresses`, string[], maximum 50 items
- `--phone-numbers <value>` - `phone_numbers`, string[], maximum 50 items

## `braze user identify`

- Function: `identify_users`
- Permission: `users.identify`
- Request: `POST /users/identify`
- Access: `write`

Options:

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--aliases-to-identify <value>` - `aliases_to_identify`, object[], maximum 50 items
- `--emails-to-identify <value>` - `emails_to_identify`, object[], maximum 50 items
- `--phone-numbers-to-identify <value>` - `phone_numbers_to_identify`, object[], maximum 50 items

## `braze user track`

- Function: `track_users`
- Permission: `users.track`
- Request: `POST /users/track`
- Access: `write`

Options:

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--attributes <value>` - `attributes`, object[], maximum 75 items
- `--events <value>` - `events`, object[], maximum 75 items
- `--purchases <value>` - `purchases`, object[], maximum 75 items

## `braze user track-sync`

- Function: `track_users_sync`
- Permission: `users.track.sync`
- Request: `POST /users/track/sync`
- Access: `write`

Options:

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--attributes <value>` - `attributes`, object[], maximum 1 items
- `--events <value>` - `events`, object[], maximum 1 items
- `--purchases <value>` - `purchases`, object[], maximum 1 items

## `braze user merge`

- Function: `merge_users`
- Permission: `users.merge`
- Request: `POST /users/merge`
- Access: `write`

Options:

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--merge-updates <value>` - `merge_updates`, object[], required, maximum 50 items

## `braze user external-id rename`

- Function: `rename_external_ids`
- Permission: `users.external_ids.rename`
- Request: `POST /users/external_ids/rename`
- Access: `write`

Options:

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--external-id-renames <value>` - `external_id_renames`, object[], required, maximum 50 items

## `braze user external-id remove`

- Function: `remove_external_ids`
- Permission: `users.external_ids.remove`
- Request: `POST /users/external_ids/remove`
- Access: `write`

Options:

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--external-ids <value>` - `external_ids`, string[], required, maximum 50 items

## `braze template email list`

- Function: `get_email_templates`
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

- Function: `get_email_template_info`
- Permission: `templates.email.info`
- Request: `GET /templates/email/info`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--email-template-id <value>` - `email_template_id`, string, required

## `braze template email create`

- Function: `create_email_template`
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

- Function: `update_email_template`
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

- Function: `get_content_blocks`
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

- Function: `get_content_block_info`
- Permission: `content_blocks.info`
- Request: `GET /content_blocks/info`
- Access: `read`

Options:

- `--input <json|@file>` - load a JSON input object
- `--content-block-id <value>` - `content_block_id`, string, required
- `--include-inclusion-data <value>` - `include_inclusion_data`, boolean

## `braze content-block create`

- Function: `create_content_block`
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

- Function: `update_content_block`
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
