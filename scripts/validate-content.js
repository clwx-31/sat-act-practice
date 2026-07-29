#!/usr/bin/env node
"use strict";

const { validateAll } = require("./lib/content");

const requireComplete = process.argv.includes("--complete");
const result = validateAll({ requireComplete });

if (result.errors.length > 0) {
  console.error(`Content validation failed with ${result.errors.length} error(s):`);
  result.errors.slice(0, 100).forEach((error) => console.error(`- ${error}`));
  if (result.errors.length > 100) {
    console.error(`- … ${result.errors.length - 100} more`);
  }
  process.exit(1);
}

console.log(
  `Validated ${result.questions.length} questions across ` +
  `${result.catalog.sections.length} sections${requireComplete ? " (complete mode)" : ""}.`,
);
