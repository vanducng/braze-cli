# Command reference

Generated from the CLI catalog. Run `npm run docs:generate` after changing commands.

Examples use non-production placeholders. Replace every `<...>` value, review the linked Braze documentation, and inspect the request before adding `--confirm` to a write.

## `braze login`

- Function: `login`
- Permission: `local`
- Description: Interactively save a Braze REST endpoint, API key, and optional App ID so commands work from any directory.
- Access: `local`
- Documentation: [Authoritative reference](https://github.com/vanducng/braze-cli#configure)

### Example command

```sh
braze login
```

### Options

- No input options. Use `--help` to display this reference.

## `braze workspace list`

- Function: `get_workspaces`
- Permission: `local`
- Description: Report whether the REST endpoint, optional app ID, and API key are configured without printing the API key or contacting Braze.
- Access: `local`
- Documentation: [Authoritative reference](https://github.com/vanducng/braze-cli#configure)

### Example command

```sh
braze workspace list
```

### Options

- `--input <json|@file>` - load a JSON input object

## `braze campaign list`

- Function: `get_campaign_list`
- Permission: `campaigns.list`
- Description: List campaigns in pages of 100 with identifiers, names, tags, API-campaign status, and optional archive filtering. Use returned IDs with campaign detail and analytics commands.
- Request: `GET /campaigns/list`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/export/campaigns/get_campaigns)

### Example JSON input

```json
{
  "page": 0,
  "include_archived": false,
  "sort_direction": "desc"
}
```

### Example command

```sh
braze campaign list --input '{"page":0,"include_archived":false,"sort_direction":"desc"}'
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--page <value>` - `page`, integer
- `--include-archived <value>` - `include_archived`, boolean
- `--sort-direction <value>` - `sort_direction`, string
- `--last-edit-time-gt <value>` - `last_edit.time[gt]`, string

## `braze campaign get`

- Function: `get_campaign_details`
- Permission: `campaigns.details`
- Description: Retrieve configuration and message metadata for one campaign, including status, schedule, channels, tags, and conversion behaviors.
- Request: `GET /campaigns/details`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/export/campaigns/get_campaign_details)

### Example JSON input

```json
{
  "campaign_id": "<campaign-id>"
}
```

### Example command

```sh
braze campaign get --input '{"campaign_id":"<campaign-id>"}'
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--campaign-id <value>` - `campaign_id`, string, required
- `--post-launch-draft-version <value>` - `post_launch_draft_version`, boolean
- `--include-has-translatable-content <value>` - `include_has_translatable_content`, boolean

## `braze campaign data-series`

- Function: `get_campaign_dataseries`
- Permission: `campaigns.data_series`
- Description: Retrieve daily delivery, engagement, conversion, and revenue metrics for one campaign over a bounded date range.
- Request: `GET /campaigns/data_series`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/export/campaigns/get_campaign_analytics)

### Example JSON input

```json
{
  "campaign_id": "<campaign-id>",
  "length": 7
}
```

### Example command

```sh
braze campaign data-series --input '{"campaign_id":"<campaign-id>","length":7}'
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--campaign-id <value>` - `campaign_id`, string, required
- `--length <value>` - `length`, integer, required
- `--ending-at <value>` - `ending_at`, string

## `braze canvas list`

- Function: `get_canvas_list`
- Permission: `canvas.list`
- Description: List Canvases in pages of 100 with identifiers, names, tags, and optional archive filtering. Use returned IDs with Canvas detail and analytics commands.
- Request: `GET /canvas/list`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/export/canvas/get_canvases)

### Example JSON input

```json
{
  "page": 0,
  "include_archived": false,
  "sort_direction": "desc"
}
```

### Example command

```sh
braze canvas list --input '{"page":0,"include_archived":false,"sort_direction":"desc"}'
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--page <value>` - `page`, integer
- `--include-archived <value>` - `include_archived`, boolean
- `--sort-direction <value>` - `sort_direction`, string
- `--last-edit-time-gt <value>` - `last_edit.time[gt]`, string

## `braze canvas get`

- Function: `get_canvas_details`
- Permission: `canvas.details`
- Description: Retrieve configuration, steps, variants, schedule, tags, and status metadata for one Canvas.
- Request: `GET /canvas/details`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/export/canvas/get_canvas_details)

### Example JSON input

```json
{
  "canvas_id": "<canvas-id>"
}
```

### Example command

```sh
braze canvas get --input '{"canvas_id":"<canvas-id>"}'
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--canvas-id <value>` - `canvas_id`, string, required
- `--post-launch-draft-version <value>` - `post_launch_draft_version`, boolean
- `--include-has-translatable-content <value>` - `include_has_translatable_content`, boolean

## `braze canvas data-series`

- Function: `get_canvas_data_series`
- Permission: `canvas.data_series`
- Description: Retrieve time-series Canvas performance metrics with optional variant, step, and deleted-step breakdowns.
- Request: `GET /canvas/data_series`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/export/canvas/get_canvas_analytics)

### Example JSON input

```json
{
  "canvas_id": "<canvas-id>",
  "ending_at": "2026-08-01T00:00:00Z",
  "length": 7
}
```

### Example command

```sh
braze canvas data-series --input '{"canvas_id":"<canvas-id>","ending_at":"2026-08-01T00:00:00Z","length":7}'
```

### Options

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
- Description: Retrieve aggregate Canvas performance over a bounded range with optional variant, step, and deleted-step breakdowns.
- Request: `GET /canvas/data_summary`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/export/canvas/get_canvas_analytics_summary)

### Example JSON input

```json
{
  "canvas_id": "<canvas-id>",
  "ending_at": "2026-08-01T00:00:00Z",
  "length": 7
}
```

### Example command

```sh
braze canvas data-summary --input '{"canvas_id":"<canvas-id>","ending_at":"2026-08-01T00:00:00Z","length":7}'
```

### Options

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
- Description: List all catalogs available in the workspace. Use a returned catalog name to query its items.
- Request: `GET /catalogs`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/catalogs/catalog_management/synchronous/get_list_catalogs)

### Example JSON input

```json
{}
```

### Example command

```sh
braze catalog list --input '{}'
```

### Options

- `--input <json|@file>` - load a JSON input object

## `braze catalog items`

- Function: `get_catalog_items`
- Permission: `catalogs.get_items`
- Description: List item values from one catalog with cursor-based pagination. This returns item content as stored in the selected catalog.
- Request: `GET /catalogs/{catalog_name}/items`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/catalogs/catalog_items/synchronous/get_catalog_items_details_bulk)

### Example JSON input

```json
{
  "catalog_name": "products"
}
```

### Example command

```sh
braze catalog items --input '{"catalog_name":"products"}'
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--catalog-name <value>` - `catalog_name`, string, required
- `--cursor <value>` - `cursor`, string

## `braze catalog item`

- Function: `get_catalog_item`
- Permission: `catalogs.get_item`
- Description: Retrieve one catalog item and its complete stored content by catalog name and item identifier.
- Request: `GET /catalogs/{catalog_name}/items/{item_id}`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/catalogs/catalog_items/synchronous/get_catalog_item_details)

### Example JSON input

```json
{
  "catalog_name": "products",
  "item_id": "sku-123"
}
```

### Example command

```sh
braze catalog item --input '{"catalog_name":"products","item_id":"sku-123"}'
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--catalog-name <value>` - `catalog_name`, string, required
- `--item-id <value>` - `item_id`, string, required

## `braze custom-attribute list`

- Function: `get_custom_attributes`
- Permission: `custom_attributes.get`
- Description: Export custom-attribute definitions in alphabetical pages, including names, data types, status, descriptions, and tags.
- Request: `GET /custom_attributes`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/export/custom_attributes/get_custom_attributes)

### Example JSON input

```json
{}
```

### Example command

```sh
braze custom-attribute list --input '{}'
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--cursor <value>` - `cursor`, string

## `braze event export`

- Function: `get_events`
- Permission: `events.get`
- Description: Export detailed custom-event definitions in cursor-based pages, including status, descriptions, analytics inclusion, and tags.
- Request: `GET /events`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/export/custom_events/get_custom_events_data)

### Example JSON input

```json
{}
```

### Example command

```sh
braze event export --input '{}'
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--cursor <value>` - `cursor`, string

## `braze event list`

- Function: `get_events_list`
- Permission: `events.list`
- Description: List custom-event names in alphabetical pages. Use a returned name with the event analytics command.
- Request: `GET /events/list`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/export/custom_events/get_custom_events)

### Example JSON input

```json
{
  "page": 0
}
```

### Example command

```sh
braze event list --input '{"page":0}'
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--page <value>` - `page`, integer

## `braze event data-series`

- Function: `get_events_data_series`
- Permission: `events.data_series`
- Description: Retrieve occurrence counts for one custom event by day or hour, optionally limited to an app and analytics-enabled segment.
- Request: `GET /events/data_series`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/export/custom_events/get_custom_events_analytics)

### Example JSON input

```json
{
  "event": "purchase_completed",
  "length": 7,
  "unit": "day"
}
```

### Example command

```sh
braze event data-series --input '{"event":"purchase_completed","length":7,"unit":"day"}'
```

### Options

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
- Description: List Cloud Data Ingestion integrations and their identifiers with cursor-based pagination.
- Request: `GET /cdi/integrations`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/cdi/get_integration_list)

### Example JSON input

```json
{}
```

### Example command

```sh
braze cdi integration list --input '{}'
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--cursor <value>` - `cursor`, string

## `braze cdi integration sync-status`

- Function: `get_integration_job_sync_status`
- Permission: `cdi.integration_job_status`
- Description: Retrieve recent synchronization job states for one Cloud Data Ingestion integration.
- Request: `GET /cdi/integrations/{integration_id}/job_sync_status`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/cdi/get_job_sync_status)

### Example JSON input

```json
{
  "integration_id": "<integration-id>"
}
```

### Example command

```sh
braze cdi integration sync-status --input '{"integration_id":"<integration-id>"}'
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--integration-id <value>` - `integration_id`, string, required
- `--cursor <value>` - `cursor`, string

## `braze kpi dau`

- Function: `get_dau_data_series`
- Permission: `kpi.dau.data_series`
- Description: Retrieve daily unique active-user counts for the workspace or configured app over a bounded range.
- Request: `GET /kpi/dau/data_series`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/export/kpi/get_kpi_dau_date)

### Example JSON input

```json
{
  "length": 7
}
```

### Example command

```sh
braze kpi dau --input '{"length":7}'
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--length <value>` - `length`, integer, required
- `--ending-at <value>` - `ending_at`, string
- `--app-id <value>` - `app_id`, string

## `braze kpi mau`

- Function: `get_mau_data_series`
- Permission: `kpi.mau.data_series`
- Description: Retrieve rolling 30-day monthly active-user counts for the workspace or configured app over a bounded range.
- Request: `GET /kpi/mau/data_series`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/export/kpi/get_kpi_mau_30_days)

### Example JSON input

```json
{
  "length": 7
}
```

### Example command

```sh
braze kpi mau --input '{"length":7}'
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--length <value>` - `length`, integer, required
- `--ending-at <value>` - `ending_at`, string
- `--app-id <value>` - `app_id`, string

## `braze kpi new-users`

- Function: `get_new_users_data_series`
- Permission: `kpi.new_users.data_series`
- Description: Retrieve daily new-user counts for the workspace or configured app over a bounded range.
- Request: `GET /kpi/new_users/data_series`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/export/kpi/get_kpi_daily_new_users_date)

### Example JSON input

```json
{
  "length": 7
}
```

### Example command

```sh
braze kpi new-users --input '{"length":7}'
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--length <value>` - `length`, integer, required
- `--ending-at <value>` - `ending_at`, string
- `--app-id <value>` - `app_id`, string

## `braze kpi uninstalls`

- Function: `get_uninstalls_data_series`
- Permission: `kpi.uninstalls.data_series`
- Description: Retrieve daily app-uninstall counts for the workspace or configured app over a bounded range.
- Request: `GET /kpi/uninstalls/data_series`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/export/kpi/get_kpi_uninstalls_date)

### Example JSON input

```json
{
  "length": 7
}
```

### Example command

```sh
braze kpi uninstalls --input '{"length":7}'
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--length <value>` - `length`, integer, required
- `--ending-at <value>` - `ending_at`, string
- `--app-id <value>` - `app_id`, string

## `braze media-library create`

- Function: `create_media_library_asset`
- Permission: `media_library.create`
- Description: Upload a media-library asset from one public URL or one local file. The request must provide exactly one source.
- Request: `POST /media_library/create`
- Access: `write`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/media_library/manage_assets/create)

### Example JSON input

```json
{
  "asset_url": "https://example.com/banner.png",
  "name": "banner.png"
}
```

### Example command

```sh
braze media-library create --input '{"asset_url":"https://example.com/banner.png","name":"banner.png"}' --confirm
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--asset-url <value>` - `asset_url`, string
- `--asset-file <value>` - `asset_file`, file
- `--name <value>` - `name`, string

## `braze message scheduled-broadcasts`

- Function: `get_scheduled_broadcasts`
- Permission: `messages.schedule_broadcasts`
- Description: List campaigns and Canvases scheduled between now and the requested end time, including each next send time and schedule type.
- Request: `GET /messages/scheduled_broadcasts`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/messaging/schedule_messages/get_messages_scheduled)

### Example JSON input

```json
{
  "end_time": "2026-08-08T00:00:00Z"
}
```

### Example command

```sh
braze message scheduled-broadcasts --input '{"end_time":"2026-08-08T00:00:00Z"}'
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--end-time <value>` - `end_time`, string, required

## `braze message schedule delete`

- Function: `delete_scheduled_messages`
- Permission: `messages.schedule.delete`
- Description: Cancel one message created by the API-only scheduling endpoint before Braze sends it.
- Request: `POST /messages/schedule/delete`
- Access: `write`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/messaging/schedule_messages/post_delete_scheduled_messages)

### Example JSON input

```json
{
  "schedule_id": "<schedule-id>"
}
```

### Example command

```sh
braze message schedule delete --input '{"schedule_id":"<schedule-id>"}' --confirm
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--schedule-id <value>` - `schedule_id`, string, required

## `braze message schedule campaign delete`

- Function: `delete_scheduled_campaign_messages`
- Permission: `campaigns.trigger.schedule.delete`
- Description: Cancel one scheduled API-triggered campaign dispatch. Last-second cancellation is best effort after delivery processing begins.
- Request: `POST /campaigns/trigger/schedule/delete`
- Access: `write`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/messaging/schedule_messages/post_delete_scheduled_triggered_messages)

### Example JSON input

```json
{
  "campaign_id": "<campaign-id>",
  "schedule_id": "<schedule-id>"
}
```

### Example command

```sh
braze message schedule campaign delete --input '{"campaign_id":"<campaign-id>","schedule_id":"<schedule-id>"}' --confirm
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--campaign-id <value>` - `campaign_id`, string, required
- `--schedule-id <value>` - `schedule_id`, string, required

## `braze message schedule canvas delete`

- Function: `delete_scheduled_canvas_messages`
- Permission: `canvas.trigger.schedule.delete`
- Description: Cancel one scheduled API-triggered Canvas dispatch. Last-second cancellation is best effort after delivery processing begins.
- Request: `POST /canvas/trigger/schedule/delete`
- Access: `write`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/messaging/schedule_messages/post_delete_scheduled_triggered_canvases)

### Example JSON input

```json
{
  "canvas_id": "<canvas-id>",
  "schedule_id": "<schedule-id>"
}
```

### Example command

```sh
braze message schedule canvas delete --input '{"canvas_id":"<canvas-id>","schedule_id":"<schedule-id>"}' --confirm
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--canvas-id <value>` - `canvas_id`, string, required
- `--schedule-id <value>` - `schedule_id`, string, required

## `braze message schedule create`

- Function: `create_scheduled_messages`
- Permission: `messages.schedule.create`
- Description: Schedule an API-defined message for specific users, aliases, a segment, or a connected audience and return a schedule identifier for later changes.
- Request: `POST /messages/schedule/create`
- Access: `write`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/messaging/schedule_messages/post_schedule_messages)

### Example JSON input

```json
{
  "external_user_ids": [
    "<external-id>"
  ],
  "recipient_subscription_state": "subscribed",
  "schedule": {
    "time": "2026-08-02T12:00:00Z"
  },
  "messages": {
    "email": {
      "app_id": "<app-id>",
      "from": "sender@example.com",
      "subject": "Example subject",
      "body": "<p>Example body</p>"
    }
  }
}
```

### Example command

```sh
braze message schedule create --input '{"external_user_ids":["<external-id>"],"recipient_subscription_state":"subscribed","schedule":{"time":"2026-08-02T12:00:00Z"},"messages":{"email":{"app_id":"<app-id>","from":"sender@example.com","subject":"Example subject","body":"<p>Example body</p>"}}}' --confirm
```

### Options

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
- `--recipient-subscription-state <value>` - `recipient_subscription_state`, string, one of: `opted_in`, `subscribed`, `all`
- `--schedule <value>` - `schedule`, object, required
- `--messages <value>` - `messages`, object

## `braze message schedule campaign create`

- Function: `schedule_triggered_campaigns`
- Permission: `campaigns.trigger.schedule.create`
- Description: Schedule an existing API-triggered campaign for explicit recipients, a connected audience, or its configured audience.
- Request: `POST /campaigns/trigger/schedule/create`
- Access: `write`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/messaging/schedule_messages/post_schedule_triggered_campaigns)

### Example JSON input

```json
{
  "campaign_id": "<campaign-id>",
  "recipients": [
    {
      "external_user_id": "<external-id>"
    }
  ],
  "schedule": {
    "time": "2026-08-02T12:00:00Z"
  }
}
```

### Example command

```sh
braze message schedule campaign create --input '{"campaign_id":"<campaign-id>","recipients":[{"external_user_id":"<external-id>"}],"schedule":{"time":"2026-08-02T12:00:00Z"}}' --confirm
```

### Options

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
- Description: Schedule an existing API-triggered Canvas for explicit recipients, a connected audience, or its configured audience.
- Request: `POST /canvas/trigger/schedule/create`
- Access: `write`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/messaging/schedule_messages/post_schedule_triggered_canvases)

### Example JSON input

```json
{
  "canvas_id": "<canvas-id>",
  "recipients": [
    {
      "external_user_id": "<external-id>"
    }
  ],
  "schedule": {
    "time": "2026-08-02T12:00:00Z"
  }
}
```

### Example command

```sh
braze message schedule canvas create --input '{"canvas_id":"<canvas-id>","recipients":[{"external_user_id":"<external-id>"}],"schedule":{"time":"2026-08-02T12:00:00Z"}}' --confirm
```

### Options

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
- Description: Change the delivery schedule or message payload for a previously scheduled API-only message.
- Request: `POST /messages/schedule/update`
- Access: `write`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/messaging/schedule_messages/post_update_scheduled_messages)

### Example JSON input

```json
{
  "schedule_id": "<schedule-id>",
  "schedule": {
    "time": "2026-08-03T12:00:00Z"
  }
}
```

### Example command

```sh
braze message schedule update --input '{"schedule_id":"<schedule-id>","schedule":{"time":"2026-08-03T12:00:00Z"}}' --confirm
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--schedule-id <value>` - `schedule_id`, string, required
- `--schedule <value>` - `schedule`, object
- `--messages <value>` - `messages`, object

## `braze message schedule campaign update`

- Function: `update_scheduled_triggered_campaigns`
- Permission: `campaigns.trigger.schedule.update`
- Description: Change the delivery time for one previously scheduled API-triggered campaign dispatch.
- Request: `POST /campaigns/trigger/schedule/update`
- Access: `write`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/messaging/schedule_messages/post_update_scheduled_triggered_campaigns)

### Example JSON input

```json
{
  "campaign_id": "<campaign-id>",
  "schedule_id": "<schedule-id>",
  "schedule": {
    "time": "2026-08-03T12:00:00Z"
  }
}
```

### Example command

```sh
braze message schedule campaign update --input '{"campaign_id":"<campaign-id>","schedule_id":"<schedule-id>","schedule":{"time":"2026-08-03T12:00:00Z"}}' --confirm
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--campaign-id <value>` - `campaign_id`, string, required
- `--schedule-id <value>` - `schedule_id`, string, required
- `--schedule <value>` - `schedule`, object, required

## `braze message schedule canvas update`

- Function: `update_scheduled_triggered_canvases`
- Permission: `canvas.trigger.schedule.update`
- Description: Change the delivery time for one previously scheduled API-triggered Canvas dispatch.
- Request: `POST /canvas/trigger/schedule/update`
- Access: `write`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/messaging/schedule_messages/post_update_scheduled_triggered_canvases)

### Example JSON input

```json
{
  "canvas_id": "<canvas-id>",
  "schedule_id": "<schedule-id>",
  "schedule": {
    "time": "2026-08-03T12:00:00Z"
  }
}
```

### Example command

```sh
braze message schedule canvas update --input '{"canvas_id":"<canvas-id>","schedule_id":"<schedule-id>","schedule":{"time":"2026-08-03T12:00:00Z"}}' --confirm
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--canvas-id <value>` - `canvas_id`, string, required
- `--schedule-id <value>` - `schedule_id`, string, required
- `--schedule <value>` - `schedule`, object, required

## `braze message send-id create`

- Function: `create_send_id`
- Permission: `sends.id.create`
- Description: Create or reserve a send identifier for an API campaign so subsequent send-level analytics can be queried independently.
- Request: `POST /sends/id/create`
- Access: `write`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/messaging/send_messages/post_create_send_ids)

### Example JSON input

```json
{
  "campaign_id": "<campaign-id>",
  "send_id": "example-send-20260801"
}
```

### Example command

```sh
braze message send-id create --input '{"campaign_id":"<campaign-id>","send_id":"example-send-20260801"}' --confirm
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--campaign-id <value>` - `campaign_id`, string, required
- `--send-id <value>` - `send_id`, string

## `braze message send immediate`

- Function: `send_messages`
- Permission: `messages.send`
- Description: Send an API-defined message immediately to specific users, aliases, a segment, or a connected audience.
- Request: `POST /messages/send`
- Access: `write`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/messaging/send_messages/post_send_messages)

### Example JSON input

```json
{
  "external_user_ids": [
    "<external-id>"
  ],
  "recipient_subscription_state": "subscribed",
  "messages": {
    "email": {
      "app_id": "<app-id>",
      "from": "sender@example.com",
      "subject": "Example subject",
      "body": "<p>Example body</p>"
    }
  }
}
```

### Example command

```sh
braze message send immediate --input '{"external_user_ids":["<external-id>"],"recipient_subscription_state":"subscribed","messages":{"email":{"app_id":"<app-id>","from":"sender@example.com","subject":"Example subject","body":"<p>Example body</p>"}}}' --confirm
```

### Options

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
- `--recipient-subscription-state <value>` - `recipient_subscription_state`, string, one of: `opted_in`, `subscribed`, `all`
- `--messages <value>` - `messages`, object

## `braze message send campaign`

- Function: `send_triggered_campaigns`
- Permission: `campaigns.trigger.send`
- Description: Trigger an existing API campaign immediately for explicit recipients, a connected audience, or its configured audience.
- Request: `POST /campaigns/trigger/send`
- Access: `write`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/messaging/send_messages/post_send_triggered_campaigns)

### Example JSON input

```json
{
  "campaign_id": "<campaign-id>",
  "recipients": [
    {
      "external_user_id": "<external-id>"
    }
  ]
}
```

### Example command

```sh
braze message send campaign --input '{"campaign_id":"<campaign-id>","recipients":[{"external_user_id":"<external-id>"}]}' --confirm
```

### Options

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
- Description: Trigger an existing API Canvas immediately for explicit recipients, a connected audience, or its configured audience.
- Request: `POST /canvas/trigger/send`
- Access: `write`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/messaging/send_messages/post_send_triggered_canvases)

### Example JSON input

```json
{
  "canvas_id": "<canvas-id>",
  "recipients": [
    {
      "external_user_id": "<external-id>"
    }
  ]
}
```

### Example command

```sh
braze message send canvas --input '{"canvas_id":"<canvas-id>","recipients":[{"external_user_id":"<external-id>"}]}' --confirm
```

### Options

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
- Description: Create a new draft campaign by copying an existing campaign into the same workspace with a new name.
- Request: `POST /campaigns/duplicate`
- Access: `write`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/messaging/duplicate_messages/post_duplicate_campaigns)

### Example JSON input

```json
{
  "campaign_id": "<campaign-id>",
  "name": "Copy of onboarding campaign"
}
```

### Example command

```sh
braze message duplicate campaign --input '{"campaign_id":"<campaign-id>","name":"Copy of onboarding campaign"}' --confirm
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--campaign-id <value>` - `campaign_id`, string, required
- `--name <value>` - `name`, string, required
- `--description <value>` - `description`, string
- `--tag-names <value>` - `tag_names`, string

## `braze message duplicate canvas`

- Function: `duplicate_canvas`
- Permission: `canvas.duplicate`
- Description: Create a new draft Canvas by copying an existing Canvas into the same workspace with a new name.
- Request: `POST /canvas/duplicate`
- Access: `write`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/messaging/duplicate_messages/post_duplicate_canvases)

### Example JSON input

```json
{
  "canvas_id": "<canvas-id>",
  "name": "Copy of onboarding Canvas"
}
```

### Example command

```sh
braze message duplicate canvas --input '{"canvas_id":"<canvas-id>","name":"Copy of onboarding Canvas"}' --confirm
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--canvas-id <value>` - `canvas_id`, string, required
- `--name <value>` - `name`, string, required
- `--description <value>` - `description`, string
- `--tag-names <value>` - `tag_names`, string[]

## `braze message live-activity update`

- Function: `update_live_activity`
- Permission: `messages.live_activity.update`
- Description: Update the content state, notification, stale date, dismissal date, or completion state for one Live Activity.
- Request: `POST /messages/live_activity/update`
- Access: `write`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/messaging/live_activity/update)

### Example JSON input

```json
{
  "app_id": "<app-id>",
  "activity_id": "<activity-id>",
  "content_state": {
    "status": "active"
  }
}
```

### Example command

```sh
braze message live-activity update --input '{"app_id":"<app-id>","activity_id":"<activity-id>","content_state":{"status":"active"}}' --confirm
```

### Options

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
- Description: List product identifiers recorded from purchase events in paginated alphabetical order.
- Request: `GET /purchases/product_list`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/export/purchases/get_list_product_id)

### Example JSON input

```json
{
  "page": "0"
}
```

### Example command

```sh
braze purchase products --input '{"page":"0"}'
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--page <value>` - `page`, string

## `braze purchase quantity-series`

- Function: `get_quantity_series`
- Permission: `purchases.quantity_series`
- Description: Retrieve purchase counts by day or hour, optionally limited to an app and product identifier.
- Request: `GET /purchases/quantity_series`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/export/purchases/get_number_of_purchases)

### Example JSON input

```json
{
  "length": 7,
  "unit": "day",
  "product": "example-product"
}
```

### Example command

```sh
braze purchase quantity-series --input '{"length":7,"unit":"day","product":"example-product"}'
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--length <value>` - `length`, integer, required
- `--ending-at <value>` - `ending_at`, string
- `--app-id <value>` - `app_id`, string
- `--unit <value>` - `unit`, string
- `--product <value>` - `product`, string

## `braze purchase revenue-series`

- Function: `get_revenue_series`
- Permission: `purchases.revenue_series`
- Description: Retrieve purchase revenue by day or hour, optionally limited to an app and product identifier.
- Request: `GET /purchases/revenue_series`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/export/purchases/get_revenue_series)

### Example JSON input

```json
{
  "length": 7,
  "unit": "day",
  "product": "example-product"
}
```

### Example command

```sh
braze purchase revenue-series --input '{"length":7,"unit":"day","product":"example-product"}'
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--length <value>` - `length`, integer, required
- `--ending-at <value>` - `ending_at`, string
- `--app-id <value>` - `app_id`, string
- `--unit <value>` - `unit`, string
- `--product <value>` - `product`, string

## `braze sdk-authentication keys`

- Function: `get_sdk_authentication_keys`
- Permission: `sdk_authentication.keys`
- Description: List SDK Authentication public keys for one app, including identifiers, descriptions, and primary-key status.
- Request: `GET /app_group/sdk_authentication/keys`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/sdk_authentication/get_sdk_authentication_keys)

### Example JSON input

```json
{
  "app_id": "<app-id>"
}
```

### Example command

```sh
braze sdk-authentication keys --input '{"app_id":"<app-id>"}'
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--app-id <value>` - `app_id`, string, required

## `braze segment list`

- Function: `get_segment_list`
- Permission: `segments.list`
- Description: List non-archived segments in pages of 100 with identifiers, names, tags, and analytics-tracking status.
- Request: `GET /segments/list`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/export/segments/get_segment)

### Example JSON input

```json
{
  "page": 0,
  "sort_direction": "desc"
}
```

### Example command

```sh
braze segment list --input '{"page":0,"sort_direction":"desc"}'
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--page <value>` - `page`, integer
- `--sort-direction <value>` - `sort_direction`, string

## `braze segment get`

- Function: `get_segment_details`
- Permission: `segments.details`
- Description: Retrieve one segment's name, filter description, tags, teams, and creation or update timestamps.
- Request: `GET /segments/details`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/export/segments/get_segment_details)

### Example JSON input

```json
{
  "segment_id": "<segment-id>"
}
```

### Example command

```sh
braze segment get --input '{"segment_id":"<segment-id>"}'
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--segment-id <value>` - `segment_id`, string, required

## `braze segment data-series`

- Function: `get_segment_data_series`
- Permission: `segments.data_series`
- Description: Retrieve the estimated daily size of one analytics-enabled segment over a bounded range.
- Request: `GET /segments/data_series`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/export/segments/get_segment_analytics)

### Example JSON input

```json
{
  "segment_id": "<segment-id>",
  "length": 7
}
```

### Example command

```sh
braze segment data-series --input '{"segment_id":"<segment-id>","length":7}'
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--segment-id <value>` - `segment_id`, string, required
- `--length <value>` - `length`, integer, required
- `--ending-at <value>` - `ending_at`, string

## `braze send data-series`

- Function: `get_send_data_series`
- Permission: `sends.data_series`
- Description: Retrieve up to 14 days of delivery, engagement, conversion, and revenue metrics for one tracked API-campaign send identifier.
- Request: `GET /sends/data_series`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/export/campaigns/get_send_analytics)

### Example JSON input

```json
{
  "campaign_id": "<campaign-id>",
  "send_id": "<send-id>",
  "length": 7
}
```

### Example command

```sh
braze send data-series --input '{"campaign_id":"<campaign-id>","send_id":"<send-id>","length":7}'
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--campaign-id <value>` - `campaign_id`, string, required
- `--send-id <value>` - `send_id`, string, required
- `--length <value>` - `length`, integer, required
- `--ending-at <value>` - `ending_at`, string

## `braze session data-series`

- Function: `get_session_data_series`
- Permission: `sessions.data_series`
- Description: Retrieve app session counts by day or hour, optionally limited to an app and analytics-enabled segment.
- Request: `GET /sessions/data_series`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/export/sessions/get_sessions_analytics)

### Example JSON input

```json
{
  "length": 7,
  "unit": "day"
}
```

### Example command

```sh
braze session data-series --input '{"length":7,"unit":"day"}'
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--length <value>` - `length`, integer, required
- `--ending-at <value>` - `ending_at`, string
- `--app-id <value>` - `app_id`, string
- `--unit <value>` - `unit`, string
- `--segment-id <value>` - `segment_id`, string

## `braze sms invalid-phone list`

- Function: `get_invalid_phone_numbers`
- Permission: `sms.invalid_phone_numbers`
- Description: Query phone numbers Braze marked invalid by date range or explicit E.164 numbers, optionally filtering by invalidation reason.
- Request: `GET /sms/invalid_phone_numbers`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/sms/get_query_invalid_numbers)

### Example JSON input

```json
{
  "start_date": "2026-07-01",
  "end_date": "2026-08-01",
  "limit": 100
}
```

### Example command

```sh
braze sms invalid-phone list --input '{"start_date":"2026-07-01","end_date":"2026-08-01","limit":100}'
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--start-date <value>` - `start_date`, string
- `--end-date <value>` - `end_date`, string
- `--limit <value>` - `limit`, integer
- `--offset <value>` - `offset`, integer
- `--phone-numbers <value>` - `phone_numbers`, string[], maximum 50 items
- `--reason <value>` - `reason`, string, one of: `provider_error`, `deactivated`

## `braze sms invalid-phone remove`

- Function: `remove_invalid_phone_numbers`
- Permission: `sms.invalid_phone_numbers.remove`
- Description: Remove up to 50 E.164 phone numbers from Braze's invalid-number list so future SMS eligibility can be reevaluated.
- Request: `POST /sms/invalid_phone_numbers/remove`
- Access: `write`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/sms/post_remove_invalid_numbers)

### Example JSON input

```json
{
  "phone_numbers": [
    "+15555550123"
  ]
}
```

### Example command

```sh
braze sms invalid-phone remove --input '{"phone_numbers":["+15555550123"]}' --confirm
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--phone-numbers <value>` - `phone_numbers`, string[], required, maximum 50 items

## `braze email unsubscribes`

- Function: `query_unsubscribed_emails`
- Permission: `email.unsubscribes`
- Description: List email addresses that unsubscribed in a date range, each with its unsubscribed_at timestamp. Use for opt-out reconciliation and backfill; the payload carries no external ID, channel, or subscription group.
- Request: `GET /email/unsubscribes`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/email/get_query_unsubscribed_email_addresses)

### Example JSON input

```json
{
  "start_date": "2026-07-01",
  "end_date": "2026-08-01",
  "limit": 500
}
```

### Example command

```sh
braze email unsubscribes --input '{"start_date":"2026-07-01","end_date":"2026-08-01","limit":500}'
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--start-date <value>` - `start_date`, string
- `--end-date <value>` - `end_date`, string
- `--limit <value>` - `limit`, positive
- `--offset <value>` - `offset`, positive
- `--sort-direction <value>` - `sort_direction`, string, one of: `asc`, `desc`
- `--email <value>` - `email`, string

## `braze email hard-bounces`

- Function: `query_hard_bounced_emails`
- Permission: `email.hard_bounces`
- Description: List email addresses that hard bounced in a date range, each with its hard_bounced_at timestamp. Hard bounces are deliverability failures, not consent withdrawals.
- Request: `GET /email/hard_bounces`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/email/get_query_hard_bounces)

### Example JSON input

```json
{
  "start_date": "2026-07-01",
  "end_date": "2026-08-01",
  "limit": 500
}
```

### Example command

```sh
braze email hard-bounces --input '{"start_date":"2026-07-01","end_date":"2026-08-01","limit":500}'
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--start-date <value>` - `start_date`, string
- `--end-date <value>` - `end_date`, string
- `--limit <value>` - `limit`, positive
- `--offset <value>` - `offset`, positive
- `--email <value>` - `email`, string

## `braze email status`

- Function: `change_email_subscription_status`
- Permission: `email.status`
- Description: Set the account-level email subscription state for up to 50 addresses as opted_in, subscribed, or unsubscribed. This global state supersedes subscription groups on send, so a group-level unsubscribe alone does not globally unsubscribe a user.
- Request: `POST /email/status`
- Access: `write`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/email/post_email_subscription_status)

### Example JSON input

```json
{
  "email": [
    "<email>"
  ],
  "subscription_state": "unsubscribed"
}
```

### Example command

```sh
braze email status --input '{"email":["<email>"],"subscription_state":"unsubscribed"}' --confirm
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--email <value>` - `email`, string[], required, maximum 50 items
- `--subscription-state <value>` - `subscription_state`, string, required, one of: `opted_in`, `subscribed`, `unsubscribed`

## `braze subscription group-status`

- Function: `get_subscription_group_status`
- Permission: `subscription.status.get`
- Description: Read each identified user's subscribed or unsubscribed state within one email, SMS, or WhatsApp subscription group.
- Request: `GET /subscription/status/get`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/subscription_groups/get_list_user_subscription_group_status)

### Example JSON input

```json
{
  "subscription_group_id": "<subscription-group-id>",
  "external_id": [
    "<external-id>"
  ]
}
```

### Example command

```sh
braze subscription group-status --input '{"subscription_group_id":"<subscription-group-id>","external_id":["<external-id>"]}'
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--subscription-group-id <value>` - `subscription_group_id`, string, required
- `--external-id <value>` - `external_id`, string[], maximum 50 items
- `--email <value>` - `email`, string[], maximum 50 items
- `--phone <value>` - `phone`, string[], maximum 50 items

## `braze subscription user-groups`

- Function: `get_user_subscription_groups`
- Permission: `subscription.groups.get`
- Description: List subscription-group membership and history for users identified by external ID, email address, or phone number.
- Request: `GET /subscription/user/status`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/subscription_groups/get_list_user_subscription_groups)

### Example JSON input

```json
{
  "external_id": [
    "<external-id>"
  ],
  "limit": 100
}
```

### Example command

```sh
braze subscription user-groups --input '{"external_id":["<external-id>"],"limit":100}'
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--external-id <value>` - `external_id`, string[], maximum 50 items
- `--email <value>` - `email`, string[], maximum 50 items
- `--phone <value>` - `phone`, string[], maximum 50 items
- `--limit <value>` - `limit`, integer
- `--offset <value>` - `offset`, integer

## `braze subscription update`

- Function: `update_subscription_group_status`
- Permission: `subscription.status.set`
- Description: Subscribe or unsubscribe up to 50 users in one subscription group, with optional Braze double opt-in handling.
- Request: `POST /subscription/status/set`
- Access: `write`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/subscription_groups/post_update_user_subscription_group_status)

### Example JSON input

```json
{
  "subscription_group_id": "<subscription-group-id>",
  "subscription_state": "subscribed",
  "external_id": [
    "<external-id>"
  ],
  "use_double_opt_in_logic": false
}
```

### Example command

```sh
braze subscription update --input '{"subscription_group_id":"<subscription-group-id>","subscription_state":"subscribed","external_id":["<external-id>"],"use_double_opt_in_logic":false}' --confirm
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--subscription-group-id <value>` - `subscription_group_id`, string, required
- `--subscription-state <value>` - `subscription_state`, string, required, one of: `subscribed`, `unsubscribed`
- `--external-id <value>` - `external_id`, string[], maximum 50 items
- `--email <value>` - `email`, string[], maximum 50 items
- `--phone <value>` - `phone`, string[], maximum 50 items
- `--use-double-opt-in-logic <value>` - `use_double_opt_in_logic`, boolean

## `braze subscription update-v2`

- Function: `update_subscription_group_status_v2`
- Permission: `subscription.status.set`
- Description: Apply subscription state changes across multiple groups, using exactly one identifier type per group update.
- Request: `POST /v2/subscription/status/set`
- Access: `write`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/subscription_groups/post_update_user_subscription_group_status_v2)

### Example JSON input

```json
{
  "subscription_groups": [
    {
      "subscription_group_id": "<subscription-group-id>",
      "subscription_state": "subscribed",
      "external_ids": [
        "<external-id>"
      ]
    }
  ]
}
```

### Example command

```sh
braze subscription update-v2 --input '{"subscription_groups":[{"subscription_group_id":"<subscription-group-id>","subscription_state":"subscribed","external_ids":["<external-id>"]}]}' --confirm
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--subscription-groups <value>` - `subscription_groups`, object[], required

## `braze user export-ids`

- Function: `export_users_by_identifier`
- Permission: `users.export.ids`
- Description: Export user profiles by identifier, including the account-level email_subscribe and push_subscribe states and subscription group membership. This is the only way to read a user's global subscription state, which overrides group-level status on send.
- Request: `POST /users/export/ids`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/export/user_data/post_users_identifier)

### Example JSON input

```json
{
  "external_ids": [
    "<external-id>"
  ],
  "fields_to_export": [
    "external_id",
    "email",
    "email_subscribe",
    "subscription_groups"
  ]
}
```

### Example command

```sh
braze user export-ids --input '{"external_ids":["<external-id>"],"fields_to_export":["external_id","email","email_subscribe","subscription_groups"]}'
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--external-ids <value>` - `external_ids`, string[], maximum 50 items
- `--user-aliases <value>` - `user_aliases`, object[], maximum 50 items
- `--device-id <value>` - `device_id`, string
- `--braze-id <value>` - `braze_id`, string
- `--email-address <value>` - `email_address`, string
- `--phone <value>` - `phone`, string
- `--fields-to-export <value>` - `fields_to_export`, string[]

## `braze user alias create`

- Function: `create_user_alias`
- Permission: `users.alias.new`
- Description: Attach one or more alias name and label pairs to existing user profiles identified by external ID or user alias.
- Request: `POST /users/alias/new`
- Access: `write`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/user_data/post_user_alias)

### Example JSON input

```json
{
  "user_aliases": [
    {
      "external_id": "<external-id>",
      "alias_name": "example-alias",
      "alias_label": "legacy-id"
    }
  ]
}
```

### Example command

```sh
braze user alias create --input '{"user_aliases":[{"external_id":"<external-id>","alias_name":"example-alias","alias_label":"legacy-id"}]}' --confirm
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--user-aliases <value>` - `user_aliases`, object[], required, maximum 50 items

## `braze user alias update`

- Function: `update_user_alias`
- Permission: `users.alias.update`
- Description: Rename one or more existing user aliases while preserving their associated Braze user profiles.
- Request: `POST /users/alias/update`
- Access: `write`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/user_data/post_users_alias_update)

### Example JSON input

```json
{
  "alias_updates": [
    {
      "alias_label": "legacy-id",
      "old_alias_name": "old-alias",
      "new_alias_name": "new-alias"
    }
  ]
}
```

### Example command

```sh
braze user alias update --input '{"alias_updates":[{"alias_label":"legacy-id","old_alias_name":"old-alias","new_alias_name":"new-alias"}]}' --confirm
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--alias-updates <value>` - `alias_updates`, object[], required, maximum 50 items

## `braze user delete`

- Function: `delete_users`
- Permission: `users.delete`
- Description: Permanently delete up to 50 users selected by exactly one supported identifier type.
- Request: `POST /users/delete`
- Access: `write`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/user_data/post_user_delete)

### Example JSON input

```json
{
  "external_ids": [
    "<external-id>"
  ]
}
```

### Example command

```sh
braze user delete --input '{"external_ids":["<external-id>"]}' --confirm
```

### Options

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
- Description: Merge anonymous alias, email-only, or phone-only profiles into identified user profiles with external IDs.
- Request: `POST /users/identify`
- Access: `write`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/user_data/post_user_identify)

### Example JSON input

```json
{
  "aliases_to_identify": [
    {
      "external_id": "<external-id>",
      "user_alias": {
        "alias_name": "example-alias",
        "alias_label": "legacy-id"
      }
    }
  ]
}
```

### Example command

```sh
braze user identify --input '{"aliases_to_identify":[{"external_id":"<external-id>","user_alias":{"alias_name":"example-alias","alias_label":"legacy-id"}}]}' --confirm
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--aliases-to-identify <value>` - `aliases_to_identify`, object[], maximum 50 items
- `--emails-to-identify <value>` - `emails_to_identify`, object[], maximum 50 items
- `--phone-numbers-to-identify <value>` - `phone_numbers_to_identify`, object[], maximum 50 items

## `braze user track`

- Function: `track_users`
- Permission: `users.track`
- Description: Asynchronously create or update user attributes and record custom events or purchases, with up to 75 combined objects per request.
- Request: `POST /users/track`
- Access: `write`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/user_data/post_user_track)

### Example JSON input

```json
{
  "attributes": [
    {
      "external_id": "<external-id>",
      "first_name": "Example",
      "email_subscribe": "subscribed"
    }
  ]
}
```

### Example command

```sh
braze user track --input '{"attributes":[{"external_id":"<external-id>","first_name":"Example","email_subscribe":"subscribed"}]}' --confirm
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--attributes <value>` - `attributes`, object[], maximum 75 items
- `--events <value>` - `events`, object[], maximum 75 items
- `--purchases <value>` - `purchases`, object[], maximum 75 items

## `braze user track-sync`

- Function: `track_users_sync`
- Permission: `users.track.sync`
- Description: Synchronously create or update one user attribute, event, or purchase object and return item-level processing results.
- Request: `POST /users/track/sync`
- Access: `write`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/user_data/post_user_track_synchronous)

### Example JSON input

```json
{
  "attributes": [
    {
      "external_id": "<external-id>",
      "first_name": "Example",
      "email_subscribe": "subscribed"
    }
  ]
}
```

### Example command

```sh
braze user track-sync --input '{"attributes":[{"external_id":"<external-id>","first_name":"Example","email_subscribe":"subscribed"}]}' --confirm
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--attributes <value>` - `attributes`, object[], maximum 1 items
- `--events <value>` - `events`, object[], maximum 1 items
- `--purchases <value>` - `purchases`, object[], maximum 1 items

## `braze user merge`

- Function: `merge_users`
- Permission: `users.merge`
- Description: Merge data from one user profile into another retained profile using supported identifiers for both records.
- Request: `POST /users/merge`
- Access: `write`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/user_data/post_users_merge)

### Example JSON input

```json
{
  "merge_updates": [
    {
      "identifier_to_merge": {
        "external_id": "<old-external-id>"
      },
      "identifier_to_keep": {
        "external_id": "<retained-external-id>"
      }
    }
  ]
}
```

### Example command

```sh
braze user merge --input '{"merge_updates":[{"identifier_to_merge":{"external_id":"<old-external-id>"},"identifier_to_keep":{"external_id":"<retained-external-id>"}}]}' --confirm
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--merge-updates <value>` - `merge_updates`, object[], required, maximum 50 items

## `braze user external-id rename`

- Function: `rename_external_ids`
- Permission: `users.external_ids.rename`
- Description: Rename external identifiers while preserving the associated users, histories, attributes, and engagement data.
- Request: `POST /users/external_ids/rename`
- Access: `write`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/user_data/external_id_migration/post_external_ids_rename)

### Example JSON input

```json
{
  "external_id_renames": [
    {
      "current_external_id": "<old-external-id>",
      "new_external_id": "<new-external-id>"
    }
  ]
}
```

### Example command

```sh
braze user external-id rename --input '{"external_id_renames":[{"current_external_id":"<old-external-id>","new_external_id":"<new-external-id>"}]}' --confirm
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--external-id-renames <value>` - `external_id_renames`, object[], required, maximum 50 items

## `braze user external-id remove`

- Function: `remove_external_ids`
- Permission: `users.external_ids.remove`
- Description: Remove deprecated external identifiers from users without deleting their Braze profiles or accumulated data.
- Request: `POST /users/external_ids/remove`
- Access: `write`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/user_data/external_id_migration/post_external_ids_remove)

### Example JSON input

```json
{
  "external_ids": [
    "<external-id>"
  ]
}
```

### Example command

```sh
braze user external-id remove --input '{"external_ids":["<external-id>"]}' --confirm
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--external-ids <value>` - `external_ids`, string[], required, maximum 50 items

## `braze template email list`

- Function: `get_email_templates`
- Permission: `templates.email.list`
- Description: List email templates with optional modification-time filters and positive limit or offset pagination.
- Request: `GET /templates/email/list`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/templates/email_templates/get_list_email_templates)

### Example JSON input

```json
{
  "limit": 50,
  "offset": 1
}
```

### Example command

```sh
braze template email list --input '{"limit":50,"offset":1}'
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--modified-after <value>` - `modified_after`, string
- `--modified-before <value>` - `modified_before`, string
- `--limit <value>` - `limit`, positive
- `--offset <value>` - `offset`, positive

## `braze template email get`

- Function: `get_email_template_info`
- Permission: `templates.email.info`
- Description: Retrieve one email template's name, subject, HTML and plaintext bodies, preheader, tags, and CSS settings.
- Request: `GET /templates/email/info`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/templates/email_templates/get_see_email_template_information)

### Example JSON input

```json
{
  "email_template_id": "<email-template-id>"
}
```

### Example command

```sh
braze template email get --input '{"email_template_id":"<email-template-id>"}'
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--email-template-id <value>` - `email_template_id`, string, required

## `braze template email create`

- Function: `create_email_template`
- Permission: `templates.email.create`
- Description: Create a reusable email template with required name, subject, and HTML body plus optional plaintext, preheader, tags, and CSS inlining.
- Request: `POST /templates/email/create`
- Access: `write`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/templates/email_templates/post_create_email_template)

### Example JSON input

```json
{
  "template_name": "Example template",
  "subject": "Example subject",
  "body": "<p>Example body</p>",
  "plaintext_body": "Example body"
}
```

### Example command

```sh
braze template email create --input '{"template_name":"Example template","subject":"Example subject","body":"<p>Example body</p>","plaintext_body":"Example body"}' --confirm
```

### Options

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
- Description: Update one reusable email template by identifier with at least one changed content or metadata field.
- Request: `POST /templates/email/update`
- Access: `write`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/templates/email_templates/post_update_email_template)

### Example JSON input

```json
{
  "email_template_id": "<email-template-id>",
  "subject": "Updated subject"
}
```

### Example command

```sh
braze template email update --input '{"email_template_id":"<email-template-id>","subject":"Updated subject"}' --confirm
```

### Options

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
- Description: List reusable content blocks with optional modification-time filters and positive limit or offset pagination.
- Request: `GET /content_blocks/list`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/templates/content_blocks_templates/get_list_email_content_blocks)

### Example JSON input

```json
{
  "limit": 50,
  "offset": 1
}
```

### Example command

```sh
braze content-block list --input '{"limit":50,"offset":1}'
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--modified-after <value>` - `modified_after`, string
- `--modified-before <value>` - `modified_before`, string
- `--limit <value>` - `limit`, positive
- `--offset <value>` - `offset`, positive

## `braze content-block get`

- Function: `get_content_block_info`
- Permission: `content_blocks.info`
- Description: Retrieve one content block's content and metadata, optionally including where the block is used.
- Request: `GET /content_blocks/info`
- Access: `read`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/templates/content_blocks_templates/get_see_email_content_blocks_information)

### Example JSON input

```json
{
  "content_block_id": "<content-block-id>",
  "include_inclusion_data": true
}
```

### Example command

```sh
braze content-block get --input '{"content_block_id":"<content-block-id>","include_inclusion_data":true}'
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--content-block-id <value>` - `content_block_id`, string, required
- `--include-inclusion-data <value>` - `include_inclusion_data`, boolean

## `braze content-block create`

- Function: `create_content_block`
- Permission: `content_blocks.create`
- Description: Create a reusable active or draft content block with required name and content plus optional description and tags.
- Request: `POST /content_blocks/create`
- Access: `write`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/templates/content_blocks_templates/post_create_email_content_block)

### Example JSON input

```json
{
  "name": "Example block",
  "content": "<p>Example content</p>",
  "state": "draft",
  "tags": [
    "example"
  ]
}
```

### Example command

```sh
braze content-block create --input '{"name":"Example block","content":"<p>Example content</p>","state":"draft","tags":["example"]}' --confirm
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--name <value>` - `name`, string, required
- `--content <value>` - `content`, string, required
- `--description <value>` - `description`, string
- `--state <value>` - `state`, string, one of: `active`, `draft`
- `--tags <value>` - `tags`, string[]

## `braze content-block update`

- Function: `update_content_block`
- Permission: `content_blocks.update`
- Description: Update one reusable content block by identifier with at least one changed content, metadata, state, or tags field.
- Request: `POST /content_blocks/update`
- Access: `write`
- Documentation: [Authoritative reference](https://www.braze.com/docs/api/endpoints/templates/content_blocks_templates/post_update_content_block)

### Example JSON input

```json
{
  "content_block_id": "<content-block-id>",
  "content": "<p>Updated content</p>"
}
```

### Example command

```sh
braze content-block update --input '{"content_block_id":"<content-block-id>","content":"<p>Updated content</p>"}' --confirm
```

### Options

- `--input <json|@file>` - load a JSON input object
- `--confirm` - confirm the write operation
- `--content-block-id <value>` - `content_block_id`, string, required
- `--name <value>` - `name`, string
- `--content <value>` - `content`, string
- `--description <value>` - `description`, string
- `--state <value>` - `state`, string, one of: `active`, `draft`
- `--tags <value>` - `tags`, string[]
