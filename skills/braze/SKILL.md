---
name: braze
description: Operate the Braze REST API through braze-cli for category-first campaign, Canvas, segment, messaging, subscription, SMS, user, template, catalog, analytics, and content-block workflows. Use for bounded Braze reads, explicit opt-in or opt-out changes, structured JSON automation, permission diagnosis, and verified CLI delivery.
metadata:
  version: "1.1.0"
  binary: braze
---

# Braze

Use `braze` as the canonical binary. Treat generated help and JSON responses as the runtime contract.

## Start safely

1. Confirm the installed binary and version:

   ```sh
   command -v braze
   braze --version
   ```

2. Discover categories and the exact leaf command:

   ```sh
   braze --help
   braze campaign --help
   braze campaign list --help
   ```

3. Use `BRAZE_REST_ENDPOINT`, `BRAZE_API_KEY`, and optional `BRAZE_APP_ID`. The CLI also reads the current directory's `.env`. Never print, copy, or commit credential values.

4. Persist the resolved credentials when commands must work from any directory:

   ```sh
   braze login
   braze workspace list
   ```

   Login writes the standard names to the user config with mode `0600` and never prints the API key. Process environment and current `.env` values override the saved config.

## Read with discovery

Start with a list command, capture the exact resource identifier in memory, then call its detail or analytics command:

```sh
braze campaign list --page 0
braze campaign get --campaign-id <id>
braze campaign data-series --campaign-id <id> --length 7
```

Use the smallest useful time range or page. The CLI does not auto-paginate. A successful empty array proves the endpoint worked but not that the workspace contains matching data.

## Protect consent changes

Treat subscription, SMS, messaging, and user mutations as externally visible writes. Do not run them without explicit authorization for the target identifiers and intended state.

1. Read the current subscription state.
2. Build the smallest request.
3. Validate `subscribed`, `unsubscribed`, or `opted_in` semantics against command help.
4. Add `--confirm` only after review.
5. Read the same target again and verify the resulting state.

Never retry an ambiguous write until a read proves whether Braze committed it.

## Use the JSON contract

- Parse stdout only after exit status 0.
- Parse failures from stderr as `{ "ok": false, "error": { ... } }`.
- Branch on `error.code` and retry only when `error.retryable` is true.
- Treat HTTP 403 as a missing API-key permission for the leaf command.
- Keep provider payloads, user identifiers, phone numbers, emails, and credentials out of logs.
- Use `--input @request.json` for reviewed complex objects and explicit flags for small inputs.

## Validate repository behavior

Run deterministic checks before shipping:

```sh
npm ci
npm run verify
npm run test:live
```

`npm run test:live` executes all read commands through the CLI and emits only safe metadata. Supply `BRAZE_LIVE_*` fixture variables documented in `docs/live-read-validation.md` when validation must return resource data. A workspace without a fixture may report `verification: authorized_no_fixture` only after Braze returns HTTP 400 or 404; authentication, permission, and other failures still fail the run.

## Verify completion

For reads, report the command, permission, HTTP outcome, response type, and record count. For writes, finish with a bounded read-back. For package delivery, verify CI, the packed artifact, the registry-installed binary, and the published npm version.
