"use strict";

const {
  bankPath,
  loadBank,
  loadCatalog,
  writeJsonAtomic,
} = require("./content");

function hashString(value) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createRandom(seed) {
  let state = hashString(seed) || 1;
  return function random() {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 4294967296;
  };
}

function pick(items, random) {
  return items[Math.floor(random() * items.length)];
}

function rotate(items, offset) {
  const normalized = ((offset % items.length) + items.length) % items.length;
  return items.slice(normalized).concat(items.slice(0, normalized));
}

function countBy(items, property) {
  return items.reduce((counts, item) => {
    const key = item[property];
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function expandTaxonomy(section, existing) {
  const domainCounts = countBy(existing, "domain");
  const tasks = [];

  section.domains.forEach((domain, domainIndex) => {
    const remaining = domain.target - (domainCounts[domain.name] || 0);
    if (remaining < 0) {
      throw new Error(`${section.key}/${domain.name} already exceeds its target`);
    }
    const taxonomy = Object.entries(domain.skills).flatMap(([skill, subskills]) =>
      subskills.map((subskill) => ({ domain: domain.name, skill, subskill })),
    );
    for (let index = 0; index < remaining; index += 1) {
      tasks.push({
        ...taxonomy[(index + domainIndex) % taxonomy.length],
        domainOrdinal: index,
      });
    }
  });

  return tasks;
}

const DIFFICULTY_TIERS = ["Easy", "Medium", "Hard"];

// Difficulty still fills the catalog's per-tier targets, but the tasks are
// visited in hash order rather than taxonomy order. Walking them in order made
// the tier sequence alias with the answer-position sequence, which is how the
// old banks ended up keying 67% of Hard ACT items to choice A. Generators are
// expected to branch on the assigned tier so the label describes the question.
function assignDifficulties(tasks, existing, targets) {
  const current = countBy(existing, "difficulty");
  const remaining = Object.fromEntries(
    Object.entries(targets).map(([difficulty, target]) => [
      difficulty,
      target - (current[difficulty] || 0),
    ]),
  );
  Object.entries(remaining).forEach(([difficulty, count]) => {
    if (count < 0) throw new Error(`${difficulty} already exceeds its target`);
  });

  const visitOrder = tasks
    .map((task, index) => ({
      index,
      key: hashString(`${task.domain}|${task.skill}|${task.subskill}|${index}`),
    }))
    .sort((left, right) => left.key - right.key || left.index - right.index);

  visitOrder.forEach(({ index }) => {
    const available = DIFFICULTY_TIERS.filter((tier) => remaining[tier] > 0);
    if (available.length === 0) throw new Error("Difficulty targets exhausted early");
    available.sort((left, right) => {
      const leftShare = remaining[left] / targets[left];
      const rightShare = remaining[right] / targets[right];
      if (rightShare !== leftShare) return rightShare - leftShare;
      return DIFFICULTY_TIERS.indexOf(left) - DIFFICULTY_TIERS.indexOf(right);
    });
    tasks[index].difficulty = available[0];
    remaining[available[0]] -= 1;
  });

  if (Object.values(remaining).some((count) => count !== 0)) {
    throw new Error(`Unfilled difficulty targets: ${JSON.stringify(remaining)}`);
  }
}

// Answer positions are balanced *within each difficulty tier*, not just
// overall. A globally balanced bank can still key almost every Hard item to
// the same letter, which is a free point for anyone who notices. Ties are
// broken by an item hash so the choice never follows generation order.
function answerPositionPlanner(existing) {
  const counts = {};
  const overall = [0, 0, 0, 0];
  DIFFICULTY_TIERS.forEach((tier) => {
    counts[tier] = [0, 0, 0, 0];
  });
  existing
    .filter((question) => question.responseType === "multiple-choice")
    .forEach((question) => {
      const tier = counts[question.difficulty] || counts.Medium;
      tier[question.correctAnswer] += 1;
      overall[question.correctAnswer] += 1;
    });

  return function nextPosition(difficulty, seedKey) {
    const tier = counts[difficulty] || counts.Medium;
    const fewestInTier = Math.min(...tier);
    const inTier = [0, 1, 2, 3].filter((index) => tier[index] === fewestInTier);
    const fewestOverall = Math.min(...inTier.map((index) => overall[index]));
    const candidates = inTier.filter((index) => overall[index] === fewestOverall);
    const choice = candidates[hashString(String(seedKey)) % candidates.length];
    tier[choice] += 1;
    overall[choice] += 1;
    return choice;
  };
}

function arrangeChoices(correct, distractors, correctIndex) {
  if (distractors.length !== 3) {
    throw new Error("Multiple-choice generator must supply exactly three distractors");
  }
  const choices = distractors.map((item) => item.text);
  choices.splice(correctIndex, 0, correct);
  const rationales = [];
  let distractorIndex = 0;
  for (let index = 0; index < choices.length; index += 1) {
    if (index === correctIndex) continue;
    rationales.push({
      index,
      reason: distractors[distractorIndex].reason,
    });
    distractorIndex += 1;
  }
  return { choices, correctAnswer: correctIndex, distractorRationales: rationales };
}

function baseRecord({
  section,
  task,
  sequence,
  responseType,
  generated,
  answerPosition,
  generator,
}) {
  const id = `${section.key}-${String(sequence).padStart(4, "0")}`;
  const common = {
    id,
    test: section.test,
    section: section.section,
    sectionKey: section.key,
    domain: task.domain,
    skill: task.skill,
    subskill: task.subskill,
    difficulty: task.difficulty,
    responseType,
    stimulus: generated.stimulus || null,
    stem: generated.stem,
    hint: generated.hint,
    explanation: generated.explanation,
    solutionSteps: generated.solutionSteps,
    strategy: generated.strategy,
    trap: generated.trap,
    estimatedSeconds: generated.estimatedSeconds ||
      (task.difficulty === "Easy" ? 45 : task.difficulty === "Medium" ? 75 : 105),
    principles: generated.principles,
    calculatorPolicy: section.calculatorPolicy,
    format: generated.format || "standalone",
    tags: generated.tags || [],
    provenance: {
      type: "original",
      generator,
      seed: id,
      created: "2026-07-29",
    },
    contentVersion: loadCatalog().contentVersion,
    reviewStatus: "automated-verified",
    verification: generated.verification || null,
  };

  if (responseType === "multiple-choice") {
    return {
      ...common,
      ...arrangeChoices(
        generated.correct,
        generated.distractors,
        answerPosition,
      ),
    };
  }
  return {
    ...common,
    choices: null,
    correctAnswer: generated.correctAnswer,
    distractorRationales: null,
  };
}

function generateSection(sectionKey, generator, options = {}) {
  const catalog = loadCatalog();
  const section = catalog.sections.find((item) => item.key === sectionKey);
  if (!section) throw new Error(`Unknown section ${sectionKey}`);
  const allExisting = loadBank(sectionKey);
  const existing = options.regenerateGenerated
    ? allExisting.filter(
        (question) => question.provenance.generator !== options.generatorName,
      )
    : allExisting;
  const tasks = expandTaxonomy(section, existing);
  assignDifficulties(tasks, existing, catalog.difficultyTargets);

  const nextAnswerPosition = answerPositionPlanner(existing);

  const generatedQuestions = tasks.map((task, taskIndex) => {
    const sequence = existing.length + taskIndex + 1;
    const seed = `${sectionKey}-${sequence}`;
    const random = createRandom(seed);
    const generated = generator({
      task,
      sequence,
      localIndex: taskIndex,
      random,
      pick: (items) => pick(items, random),
      rotate,
    });
    const responseType = generated.responseType || section.responseTypes[0];
    return baseRecord({
      section,
      task,
      sequence,
      responseType,
      generated,
      answerPosition: responseType === "multiple-choice"
        ? nextAnswerPosition(task.difficulty, seed)
        : null,
      generator: options.generatorName || `${sectionKey}-generator-v1`,
    });
  });

  const completed = existing.concat(generatedQuestions);
  writeJsonAtomic(bankPath(sectionKey), completed);
  return {
    existing: existing.length,
    generated: generatedQuestions.length,
    total: completed.length,
  };
}

module.exports = {
  arrangeChoices,
  answerPositionPlanner,
  assignDifficulties,
  baseRecord,
  createRandom,
  expandTaxonomy,
  generateSection,
  hashString,
  pick,
  rotate,
};
