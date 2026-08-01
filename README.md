# braze-cli

Automation-friendly TypeScript CLI for the Braze REST API without an SDK or MCP transport. It provides category-first commands for the current [Braze MCP API function list](https://www.braze.com/docs/developer_guide/mcp_server/available_api_functions) plus complete [Subscription Groups](https://www.braze.com/docs/api/endpoints/subscription_groups), [SMS](https://www.braze.com/docs/api/endpoints/sms), [Messaging](https://www.braze.com/docs/api/endpoints/messaging), and [User Data](https://www.braze.com/docs/api/endpoints/user_data) endpoint coverage.

## Requirements

- Node.js 22.12 or newer
- A Braze REST API key with only the permissions needed by the commands you run

## Install

```sh
git clone https://github.com/vanducng/braze-cli.git
cd braze-cli
npm ci
npm pack
npm install --global ./braze-cli-0.1.0.tgz
braze --help
```

The package is not published to npm yet. After publication, `npm install --global braze-cli` will be the supported registry install.

## Configure

Preferred environment variables:

```dotenv
BRAZE_REST_ENDPOINT=https://rest.example.braze.com
BRAZE_API_KEY=<api-key>
BRAZE_APP_ID=<optional-app-id>
```

The CLI also reads a `.env` file in the current directory. Existing `braze_host`, `braze_api_token`, and `braze_login` keys remain supported. Resolution order is process uppercase, process compatibility keys, `.env` uppercase, then `.env` compatibility keys.

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

All 33 write commands require `--confirm`. Review the request before adding it. Live tests in this repository use only `campaign list`; writes are tested against a local server.

See the generated [command reference](docs/commands.md) for all 71 commands, permissions, endpoints, and flags.

## Develop

```sh
npm ci
npm run docs:generate
npm run verify
npm run test:live
```

`npm run test:live` reads local credentials and prints only a campaign count.
