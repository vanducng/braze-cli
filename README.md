# braze-cli

Automation-friendly TypeScript CLI for the Braze REST API without an SDK or MCP transport. It provides category-first commands for the current [Braze MCP API function list](https://www.braze.com/docs/developer_guide/mcp_server/available_api_functions) plus complete [Subscription Groups](https://www.braze.com/docs/api/endpoints/subscription_groups), [SMS](https://www.braze.com/docs/api/endpoints/sms), [Messaging](https://www.braze.com/docs/api/endpoints/messaging), and [User Data](https://www.braze.com/docs/api/endpoints/user_data) endpoint coverage.

## Requirements

- Node.js 22.12 or newer
- A Braze REST API key with only the permissions needed by the commands you run

## Install

```sh
npm install --global braze-cli
braze --help
```

## Configure

Standard environment variables:

```dotenv
BRAZE_APP_ID=<optional-app-id>
BRAZE_REST_ENDPOINT=https://rest.example.braze.com
BRAZE_API_KEY=<api-key>
```

The CLI also reads a `.env` file in the current directory. Process environment values override `.env`. Legacy lowercase keys remain supported for backward compatibility, but new configuration should use the uppercase names above.

Persist the resolved credentials once so commands work from any directory:

```sh
braze login
```

`braze login` reads the process environment and current `.env`, then writes the standard names to `$XDG_CONFIG_HOME/braze/config.json` when configured or `~/.config/braze/config.json` otherwise. The directory is restricted to the current user and the file is created with mode `0600`. Process environment and current `.env` values override the saved config. The API key is never printed.

Keep `.env` out of source control. `braze workspace list` reports the configured endpoint, optional app ID, and whether a key exists, but never prints the key.

## Use

```sh
braze campaign list --page 0
braze campaign get --campaign-id <id>
braze segment data-series --segment-id <id> --length 7
braze template email get --email-template-id <id>
braze subscription update --subscription-group-id <id> --subscription-state subscribed --phone +15555550123 --use-double-opt-in-logic true --confirm
braze subscription update --subscription-group-id <id> --subscription-state unsubscribed --external-id <user-id> --confirm
```

Every command accepts individual flags or `--input '<json>'`. Prefix a path with `@` to load JSON from a file. Explicit flags override fields loaded through `--input`.

```sh
braze campaign get --input @request.json --campaign-id <override-id>
```

Success writes one Braze JSON value to stdout. Failures write one redacted JSON error to stderr and exit nonzero. The CLI does not paginate automatically.

All 33 write commands require `--confirm`. Review the request before adding it. Live tests are read-only; writes are tested against a local server.

Every leaf command provides a detailed purpose, required permission, REST request, authoritative Braze documentation URL, safe JSON input, executable CLI example, and typed option constraints:

```sh
braze campaign get --help
braze subscription update --help
```

See the generated [command reference](docs/commands.md) for the same agent-ready documentation across all 72 commands.

Agents can use the packaged [`$braze` skill](skills/braze/SKILL.md) for safe discovery, consent operations, error handling, and delivery verification.

## Develop

```sh
npm ci
npm run docs:generate
npm run verify
npm run test:live
```

`npm run test:live` exercises all 37 read commands with local credentials and prints only safe status metadata. See [live read validation](docs/live-read-validation.md) for permissions and optional fixtures.

## Release

CI verifies Node.js 22.12 and 24. Publishing runs only from a stable GitHub Release whose `vX.Y.Z` tag matches `package.json`; npm authentication uses trusted publishing with OIDC instead of a stored write token.
