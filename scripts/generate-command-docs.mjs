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
  "Examples use non-production placeholders. Replace every `<...>` value, review the linked Braze documentation, and inspect the request before adding `--confirm` to a write.",
  "",
];

for (const definition of functions) {
  lines.push(`## \`braze ${commandPath(definition)}\``, "", `- Function: \`${definition.mcp}\``, `- Permission: \`${definition.permission}\``);
  lines.push(`- Description: ${definition.description}`);
  if (definition.method) lines.push(`- Request: \`${definition.method} ${definition.path}\``);
  lines.push(`- Access: \`${definition.access}\``, `- Documentation: [Authoritative reference](${definition.documentation})`, "");
  const input = definition.exampleInput === undefined ? undefined : JSON.stringify(definition.exampleInput);
  const example = input ? `braze ${commandPath(definition)} --input '${input}'${definition.access === "write" ? " --confirm" : ""}` : `braze ${commandPath(definition)}`;
  if (input) lines.push("### Example JSON input", "", "```json", JSON.stringify(definition.exampleInput, null, 2), "```", "");
  lines.push("### Example command", "", "```sh", example, "```", "", "### Options", "");
  if (definition.mcp !== "login") lines.push("- `--input <json|@file>` - load a JSON input object");
  if (definition.access === "write") lines.push("- `--confirm` - confirm the write operation");
  for (const parameter of definition.parameters) {
    lines.push(`- \`--${flagName(parameter)} <value>\` - \`${parameter.name}\`, ${parameter.type}${parameter.required ? ", required" : ""}${parameter.choices ? `, one of: ${parameter.choices.map((choice) => `\`${choice}\``).join(", ")}` : ""}${parameter.maxItems ? `, maximum ${parameter.maxItems} items` : ""}`);
  }
  if (definition.mcp === "login") lines.push("- No input options. Use `--help` to display this reference.");
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
