#!/usr/bin/env node
"use strict";

/**
 * Validates the guides/ markdown library:
 *   - every relative Markdown link resolves to a file that exists
 *   - every guide is reachable from guides/README.md
 *   - no guide is empty or missing a top-level heading
 *
 * The guides are documentation, not question-bank content, so they are checked
 * here rather than by scripts/validate-content.js.
 */

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const guidesDir = path.join(root, "guides");
const indexFile = path.join(guidesDir, "README.md");

const errors = [];

function listMarkdown(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listMarkdown(full));
    else if (entry.name.endsWith(".md")) out.push(full);
  }
  return out;
}

// Relative Markdown links, ignoring images and absolute/anchor-only targets.
function linksIn(contents) {
  const found = [];
  const pattern = /\[[^\]]*\]\(([^)]+)\)/g;
  let match;
  while ((match = pattern.exec(contents)) !== null) {
    const target = match[1].trim();
    if (/^(https?:|mailto:|#)/.test(target)) continue;
    found.push(target.split("#")[0]);
  }
  return found.filter(Boolean);
}

if (!fs.existsSync(guidesDir)) {
  console.error("guides/ directory is missing");
  process.exit(1);
}

const files = listMarkdown(guidesDir).sort();
const reachable = new Set();

for (const file of files) {
  const rel = path.relative(root, file);
  const contents = fs.readFileSync(file, "utf8");

  if (contents.trim().length === 0) {
    errors.push(`${rel}: file is empty`);
    continue;
  }
  if (!/^#\s+\S/m.test(contents)) {
    errors.push(`${rel}: no top-level heading`);
  }

  for (const target of linksIn(contents)) {
    const resolved = path.resolve(path.dirname(file), target);
    if (!fs.existsSync(resolved)) {
      errors.push(`${rel}: broken link -> ${target}`);
    } else if (resolved.startsWith(guidesDir)) {
      reachable.add(resolved);
    }
  }
}

// Reachability from the index, following links transitively.
const seen = new Set([indexFile]);
const queue = [indexFile];
while (queue.length > 0) {
  const current = queue.shift();
  const contents = fs.readFileSync(current, "utf8");
  for (const target of linksIn(contents)) {
    const resolved = path.resolve(path.dirname(current), target);
    if (!resolved.startsWith(guidesDir)) continue;
    if (!resolved.endsWith(".md")) continue;
    if (seen.has(resolved) || !fs.existsSync(resolved)) continue;
    seen.add(resolved);
    queue.push(resolved);
  }
}

for (const file of files) {
  if (!seen.has(file)) {
    errors.push(`${path.relative(root, file)}: not reachable from guides/README.md`);
  }
}

if (errors.length > 0) {
  console.error(`guides check failed with ${errors.length} problem(s):`);
  for (const error of errors) console.error(`  ${error}`);
  process.exit(1);
}

console.log(`guides check passed: ${files.length} files, all links resolve, all reachable`);
