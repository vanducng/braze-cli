# Live read validation

`npm run test:live` executes every read-only REST command through the built `braze` binary. It discovers dependent identifiers from list responses and prints only safe metadata: command, required permission, status, HTTP code, response type, and record count.

The test fails when any command is rejected, returns embedded item errors, emits invalid JSON, or lacks a required fixture.

## Credentials

Use the standard `.env` configuration:

```dotenv
BRAZE_REST_ENDPOINT=https://rest.example.braze.com
BRAZE_API_KEY=<read-key>
BRAZE_APP_ID=<app-id>
```

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

Send analytics are retained for a limited period and require a tracked API campaign `send_id`, so that fixture cannot be discovered from campaign-list responses.

## Result states

- `passed`: Braze returned successful JSON without item errors.
- `failed`: the CLI, API, or response contract failed.
- `blocked`: the command needs a fixture that discovery and `BRAZE_LIVE_*` variables did not provide.

Empty data arrays remain successful reads and are reported with `has_data: false`.
