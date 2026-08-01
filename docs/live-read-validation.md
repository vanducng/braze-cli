# Live read validation

`npm run test:live` executes every read-only REST command through the built `braze` binary. It discovers dependent identifiers from list responses and prints only safe metadata: command, required permission, status, HTTP code, response type, and record count.

The test fails when any command is unauthorized, returns embedded item errors, or emits invalid JSON. When a workspace has no resource to discover, an HTTP 400 or 404 from a synthetic identifier is reported as `authorized_no_fixture`; this proves routing, authentication, and permission without creating production data.

## Credentials

Run `braze login` and enter a read-only API key. The App ID is optional. The saved login works from any directory.

The API key needs every read permission listed by `npm run test:live`. A Braze HTTP 403 is reported with the exact missing permission.

## Optional fixtures

Most identifiers are discovered automatically. Set these process environment variables only when the workspace cannot expose a suitable fixture through a list endpoint:

- `BRAZE_LIVE_APP_ID`
- `BRAZE_LIVE_CAMPAIGN_ID`
- `BRAZE_LIVE_CANVAS_ID`
- `BRAZE_LIVE_CATALOG_NAME`
- `BRAZE_LIVE_CATALOG_ITEM_ID`
- `BRAZE_LIVE_EVENT_NAME`
- `BRAZE_LIVE_CDI_INTEGRATION_ID`
- `BRAZE_LIVE_SEGMENT_ID`
- `BRAZE_LIVE_SEND_CAMPAIGN_ID`
- `BRAZE_LIVE_SEND_ID`
- `BRAZE_LIVE_SUBSCRIPTION_GROUP_ID`
- exactly one of `BRAZE_LIVE_EXTERNAL_ID`, `BRAZE_LIVE_EMAIL`, or `BRAZE_LIVE_PHONE`
- `BRAZE_LIVE_EMAIL_TEMPLATE_ID`
- `BRAZE_LIVE_CONTENT_BLOCK_ID`

Send analytics are retained for a limited period and require a tracked API campaign `send_id`, so that fixture cannot be discovered from campaign-list responses. Provide one when validation must return analytics data instead of an authorization-only result.

## Result states

- `passed`: Braze returned successful JSON without item errors, or returned a resource-specific HTTP 400/404 with `verification: authorized_no_fixture` because the workspace has no discoverable fixture.
- `failed`: the CLI, API, or response contract failed.
- `blocked`: reserved for a dependency that cannot be safely probed.

Empty data arrays remain successful reads and are reported with `has_data: false`.
