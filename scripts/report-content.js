#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { validateAll } = require("./lib/content");

const result = validateAll();
const lines = [
  "# Content Coverage Report",
  "",
  `Content version: ${result.catalog.contentVersion}`,
  "",
  "| Section | Accepted | Target | Easy | Medium | Hard | Awaiting human review |",
  "| --- | ---: | ---: | ---: | ---: | ---: | ---: |",
];

result.catalog.sections.forEach((section) => {
  const report = result.report[section.key];
  const awaitingReview =
    report.total - (report.reviewStatuses["editorial-reviewed"] || 0);
  lines.push(
    `| ${section.test} ${section.shortLabel} | ${report.total} | ${report.target} | ` +
    `${report.difficulties.Easy || 0} | ${report.difficulties.Medium || 0} | ` +
    `${report.difficulties.Hard || 0} | ${awaitingReview} |`,
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
  "## Response and answer distribution",
  "",
  "| Section | Multiple choice | Numeric | Essay | A | B | C | D |",
  "| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |",
);
result.catalog.sections.forEach((section) => {
  const report = result.report[section.key];
  lines.push(
    `| ${section.test} ${section.shortLabel} | ` +
    `${report.responseTypes["multiple-choice"] || 0} | ` +
    `${report.responseTypes.numeric || 0} | ${report.responseTypes.essay || 0} | ` +
    `${report.answerPositions["0"] || 0} | ${report.answerPositions["1"] || 0} | ` +
    `${report.answerPositions["2"] || 0} | ${report.answerPositions["3"] || 0} |`,
  );
});

lines.push(
  "",
  "## Validation status",
  "",
  result.errors.length === 0
    ? "The current records pass schema, taxonomy, duplicate, answer-key, " +
      "instructional-metadata, and coverage validation."
    : `Validation currently reports ${result.errors.length} error(s).`,
  "",
  "Automated verification does not equal human editorial approval. Every current",
  "record remains awaiting independent editorial review.",
  "",
);

const output = `${lines.join("\n")}\n`;
if (process.argv.includes("--write")) {
  const target = path.join(__dirname, "..", "docs", "CONTENT_REPORT.md");
  fs.writeFileSync(target, output);
  console.log(`Wrote ${path.relative(process.cwd(), target)}.`);
} else {
  process.stdout.write(output);
}
