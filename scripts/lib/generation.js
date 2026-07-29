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

  const order = ["Medium", "Easy", "Hard"];
  tasks.forEach((task, index) => {
    const available = order.filter((difficulty) => remaining[difficulty] > 0);
    if (available.length === 0) throw new Error("Difficulty targets exhausted early");
    available.sort((left, right) => {
      const leftRatio = remaining[left] / targets[left];
      const rightRatio = remaining[right] / targets[right];
      if (rightRatio !== leftRatio) return rightRatio - leftRatio;
      return order.indexOf(left) - order.indexOf(right);
    });
    const difficulty = available[index % Math.min(2, available.length)] || available[0];
    task.difficulty = difficulty;
    remaining[difficulty] -= 1;
  });

  if (Object.values(remaining).some((count) => count !== 0)) {
    throw new Error(`Unfilled difficulty targets: ${JSON.stringify(remaining)}`);
  }
}

function answerPositionPlanner(existing, finalMultipleChoiceCount = 500) {
  const targetBase = Math.floor(finalMultipleChoiceCount / 4);
  const extras = finalMultipleChoiceCount % 4;
  const targets = [0, 1, 2, 3].map((index) => targetBase + (index < extras ? 1 : 0));
  const counts = [0, 0, 0, 0];
  existing
    .filter((question) => question.responseType === "multiple-choice")
    .forEach((question) => {
      counts[question.correctAnswer] += 1;
    });

  return function nextPosition() {
    const deficits = targets.map((target, index) => ({
      index,
      deficit: target - counts[index],
    }));
    deficits.sort((left, right) =>
      right.deficit - left.deficit || left.index - right.index,
    );
    if (deficits[0].deficit <= 0) throw new Error("Answer-position targets exhausted");
    counts[deficits[0].index] += 1;
    return deficits[0].index;
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
  const existing = loadBank(sectionKey);
  const tasks = expandTaxonomy(section, existing);
  assignDifficulties(tasks, existing, catalog.difficultyTargets);

  const finalMultipleChoiceCount = options.finalMultipleChoiceCount === undefined
    ? catalog.targetPerSection
    : options.finalMultipleChoiceCount;
  const nextAnswerPosition = finalMultipleChoiceCount > 0
    ? answerPositionPlanner(existing, finalMultipleChoiceCount)
    : null;

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
      answerPosition: responseType === "multiple-choice" ? nextAnswerPosition() : null,
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
  baseRecord,
  createRandom,
  generateSection,
  hashString,
  pick,
  rotate,
};
