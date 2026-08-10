(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.PracticeCore = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const DIFFICULTY_ORDER = ["Easy", "Medium", "Hard"];

  // Mini tests mirror each test's real section weighting inside 20 questions.
  // Minute budgets come from official per-question pacing, rounded up:
  // SAT 71s reading/writing and 95s math; ACT 42s English, 67s math and
  // reading, 60s science. These are practice benchmarks, not scaled scores.
  const MINI_TEST_DIFFICULTY_MIX = [
    { difficulty: "Easy", weight: 0.3 },
    { difficulty: "Medium", weight: 0.45 },
    { difficulty: "Hard", weight: 0.25 },
  ];

  // Printed booklets need a label, a time box, and directions for every
  // section, so both the mini and full blueprints draw from one source.
  const SECTION_LABELS = {
    "sat-reading-writing": "Reading and Writing",
    "sat-math": "Math",
    "act-english": "English",
    "act-mathematics": "Mathematics",
    "act-reading": "Reading",
    "act-science": "Science",
  };

  const SECTION_DIRECTIONS = {
    "sat-reading-writing":
      "Each question refers to the passage or passages that precede it. " +
      "Choose the best answer to each question.",
    "sat-math":
      "A calculator is permitted throughout. Unless stated otherwise, all " +
      "figures lie in a plane and all numbers used are real numbers.",
    "act-english":
      "Choose the alternative that best expresses the idea, makes the " +
      "statement acceptable in standard written English, or is worded most " +
      "consistently with the style and tone of the passage.",
    "act-mathematics":
      "Solve each problem and choose the correct answer. A calculator is " +
      "permitted. Illustrative figures are not necessarily drawn to scale.",
    "act-reading":
      "Each question refers to the passage that precedes it. Choose the best " +
      "answer on the basis of what is stated or implied.",
    "act-science":
      "Each set of data is followed by questions. Refer to the data as often " +
      "as necessary. A calculator is not permitted on this section.",
  };

  function section(sectionKey, count, minutes, label) {
    return {
      sectionKey,
      count,
      minutes,
      label: label || SECTION_LABELS[sectionKey] || sectionKey,
      directions: SECTION_DIRECTIONS[sectionKey] || "",
    };
  }

  const MINI_TEST_BLUEPRINTS = [
    {
      id: "sat",
      test: "SAT",
      label: "SAT mini test",
      minutes: 28,
      summary:
        "Eleven Reading and Writing items and nine Math items, weighted like " +
        "the digital SAT's 54/44 split.",
      sections: [
        section("sat-reading-writing", 11, 13),
        section("sat-math", 9, 15),
      ],
    },
    {
      id: "act",
      test: "ACT",
      label: "ACT mini test",
      minutes: 20,
      summary:
        "Eight English, seven Mathematics, and five Reading items, weighted " +
        "like the enhanced ACT's 50/45/36 Composite split.",
      sections: [
        section("act-english", 8, 6),
        section("act-mathematics", 7, 8),
        section("act-reading", 5, 6),
      ],
    },
    {
      id: "act-science",
      test: "ACT",
      label: "ACT mini test with Science",
      minutes: 20,
      summary:
        "Six English, five Mathematics, four Reading, and five Science items. " +
        "Science is optional on the ACT and sits outside the Composite.",
      sections: [
        section("act-english", 6, 4),
        section("act-mathematics", 5, 6),
        section("act-reading", 4, 5),
        section("act-science", 5, 5),
      ],
    },
  ];

  // Full-length forms mirror the official section counts and time limits:
  // digital SAT 54 Reading and Writing across two 32-minute modules plus 44
  // Math across two 35-minute modules; enhanced ACT 50 English, 45
  // Mathematics, and 36 Reading, with the optional 40-item Science section
  // sitting outside the Composite.
  const FULL_TEST_BLUEPRINTS = [
    {
      id: "sat-full",
      test: "SAT",
      label: "SAT full-length practice test",
      minutes: 134,
      breakAfter: 1,
      summary:
        "Ninety-eight questions in four modules, matching the digital SAT's " +
        "54 Reading and Writing and 44 Math structure.",
      sections: [
        section("sat-reading-writing", 27, 32, "Reading and Writing — Module 1"),
        section("sat-reading-writing", 27, 32, "Reading and Writing — Module 2"),
        section("sat-math", 22, 35, "Math — Module 1"),
        section("sat-math", 22, 35, "Math — Module 2"),
      ],
    },
    {
      id: "act-full",
      test: "ACT",
      label: "ACT full-length practice test",
      minutes: 125,
      breakAfter: 1,
      summary:
        "One hundred thirty-one questions across English, Mathematics, and " +
        "Reading, matching the enhanced ACT's Composite sections.",
      sections: [
        section("act-english", 50, 35),
        section("act-mathematics", 45, 50),
        section("act-reading", 36, 40),
      ],
    },
    {
      id: "act-full-science",
      test: "ACT",
      label: "ACT full-length practice test with Science",
      minutes: 165,
      breakAfter: 1,
      summary:
        "The three Composite sections plus the optional 40-question Science " +
        "section, which is reported separately.",
      sections: [
        section("act-english", 50, 35),
        section("act-mathematics", 45, 50),
        section("act-reading", 36, 40),
        section("act-science", 40, 40),
      ],
    },
  ];

  const ALL_BLUEPRINTS = MINI_TEST_BLUEPRINTS.concat(FULL_TEST_BLUEPRINTS);

  function blueprintById(id) {
    return ALL_BLUEPRINTS.find((blueprint) => blueprint.id === id) || null;
  }

  function blueprintTotal(blueprint) {
    return blueprint.sections.reduce((total, entry) => total + entry.count, 0);
  }

  // Largest-remainder allocation so weighted counts always sum to the total.
  function allocateByWeight(total, weights) {
    const raw = weights.map((weight) => weight * total);
    const counts = raw.map((value) => Math.floor(value));
    let remaining = total - counts.reduce((sum, value) => sum + value, 0);
    const order = raw
      .map((value, index) => ({ index, remainder: value - Math.floor(value) }))
      .sort((left, right) => right.remainder - left.remainder);
    let cursor = 0;
    while (remaining > 0 && order.length) {
      counts[order[cursor % order.length].index] += 1;
      cursor += 1;
      remaining -= 1;
    }
    return counts;
  }

  // Draws `count` scoreable items from one section, spread across difficulty
  // tiers and backfilled when a tier is short.
  function drawSectionItems(bank, count, seed, excludeIds) {
    const blocked = excludeIds || new Set();
    const scoreable = bank.filter(
      (question) => question.responseType !== "essay" && !blocked.has(question.id),
    );
    const targets = allocateByWeight(
      count,
      MINI_TEST_DIFFICULTY_MIX.map((entry) => entry.weight),
    );
    const chosen = [];
    const used = new Set();
    MINI_TEST_DIFFICULTY_MIX.forEach((entry, index) => {
      const pool = deterministicShuffle(
        scoreable.filter((question) => question.difficulty === entry.difficulty),
        `${seed}-${entry.difficulty}`,
      );
      pool.slice(0, targets[index]).forEach((question) => {
        chosen.push(question);
        used.add(question.id);
      });
    });
    if (chosen.length < count) {
      deterministicShuffle(scoreable, `${seed}-backfill`)
        .filter((question) => !used.has(question.id))
        .slice(0, count - chosen.length)
        .forEach((question) => {
          chosen.push(question);
          used.add(question.id);
        });
    }
    return deterministicShuffle(chosen, `${seed}-order`).slice(0, count);
  }

  // Returns blueprint questions in section order, so the test reads like the
  // real thing rather than jumping between sections.
  function buildMiniTest(bankBySection, blueprint, seed) {
    if (!blueprint) return [];
    const questions = [];
    blueprint.sections.forEach((entry) => {
      const bank = bankBySection[entry.sectionKey] || [];
      questions.push(
        ...drawSectionItems(bank, entry.count, `${seed}-${entry.sectionKey}`),
      );
    });
    return questions;
  }

  // Builds a printable form as grouped sections rather than one flat list.
  // Unlike buildMiniTest, each entry is seeded by position and excludes items
  // already drawn, so two modules that share a bank never repeat a question.
  function buildTestForm(bankBySection, blueprint, seed) {
    if (!blueprint) return [];
    const used = new Set();
    return blueprint.sections.map((entry, index) => {
      const bank = bankBySection[entry.sectionKey] || [];
      const questions = drawSectionItems(
        bank,
        entry.count,
        `${seed}-${index}-${entry.sectionKey}`,
        used,
      );
      questions.forEach((question) => used.add(question.id));
      return {
        entry,
        label: entry.label || entry.sectionKey,
        minutes: entry.minutes || null,
        directions: entry.directions || "",
        questions,
      };
    });
  }

  // The ACT alternates answer labels between odd and even questions so a
  // misread row on the answer sheet is obvious. The SAT uses A-D throughout.
  const ANSWER_LETTERS = {
    SAT: [["A", "B", "C", "D"]],
    ACT: [["A", "B", "C", "D"], ["F", "G", "H", "J"]],
  };

  function answerLetters(test, questionNumber) {
    const sets = ANSWER_LETTERS[test] || ANSWER_LETTERS.SAT;
    return sets[(questionNumber - 1) % sets.length];
  }

  // Accuracy only. This never estimates a scaled SAT total or ACT composite.
  function summarizeMiniTest(questions, responses) {
    const answers = responses instanceof Map ? responses : new Map(responses || []);
    const summary = {
      total: questions.length,
      answered: 0,
      correct: 0,
      unanswered: 0,
      accuracy: null,
      bySection: [],
      byDomain: [],
      items: [],
    };
    const sections = new Map();
    const domains = new Map();

    questions.forEach((question) => {
      const hasResponse = answers.has(question.id) &&
        answers.get(question.id) !== null &&
        answers.get(question.id) !== "";
      const correct = hasResponse
        ? scoreResponse(question, answers.get(question.id)) === true
        : false;
      if (hasResponse) summary.answered += 1;
      else summary.unanswered += 1;
      if (correct) summary.correct += 1;

      const sectionKey = question.sectionKey;
      if (!sections.has(sectionKey)) {
        sections.set(sectionKey, {
          sectionKey,
          test: question.test,
          section: question.section,
          total: 0,
          correct: 0,
          accuracy: 0,
        });
      }
      const sectionRow = sections.get(sectionKey);
      sectionRow.total += 1;
      if (correct) sectionRow.correct += 1;

      const domainKey = `${sectionKey}|${question.domain}`;
      if (!domains.has(domainKey)) {
        domains.set(domainKey, {
          sectionKey,
          section: question.section,
          domain: question.domain,
          total: 0,
          correct: 0,
          accuracy: 0,
        });
      }
      const domainRow = domains.get(domainKey);
      domainRow.total += 1;
      if (correct) domainRow.correct += 1;

      summary.items.push({
        question,
        response: hasResponse ? answers.get(question.id) : null,
        answered: hasResponse,
        correct,
      });
    });

    summary.accuracy = summary.total ? summary.correct / summary.total : null;
    summary.bySection = [...sections.values()].map((row) => ({
      ...row,
      accuracy: row.total ? row.correct / row.total : 0,
    }));
    summary.byDomain = [...domains.values()]
      .map((row) => ({ ...row, accuracy: row.total ? row.correct / row.total : 0 }))
      .sort((left, right) => left.accuracy - right.accuracy);
    return summary;
  }

  function normalize(value) {
    return String(value || "")
      .normalize("NFKD")
      .toLowerCase()
      .replace(/[^\p{L}\p{N}.+-]+/gu, " ")
      .trim()
      .replace(/\s+/g, " ");
  }

  function filterQuestions(questions, filters) {
    const domains = new Set(filters.domains || []);
    const skills = new Set(filters.skills || []);
    const difficulties = new Set(filters.difficulties || []);
    const query = normalize(filters.query);
    const includedIds = filters.includedIds ? new Set(filters.includedIds) : null;

    return questions.filter((question) => {
      if (domains.size && !domains.has(question.domain)) return false;
      if (skills.size && !skills.has(question.skill)) return false;
      if (difficulties.size && !difficulties.has(question.difficulty)) return false;
      if (includedIds && !includedIds.has(question.id)) return false;
      if (!query) return true;
      const searchable = normalize([
        question.id,
        question.domain,
        question.skill,
        question.subskill,
        question.stem,
        question.stimulus && question.stimulus.content,
      ].join(" "));
      return query.split(" ").every((term) => searchable.includes(term));
    });
  }

  function numericEqual(actual, expected) {
    const normalizedActual = normalize(actual).replace(/,/g, "");
    const normalizedExpected = normalize(expected).replace(/,/g, "");
    const actualNumber = Number(normalizedActual);
    const expectedNumber = Number(normalizedExpected);
    if (Number.isFinite(actualNumber) && Number.isFinite(expectedNumber)) {
      return Math.abs(actualNumber - expectedNumber) <= 0.001;
    }
    return normalizedActual === normalizedExpected;
  }

  function scoreResponse(question, response) {
    if (question.responseType === "essay") return null;
    if (question.responseType === "multiple-choice") {
      return Number(response) === question.correctAnswer;
    }
    return numericEqual(response, question.correctAnswer);
  }

  function summarizeProgress(attempts, questions) {
    const byId = new Map(questions.map((question) => [question.id, question]));
    const summary = {
      attempted: attempts.length,
      correct: 0,
      accuracy: null,
      uniqueCompleted: new Set(),
      bySkill: {},
      recent: [],
    };
    attempts.forEach((attempt) => {
      const question = byId.get(attempt.questionId);
      if (!question) return;
      summary.uniqueCompleted.add(attempt.questionId);
      if (attempt.correct === true) summary.correct += 1;
      if (attempt.correct !== null) {
        const key = `${question.sectionKey}|${question.skill}`;
        if (!summary.bySkill[key]) {
          summary.bySkill[key] = {
            sectionKey: question.sectionKey,
            skill: question.skill,
            attempted: 0,
            correct: 0,
            accuracy: 0,
          };
        }
        summary.bySkill[key].attempted += 1;
        if (attempt.correct) summary.bySkill[key].correct += 1;
      }
    });
    const scored = attempts.filter((attempt) => attempt.correct !== null);
    summary.accuracy = scored.length ? summary.correct / scored.length : null;
    Object.values(summary.bySkill).forEach((skill) => {
      skill.accuracy = skill.correct / skill.attempted;
    });
    summary.uniqueCompleted = summary.uniqueCompleted.size;
    summary.recent = attempts.slice(-10).reverse();
    return summary;
  }

  function chooseDifficulty(skillAttempts) {
    const recent = skillAttempts.slice(-8).filter((attempt) => attempt.correct !== null);
    if (recent.length < 3) return "Medium";
    const accuracy = recent.filter((attempt) => attempt.correct).length / recent.length;
    if (accuracy >= 0.8) return "Hard";
    if (accuracy < 0.5) return "Easy";
    return "Medium";
  }

  function recommendQuestion(questions, attempts, options) {
    options = options || {};
    if (!questions.length) return null;
    const recentIds = new Set((options.recentIds || []).slice(-12));
    const now = options.now || Date.now();
    const byQuestion = new Map();
    attempts.forEach((attempt) => {
      if (!byQuestion.has(attempt.questionId)) byQuestion.set(attempt.questionId, []);
      byQuestion.get(attempt.questionId).push(attempt);
    });

    const dueMissed = questions.filter((question) => {
      const history = byQuestion.get(question.id) || [];
      const last = history[history.length - 1];
      return last && last.correct === false && (!last.reviewAt || last.reviewAt <= now);
    });
    const dueCandidate = dueMissed.find((question) => !recentIds.has(question.id));
    if (dueCandidate) {
      return {
        question: dueCandidate,
        reason: `Review due: you previously missed ${dueCandidate.skill}.`,
        kind: "review",
      };
    }

    const bySkill = {};
    attempts.forEach((attempt) => {
      if (attempt.correct === null) return;
      const question = questions.find((candidate) => candidate.id === attempt.questionId);
      if (!question) return;
      if (!bySkill[question.skill]) bySkill[question.skill] = [];
      bySkill[question.skill].push(attempt);
    });
    const weakSkill = Object.entries(bySkill)
      .filter((entry) => entry[1].length >= 2)
      .map(([skill, skillAttempts]) => ({
        skill,
        attempts: skillAttempts,
        accuracy: skillAttempts.filter((attempt) => attempt.correct).length /
          skillAttempts.length,
      }))
      .sort((left, right) => left.accuracy - right.accuracy)[0];

    if (weakSkill) {
      const difficulty = chooseDifficulty(weakSkill.attempts);
      const candidate = questions.find((question) =>
        question.skill === weakSkill.skill &&
        question.difficulty === difficulty &&
        !recentIds.has(question.id)
      ) || questions.find((question) =>
        question.skill === weakSkill.skill && !recentIds.has(question.id)
      );
      if (candidate) {
        return {
          question: candidate,
          reason:
            `Weak-skill practice: ${Math.round(weakSkill.accuracy * 100)}% accuracy in ` +
            `${weakSkill.skill}; ${candidate.difficulty.toLowerCase()} difficulty is the next gradual step.`,
          kind: "weak-skill",
        };
      }
    }

    const unattempted = questions.find((question) =>
      !byQuestion.has(question.id) && !recentIds.has(question.id)
    );
    if (unattempted) {
      return {
        question: unattempted,
        reason: `New coverage: build experience in ${unattempted.skill}.`,
        kind: "new",
      };
    }

    const fallback = questions.find((question) => !recentIds.has(question.id)) || questions[0];
    return {
      question: fallback,
      reason: `Balanced review: continue practicing ${fallback.skill}.`,
      kind: "balanced",
    };
  }

  function deterministicShuffle(items, seed) {
    const result = items.slice();
    let state = 2166136261;
    String(seed).split("").forEach((character) => {
      state ^= character.charCodeAt(0);
      state = Math.imul(state, 16777619);
    });
    function random() {
      state ^= state << 13;
      state ^= state >>> 17;
      state ^= state << 5;
      return (state >>> 0) / 4294967296;
    }
    for (let index = result.length - 1; index > 0; index -= 1) {
      const target = Math.floor(random() * (index + 1));
      [result[index], result[target]] = [result[target], result[index]];
    }
    return result;
  }

  function buildSession(questions, count, seed) {
    const shuffled = deterministicShuffle(questions, seed);
    if (count === "all") return shuffled;
    return shuffled.slice(0, Math.max(1, Number(count) || 10));
  }

  return {
    ALL_BLUEPRINTS,
    ANSWER_LETTERS,
    DIFFICULTY_ORDER,
    FULL_TEST_BLUEPRINTS,
    MINI_TEST_BLUEPRINTS,
    MINI_TEST_DIFFICULTY_MIX,
    allocateByWeight,
    answerLetters,
    blueprintById,
    blueprintTotal,
    buildMiniTest,
    buildSession,
    buildTestForm,
    drawSectionItems,
    chooseDifficulty,
    deterministicShuffle,
    filterQuestions,
    normalize,
    numericEqual,
    recommendQuestion,
    scoreResponse,
    summarizeMiniTest,
    summarizeProgress,
  };
});
