import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import process from "node:process";
import { commandPath, flagName, functions } from "../lib/functions.js";

const outputPath = resolve("docs/commands.md");
const lines = [
  "# Command reference",
  "",
  "Generated from the CLI catalog. Run `npm run docs:generate` after changing commands.",
  "",
];

for (const definition of functions) {
  lines.push(`## \`braze ${commandPath(definition)}\``, "", `- Function: \`${definition.mcp}\``, `- Permission: \`${definition.permission}\``);
  if (definition.description) lines.push(`- Description: ${definition.description}`);
  if (definition.method) lines.push(`- Request: \`${definition.method} ${definition.path}\``);
  lines.push(`- Access: \`${definition.access}\``, "", "Options:", "");
  if (definition.mcp !== "login") lines.push("- `--input <json|@file>` - load a JSON input object");
  if (definition.access === "write") lines.push("- `--confirm` - confirm the write operation");
  for (const parameter of definition.parameters) {
    lines.push(`- \`--${flagName(parameter)} <value>\` - \`${parameter.name}\`, ${parameter.type}${parameter.required ? ", required" : ""}${parameter.maxItems ? `, maximum ${parameter.maxItems} items` : ""}`);
  }
  lines.push("");
}

const content = lines.join("\n");
if (process.argv.includes("--check")) {
  let current = "";
  try { current = readFileSync(outputPath, "utf8"); } catch {}
  if (current !== content) {
    process.stderr.write("docs/commands.md is out of date. Run npm run docs:generate.\n");
    process.exitCode = 1;
  }
} else {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, content);
}
