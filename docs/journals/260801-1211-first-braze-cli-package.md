---
date: 2026-08-01 12:11
mode: retro
branch: feat/braze-cli-mcp-api
pr: n/a
plan: .workbench/features/braze-cli-mcp-api/plans/260801-1129-braze-cli-mcp-api
status: pre-pr
---

# First Braze CLI Package

## What shipped

- `braze-cli@0.1.0` is ready as a locally packed CLI with 42 category-first commands covering 41 Braze REST endpoints plus local workspace configuration discovery.
- One declarative command catalog drives Commander registration, validation, generated documentation, and endpoint tests.
- Direct REST execution uses native `fetch`, Bearer authentication, bounded timeouts, JSON requests, and multipart media upload without an SDK or MCP transport.

## Why this shape

We chose compiled ESM modules in `lib/` over shipping TypeScript source or adding a bundler. Shipping `src/index.ts` looked simpler, but installed dependencies hit Node's `ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING`. Compiling before packing is the smallest reliable package boundary. A bundler was rejected because plain TypeScript emission already produces an executable artifact and keeps stack traces and module boundaries understandable.

## What was harder than expected

The frustrating part was discovering that direct TypeScript execution worked from the checkout but failed after installation under `node_modules`. That is exactly the kind of local success that gives false confidence. The package smoke now installs the tarball into a temporary prefix and runs the installed binary, so this cannot quietly regress.

Safety also had to be explicit. All five write commands require `--confirm`, write failures are never presented as safely retryable, provider payloads and credentials are redacted, and the live check is restricted to `campaign list`.

## Verification

- TypeScript typecheck passed and 13 tests passed, including every REST mapping and the exact 42-command contract.
- Package smoke passed with 10 intended files and installed REST success and failure paths.
- Read-only live smoke passed with `campaign_count: 100` while printing no campaign payload.
- `actionlint` passed, the dependency audit reported 0 vulnerabilities, independent review was clean, and `.env` remained ignored, untracked, and unstaged.

## Next steps

- Ship owner: commit, open the PR, wait for CI, and resolve any actionable review thread today.
- Package owner: publish to npm only after registry ownership and release authority are explicitly approved.
