"use strict";

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..", "..");
const CATALOG_PATH = path.join(ROOT, "content", "catalog.json");
const BANKS_DIR = path.join(ROOT, "content", "banks");
const PASSAGES_DIR = path.join(ROOT, "content", "passages");
const GENERATED_DIR = path.join(ROOT, "content", "generated");

const ALLOWED_FIELDS = new Set([
  "id",
  "test",
  "section",
  "sectionKey",
  "domain",
  "skill",
  "subskill",
  "difficulty",
  "responseType",
  "stimulus",
  "passageId",
  "stem",
  "choices",
  "correctAnswer",
  "hint",
  "explanation",
  "solutionSteps",
  "distractorRationales",
  "strategy",
  "trap",
  "estimatedSeconds",
  "principles",
  "calculatorPolicy",
  "format",
  "tags",
  "provenance",
  "contentVersion",
  "reviewStatus",
  "verification",
]);

const REVIEW_STATUSES = new Set([
  "pending-editorial",
  "automated-verified",
  "editorial-reviewed",
]);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function loadCatalog() {
  return readJson(CATALOG_PATH);
}

function sectionMap(catalog) {
  return new Map(catalog.sections.map((section) => [section.key, section]));
}

function bankPath(sectionKey) {
  return path.join(BANKS_DIR, `${sectionKey}.json`);
}

function loadBank(sectionKey) {
  const filePath = bankPath(sectionKey);
  return fs.existsSync(filePath) ? readJson(filePath) : [];
}

function passagePath(sectionKey) {
  return path.join(PASSAGES_DIR, `${sectionKey}.json`);
}

// Passages are stored once and referenced by id rather than copied onto every
// question that uses them. A real ACT Reading passage runs about 750 words and
// carries ten questions; inlining it would multiply each bank by an order of
// magnitude, and the browser loads a whole section's bank in one request.
function loadPassages(sectionKey) {
  const filePath = passagePath(sectionKey);
  return fs.existsSync(filePath) ? readJson(filePath) : [];
}

// The stimulus a passage presents to a renderer. Kept in one place so the
// browser bundle in build-content.js and the Node-side booklet builder show a
// student exactly the same text.
// Passage sources are hard-wrapped so they stay readable as files, but the app
// renders a stimulus with `white-space: pre-wrap`, which would show every one of
// those wraps as a line break. Soft wraps inside a paragraph are joined here;
// blank lines keep their meaning, and table rows and bullets keep their own
// line structure because the booklet parses them by line.
function unwrapParagraphs(text) {
  return String(text)
    .split(/\n\s*\n/)
    .map((block) => {
      const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
      const structured = lines.some((line) => line.includes("|") || line.startsWith("•"));
      return structured ? lines.join("\n") : lines.join(" ");
    })
    .filter(Boolean)
    .join("\n\n");
}

function passageStimulus(passage) {
  return {
    type: passage.type,
    content: [passage.title, passage.intro, unwrapParagraphs(passage.content)]
      .filter(Boolean)
      .join("\n\n"),
  };
}

// Canonical banks keep questions and passages apart, which is what validation
// runs against. Renderers want them joined, so this is the join — questions in
// one set share a single stimulus object rather than a copy each.
function hydrateBank(sectionKey) {
  const passages = new Map(
    loadPassages(sectionKey).map((passage) => [passage.id, passageStimulus(passage)]),
  );
  return loadBank(sectionKey).map((question) =>
    question.passageId && passages.has(question.passageId)
      ? { ...question, stimulus: passages.get(question.passageId) }
      : question,
  );
}

function loadAllPassages(catalog = loadCatalog()) {
  return catalog.sections.flatMap((section) => loadPassages(section.key));
}

function loadAllBanks(catalog = loadCatalog()) {
  return catalog.sections.flatMap((section) => loadBank(section.key));
}

function isNonemptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function addError(errors, question, message) {
  errors.push(`${question.id || "(missing id)"}: ${message}`);
}

function domainSkillMap(section) {
  const domains = new Map();
  section.domains.forEach((domain) => {
    domains.set(
      domain.name,
      new Map(
        Object.entries(domain.skills).map(([skill, subskills]) => [
          skill,
          new Set(subskills),
        ]),
      ),
    );
  });
  return domains;
}

function validateQuestion(question, section, catalog) {
  const errors = [];

  if (!question || typeof question !== "object" || Array.isArray(question)) {
    return ["Question must be an object"];
  }

  Object.keys(question).forEach((field) => {
    if (!ALLOWED_FIELDS.has(field)) addError(errors, question, `unknown field "${field}"`);
  });

  const expectedId = new RegExp(`^${section.key}-\\d{4}$`);
  if (!isNonemptyString(question.id) || !expectedId.test(question.id)) {
    addError(errors, question, `id must match ${section.key}-NNNN`);
  }
  if (question.test !== section.test) addError(errors, question, "test does not match catalog");
  if (question.section !== section.section) {
    addError(errors, question, "section does not match catalog");
  }
  if (question.sectionKey !== section.key) {
    addError(errors, question, "sectionKey does not match bank");
  }

  const domains = domainSkillMap(section);
  if (!domains.has(question.domain)) {
    addError(errors, question, `unknown domain "${question.domain}"`);
  } else if (!domains.get(question.domain).has(question.skill)) {
    addError(errors, question, `unknown skill "${question.skill}" for domain`);
  } else if (!domains.get(question.domain).get(question.skill).has(question.subskill)) {
    addError(errors, question, `unknown subskill "${question.subskill}" for skill`);
  }

  if (!["Easy", "Medium", "Hard"].includes(question.difficulty)) {
    addError(errors, question, "difficulty must be Easy, Medium, or Hard");
  }
  if (!section.responseTypes.includes(question.responseType)) {
    addError(errors, question, `responseType is not supported by ${section.key}`);
  }
  if (question.stimulus !== null && (
    typeof question.stimulus !== "object" ||
    Array.isArray(question.stimulus) ||
    !isNonemptyString(question.stimulus.type) ||
    !isNonemptyString(question.stimulus.content)
  )) {
    addError(errors, question, "stimulus must be null or an object with type and content");
  }

  // A question either carries its own stimulus or belongs to a shared passage,
  // never both: two sources of context would render one above the other and the
  // student would not know which the stem refers to.
  if (question.passageId !== undefined && question.passageId !== null) {
    if (!isNonemptyString(question.passageId)) {
      addError(errors, question, "passageId must be null or a non-empty string");
    } else if (question.stimulus !== null) {
      addError(errors, question, "a question in a passage set must not also carry its own stimulus");
    }
  }

  [
    "stem",
    "hint",
    "explanation",
    "strategy",
    "trap",
    "calculatorPolicy",
    "format",
  ].forEach((field) => {
    if (!isNonemptyString(question[field])) addError(errors, question, `${field} is required`);
  });

  if (question.calculatorPolicy !== section.calculatorPolicy) {
    addError(errors, question, "calculatorPolicy does not match catalog");
  }
  if (!Number.isInteger(question.estimatedSeconds) || question.estimatedSeconds < 15) {
    addError(errors, question, "estimatedSeconds must be an integer of at least 15");
  }
  if (!Array.isArray(question.solutionSteps) || question.solutionSteps.length < 2 ||
      question.solutionSteps.some((step) => !isNonemptyString(step))) {
    addError(errors, question, "solutionSteps must contain at least two nonempty steps");
  }
  if (!Array.isArray(question.principles) || question.principles.length < 1 ||
      question.principles.some((principle) => !isNonemptyString(principle))) {
    addError(errors, question, "principles must contain at least one item");
  }
  if (!Array.isArray(question.tags) ||
      question.tags.some((tag) => !isNonemptyString(tag))) {
    addError(errors, question, "tags must be an array of strings");
  }

  if (question.responseType === "multiple-choice") {
    validateMultipleChoice(question, errors);
  } else if (question.responseType === "numeric") {
    validateNumeric(question, errors);
  } else if (question.responseType === "essay") {
    validateEssay(question, errors);
  }

  if (!question.provenance || typeof question.provenance !== "object") {
    addError(errors, question, "provenance is required");
  } else {
    if (question.provenance.type !== "original") {
      addError(errors, question, "provenance.type must be original");
    }
    ["generator", "seed", "created"].forEach((field) => {
      if (!isNonemptyString(question.provenance[field])) {
        addError(errors, question, `provenance.${field} is required`);
      }
    });
  }
  if (question.contentVersion !== catalog.contentVersion) {
    addError(errors, question, "contentVersion does not match catalog");
  }
  if (!REVIEW_STATUSES.has(question.reviewStatus)) {
    addError(errors, question, "invalid reviewStatus");
  }
  validateVerification(question, errors);

  return errors;
}

function validateVerification(question, errors) {
  const verification = question.verification;
  if (verification === null) return;
  if (!verification || typeof verification !== "object" ||
      !isNonemptyString(verification.kind)) {
    addError(errors, question, "verification must be null or a typed object");
    return;
  }
  const numbers = verification.inputs;
  if (!Array.isArray(numbers) || numbers.some((value) => typeof value !== "number")) {
    addError(errors, question, "verification.inputs must be numeric");
    return;
  }
  let computed;
  switch (verification.kind) {
    case "sum":
      computed = numbers.reduce((sum, value) => sum + value, 0);
      break;
    case "product":
      computed = numbers.reduce((product, value) => product * value, 1);
      break;
    case "mean":
      computed = numbers.reduce((sum, value) => sum + value, 0) / numbers.length;
      break;
    case "linear-equation":
      computed = (numbers[2] - numbers[1]) / numbers[0];
      break;
    case "percent-of":
      computed = numbers[0] * numbers[1] / 100;
      break;
    case "percent-change":
      computed = (numbers[1] - numbers[0]) / numbers[0] * 100;
      break;
    case "distance":
      computed = Math.hypot(numbers[2] - numbers[0], numbers[3] - numbers[1]);
      break;
    case "midpoint-x":
      computed = (numbers[0] + numbers[1]) / 2;
      break;
    case "pythagorean":
      computed = Math.hypot(numbers[0], numbers[1]);
      break;
    case "probability":
      computed = numbers[0] / numbers[1];
      break;
    case "circle-area-coefficient":
      computed = numbers[0] ** 2;
      break;
    default:
      addError(errors, question, `unknown verification kind "${verification.kind}"`);
      return;
  }
  if (typeof verification.expected !== "number" ||
      Math.abs(computed - verification.expected) > 1e-9) {
    addError(errors, question, "verification expected value does not match recomputation");
  }
}

function validateMultipleChoice(question, errors) {
  if (!Array.isArray(question.choices) || question.choices.length !== 4) {
    addError(errors, question, "multiple-choice questions require exactly four choices");
    return;
  }
  if (question.choices.some((choice) => !isNonemptyString(choice))) {
    addError(errors, question, "choices must be nonempty strings");
  }
  const normalized = question.choices.map((choice) =>
    choice.normalize("NFKC").toLowerCase().trim().replace(/\s+/g, " "),
  );
  if (new Set(normalized).size !== normalized.length) {
    addError(errors, question, "choices must be distinct");
  }
  if (!Number.isInteger(question.correctAnswer) ||
      question.correctAnswer < 0 ||
      question.correctAnswer >= question.choices.length) {
    addError(errors, question, "correctAnswer must be a valid zero-based choice index");
  }
  if (!Array.isArray(question.distractorRationales) ||
      question.distractorRationales.length !== 3) {
    addError(errors, question, "exactly three distractor rationales are required");
    return;
  }
  const indices = question.distractorRationales.map((item) => item && item.index);
  const expected = [0, 1, 2, 3].filter((index) => index !== question.correctAnswer);
  if (indices.slice().sort().join(",") !== expected.join(",")) {
    addError(errors, question, "distractor rationales must cover each incorrect choice once");
  }
  if (question.distractorRationales.some((item) => !item || !isNonemptyString(item.reason))) {
    addError(errors, question, "each distractor rationale requires a reason");
  }
}

function validateNumeric(question, errors) {
  if (question.choices !== null || question.distractorRationales !== null) {
    addError(errors, question, "numeric questions must not have choices or distractors");
  }
  const answer = question.correctAnswer;
  if (!(typeof answer === "number" || isNonemptyString(answer))) {
    addError(errors, question, "numeric correctAnswer must be a number or nonempty string");
  }
}

function validateEssay(question, errors) {
  if (question.choices !== null || question.distractorRationales !== null) {
    addError(errors, question, "essay prompts must not have choices or distractors");
  }
  const answer = question.correctAnswer;
  if (!answer || typeof answer !== "object" ||
      !isNonemptyString(answer.sampleThesis) ||
      !Array.isArray(answer.outline) ||
      answer.outline.length < 3 ||
      !Array.isArray(answer.reviewCriteria) ||
      answer.reviewCriteria.length < 4) {
    addError(errors, question, "essay correctAnswer requires a thesis, outline, and review criteria");
  }
}

function normalizeText(text) {
  return String(text)
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function structuralSignature(question) {
  const stimulus = question.stimulus ? question.stimulus.content : "";
  const anchor = question.passageId ? `${question.passageId} ` : "";
  const normalized = normalizeText(`${anchor}${stimulus} ${question.stem}`);
  const withNumbers = isQuantitative(question)
    ? normalized
    : normalized.replace(/\b\d+(?:\.\d+)?\b/g, "#");
  return withNumbers.replace(/\b[a-z]\b/g, "@");
}

// What makes two questions "the same" depends on where their context lives.
//
// A standalone question carries its own stimulus, and two items sharing one are
// the same question asked twice. A question in a passage set shares its passage
// with nine others *by design*, so comparing passages would condemn every set;
// what distinguishes those items is the stem together with the choices, which
// is where an ACT English item's underlined alternatives live.
function comparableText(question) {
  if (question.passageId) {
    const choices = Array.isArray(question.choices) ? question.choices.join(" ") : "";
    return `${question.stem} ${choices}`;
  }
  return question.stimulus ? question.stimulus.content : question.stem;
}

function tokenSet(question) {
  const text = comparableText(question);
  const normalized = normalizeText(text);
  const withNumbers = isQuantitative(question)
    ? normalized
    : normalized.replace(/\b\d+(?:\.\d+)?\b/g, "#");
  return new Set(withNumbers.split(" ").filter((token) => token.length > 2));
}

function isQuantitative(question) {
  return question.section === "Math" || question.section === "Mathematics";
}

function jaccard(left, right) {
  let intersection = 0;
  left.forEach((token) => {
    if (right.has(token)) intersection += 1;
  });
  const union = left.size + right.size - intersection;
  return union === 0 ? 1 : intersection / union;
}

function duplicateErrors(questions) {
  const errors = [];
  const ids = new Map();
  const exact = new Map();
  const structural = new Map();

  questions.forEach((question) => {
    if (ids.has(question.id)) errors.push(`Duplicate id: ${question.id}`);
    else ids.set(question.id, true);

    const fullText = normalizeText(
      `${question.stimulus ? question.stimulus.content : ""} ${question.stem}`,
    );
    if (exact.has(fullText)) {
      errors.push(`Exact duplicate text: ${exact.get(fullText)} and ${question.id}`);
    } else {
      exact.set(fullText, question.id);
    }

    const signature = structuralSignature(question);
    if (structural.has(signature)) {
      errors.push(`Structural duplicate: ${structural.get(signature)} and ${question.id}`);
    } else {
      structural.set(signature, question.id);
    }
  });

  const bySection = new Map();
  questions.forEach((question) => {
    if (!bySection.has(question.sectionKey)) bySection.set(question.sectionKey, []);
    bySection.get(question.sectionKey).push({
      id: question.id,
      tokens: tokenSet(question),
    });
  });
  bySection.forEach((items) => {
    for (let left = 0; left < items.length; left += 1) {
      for (let right = left + 1; right < items.length; right += 1) {
        if (jaccard(items[left].tokens, items[right].tokens) >= 0.9) {
          errors.push(`Near duplicate: ${items[left].id} and ${items[right].id}`);
        }
      }
    }
  });

  return errors;
}

function countBy(items, key) {
  return items.reduce((counts, item) => {
    const value = typeof key === "function" ? key(item) : item[key];
    counts[value] = (counts[value] || 0) + 1;
    return counts;
  }, {});
}

function coverageReport(questions, catalog = loadCatalog()) {
  const report = {};
  catalog.sections.forEach((section) => {
    const bank = questions.filter((question) => question.sectionKey === section.key);
    report[section.key] = {
      total: bank.length,
      target: catalog.targetPerSection,
      domains: countBy(bank, "domain"),
      domainTargets: Object.fromEntries(
        section.domains.map((domain) => [domain.name, domain.target]),
      ),
      difficulties: countBy(bank, "difficulty"),
      difficultyTargets: catalog.difficultyTargets,
      responseTypes: countBy(bank, "responseType"),
      reviewStatuses: countBy(bank, "reviewStatus"),
      answerPositions: countBy(
        bank.filter((question) => question.responseType === "multiple-choice"),
        (question) => String(question.correctAnswer),
      ),
    };
  });
  return report;
}

function coverageErrors(questions, catalog = loadCatalog(), requireComplete = false) {
  const errors = [];
  const report = coverageReport(questions, catalog);
  catalog.sections.forEach((section) => {
    const sectionReport = report[section.key];
    if (sectionReport.total > catalog.targetPerSection) {
      errors.push(`${section.key}: ${sectionReport.total} exceeds target ${catalog.targetPerSection}`);
    }
    if (requireComplete && sectionReport.total !== catalog.targetPerSection) {
      errors.push(`${section.key}: expected ${catalog.targetPerSection}, found ${sectionReport.total}`);
    }
    if (requireComplete) {
      Object.entries(sectionReport.domainTargets).forEach(([domain, target]) => {
        if ((sectionReport.domains[domain] || 0) !== target) {
          errors.push(
            `${section.key}/${domain}: expected ${target}, found ${sectionReport.domains[domain] || 0}`,
          );
        }
      });
      Object.entries(catalog.difficultyTargets).forEach(([difficulty, target]) => {
        if ((sectionReport.difficulties[difficulty] || 0) !== target) {
          errors.push(
            `${section.key}/${difficulty}: expected ${target}, found ${sectionReport.difficulties[difficulty] || 0}`,
          );
        }
      });
      const multipleChoiceCount = sectionReport.responseTypes["multiple-choice"] || 0;
      if (multipleChoiceCount > 0) {
        const low = Math.floor(multipleChoiceCount / 4);
        const high = Math.ceil(multipleChoiceCount / 4);
        for (let position = 0; position < 4; position += 1) {
          const count = sectionReport.answerPositions[String(position)] || 0;
          if (count < low || count > high) {
            errors.push(
              `${section.key}/answer ${position}: expected ${low}-${high}, found ${count}`,
            );
          }
        }
      }
    }
  });
  return errors;
}

// What each real exam's passages look like. These are the numbers the sections
// are actually built to, and the validator holds the banks to them: a 52-word
// "passage" carrying one question is the defect this table exists to catch.
//
//   types        the passage kinds that section is allowed to use
//   words        acceptable passage length, in words
//   perSet       how many questions one passage must carry
const PASSAGE_RULES = {
  "act-reading": {
    types: ["literary-narrative", "social-science", "humanities", "natural-science"],
    words: [600, 950],
    perSet: [8, 12],
  },
  "act-english": {
    types: ["personal-essay", "informative-essay", "historical-account", "process-narrative"],
    words: [250, 450],
    perSet: [12, 18],
  },
  "act-science": {
    types: ["data-representation", "research-summaries", "conflicting-viewpoints"],
    words: [80, 600],
    perSet: [5, 8],
  },
};

const PASSAGE_FIELDS = new Set([
  "id",
  "sectionKey",
  "type",
  "title",
  "intro",
  "content",
  "wordCount",
  "provenance",
]);

function countWords(text) {
  return String(text).trim().split(/\s+/).filter(Boolean).length;
}

function passageErrors(catalog = loadCatalog()) {
  const errors = [];

  catalog.sections.forEach((section) => {
    const rules = PASSAGE_RULES[section.key];
    const passages = loadPassages(section.key);
    const bank = loadBank(section.key);
    const referenced = new Map();

    bank.forEach((question) => {
      if (!question.passageId) return;
      if (!referenced.has(question.passageId)) referenced.set(question.passageId, []);
      referenced.get(question.passageId).push(question.id);
    });

    if (!rules) {
      if (passages.length > 0) {
        errors.push(`${section.key}: has passages but no structural rules are defined for it`);
      }
      if (referenced.size > 0) {
        errors.push(`${section.key}: questions reference passages but the section defines none`);
      }
      return;
    }

    const byId = new Map();
    passages.forEach((passage) => {
      const where = passage && passage.id ? passage.id : "(passage with no id)";
      if (!passage || typeof passage !== "object" || Array.isArray(passage)) {
        errors.push(`${section.key}: passage entries must be objects`);
        return;
      }
      Object.keys(passage).forEach((field) => {
        if (!PASSAGE_FIELDS.has(field)) errors.push(`${where}: unknown passage field "${field}"`);
      });
      if (!isNonemptyString(passage.id) || !new RegExp(`^${section.key}-p\\d{3}$`).test(passage.id)) {
        errors.push(`${where}: passage id must match ${section.key}-pNNN`);
      }
      if (byId.has(passage.id)) errors.push(`${where}: duplicate passage id`);
      byId.set(passage.id, passage);

      if (passage.sectionKey !== section.key) {
        errors.push(`${where}: sectionKey does not match the passage file`);
      }
      if (!rules.types.includes(passage.type)) {
        errors.push(`${where}: type "${passage.type}" is not one of ${rules.types.join(", ")}`);
      }
      ["title", "content"].forEach((field) => {
        if (!isNonemptyString(passage[field])) errors.push(`${where}: ${field} is required`);
      });
      if (isNonemptyString(passage.content)) {
        const words = countWords(passage.content);
        if (words < rules.words[0] || words > rules.words[1]) {
          errors.push(
            `${where}: ${words} words, outside the ${rules.words[0]}-${rules.words[1]} range for ${section.key}`,
          );
        }
        if (passage.wordCount !== words) {
          errors.push(`${where}: wordCount says ${passage.wordCount} but the content has ${words}`);
        }
      }
      if (!passage.provenance || passage.provenance.type !== "original") {
        errors.push(`${where}: provenance must declare original content`);
      }
    });

    referenced.forEach((questionIds, passageId) => {
      if (!byId.has(passageId)) {
        errors.push(`${passageId}: referenced by ${questionIds[0]} but no such passage exists`);
        return;
      }
      const size = questionIds.length;
      if (size < rules.perSet[0] || size > rules.perSet[1]) {
        errors.push(
          `${passageId}: carries ${size} questions, outside the ${rules.perSet[0]}-${rules.perSet[1]} range for ${section.key}`,
        );
      }
    });

    byId.forEach((passage, passageId) => {
      if (!referenced.has(passageId)) {
        errors.push(`${passageId}: no question references this passage`);
      }
    });
  });

  return errors;
}

function validateAll({ requireComplete = false } = {}) {
  const catalog = loadCatalog();
  const sections = sectionMap(catalog);
  const questions = loadAllBanks(catalog);
  const errors = [];

  catalog.sections.forEach((section) => {
    const bank = loadBank(section.key);
    bank.forEach((question) => {
      errors.push(...validateQuestion(question, section, catalog));
    });
  });
  questions.forEach((question) => {
    if (!sections.has(question.sectionKey)) {
      errors.push(`${question.id}: unknown sectionKey`);
    }
  });
  errors.push(...duplicateErrors(questions));
  errors.push(...coverageErrors(questions, catalog, requireComplete));
  errors.push(...passageErrors(catalog));

  return {
    catalog,
    questions,
    passages: loadAllPassages(catalog),
    report: coverageReport(questions, catalog),
    errors,
  };
}

function writeJsonAtomic(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const temporaryPath = `${filePath}.tmp`;
  fs.writeFileSync(temporaryPath, `${JSON.stringify(value, null, 2)}\n`);
  fs.renameSync(temporaryPath, filePath);
}

module.exports = {
  BANKS_DIR,
  PASSAGES_DIR,
  jaccard,
  loadPassages,
  loadAllPassages,
  hydrateBank,
  passageStimulus,
  unwrapParagraphs,
  passagePath,
  passageErrors,
  PASSAGE_RULES,
  CATALOG_PATH,
  GENERATED_DIR,
  ROOT,
  bankPath,
  coverageErrors,
  coverageReport,
  duplicateErrors,
  loadAllBanks,
  loadBank,
  loadCatalog,
  normalizeText,
  readJson,
  sectionMap,
  structuralSignature,
  tokenSet,
  validateAll,
  validateQuestion,
  writeJsonAtomic,
};
