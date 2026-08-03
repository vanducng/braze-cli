# braze-cli

Category-first CLI for Braze automation. Commands are grouped under familiar resources such as campaigns, segments, subscriptions, messages, and users.

## Requirements

- Node.js 22.12 or newer
- A Braze API key with only the permissions needed by the commands you run

## Install

```sh
npm install --global braze-cli
braze --help
```

## Configure

Run the interactive login once so commands work from any directory:

```sh
braze login
```

Copy the REST endpoint and API key from [**Settings > APIs and Identifiers > API Keys**](https://www.braze.com/docs/api/basics#endpoints) in Braze. The wizard securely reads the API key without displaying it and accepts an optional App ID. Press Enter to keep an existing value. Enter `-` at the App ID prompt to remove it.

Credentials are stored in `$XDG_CONFIG_HOME/braze/config.json` when configured or `~/.config/braze/config.json` otherwise. The directory is restricted to the current user and the file uses mode `0600`. `braze workspace list` reports whether configuration exists without printing the API key.

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

Every leaf command provides purpose, permission, safe JSON input, an executable example, and typed option constraints:

```sh
braze campaign get --help
braze subscription update --help
```

See the generated [command reference](docs/commands.md) for agent-ready help across the CLI.

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

CI verifies Node.js 22.12 and 24. Release Please owns versions, changelog, tags, and GitHub Releases: merge Conventional Commits to `main` and it maintains a release PR (`fix:` bumps patch, `feat:` and breaking changes bump minor while pre-1.0). Merging that release PR publishes to npm in the same workflow run. Never bump `version` or edit `CHANGELOG.md` by hand. npm authentication uses trusted publishing with OIDC instead of a stored write token.
