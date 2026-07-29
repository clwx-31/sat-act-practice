#!/usr/bin/env node
"use strict";

const { validateAll } = require("./lib/content");

const result = validateAll();
const lines = [
  "# Content Coverage Report",
  "",
  `Content version: ${result.catalog.contentVersion}`,
  "",
  "| Section | Accepted | Target | Easy | Medium | Hard | Pending editorial |",
  "| --- | ---: | ---: | ---: | ---: | ---: | ---: |",
];

result.catalog.sections.forEach((section) => {
  const report = result.report[section.key];
  lines.push(
    `| ${section.test} ${section.shortLabel} | ${report.total} | ${report.target} | ` +
    `${report.difficulties.Easy || 0} | ${report.difficulties.Medium || 0} | ` +
    `${report.difficulties.Hard || 0} | ${report.reviewStatuses["pending-editorial"] || 0} |`,
  );
});

lines.push("", "## Domain coverage", "");
result.catalog.sections.forEach((section) => {
  lines.push(`### ${section.test} ${section.shortLabel}`, "");
  lines.push("| Domain | Accepted | Target |", "| --- | ---: | ---: |");
  section.domains.forEach((domain) => {
    lines.push(
      `| ${domain.name} | ${result.report[section.key].domains[domain.name] || 0} | ` +
      `${domain.target} |`,
    );
  });
  lines.push("");
});

lines.push(
  "## Validation status",
  "",
  result.errors.length === 0
    ? "The current records pass schema, duplicate, answer, and metadata validation."
    : `Validation currently reports ${result.errors.length} error(s).`,
  "",
);

process.stdout.write(`${lines.join("\n")}\n`);
