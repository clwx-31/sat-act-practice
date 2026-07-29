(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.PracticeCore = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const DIFFICULTY_ORDER = ["Easy", "Medium", "Hard"];

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
    DIFFICULTY_ORDER,
    buildSession,
    chooseDifficulty,
    deterministicShuffle,
    filterQuestions,
    normalize,
    numericEqual,
    recommendQuestion,
    scoreResponse,
    summarizeProgress,
  };
});
