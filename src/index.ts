#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { CommanderError } from "commander";
import { createProgram } from "./cli.ts";
import { CliError, errorPayload } from "./errors.ts";

const packageJson = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
) as { version: string };

try {
  await createProgram(packageJson.version).parseAsync();
} catch (error) {
  if (!(error instanceof CommanderError && error.exitCode === 0)) {
    const safe = error instanceof CommanderError ? new CliError("usage_error", error.message, { nextSteps: ["Run braze --help to list commands."] }) : error;
    process.stderr.write(`${JSON.stringify(errorPayload(safe))}\n`);
    process.exitCode = 1;
  }
}
