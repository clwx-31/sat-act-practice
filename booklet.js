// Turns a built test form into printable artifacts. The model step is shared
// so the HTML booklet, the answer key, and the LaTeX source always number and
// letter questions identically. Loaded both by the build script and by the
// page, so the booklet a browser prints matches the one the CLI writes.
(function (root, factory) {
  const api = factory(
    typeof module === "object" && module.exports
      ? require("./core.js")
      : root.PracticeCore,
  );
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.PracticeBooklet = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function (core) {
  "use strict";

function buildModel(form, blueprint, seed) {
  let number = 0;
  const sections = form.map((group, index) => {
    const questions = group.questions.map((question) => {
      number += 1;
      const letters = core.answerLetters(blueprint.test, number);
      return {
        number,
        letters,
        question,
        correctLetter:
          question.responseType === "multiple-choice"
            ? letters[question.correctAnswer]
            : null,
      };
    });
    return {
      index,
      label: group.label,
      minutes: group.minutes,
      directions: group.directions,
      questions,
      firstNumber: questions.length ? questions[0].number : null,
      lastNumber: questions.length ? questions[questions.length - 1].number : null,
    };
  });

  return {
    blueprint,
    seed,
    // Scoped to the blueprint so one shared seed does not print the same form
    // code on an SAT booklet and an ACT booklet.
    formCode: formCode(`${blueprint.id}-${seed}`),
    sections,
    total: number,
    minutes: sections.reduce((sum, section) => sum + (section.minutes || 0), 0),
  };
}

// A short, human-quotable label so a printed booklet can be matched back to
// the seed that produced it.
function formCode(seed) {
  let hash = 2166136261;
  String(seed).split("").forEach((character) => {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  });
  return (hash >>> 0).toString(36).toUpperCase().padStart(7, "0").slice(-7);
}

/* ------------------------------------------------------------ stimulus text */

// Stimulus content is plain text. Consecutive pipe-delimited lines are data
// tables and bullet runs are lists; everything else is a paragraph.
function parseBlocks(text) {
  const blocks = [];
  const lines = String(text || "").split("\n");
  let buffer = [];
  let mode = null;

  function flush() {
    if (!buffer.length) return;
    blocks.push({ type: mode, lines: buffer });
    buffer = [];
    mode = null;
  }

  lines.forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) {
      flush();
      return;
    }
    const next = line.includes("|") ? "table" : line.startsWith("•") ? "list" : "text";
    if (mode && next !== mode) flush();
    mode = next;
    buffer.push(line);
  });
  flush();

  return blocks.map((block) => {
    if (block.type === "table") {
      return {
        type: "table",
        rows: block.lines.map((line) => line.split("|").map((cell) => cell.trim())),
      };
    }
    if (block.type === "list") {
      return {
        type: "list",
        items: block.lines.map((line) => line.replace(/^•\s*/, "")),
      };
    }
    return { type: "text", text: block.lines.join(" ") };
  });
}

/* -------------------------------------------------------------------- HTML */

function escapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function blocksToHtml(text) {
  return parseBlocks(text)
    .map((block) => {
      if (block.type === "table") {
        const [head, ...body] = block.rows;
        const headHtml = head
          .map((cell) => `<th>${escapeHtml(cell)}</th>`)
          .join("");
        const bodyHtml = body
          .map(
            (row) =>
              `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`,
          )
          .join("");
        return `<table class="data"><thead><tr>${headHtml}</tr></thead><tbody>${bodyHtml}</tbody></table>`;
      }
      if (block.type === "list") {
        return `<ul>${block.items
          .map((item) => `<li>${escapeHtml(item)}</li>`)
          .join("")}</ul>`;
      }
      return `<p>${escapeHtml(block.text)}</p>`;
    })
    .join("");
}

function questionHtml(item, previous) {
  const { question, number, letters } = item;
  const parts = [`<article class="q" id="q${number}">`];
  // A passage set shares one stimulus across every question in it. Printing it
  // above each question would repeat 750 words ten times; the real booklet
  // prints the passage once and then the questions that go with it.
  const repeated =
    previous &&
    previous.question.stimulus &&
    question.stimulus &&
    previous.question.stimulus.content === question.stimulus.content;
  if (question.stimulus && question.stimulus.content && !repeated) {
    parts.push(
      `<div class="stimulus ${escapeHtml(question.stimulus.type)}">` +
        blocksToHtml(question.stimulus.content) +
        `</div>`,
    );
  }
  parts.push(
    `<p class="stem"><span class="num">${number}.</span> ${escapeHtml(question.stem)}</p>`,
  );
  if (question.responseType === "multiple-choice" && question.choices) {
    parts.push(
      `<ol class="choices">${question.choices
        .map(
          (choice, index) =>
            `<li><span class="letter">${letters[index]}.</span> ${escapeHtml(choice)}</li>`,
        )
        .join("")}</ol>`,
    );
  } else if (question.responseType === "numeric") {
    parts.push('<p class="gridin">Student-produced response: <span class="rule"></span></p>');
  }
  parts.push("</article>");
  return parts.join("");
}

function answerSheetHtml(model) {
  return model.sections
    .map((section) => {
      const rows = section.questions
        .map(
          (item) =>
            `<li><span class="asnum">${item.number}</span>` +
            item.letters
              .map((letter) => `<span class="bubble">${letter}</span>`)
              .join("") +
            `</li>`,
        )
        .join("");
      return (
        `<div class="as-section"><h3>${escapeHtml(section.label)}</h3>` +
        `<ol class="as-grid">${rows}</ol></div>`
      );
    })
    .join("");
}

const BOOKLET_CSS = `
@page { size: letter; margin: 0.6in 0.5in 0.7in 0.5in; }
:root { --ink: #111; --rule: #999; --soft: #f2f0ea; }
* { box-sizing: border-box; }
body {
  margin: 0; color: var(--ink); background: #fff;
  font-family: "Latin Modern Roman", "Computer Modern", Charter, "Palatino Linotype",
    Palatino, Georgia, "Times New Roman", serif;
  font-size: 9.6pt; line-height: 1.36; text-rendering: optimizeLegibility;
}
h1, h2, h3 { font-weight: 600; margin: 0 0 .4em; line-height: 1.2; }
.cover { height: 9.4in; display: flex; flex-direction: column; break-after: page; }
.cover h1 { font-size: 26pt; letter-spacing: .01em; margin-bottom: .1em; }
.cover .sub { font-size: 12pt; font-style: italic; color: #444; margin-bottom: 1.6em; }
.meta { border-top: 1.5pt solid var(--ink); border-bottom: .5pt solid var(--rule);
  padding: .6em 0; display: flex; gap: 2em; flex-wrap: wrap; font-size: 9.5pt; }
.meta div { min-width: 1.4in; }
.meta dt { font-variant: small-caps; letter-spacing: .06em; color: #555; }
.meta dd { margin: 0; font-size: 11pt; }
.directions { margin: 1.4em 0; max-width: 6in; }
.directions li { margin-bottom: .35em; }
.schedule { border-collapse: collapse; margin: 1em 0; font-size: 9.5pt; }
.schedule th, .schedule td { border-bottom: .5pt solid var(--rule); padding: .32em .9em .32em 0; text-align: left; }
.schedule th { font-variant: small-caps; letter-spacing: .05em; font-weight: 600; }
.section-head { break-before: page; border-bottom: 1.5pt solid var(--ink);
  padding-bottom: .5em; margin-bottom: .9em; }
.section-head h2 { font-size: 15pt; }
.section-head .timing { font-style: italic; color: #333; }
.section-head .dirs { margin-top: .5em; font-size: 9.3pt; max-width: 6.6in; }
.questions { column-count: 2; column-gap: .34in; column-fill: auto; orphans: 3; widows: 3; }
.q { break-inside: avoid; page-break-inside: avoid; margin: 0 0 .82em; }
.stem { margin: 0 0 .3em; }
.num { font-weight: 700; margin-right: .25em; }
.choices { list-style: none; margin: 0 0 0 .95em; padding: 0; }
.choices li { margin-bottom: .1em; text-indent: -.95em; padding-left: .95em; }
.letter { font-weight: 600; margin-right: .3em; }
.stimulus { background: var(--soft); border-left: 2pt solid var(--rule);
  padding: .45em .6em; margin: 0 0 .45em; font-size: 9.2pt; }
.stimulus p { margin: 0 0 .35em; }
.stimulus p:last-child, .stimulus table:last-child { margin-bottom: 0; }
.stimulus ul { margin: 0 0 .35em 1em; padding: 0; }
table.data { border-collapse: collapse; margin: .35em 0; font-size: 8.8pt; width: 100%; }
table.data th, table.data td { border: .4pt solid var(--rule); padding: .16em .4em; text-align: left; }
table.data th { background: #e6e2d8; font-weight: 600; }
.gridin .rule { display: inline-block; width: 1.4in; border-bottom: .6pt solid var(--ink); }
.stop { text-align: center; font-variant: small-caps; letter-spacing: .12em;
  border-top: 1pt solid var(--ink); margin-top: 1em; padding-top: .5em; column-span: all; }
.answer-sheet { break-before: page; }
.as-wrap { column-count: 3; column-gap: .3in; }
.as-section { break-inside: avoid-column; margin-bottom: .7em; }
.as-section h3 { font-size: 9.5pt; font-variant: small-caps; letter-spacing: .05em;
  border-bottom: .5pt solid var(--rule); }
.as-grid { list-style: none; margin: 0; padding: 0; font-size: 8.4pt; }
.as-grid li { display: flex; align-items: center; gap: .16em; margin-bottom: .09em; }
.asnum { width: 1.5em; text-align: right; margin-right: .25em; color: #444; }
.bubble { display: inline-flex; align-items: center; justify-content: center;
  width: 1.28em; height: 1.28em; border: .5pt solid var(--ink); border-radius: 50%;
  font-size: 6.6pt; color: #555; }
.key-grid { column-count: 5; column-gap: .3in; font-size: 9pt; }
.key-grid li { break-inside: avoid; }
.exp { break-inside: avoid; margin-bottom: .8em; }
.exp h4 { margin: 0 0 .15em; font-size: 9.6pt; }
.exp .tag { font-variant: small-caps; letter-spacing: .05em; color: #555; font-size: 8.4pt; }
.exp ol { margin: .2em 0 .2em 1.1em; padding: 0; }
@media screen {
  body { background: #d8d4cc; padding: 24px 0; }
  .page { background: #fff; max-width: 7.5in; margin: 0 auto; padding: .5in;
    box-shadow: 0 2px 18px rgba(0,0,0,.22); }
}
@media print { .page { padding: 0; max-width: none; } .noprint { display: none; } }
`;

function shell(title, body) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(title)}</title>
<style>${BOOKLET_CSS}</style>
</head><body><div class="page">${body}</div></body></html>
`;
}

function renderBookletHtml(model) {
  const { blueprint } = model;
  const schedule = model.sections
    .map(
      (section) =>
        `<tr><td>${escapeHtml(section.label)}</td>` +
        `<td>${section.questions.length} questions</td>` +
        `<td>${section.minutes ? `${section.minutes} minutes` : "—"}</td>` +
        `<td>${section.firstNumber}–${section.lastNumber}</td></tr>`,
    )
    .join("");

  const cover = `<div class="cover">
  <h1>${escapeHtml(blueprint.label)}</h1>
  <p class="sub">${escapeHtml(blueprint.summary)}</p>
  <dl class="meta">
    <div><dt>Form</dt><dd>${escapeHtml(model.formCode)}</dd></div>
    <div><dt>Questions</dt><dd>${model.total}</dd></div>
    <div><dt>Testing time</dt><dd>${model.minutes} min</dd></div>
    <div><dt>Sections</dt><dd>${model.sections.length}</dd></div>
  </dl>
  <div class="directions">
    <h3>Directions</h3>
    <ol>
      <li>Work one section at a time and observe each section's time limit. Do not
        move ahead to another section or return to a section once its time expires.</li>
      <li>Mark every answer on the answer sheet at the back of this booklet. Answers
        written in the booklet are not scored.</li>
      <li>There is no penalty for a wrong answer, so answer every question.</li>
      <li>Take one ten-minute break after
        ${escapeHtml(model.sections[Math.min(blueprint.breakAfter || 0, model.sections.length - 1)].label)}.</li>
    </ol>
  </div>
  <table class="schedule">
    <thead><tr><th>Section</th><th>Length</th><th>Time</th><th>Numbers</th></tr></thead>
    <tbody>${schedule}</tbody>
  </table>
  <p style="margin-top:auto;font-size:8.4pt;color:#555">Original practice content.
  Not affiliated with, endorsed by, or published by the College Board or ACT, Inc.
  Accuracy practice only — this form does not produce a scaled score.</p>
</div>`;

  const sections = model.sections
    .map(
      (section) => `<div class="section-head">
    <h2>${escapeHtml(section.label)}</h2>
    <p class="timing">${section.questions.length} questions · ${section.minutes} minutes ·
      questions ${section.firstNumber}–${section.lastNumber}</p>
    <p class="dirs">${escapeHtml(section.directions)}</p>
  </div>
  <div class="questions">${section.questions.map((item, index) => questionHtml(item, section.questions[index - 1])).join("")}
    <p class="stop">End of ${escapeHtml(section.label)}</p>
  </div>`,
    )
    .join("");

  const sheet = `<div class="answer-sheet">
  <h2>Answer sheet — form ${escapeHtml(model.formCode)}</h2>
  <p class="dirs">Fill in one bubble per question. Erase changes completely.</p>
  <div class="as-wrap">${answerSheetHtml(model)}</div>
</div>`;

  return shell(`${blueprint.label} — form ${model.formCode}`, cover + sections + sheet);
}

function renderKeyHtml(model) {
  const keyRows = model.sections
    .map(
      (section) =>
        `<div class="as-section"><h3>${escapeHtml(section.label)}</h3><ol class="as-grid">` +
        section.questions
          .map(
            (item) =>
              `<li><span class="asnum">${item.number}</span> <strong>${
                item.correctLetter || escapeHtml(String(item.question.correctAnswer))
              }</strong></li>`,
          )
          .join("") +
        `</ol></div>`,
    )
    .join("");

  const explanations = model.sections
    .map(
      (section) =>
        `<div class="section-head"><h2>${escapeHtml(section.label)} — explanations</h2></div>` +
        `<div class="questions">` +
        section.questions
          .map((item) => {
            const q = item.question;
            const steps = (q.solutionSteps || [])
              .map((step) => `<li>${escapeHtml(step)}</li>`)
              .join("");
            const traps = (q.distractorRationales || [])
              .map(
                (row) =>
                  `<li>${item.letters[row.index]}. ${escapeHtml(row.reason)}</li>`,
              )
              .join("");
            return `<div class="exp">
        <h4>${item.number}. Correct answer: ${
          item.correctLetter || escapeHtml(String(q.correctAnswer))
        }</h4>
        <p class="tag">${escapeHtml(q.domain)} · ${escapeHtml(q.skill)} · ${escapeHtml(q.difficulty)} · ${escapeHtml(q.id)}</p>
        <p>${escapeHtml(q.explanation)}</p>
        ${steps ? `<ol>${steps}</ol>` : ""}
        ${traps ? `<p class="tag">Why the others fail</p><ul>${traps}</ul>` : ""}
        <p><em>Trap:</em> ${escapeHtml(q.trap)}</p>
      </div>`;
          })
          .join("") +
        `</div>`,
    )
    .join("");

  const cover = `<div class="cover">
  <h1>Answer key and explanations</h1>
  <p class="sub">${escapeHtml(model.blueprint.label)} — form ${escapeHtml(model.formCode)}</p>
  <div class="as-wrap">${keyRows}</div>
  <p style="margin-top:auto;font-size:8.4pt;color:#555">Score by accuracy only.
  Log every miss with the question id so it can be found again in the app.</p>
</div>`;

  return shell(
    `Answer key — ${model.blueprint.label} — form ${model.formCode}`,
    cover + explanations,
  );
}

/* ------------------------------------------------------------------- LaTeX */

// The banks are plain Unicode text, so every character is mapped to a macro
// that plain pdfLaTeX accepts. Escaping runs before substitution because the
// replacements themselves introduce backslashes and braces.
const TEX_SPECIALS = /[\\{}$&#%_~^]/g;
const TEX_SPECIAL_MAP = {
  "\\": "\\textbackslash{}",
  "{": "\\{",
  "}": "\\}",
  $: "\\$",
  "&": "\\&",
  "#": "\\#",
  "%": "\\%",
  _: "\\_",
  "~": "\\textasciitilde{}",
  "^": "\\textasciicircum{}",
};
const TEX_UNICODE = [
  ["\u201C", "``"],
  ["\u201D", "''"],
  ["\u2018", "`"],
  ["\u2019", "'"],
  ["\u2014", "---"],
  ["\u2013", "--"],
  ["\u2212", "$-$"],
  ["\u00B2", "\\textsuperscript{2}"],
  ["\u00B3", "\\textsuperscript{3}"],
  ["\u2075", "\\textsuperscript{5}"],
  ["\u2076", "\\textsuperscript{6}"],
  ["\u2192", "$\\rightarrow$"],
  ["\u2022", "\\textbullet{}"],
  ["\u00B7", "$\\cdot$"],
  ["\u03B8", "$\\theta$"],
  ["\u00B0", "$^{\\circ}$"],
  ["\u00D7", "$\\times$"],
  ["\u03C0", "$\\pi$"],
  ["\u00B1", "$\\pm$"],
  ["\u2260", "$\\neq$"],
  ["\u2264", "$\\leq$"],
  ["\u2265", "$\\geq$"],
  ["\u00F7", "$\\div$"],
  ["\u00E9", "\\'{e}"],
  ["\u2026", "\\ldots{}"],
];

function tex(value) {
  let out = String(value == null ? "" : value).replace(
    TEX_SPECIALS,
    (character) => TEX_SPECIAL_MAP[character],
  );
  // A radical binds to the token that follows it in the source text.
  out = out.replace(/\u221A\s*([0-9]+(?:\.[0-9]+)?|[A-Za-z])/g, "$\\sqrt{$1}$");
  out = out.replace(/\u221A/g, "$\\surd$");
  TEX_UNICODE.forEach(([character, macro]) => {
    out = out.split(character).join(macro);
  });
  return out;
}

function blocksToTex(text) {
  return parseBlocks(text)
    .map((block) => {
      if (block.type === "table") {
        const columns = Math.max(...block.rows.map((row) => row.length));
        const spec = "l".repeat(columns);
        const body = block.rows
          .map((row, index) => {
            const cells = row.concat(Array(columns - row.length).fill(""));
            const line = cells.map((cell) => tex(cell)).join(" & ");
            return index === 0 ? `${line} \\\\ \\hline` : `${line} \\\\`;
          })
          .join("\n");
        return `\\begin{center}\\small\\begin{tabular}{${spec}}\\hline\n${body}\n\\hline\\end{tabular}\\end{center}`;
      }
      if (block.type === "list") {
        return `\\begin{itemize}\\itemsep0pt\n${block.items
          .map((item) => `\\item ${tex(item)}`)
          .join("\n")}\n\\end{itemize}`;
      }
      return tex(block.text);
    })
    .join("\n\n");
}

function renderTex(model) {
  const { blueprint } = model;
  const body = model.sections
    .map((section) => {
      const questions = section.questions
        .map((item, index) => {
          const q = item.question;
          const before = section.questions[index - 1];
          const repeated =
            before &&
            before.question.stimulus &&
            q.stimulus &&
            before.question.stimulus.content === q.stimulus.content;
          const parts = ["\\begin{samepage}"];
          if (q.stimulus && q.stimulus.content && !repeated) {
            parts.push(
              `\\begin{stimulus}\n${blocksToTex(q.stimulus.content)}\n\\end{stimulus}`,
            );
          }
          parts.push(`\\question{${item.number}}{${tex(q.stem)}}`);
          if (q.responseType === "multiple-choice" && q.choices) {
            parts.push(
              "\\begin{choices}\n" +
                q.choices
                  .map(
                    (choice, index) =>
                      `\\item[${item.letters[index]}.] ${tex(choice)}`,
                  )
                  .join("\n") +
                "\n\\end{choices}",
            );
          } else if (q.responseType === "numeric") {
            parts.push("\\gridin");
          }
          parts.push("\\end{samepage}\\medskip");
          return parts.join("\n");
        })
        .join("\n\n");
      return `\\clearpage
\\begin{fullwidth}
\\sectionhead{${tex(section.label)}}{${section.questions.length} questions \\quad ${
        section.minutes
      } minutes \\quad questions ${section.firstNumber}--${section.lastNumber}}{${tex(
        section.directions,
      )}}
\\end{fullwidth}

${questions}

\\begin{fullwidth}\\begin{center}\\scshape\\rule{\\linewidth}{.4pt}\\\\[.3em]End of ${tex(
        section.label,
      )}\\end{center}\\end{fullwidth}`;
    })
    .join("\n\n");

  const schedule = model.sections
    .map(
      (section) =>
        `${tex(section.label)} & ${section.questions.length} & ${section.minutes} min & ${
          section.firstNumber
        }--${section.lastNumber} \\\\`,
    )
    .join("\n");

  return `% Generated by scripts/build-test.js -- do not edit by hand.
% Compiles with pdflatex; no Unicode input is emitted.
\\documentclass[10pt,letterpaper,twocolumn]{article}
\\usepackage[margin=0.55in,top=0.6in,bottom=0.7in]{geometry}
\\usepackage{amsmath,amssymb,enumitem,multicol,fancyhdr,array,xcolor}
\\usepackage[T1]{fontenc}
\\setlength{\\columnsep}{0.32in}
\\setlength{\\parindent}{0pt}
\\setlength{\\parskip}{0.35em}
\\pagestyle{fancy}\\fancyhf{}
\\lhead{\\scriptsize\\scshape ${tex(blueprint.label)}}
\\rhead{\\scriptsize Form ${tex(model.formCode)}}
\\cfoot{\\scriptsize\\thepage}
\\renewcommand{\\headrulewidth}{0.4pt}

\\newenvironment{fullwidth}{\\par\\onecolumn\\vspace*{-1em}}{\\par\\twocolumn}
\\newcommand{\\question}[2]{\\noindent\\textbf{#1.}~#2\\par}
\\newenvironment{choices}
  {\\begin{list}{}{\\setlength{\\leftmargin}{1.5em}\\setlength{\\labelwidth}{1.2em}%
   \\setlength{\\itemsep}{0pt}\\setlength{\\parsep}{0pt}\\setlength{\\topsep}{2pt}}}
  {\\end{list}}
\\newenvironment{stimulus}
  {\\begingroup\\small\\setlength{\\fboxsep}{4pt}\\begin{list}{}{\\setlength{\\leftmargin}{0.6em}%
   \\setlength{\\rightmargin}{0pt}\\setlength{\\topsep}{2pt}}\\item[]\\color{black!85}}
  {\\end{list}\\endgroup}
\\newcommand{\\gridin}{\\par\\smallskip\\footnotesize Student-produced response:~\\rule{1.3in}{0.4pt}\\par}
\\newcommand{\\sectionhead}[3]{%
  \\noindent{\\Large\\bfseries #1}\\par\\smallskip
  \\noindent\\textit{#2}\\par\\smallskip
  \\noindent\\rule{\\linewidth}{1pt}\\par\\smallskip
  \\noindent\\small #3\\par\\medskip}

\\begin{document}
\\onecolumn
\\thispagestyle{empty}
{\\Huge\\bfseries ${tex(blueprint.label)}}\\par\\medskip
{\\large\\itshape ${tex(blueprint.summary)}}\\par\\bigskip
\\noindent\\rule{\\linewidth}{1.5pt}\\par\\smallskip
\\noindent\\textsc{Form} ${tex(model.formCode)} \\hfill \\textsc{Questions} ${
    model.total
  } \\hfill \\textsc{Testing time} ${model.minutes} minutes\\par\\smallskip
\\noindent\\rule{\\linewidth}{0.4pt}\\par\\bigskip

\\noindent\\textbf{Directions}
\\begin{enumerate}[leftmargin=1.4em,itemsep=2pt]
\\item Work one section at a time and observe each section's time limit.
\\item Mark every answer on the answer sheet at the back of this booklet.
\\item There is no penalty for a wrong answer, so answer every question.
\\item Take one ten-minute break after ${tex(
    model.sections[Math.min(blueprint.breakAfter || 0, model.sections.length - 1)].label,
  )}.
\\end{enumerate}
\\bigskip

\\noindent\\begin{tabular}{llll}\\hline
\\textsc{Section} & \\textsc{Length} & \\textsc{Time} & \\textsc{Numbers} \\\\ \\hline
${schedule}
\\hline\\end{tabular}
\\vfill
\\noindent\\footnotesize Original practice content. Not affiliated with, endorsed by,
or published by the College Board or ACT, Inc.\\par
\\twocolumn

${body}

\\end{document}
`;
}

  return {
    BOOKLET_CSS,
    blocksToHtml,
    blocksToTex,
    buildModel,
    formCode,
    parseBlocks,
    renderBookletHtml,
    renderKeyHtml,
    renderTex,
    tex,
  };
});
