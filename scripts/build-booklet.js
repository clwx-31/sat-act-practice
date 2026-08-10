#!/usr/bin/env node
"use strict";

// Builds a printable practice test from the canonical banks.
//
//   node scripts/build-booklet.js --form sat-full --seed spring-1 --pdf
//
// Emits a two-column booklet, a separate answer key, and optional LaTeX
// source into build/. PDF conversion shells out to an installed Chrome; no
// package installation is required for any output format.
//
// The filename avoids the `-test.js` suffix on purpose: `node --test` globs
// that pattern and would execute this script during the test run.

const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawn } = require("child_process");

const core = require("../core.js");
const booklet = require("../booklet.js");
const { ROOT, loadCatalog, loadBank } = require("./lib/content.js");

const CHROME_CANDIDATES = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
];

function parseArgs(argv) {
  const options = {
    form: "sat-full",
    seed: String(Date.now()),
    outDir: path.join(ROOT, "build"),
    pdf: false,
    tex: false,
    list: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const flag = argv[index];
    const value = argv[index + 1];
    if (flag === "--form" || flag === "-f") { options.form = value; index += 1; }
    else if (flag === "--seed" || flag === "-s") { options.seed = value; index += 1; }
    else if (flag === "--out" || flag === "-o") { options.outDir = path.resolve(value); index += 1; }
    else if (flag === "--pdf") options.pdf = true;
    else if (flag === "--tex") options.tex = true;
    else if (flag === "--list" || flag === "-l") options.list = true;
    else if (flag === "--help" || flag === "-h") options.help = true;
    else throw new Error(`Unknown option: ${flag}`);
  }
  return options;
}

function usage() {
  return [
    "Usage: node scripts/build-booklet.js [options]",
    "",
    "  -f, --form <id>   blueprint id (default sat-full); --list to see them",
    "  -s, --seed <str>  seed controlling which questions are drawn",
    "  -o, --out <dir>   output directory (default build/)",
    "      --pdf         also render PDFs using an installed Chrome",
    "      --tex         also emit pdflatex-ready LaTeX source",
    "  -l, --list        list available blueprints and exit",
  ].join("\n");
}

function findChrome() {
  return CHROME_CANDIDATES.find((candidate) => fs.existsSync(candidate)) || null;
}

function sleepSync(milliseconds) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, milliseconds);
}

// Headless Chrome reliably writes the PDF but then often lingers instead of
// exiting, so waiting on the process stalls for the full timeout. The finished
// file is the success signal: poll until its size stops growing, then stop the
// browser ourselves.
function htmlToPdf(chrome, htmlPath, pdfPath, timeoutMs) {
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), "booklet-"));
  fs.rmSync(pdfPath, { force: true });
  const child = spawn(
    chrome,
    [
      "--headless",
      "--disable-gpu",
      "--no-sandbox",
      "--no-pdf-header-footer",
      "--run-all-compositor-stages-before-draw",
      `--user-data-dir=${profile}`,
      `--print-to-pdf=${pdfPath}`,
      `file://${htmlPath}`,
    ],
    { stdio: "ignore" },
  );

  const deadline = Date.now() + (timeoutMs || 120000);
  let lastSize = -1;
  let done = false;
  while (Date.now() < deadline && !done) {
    sleepSync(400);
    if (!fs.existsSync(pdfPath)) continue;
    const size = fs.statSync(pdfPath).size;
    done = size > 0 && size === lastSize;
    lastSize = size;
  }

  try {
    child.kill("SIGKILL");
  } catch (error) {
    /* already gone */
  }
  // The killed browser may still be flushing its profile; a leftover temp
  // directory is harmless, so cleanup must never fail the build.
  sleepSync(300);
  try {
    fs.rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
  } catch (error) {
    /* the OS will reclaim it */
  }

  if (!done) {
    throw new Error(
      `Chrome did not finish ${path.basename(pdfPath)} within ` +
        `${Math.round((timeoutMs || 120000) / 1000)}s.`,
    );
  }
}

function main() {
  let options;
  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(`${error.message}\n\n${usage()}`);
    process.exit(2);
  }

  if (options.help) {
    console.log(usage());
    return;
  }

  if (options.list) {
    core.ALL_BLUEPRINTS.forEach((blueprint) => {
      const total = core.blueprintTotal(blueprint);
      console.log(
        `${blueprint.id.padEnd(18)} ${String(total).padStart(3)} questions  ` +
          `${String(blueprint.minutes).padStart(3)} min  ${blueprint.label}`,
      );
    });
    return;
  }

  const blueprint = core.blueprintById(options.form);
  if (!blueprint) {
    console.error(
      `Unknown form "${options.form}". Run with --list to see the available ids.`,
    );
    process.exit(2);
  }

  const catalog = loadCatalog();
  const bankBySection = {};
  catalog.sections.forEach((section) => {
    bankBySection[section.key] = loadBank(section.key);
  });

  const form = core.buildTestForm(bankBySection, blueprint, options.seed);
  const short = form.filter((group) => group.questions.length < group.entry.count);
  if (short.length) {
    short.forEach((group) => {
      console.error(
        `Warning: ${group.label} drew ${group.questions.length} of ` +
          `${group.entry.count} requested items — the bank is short.`,
      );
    });
  }

  const model = booklet.buildModel(form, blueprint, options.seed);
  fs.mkdirSync(options.outDir, { recursive: true });

  const base = `${blueprint.id}-${model.formCode}`;
  const written = [];

  const testHtml = path.join(options.outDir, `${base}-test.html`);
  fs.writeFileSync(testHtml, booklet.renderBookletHtml(model));
  written.push(testHtml);

  const keyHtml = path.join(options.outDir, `${base}-key.html`);
  fs.writeFileSync(keyHtml, booklet.renderKeyHtml(model));
  written.push(keyHtml);

  if (options.tex) {
    const texPath = path.join(options.outDir, `${base}-test.tex`);
    fs.writeFileSync(texPath, booklet.renderTex(model));
    written.push(texPath);
  }

  if (options.pdf) {
    const chrome = findChrome();
    if (!chrome) {
      console.error(
        "No Chrome-family browser found for PDF rendering. The HTML booklets " +
          "are still usable: open one and print to PDF.",
      );
    } else {
      [
        [testHtml, path.join(options.outDir, `${base}-test.pdf`)],
        [keyHtml, path.join(options.outDir, `${base}-key.pdf`)],
      ].forEach(([source, target]) => {
        htmlToPdf(chrome, source, target);
        written.push(target);
      });
    }
  }

  console.log(
    `${blueprint.label}\n  form ${model.formCode}  seed "${options.seed}"  ` +
      `${model.total} questions  ${model.minutes} minutes`,
  );
  model.sections.forEach((section) => {
    console.log(
      `    ${section.label.padEnd(34)} ${String(section.questions.length).padStart(3)} ` +
        `q  ${section.firstNumber}-${section.lastNumber}`,
    );
  });
  written.forEach((file) => console.log(`  wrote ${path.relative(ROOT, file)}`));
}

main();
