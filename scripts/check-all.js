#!/usr/bin/env node
"use strict";

const { spawnSync } = require("node:child_process");

const checks = [
  ["node", ["--check", "app.js"]],
  ["node", ["--check", "core.js"]],
  ["node", ["--check", "scripts/lib/content.js"]],
  ["node", ["scripts/validate-content.js", "--complete"]],
  ["node", ["scripts/smoke-static.js"]],
  ["node", ["scripts/check-guides.js"]],
  ["node", ["--test"]],
];

for (const [command, args] of checks) {
  console.log(`> ${command} ${args.join(" ")}`);
  const result = spawnSync(command, args, { stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status || 1);
}

console.log("All checks passed.");
