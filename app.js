(function () {
  "use strict";

  const catalog = window.PRACTICE_CATALOG;
  const core = window.PracticeCore;
  const STORAGE_KEY = "summit-prep-progress-v2";
  const LETTERS = ["A", "B", "C", "D"];
  const views = {
    setup: document.getElementById("setupView"),
    quiz: document.getElementById("quizView"),
    results: document.getElementById("resultsView"),
    dashboard: document.getElementById("dashboardView"),
    review: document.getElementById("reviewView"),
    signs: document.getElementById("signsView"),
  };

  const elements = {
    form: document.getElementById("practiceForm"),
    section: document.getElementById("sectionSelect"),
    sectionNote: document.getElementById("sectionNote"),
    mode: document.getElementById("modeSelect"),
    count: document.getElementById("countSelect"),
    domain: document.getElementById("domainSelect"),
    skill: document.getElementById("skillSelect"),
    search: document.getElementById("searchInput"),
    matchCount: document.getElementById("matchCount"),
    bankStatus: document.getElementById("bankStatus"),
    start: document.getElementById("startBtn"),
    recommendText: document.getElementById("recommendText"),
    recommendBtn: document.getElementById("recommendBtn"),
    progressLabel: document.getElementById("progressLabel"),
    progressFill: document.getElementById("progressFill"),
    progressBar: document.querySelector(".progress-bar"),
    scoreLabel: document.getElementById("scoreLabel"),
    questionId: document.getElementById("questionId"),
    tags: document.getElementById("tags"),
    stimulus: document.getElementById("stimulus"),
    heading: document.getElementById("questionHeading"),
    responseArea: document.getElementById("responseArea"),
    responseStatus: document.getElementById("responseStatus"),
    hintBtn: document.getElementById("hintBtn"),
    hintPanel: document.getElementById("hintPanel"),
    feedback: document.getElementById("feedback"),
    verdict: document.getElementById("verdict"),
    concise: document.getElementById("conciseExplanation"),
    solutionSteps: document.getElementById("solutionSteps"),
    strategy: document.getElementById("strategyText"),
    trap: document.getElementById("trapText"),
    distractorSection: document.getElementById("distractorSection"),
    distractorList: document.getElementById("distractorList"),
    principleList: document.getElementById("principleList"),
    submit: document.getElementById("submitBtn"),
    next: document.getElementById("nextBtn"),
    prev: document.getElementById("prevBtn"),
    finishTest: document.getElementById("finishTestBtn"),
    exit: document.getElementById("exitBtn"),
    miniTestOptions: document.getElementById("miniTestOptions"),
    miniTestSummary: document.getElementById("miniTestSummary"),
    miniTestStart: document.getElementById("miniTestStartBtn"),
    miniTestStatus: document.getElementById("miniTestStatus"),
    miniTestClock: document.getElementById("miniTestClock"),
    miniTestNav: document.getElementById("miniTestNav"),
    miniTestReport: document.getElementById("miniTestReport"),
    reviewAll: document.getElementById("reviewAllBtn"),
    bookmark: document.getElementById("bookmarkBtn"),
    flag: document.getElementById("flagBtn"),
    finalScore: document.getElementById("finalScore"),
    finalScoreLabel: document.getElementById("finalScoreLabel"),
    resultsMessage: document.getElementById("resultsMessage"),
    resultsBreakdown: document.getElementById("resultsBreakdown"),
    practiceAgain: document.getElementById("practiceAgainBtn"),
    reviewSession: document.getElementById("reviewSessionBtn"),
    dashboardStats: document.getElementById("dashboardStats"),
    skillTableWrap: document.getElementById("skillTableWrap"),
    masterySection: document.getElementById("masterySection"),
    masterySort: document.getElementById("masterySort"),
    masteryNote: document.getElementById("masteryNote"),
    clearProgress: document.getElementById("clearProgressBtn"),
    reviewList: document.getElementById("reviewList"),
    home: document.getElementById("homeLink"),
    signsDisclaimer: document.getElementById("signsDisclaimer"),
    signsPrinciples: document.getElementById("signsPrinciples"),
    signsFilter: document.getElementById("signsFilter"),
    signsGroups: document.getElementById("signsGroups"),
  };

  let progress = loadProgress();
  let currentBank = [];
  let session = [];
  let sessionIndex = 0;
  let sessionResults = [];
  let response = null;
  let answered = false;
  let recommendation = null;
  let activeReviewList = "missed";
  let masteryRows = [];
  let clearArmed = false;
  let bankRequestId = 0;
  const bankPromises = new Map();

  // "practice" is the original check-as-you-go flow. "test" withholds feedback
  // until the whole mini test is submitted. "review" walks a finished mini test
  // with every answer guide already open.
  let sessionKind = "practice";
  let miniTest = null;
  let miniTestSummary = null;
  let selectedBlueprintId = "sat";

  function emptyProgress() {
    return {
      version: 2,
      attempts: [],
      bookmarked: [],
      flagged: [],
      recentIds: [],
    };
  }

  function loadProgress() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (parsed && parsed.version === 2) {
        parsed.attempts = Array.isArray(parsed.attempts) ? parsed.attempts : [];
        parsed.bookmarked = Array.isArray(parsed.bookmarked) ? parsed.bookmarked : [];
        parsed.flagged = Array.isArray(parsed.flagged) ? parsed.flagged : [];
        parsed.recentIds = Array.isArray(parsed.recentIds) ? parsed.recentIds : [];
        return parsed;
      }
    } catch (error) {
      console.warn("Could not read local practice progress.", error);
    }
    return emptyProgress();
  }

  function saveProgress() {
    progress.attempts = progress.attempts.slice(-5000);
    progress.recentIds = progress.recentIds.slice(-30);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      elements.responseStatus.textContent =
        "Progress could not be saved in this browser. Practice can continue.";
    }
  }

  function sectionByKey(key) {
    return catalog.sections.find((section) => section.key === key);
  }

  function populateSections() {
    catalog.sections.forEach((section) => {
      const option = document.createElement("option");
      option.value = section.key;
      option.textContent = `${section.test} — ${section.shortLabel} (${catalog.targetPerSection})`;
      elements.section.appendChild(option);
    });
    elements.section.value = "sat-reading-writing";
  }

  function loadBank(sectionKey) {
    window.PRACTICE_BANKS = window.PRACTICE_BANKS || {};
    if (window.PRACTICE_BANKS[sectionKey]) {
      return Promise.resolve(window.PRACTICE_BANKS[sectionKey]);
    }
    if (bankPromises.has(sectionKey)) return bankPromises.get(sectionKey);
    const pending = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `content/generated/${sectionKey}.js`;
      script.onload = () => {
        const bank = window.PRACTICE_BANKS[sectionKey];
        if (!bank) reject(new Error(`The ${sectionKey} bank did not register.`));
        else resolve(bank);
      };
      script.onerror = () => {
        bankPromises.delete(sectionKey);
        reject(new Error(`Could not load ${sectionKey}.`));
      };
      document.head.appendChild(script);
    });
    bankPromises.set(sectionKey, pending);
    return pending;
  }

  async function loadAllBanks() {
    const banks = await Promise.all(catalog.sections.map((section) => loadBank(section.key)));
    return banks.flat();
  }

  async function changeSection() {
    const requestId = ++bankRequestId;
    const section = sectionByKey(elements.section.value);
    elements.start.disabled = true;
    elements.recommendBtn.disabled = true;
    elements.bankStatus.className = "status-line loading";
    elements.bankStatus.textContent = `Loading ${section.test} ${section.shortLabel}…`;
    elements.sectionNote.textContent = section.optional
      ? "This is an optional ACT section and is not part of the current Composite score."
      : section.test === "ACT"
        ? "This required section contributes to the current ACT Composite score."
        : "This is one of the digital SAT's two sections.";
    try {
      const bank = await loadBank(section.key);
      if (requestId !== bankRequestId) return;
      currentBank = bank;
      populateTaxonomy();
      updateMatches();
      updateRecommendation();
      elements.bankStatus.className = "status-line success";
      elements.bankStatus.textContent =
        `${currentBank.length} validated original items ready. Content version ${catalog.contentVersion}.`;
    } catch (error) {
      if (requestId !== bankRequestId) return;
      currentBank = [];
      elements.matchCount.textContent = "Unavailable";
      elements.bankStatus.className = "status-line error";
      elements.bankStatus.textContent =
        `${error.message} If this file is open locally, confirm the content/generated folder is present.`;
    }
  }

  function populateTaxonomy() {
    const section = sectionByKey(elements.section.value);
    replaceOptions(elements.domain, [
      { value: "", label: "All domains" },
      ...section.domains.map((domain) => ({ value: domain.name, label: domain.name })),
    ]);
    populateSkills();
  }

  function populateSkills() {
    const section = sectionByKey(elements.section.value);
    const selectedDomain = elements.domain.value;
    const domains = selectedDomain
      ? section.domains.filter((domain) => domain.name === selectedDomain)
      : section.domains;
    const skills = [...new Set(domains.flatMap((domain) => Object.keys(domain.skills)))];
    replaceOptions(elements.skill, [
      { value: "", label: "All skills" },
      ...skills.map((skill) => ({ value: skill, label: skill })),
    ]);
  }

  function replaceOptions(select, options) {
    select.innerHTML = "";
    options.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.value;
      option.textContent = item.label;
      select.appendChild(option);
    });
  }

  function selectedDifficulties() {
    return Array.from(
      document.querySelectorAll('input[name="difficulty"]:checked'),
      (input) => input.value,
    );
  }

  function latestMissedIds() {
    const latest = new Map();
    progress.attempts.forEach((attempt) => latest.set(attempt.questionId, attempt));
    return [...latest.values()]
      .filter((attempt) => attempt.correct === false)
      .map((attempt) => attempt.questionId);
  }

  function activeIncludedIds(mode) {
    if (mode === "missed") return latestMissedIds();
    if (mode === "bookmarked") return progress.bookmarked;
    if (mode === "flagged") return progress.flagged;
    return null;
  }

  function matchingQuestions() {
    const mode = elements.mode.value;
    if (mode === "full") return currentBank.slice();
    return core.filterQuestions(currentBank, {
      domains: elements.domain.value ? [elements.domain.value] : [],
      skills: elements.skill.value ? [elements.skill.value] : [],
      difficulties: selectedDifficulties(),
      query: elements.search.value,
      includedIds: activeIncludedIds(mode),
    });
  }

  function updateMatches() {
    const mode = elements.mode.value;
    const filtersDisabled = mode === "full" || mode === "adaptive";
    [elements.domain, elements.skill, elements.search].forEach((control) => {
      control.disabled = filtersDisabled;
    });
    document.querySelectorAll('input[name="difficulty"]').forEach((input) => {
      input.disabled = filtersDisabled;
    });
    const matches = matchingQuestions();
    elements.matchCount.textContent = `${matches.length} match${matches.length === 1 ? "" : "es"}`;
    elements.start.disabled = matches.length === 0 && mode !== "adaptive";
  }

  function updateRecommendation() {
    recommendation = core.recommendQuestion(
      currentBank,
      progress.attempts,
      { recentIds: progress.recentIds },
    );
    if (!recommendation) {
      elements.recommendText.textContent = "No recommendation is available for this section.";
      elements.recommendBtn.disabled = true;
      return;
    }
    elements.recommendText.textContent =
      `${recommendation.reason} Next: ${recommendation.question.domain} — ` +
      `${recommendation.question.subskill}.`;
    elements.recommendBtn.disabled = false;
  }

  /* ---------------------------------------------------------------- mini test */

  function renderMiniTestOptions() {
    elements.miniTestOptions.innerHTML = "";
    core.MINI_TEST_BLUEPRINTS.forEach((blueprint) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "mini-test-option";
      button.dataset.blueprint = blueprint.id;
      button.setAttribute("aria-pressed", String(blueprint.id === selectedBlueprintId));
      if (blueprint.id === selectedBlueprintId) button.classList.add("active");
      const name = document.createElement("strong");
      name.textContent = blueprint.label;
      const meta = document.createElement("span");
      meta.textContent =
        `${core.blueprintTotal(blueprint)} questions · ${blueprint.minutes} min`;
      button.append(name, meta);
      button.addEventListener("click", () => {
        selectedBlueprintId = blueprint.id;
        renderMiniTestOptions();
      });
      elements.miniTestOptions.appendChild(button);
    });
    const active = core.blueprintById(selectedBlueprintId);
    elements.miniTestSummary.textContent = active ? active.summary : "";
    elements.miniTestStart.disabled = !active;
  }

  async function startMiniTest() {
    const blueprint = core.blueprintById(selectedBlueprintId);
    if (!blueprint) return;
    elements.miniTestStart.disabled = true;
    elements.miniTestStatus.className = "status-line loading";
    elements.miniTestStatus.textContent = `Preparing the ${blueprint.label}…`;

    let bankBySection;
    try {
      const banks = await Promise.all(
        blueprint.sections.map((entry) => loadBank(entry.sectionKey)),
      );
      bankBySection = Object.fromEntries(
        blueprint.sections.map((entry, index) => [entry.sectionKey, banks[index]]),
      );
    } catch (error) {
      elements.miniTestStatus.className = "status-line error";
      elements.miniTestStatus.textContent =
        `${error.message} Confirm the content/generated folder is present.`;
      elements.miniTestStart.disabled = false;
      return;
    }

    const questions = core.buildMiniTest(bankBySection, blueprint, `${Date.now()}-${blueprint.id}`);
    if (questions.length < core.blueprintTotal(blueprint)) {
      elements.miniTestStatus.className = "status-line error";
      elements.miniTestStatus.textContent =
        "Not enough items are available to build this mini test.";
      elements.miniTestStart.disabled = false;
      return;
    }

    miniTest = {
      blueprint,
      responses: new Map(),
      startedAt: Date.now(),
      budgetMs: blueprint.minutes * 60 * 1000,
      elapsedMs: 0,
      timerId: null,
      finished: false,
    };
    miniTestSummary = null;
    sessionKind = "test";
    session = questions;
    sessionIndex = 0;
    sessionResults = [];
    elements.miniTestStatus.className = "status-line";
    elements.miniTestStatus.textContent = "";
    elements.miniTestStart.disabled = false;
    startMiniTestClock();
    showView("quiz");
    renderQuestion();
  }

  function startMiniTestClock() {
    stopMiniTestClock();
    elements.miniTestClock.classList.remove("hidden");
    updateMiniTestClock();
    miniTest.timerId = window.setInterval(updateMiniTestClock, 1000);
  }

  function stopMiniTestClock() {
    if (miniTest && miniTest.timerId) {
      window.clearInterval(miniTest.timerId);
      miniTest.timerId = null;
    }
  }

  function formatDuration(ms) {
    const totalSeconds = Math.max(0, Math.round(ms / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  }

  // The clock runs past zero into overtime rather than force-submitting, so a
  // slow run still finishes and the report can show the overage honestly.
  function updateMiniTestClock() {
    if (!miniTest) return;
    miniTest.elapsedMs = Date.now() - miniTest.startedAt;
    const remaining = miniTest.budgetMs - miniTest.elapsedMs;
    const overtime = remaining < 0;
    elements.miniTestClock.textContent = overtime
      ? `+${formatDuration(-remaining)} over`
      : formatDuration(remaining);
    elements.miniTestClock.classList.toggle("overtime", overtime);
    elements.miniTestClock.classList.toggle(
      "warning",
      !overtime && remaining <= 5 * 60 * 1000,
    );
  }

  function renderMiniTestNav() {
    if (sessionKind !== "test") {
      elements.miniTestNav.classList.add("hidden");
      elements.miniTestNav.innerHTML = "";
      return;
    }
    elements.miniTestNav.classList.remove("hidden");
    elements.miniTestNav.innerHTML = "";
    session.forEach((question, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "mini-test-dot";
      button.textContent = String(index + 1);
      const answered = miniTest.responses.has(question.id);
      if (answered) button.classList.add("answered");
      if (progress.flagged.includes(question.id)) button.classList.add("flagged");
      if (index === sessionIndex) button.classList.add("current");
      button.setAttribute(
        "aria-label",
        `Question ${index + 1}${answered ? ", answered" : ", not answered"}` +
        `${index === sessionIndex ? ", current" : ""}`,
      );
      button.setAttribute("aria-current", index === sessionIndex ? "true" : "false");
      button.addEventListener("click", () => {
        sessionIndex = index;
        renderQuestion();
      });
      elements.miniTestNav.appendChild(button);
    });
  }

  function finishMiniTest() {
    if (!miniTest || miniTest.finished) return;
    const unanswered = session.filter(
      (question) => !miniTest.responses.has(question.id),
    ).length;
    if (unanswered > 0 && !miniTest.confirmFinish) {
      miniTest.confirmFinish = true;
      elements.responseStatus.textContent =
        `${unanswered} question${unanswered === 1 ? "" : "s"} unanswered.`;
      elements.finishTest.textContent =
        `Finish anyway (${unanswered} blank) →`;
      elements.finishTest.classList.add("danger-outline");
      return;
    }
    stopMiniTestClock();
    miniTest.elapsedMs = Date.now() - miniTest.startedAt;
    miniTest.finished = true;
    miniTestSummary = core.summarizeMiniTest(session, miniTest.responses);

    // Record the attempt history the same way practice sessions do, so the
    // Progress and Review views stay consistent.
    sessionResults = miniTestSummary.items.map((item) => ({
      question: item.question,
      correct: item.answered ? item.correct : false,
    }));
    miniTestSummary.items.forEach((item) => {
      recordAttempt(
        item.question,
        item.answered ? item.correct : false,
        item.answered ? item.response : null,
      );
    });
    saveProgress();
    showResults();
  }

  function miniTestPaceNote() {
    const budget = miniTest.budgetMs;
    const used = miniTest.elapsedMs;
    if (used <= budget * 0.85) {
      return `You finished in ${formatDuration(used)} of a ${miniTest.blueprint.minutes}-minute ` +
        "budget. Comfortable pace—check whether the spare time went into accuracy.";
    }
    if (used <= budget) {
      return `You finished in ${formatDuration(used)}, just inside the ` +
        `${miniTest.blueprint.minutes}-minute budget. That is realistic test pace.`;
    }
    return `You used ${formatDuration(used)} against a ${miniTest.blueprint.minutes}-minute ` +
      "budget. Pacing is the constraint to work on before content.";
  }

  function renderMiniTestReport() {
    const report = elements.miniTestReport;
    report.innerHTML = "";
    if (!miniTestSummary || !miniTest) {
      report.classList.add("hidden");
      return;
    }
    report.classList.remove("hidden");

    const pace = document.createElement("p");
    pace.className = "mini-test-pace";
    pace.textContent = miniTestPaceNote();
    report.appendChild(pace);

    if (miniTestSummary.unanswered > 0) {
      const blanks = document.createElement("p");
      blanks.className = "mini-test-pace warning-note";
      blanks.textContent =
        `${miniTestSummary.unanswered} question${miniTestSummary.unanswered === 1 ? " was" : "s were"} ` +
        "left blank and scored as incorrect. Neither test penalizes a wrong answer, so always guess.";
      report.appendChild(blanks);
    }

    report.appendChild(
      breakdownTable(
        "By section",
        miniTestSummary.bySection.map((row) => [
          row.section,
          `${row.correct}/${row.total}`,
          `${Math.round(row.accuracy * 100)}%`,
        ]),
      ),
    );
    report.appendChild(
      breakdownTable(
        "By domain — weakest first",
        miniTestSummary.byDomain.map((row) => [
          `${row.section} — ${row.domain}`,
          `${row.correct}/${row.total}`,
          `${Math.round(row.accuracy * 100)}%`,
        ]),
      ),
    );

    const caveat = document.createElement("small");
    caveat.className = "mini-test-caveat";
    caveat.textContent =
      "Accuracy on a 20-item sample is a rough signal, not a score. This report " +
      "does not reproduce official adaptive routing, scaled scoring, or a Composite.";
    report.appendChild(caveat);
  }

  function breakdownTable(caption, rows) {
    const wrap = document.createElement("div");
    wrap.className = "table-wrap";
    const table = document.createElement("table");
    const captionEl = document.createElement("caption");
    captionEl.textContent = caption;
    table.appendChild(captionEl);
    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");
    ["Area", "Correct", "Accuracy"].forEach((label) => {
      const th = document.createElement("th");
      th.scope = "col";
      th.textContent = label;
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    const tbody = document.createElement("tbody");
    rows.forEach((cells) => {
      const tr = document.createElement("tr");
      cells.forEach((cell, index) => {
        const el = document.createElement(index === 0 ? "th" : "td");
        if (index === 0) el.scope = "row";
        el.textContent = cell;
        tr.appendChild(el);
      });
      tbody.appendChild(tr);
    });
    table.append(thead, tbody);
    wrap.appendChild(table);
    return wrap;
  }

  function startMiniTestReview() {
    if (!miniTestSummary) return;
    sessionKind = "review";
    session = miniTestSummary.items.map((item) => item.question);
    sessionIndex = 0;
    showView("quiz");
    renderQuestion();
  }

  /* ------------------------------------------------------------ practice flow */

  function startSession(event) {
    if (event) event.preventDefault();
    sessionKind = "practice";
    miniTest = null;
    miniTestSummary = null;
    elements.miniTestClock.classList.add("hidden");
    const mode = elements.mode.value;
    let pool = matchingQuestions();
    if (mode === "adaptive" && recommendation) {
      const remaining = currentBank.filter((question) => question.id !== recommendation.question.id);
      pool = [recommendation.question, ...core.deterministicShuffle(
        remaining,
        `${Date.now()}-adaptive`,
      )];
    }
    if (!pool.length) {
      elements.bankStatus.className = "status-line error";
      elements.bankStatus.textContent = "No questions match this session. Adjust a filter or review list.";
      return;
    }
    const count = elements.count.value;
    session = mode === "adaptive"
      ? pool.slice(0, count === "all" ? pool.length : Number(count))
      : core.buildSession(pool, count, `${Date.now()}-${elements.section.value}`);
    sessionIndex = 0;
    sessionResults = [];
    showView("quiz");
    renderQuestion();
  }

  function currentQuestion() {
    return session[sessionIndex];
  }

  function renderQuestion() {
    const question = currentQuestion();
    response = null;
    answered = false;
    const percent = Math.round(sessionIndex / session.length * 100);
    elements.progressLabel.textContent = `Question ${sessionIndex + 1} of ${session.length}`;
    elements.questionId.textContent = question.id;
    elements.scoreLabel.textContent =
      `${sessionResults.filter((result) => result.correct).length} correct`;
    elements.progressFill.style.width = `${percent}%`;
    elements.progressBar.setAttribute("aria-valuenow", String(percent));
    elements.heading.textContent = question.stem;
    elements.tags.innerHTML = "";
    [
      `${question.test} ${question.section}`,
      question.domain,
      question.skill,
      question.difficulty,
      `${Math.round(question.estimatedSeconds / 60)} min`,
    ].forEach((tag) => elements.tags.appendChild(tagElement(tag)));

    if (question.stimulus) {
      elements.stimulus.textContent = question.stimulus.content;
      elements.stimulus.classList.remove("hidden");
    } else {
      elements.stimulus.classList.add("hidden");
      elements.stimulus.textContent = "";
    }
    elements.hintPanel.textContent = question.hint;
    elements.hintPanel.classList.add("hidden");
    elements.hintBtn.setAttribute("aria-expanded", "false");
    elements.hintBtn.textContent = "Need a hint?";
    elements.feedback.classList.add("hidden");
    elements.feedback.classList.remove("correct", "incorrect", "guide");
    elements.submit.classList.remove("hidden");
    elements.submit.disabled = true;
    elements.submit.textContent = question.responseType === "essay" ? "View writing guide" : "Check answer";
    elements.next.classList.add("hidden");
    elements.next.textContent =
      sessionIndex + 1 < session.length ? "Next question →" : "See session results →";
    updateSavedButtons(question.id);
    renderResponse(question);

    if (sessionKind === "test") applyTestModeControls(question);
    else if (sessionKind === "review") applyReviewModeControls(question);
    else applyPracticeModeControls();

    renderMiniTestNav();
    requestAnimationFrame(() => elements.heading.focus({ preventScroll: true }));
  }

  function applyPracticeModeControls() {
    elements.hintBtn.classList.remove("hidden");
    elements.prev.classList.add("hidden");
    elements.finishTest.classList.add("hidden");
    elements.finishTest.classList.remove("danger-outline");
    elements.scoreLabel.classList.remove("hidden");
    elements.miniTestClock.classList.add("hidden");
    elements.next.disabled = false;
  }

  // Test mode: no verdict, no hint, free navigation, and a persistent finish
  // control so an early finish is always one click away.
  function applyTestModeControls(question) {
    elements.hintBtn.classList.add("hidden");
    elements.hintPanel.classList.add("hidden");
    elements.scoreLabel.classList.add("hidden");
    elements.miniTestClock.classList.remove("hidden");
    elements.submit.classList.add("hidden");
    elements.next.classList.remove("hidden");
    elements.next.textContent =
      sessionIndex + 1 < session.length ? "Next question →" : "Last question";
    elements.next.disabled = sessionIndex + 1 >= session.length;
    elements.prev.classList.toggle("hidden", sessionIndex === 0);
    elements.finishTest.classList.remove("hidden");
    if (!miniTest.confirmFinish) {
      elements.finishTest.textContent = "Finish and review";
      elements.finishTest.classList.remove("danger-outline");
    }
    elements.progressLabel.textContent =
      `${question.test} ${question.section} · Question ${sessionIndex + 1} of ${session.length}`;

    const saved = miniTest.responses.get(question.id);
    if (saved === undefined || saved === null) return;
    response = saved;
    if (question.responseType === "multiple-choice") {
      elements.responseArea.querySelectorAll(".choice").forEach((button) => {
        const selected = Number(button.dataset.index) === saved;
        button.classList.toggle("selected", selected);
        button.setAttribute("aria-pressed", String(selected));
      });
    } else {
      const input = elements.responseArea.querySelector("input, textarea");
      if (input) input.value = saved;
    }
  }

  // Review mode: the guide is already open and navigation is free.
  function applyReviewModeControls(question) {
    const item = miniTestSummary.items.find((entry) => entry.question.id === question.id);
    elements.hintBtn.classList.add("hidden");
    elements.scoreLabel.classList.remove("hidden");
    elements.scoreLabel.textContent = item && item.correct
      ? "You answered correctly"
      : item && item.answered
        ? "You answered incorrectly"
        : "You left this blank";
    elements.miniTestClock.classList.add("hidden");
    elements.submit.classList.add("hidden");
    elements.prev.classList.toggle("hidden", sessionIndex === 0);
    elements.finishTest.classList.add("hidden");
    elements.next.classList.remove("hidden");
    elements.next.disabled = false;
    elements.next.textContent =
      sessionIndex + 1 < session.length ? "Next question →" : "Back to report →";
    elements.progressLabel.textContent =
      `Review · ${question.test} ${question.section} · ${sessionIndex + 1} of ${session.length}`;

    response = item && item.answered ? item.response : null;
    answered = true;
    revealAnswer(question, item ? item.correct : false);
  }

  function tagElement(text) {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = text;
    return span;
  }

  function renderResponse(question) {
    elements.responseArea.innerHTML = "";
    if (question.responseType === "multiple-choice") {
      const group = document.createElement("div");
      group.className = "choices";
      group.setAttribute("role", "group");
      group.setAttribute("aria-label", "Answer choices");
      question.choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "choice";
        button.dataset.index = String(index);
        button.setAttribute("aria-pressed", "false");
        const letter = document.createElement("span");
        letter.className = "choice-letter";
        letter.textContent = LETTERS[index];
        const text = document.createElement("span");
        text.textContent = choice;
        button.append(letter, text);
        button.addEventListener("click", () => selectChoice(index));
        group.appendChild(button);
      });
      elements.responseArea.appendChild(group);
    } else if (question.responseType === "numeric") {
      const label = document.createElement("label");
      label.className = "numeric-label";
      label.htmlFor = "numericResponse";
      label.textContent = "Your answer";
      const input = document.createElement("input");
      input.id = "numericResponse";
      input.className = "numeric-input";
      input.inputMode = "decimal";
      input.autocomplete = "off";
      input.placeholder = "Enter a number";
      input.addEventListener("input", () => {
        response = input.value;
        elements.submit.disabled = input.value.trim() === "";
        if (sessionKind === "test") stashTestResponse(input.value);
      });
      label.appendChild(input);
      elements.responseArea.appendChild(label);
    } else {
      const label = document.createElement("label");
      label.className = "essay-label";
      label.htmlFor = "essayResponse";
      label.textContent = "Draft or outline your response";
      const textarea = document.createElement("textarea");
      textarea.id = "essayResponse";
      textarea.rows = 12;
      textarea.placeholder =
        "Write your thesis, reasons, perspective analysis, and examples here. Your draft stays on this device.";
      const count = document.createElement("small");
      count.className = "word-count";
      count.textContent = "0 words";
      textarea.addEventListener("input", () => {
        response = textarea.value;
        const words = textarea.value.trim() ? textarea.value.trim().split(/\s+/).length : 0;
        count.textContent = `${words} word${words === 1 ? "" : "s"}`;
        elements.submit.disabled = words < 5;
      });
      label.append(textarea, count);
      elements.responseArea.appendChild(label);
    }
  }

  function selectChoice(index) {
    if (answered) return;
    response = index;
    elements.responseArea.querySelectorAll(".choice").forEach((button) => {
      const selected = Number(button.dataset.index) === index;
      button.classList.toggle("selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    elements.submit.disabled = false;
    elements.responseStatus.textContent = `Selected answer ${LETTERS[index]}.`;
    if (sessionKind === "test") stashTestResponse(index);
  }

  // In test mode an answer is banked immediately so the navigator and the
  // finish guard stay accurate, and so revisiting a question restores it.
  function stashTestResponse(value) {
    if (!miniTest) return;
    const question = currentQuestion();
    if (value === null || String(value).trim() === "") {
      miniTest.responses.delete(question.id);
    } else {
      miniTest.responses.set(question.id, value);
    }
    if (miniTest.confirmFinish) {
      miniTest.confirmFinish = false;
      elements.finishTest.textContent = "Finish and review";
      elements.finishTest.classList.remove("danger-outline");
    }
    renderMiniTestNav();
  }

  function recordAttempt(question, correct, rawResponse) {
    progress.attempts.push({
      questionId: question.id,
      sectionKey: question.sectionKey,
      correct,
      response: question.responseType === "essay" ? "[local essay draft]" : rawResponse,
      timestamp: Date.now(),
      reviewAt: correct === false
        ? Date.now() + 24 * 60 * 60 * 1000
        : correct === true
          ? Date.now() + 7 * 24 * 60 * 60 * 1000
          : null,
    });
    progress.recentIds.push(question.id);
  }

  function submitResponse() {
    if (answered || response === null || String(response).trim() === "") return;
    const question = currentQuestion();
    answered = true;
    const correct = core.scoreResponse(question, response);
    recordAttempt(question, correct, response);
    saveProgress();
    sessionResults.push({ question, correct, response });
    revealAnswer(question, correct);
    updateRecommendation();
  }

  function revealAnswer(question, correct) {
    elements.feedback.classList.remove("hidden");
    if (correct === null) {
      elements.feedback.classList.add("guide");
      elements.verdict.textContent = "Writing guide ready";
    } else if (correct) {
      elements.feedback.classList.add("correct");
      elements.verdict.textContent = "Correct";
    } else {
      elements.feedback.classList.add("incorrect");
      elements.verdict.textContent = question.responseType === "multiple-choice"
        ? `Not quite — the answer is ${LETTERS[question.correctAnswer]}`
        : `Not quite — the answer is ${question.correctAnswer}`;
    }
    elements.concise.textContent = question.explanation;
    fillList(elements.solutionSteps, question.solutionSteps, "li");
    elements.strategy.textContent = question.strategy;
    elements.trap.textContent = question.trap;
    fillList(elements.principleList, question.principles, "li");

    if (question.responseType === "multiple-choice") {
      elements.responseArea.querySelectorAll(".choice").forEach((button) => {
        const index = Number(button.dataset.index);
        button.disabled = true;
        button.classList.toggle("choice-correct", index === question.correctAnswer);
        button.classList.toggle(
          "choice-wrong",
          index === response && index !== question.correctAnswer,
        );
      });
      elements.distractorSection.classList.remove("hidden");
      elements.distractorSection.querySelector("h2").textContent = "Why the other options miss";
      elements.distractorList.innerHTML = "";
      question.distractorRationales.forEach((rationale) => {
        const item = document.createElement("li");
        const strong = document.createElement("strong");
        strong.textContent = `${LETTERS[rationale.index]}. `;
        item.append(strong, document.createTextNode(rationale.reason));
        elements.distractorList.appendChild(item);
      });
    } else if (question.responseType === "essay") {
      elements.responseArea.querySelector("textarea").disabled = true;
      elements.distractorSection.classList.remove("hidden");
      elements.distractorSection.querySelector("h2").textContent = "Sample thesis and outline";
      elements.distractorList.innerHTML = "";
      const thesis = document.createElement("li");
      const strong = document.createElement("strong");
      strong.textContent = "Sample thesis: ";
      thesis.append(strong, document.createTextNode(question.correctAnswer.sampleThesis));
      elements.distractorList.appendChild(thesis);
      question.correctAnswer.outline.forEach((line) => {
        const item = document.createElement("li");
        item.textContent = line;
        elements.distractorList.appendChild(item);
      });
      question.correctAnswer.reviewCriteria.forEach((criterion) => {
        const item = document.createElement("li");
        item.textContent = criterion;
        elements.principleList.appendChild(item);
      });
    } else {
      elements.responseArea.querySelector("input").disabled = true;
      elements.distractorSection.classList.add("hidden");
    }
    elements.submit.classList.add("hidden");
    elements.next.classList.remove("hidden");
    if (sessionKind !== "review") elements.next.focus();
  }

  function fillList(list, values) {
    list.innerHTML = "";
    values.forEach((value) => {
      const item = document.createElement("li");
      item.textContent = value;
      list.appendChild(item);
    });
  }

  function nextQuestion() {
    if (sessionKind === "review" && sessionIndex + 1 >= session.length) {
      sessionKind = "practice";
      showResults();
      return;
    }
    sessionIndex += 1;
    if (sessionIndex < session.length) renderQuestion();
    else if (sessionKind === "test") finishMiniTest();
    else showResults();
  }

  function previousQuestion() {
    if (sessionIndex === 0) return;
    sessionIndex -= 1;
    renderQuestion();
  }

  function showResults() {
    showView("results");
    renderMiniTestReport();
    elements.reviewAll.classList.toggle("hidden", !miniTestSummary);
    elements.miniTestClock.classList.add("hidden");
    const scored = sessionResults.filter((result) => result.correct !== null);
    const correct = scored.filter((result) => result.correct).length;
    const percent = scored.length ? Math.round(correct / scored.length * 100) : null;
    elements.finalScore.textContent = percent === null ? "Complete" : `${percent}%`;
    elements.finalScoreLabel.textContent = percent === null
      ? `${sessionResults.length} writing prompt${sessionResults.length === 1 ? "" : "s"} reviewed`
      : `${correct} of ${scored.length} correct`;
    elements.resultsMessage.textContent = miniTestSummary
      ? "Review every question below—including the ones you got right but were unsure about."
      : percent === null
        ? "Use the rubric and sample outlines to revise one claim at a time."
        : percent >= 80
          ? "Strong session. Keep spacing your review so these skills stay durable."
          : percent >= 60
            ? "Good foundation. Review the missed skills below, then try a shorter targeted set."
            : "This session found useful gaps. Focus on one weak skill and work back up gradually.";

    const groups = {};
    sessionResults.forEach((result) => {
      const skill = result.question.skill;
      if (!groups[skill]) groups[skill] = { total: 0, correct: 0 };
      groups[skill].total += 1;
      if (result.correct) groups[skill].correct += 1;
    });
    elements.resultsBreakdown.innerHTML = "";
    Object.entries(groups).forEach(([skill, values]) => {
      const row = document.createElement("div");
      row.innerHTML =
        `<span>${escapeHtml(skill)}</span><strong>${values.correct}/${values.total}</strong>`;
      elements.resultsBreakdown.appendChild(row);
    });
    elements.reviewSession.disabled = !sessionResults.some((result) => result.correct === false);
    elements.progressFill.style.width = "100%";
    elements.progressBar.setAttribute("aria-valuenow", "100");
  }

  function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = value;
    return div.innerHTML;
  }

  function showView(name) {
    Object.entries(views).forEach(([key, view]) => {
      view.classList.toggle("hidden", key !== name);
    });
    document.querySelectorAll(".nav-link").forEach((button) => {
      const selected = button.dataset.view === name;
      button.classList.toggle("active", selected);
      if (selected) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
    const reduceMotion = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    if (name !== "quiz") {
      const heading = views[name].querySelector("h1");
      if (heading) requestAnimationFrame(() => heading.focus({ preventScroll: true }));
    }
  }

  function updateSavedButtons(questionId) {
    const bookmarked = progress.bookmarked.includes(questionId);
    const flagged = progress.flagged.includes(questionId);
    elements.bookmark.setAttribute("aria-pressed", String(bookmarked));
    elements.bookmark.firstChild.textContent = bookmarked ? "★ " : "☆ ";
    elements.flag.setAttribute("aria-pressed", String(flagged));
    elements.flag.firstChild.textContent = flagged ? "⚑ " : "⚐ ";
  }

  function toggleSaved(type) {
    const id = currentQuestion().id;
    const list = progress[type];
    const index = list.indexOf(id);
    if (index >= 0) list.splice(index, 1);
    else list.push(id);
    saveProgress();
    updateSavedButtons(id);
  }

  async function renderDashboard() {
    showView("dashboard");
    elements.dashboardStats.innerHTML =
      '<div class="panel loading-card">Loading progress across sections…</div>';
    let questions;
    try {
      questions = await loadAllBanks();
    } catch (error) {
      showLoadError(elements.dashboardStats, error);
      elements.skillTableWrap.innerHTML = "";
      return;
    }
    const summary = core.summarizeProgress(progress.attempts, questions);
    const bookmarked = progress.bookmarked.length;
    const missed = latestMissedIds().length;
    const cards = [
      ["Questions attempted", summary.attempted],
      ["Overall accuracy", summary.accuracy === null ? "—" : `${Math.round(summary.accuracy * 100)}%`],
      ["Unique completed", summary.uniqueCompleted],
      ["Saved / missed", `${bookmarked} / ${missed}`],
    ];
    elements.dashboardStats.innerHTML = "";
    cards.forEach(([label, value]) => {
      const card = document.createElement("div");
      card.className = "panel stat-card";
      const strong = document.createElement("strong");
      strong.textContent = value;
      const span = document.createElement("span");
      span.textContent = label;
      card.append(strong, span);
      elements.dashboardStats.appendChild(card);
    });
    masteryRows = Object.values(summary.bySkill);
    populateMasterySections();
    renderMastery();
  }

  /* ------------------------------------------------------------- mastery table */

  // Weakness alone puts a single missed question above a skill missed ten
  // times, so the default order weights low accuracy by how much evidence
  // there is for it.
  function focusScore(row) {
    return (1 - row.accuracy) * Math.sqrt(row.attempted);
  }

  const MASTERY_SORTS = {
    focus: (left, right) => focusScore(right) - focusScore(left),
    "accuracy-asc": (left, right) =>
      left.accuracy - right.accuracy || right.attempted - left.attempted,
    "accuracy-desc": (left, right) =>
      right.accuracy - left.accuracy || right.attempted - left.attempted,
    attempted: (left, right) => right.attempted - left.attempted,
    section: (left, right) =>
      sectionLabel(left.sectionKey).localeCompare(sectionLabel(right.sectionKey)) ||
      left.skill.localeCompare(right.skill),
    skill: (left, right) => left.skill.localeCompare(right.skill),
  };

  function sectionLabel(sectionKey) {
    const section = sectionByKey(sectionKey);
    return section ? `${section.test} — ${section.shortLabel}` : sectionKey;
  }

  // Only sections the student has actually attempted are offered, so the
  // filter never leads to an empty table.
  function populateMasterySections() {
    const present = [...new Set(masteryRows.map((row) => row.sectionKey))].sort(
      (left, right) => sectionLabel(left).localeCompare(sectionLabel(right)),
    );
    const previous = elements.masterySection.value;
    elements.masterySection.innerHTML = "";
    const all = document.createElement("option");
    all.value = "all";
    all.textContent = `All sections (${masteryRows.length} skills)`;
    elements.masterySection.appendChild(all);
    present.forEach((sectionKey) => {
      const option = document.createElement("option");
      option.value = sectionKey;
      const count = masteryRows.filter((row) => row.sectionKey === sectionKey).length;
      option.textContent = `${sectionLabel(sectionKey)} (${count})`;
      elements.masterySection.appendChild(option);
    });
    if (previous && present.includes(previous)) elements.masterySection.value = previous;
  }

  function renderMastery() {
    if (!masteryRows.length) {
      elements.masteryNote.textContent = "";
      elements.skillTableWrap.innerHTML =
        '<div class="empty-state"><strong>No scored attempts yet.</strong>' +
        "<p>Complete a practice session to see skill-level accuracy.</p></div>";
      return;
    }

    const sectionFilter = elements.masterySection.value || "all";
    const sortKey = elements.masterySort.value || "focus";
    const rows = masteryRows
      .filter((row) => sectionFilter === "all" || row.sectionKey === sectionFilter)
      .sort(MASTERY_SORTS[sortKey] || MASTERY_SORTS.focus);

    elements.masteryNote.textContent = sortKey === "focus"
      ? `${rows.length} skills, weakest first — accuracy weighted by how many ` +
        "questions you have answered in each skill."
      : `${rows.length} skills.`;

    const table = document.createElement("table");
    table.innerHTML =
      "<thead><tr><th>Skill</th><th>Section</th><th>Attempts</th>" +
      "<th>Accuracy</th><th>Next step</th></tr></thead>";
    const body = document.createElement("tbody");
    rows.forEach((row) => {
      const accuracy = Math.round(row.accuracy * 100);
      const tr = document.createElement("tr");
      tr.innerHTML =
        `<td>${escapeHtml(row.skill)}</td>` +
        `<td class="mastery-section-cell">${escapeHtml(sectionLabel(row.sectionKey))}</td>` +
        `<td>${row.attempted}</td>` +
        `<td><span class="meter"><i style="width:${accuracy}%"></i></span> ${accuracy}%</td>` +
        `<td>${accuracy < 50 ? "Rebuild with Easy" : accuracy < 80 ? "Continue at Medium" : "Try Hard"}</td>`;
      body.appendChild(tr);
    });
    table.appendChild(body);
    elements.skillTableWrap.innerHTML = "";
    elements.skillTableWrap.appendChild(table);
  }

  async function renderReview(listName) {
    activeReviewList = listName || activeReviewList;
    showView("review");
    document.querySelectorAll(".review-tab").forEach((button) => {
      const selected = button.dataset.list === activeReviewList;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
      if (selected) {
        elements.reviewList.setAttribute("aria-labelledby", button.id);
      }
    });
    elements.reviewList.innerHTML =
      '<div class="panel loading-card">Loading saved questions…</div>';
    let questions;
    try {
      questions = await loadAllBanks();
    } catch (error) {
      showLoadError(elements.reviewList, error);
      return;
    }
    const ids = activeReviewList === "missed"
      ? latestMissedIds()
      : progress[activeReviewList];
    const idSet = new Set(ids);
    const matches = questions.filter((question) => idSet.has(question.id));
    elements.reviewList.innerHTML = "";
    if (!matches.length) {
      elements.reviewList.innerHTML =
        `<div class="panel empty-state"><strong>No ${activeReviewList} questions.</strong>` +
        "<p>Your list will appear here as you practice.</p></div>";
      return;
    }
    const start = document.createElement("button");
    start.className = "button primary review-start";
    start.textContent = `Practice all ${matches.length}`;
    start.addEventListener("click", () => {
      session = core.buildSession(matches, "all", `${Date.now()}-review`);
      sessionIndex = 0;
      sessionResults = [];
      showView("quiz");
      renderQuestion();
    });
    elements.reviewList.appendChild(start);
    matches.slice(0, 100).forEach((question) => {
      const card = document.createElement("article");
      card.className = "panel review-item";
      const header = document.createElement("div");
      header.className = "review-item-head";
      const tags = document.createElement("span");
      tags.textContent = `${question.test} ${question.section} · ${question.skill}`;
      const id = document.createElement("small");
      id.textContent = question.id;
      header.append(tags, id);
      const heading = document.createElement("h2");
      heading.textContent = question.stem;
      card.append(header, heading);
      elements.reviewList.appendChild(card);
    });
    if (matches.length > 100) {
      const note = document.createElement("p");
      note.className = "field-note";
      note.textContent = `Showing the first 100 of ${matches.length}; all are included when you practice.`;
      elements.reviewList.appendChild(note);
    }
  }

  function showLoadError(container, error) {
    container.innerHTML = "";
    const card = document.createElement("div");
    card.className = "panel empty-state error";
    const heading = document.createElement("strong");
    heading.textContent = "Practice content could not be loaded.";
    const detail = document.createElement("p");
    detail.textContent = `${error.message} Refresh the page or verify content/generated is present.`;
    card.append(heading, detail);
    container.appendChild(card);
  }

  function clearProgress() {
    if (!clearArmed) {
      clearArmed = true;
      elements.clearProgress.textContent = "Click again to confirm";
      setTimeout(() => {
        clearArmed = false;
        elements.clearProgress.textContent = "Clear local progress";
      }, 5000);
      return;
    }
    progress = emptyProgress();
    saveProgress();
    clearArmed = false;
    elements.clearProgress.textContent = "Clear local progress";
    renderDashboard();
    updateRecommendation();
  }

  let signsRendered = false;
  let activeSignsFilter = "all";

  function renderSigns() {
    showView("signs");
    const data = window.PRACTICE_ANSWER_SIGNS;
    if (!data) {
      elements.signsGroups.innerHTML =
        '<div class="panel empty-state"><strong>The answer-signs guide could not load.</strong>' +
        "<p>Confirm content/guides/answer-signs.js is present.</p></div>";
      return;
    }
    if (signsRendered) return;

    elements.signsDisclaimer.textContent = data.disclaimer;

    elements.signsPrinciples.innerHTML = "";
    (data.principles || []).forEach((principle) => {
      const card = document.createElement("div");
      card.className = "signs-principle";
      const title = document.createElement("h3");
      title.textContent = principle.title;
      const body = document.createElement("p");
      body.textContent = principle.body;
      card.append(title, body);
      elements.signsPrinciples.appendChild(card);
    });

    buildSignsFilter(data.groups);
    buildSignsGroups(data.groups);
    applySignsFilter();
    signsRendered = true;
  }

  function buildSignsFilter(groups) {
    elements.signsFilter.innerHTML = "";
    const options = [{ id: "all", label: "All sections" }].concat(
      groups.map((group) => ({ id: group.id, label: `${group.test} ${group.category}` })),
    );
    options.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "signs-filter-btn";
      button.dataset.filter = option.id;
      button.textContent = option.label;
      button.setAttribute("aria-pressed", String(option.id === activeSignsFilter));
      button.addEventListener("click", () => {
        activeSignsFilter = option.id;
        applySignsFilter();
      });
      elements.signsFilter.appendChild(button);
    });
  }

  function applySignsFilter() {
    elements.signsFilter.querySelectorAll(".signs-filter-btn").forEach((button) => {
      const selected = button.dataset.filter === activeSignsFilter;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    elements.signsGroups.querySelectorAll(".signs-group").forEach((group) => {
      const show = activeSignsFilter === "all" || group.dataset.group === activeSignsFilter;
      group.classList.toggle("hidden", !show);
    });
  }

  function buildSignsGroups(groups) {
    elements.signsGroups.innerHTML = "";
    groups.forEach((group) => {
      const section = document.createElement("section");
      section.className = "panel signs-group";
      section.dataset.group = group.id;

      const head = document.createElement("div");
      head.className = "signs-group-head";
      const badge = document.createElement("span");
      badge.className = `signs-badge signs-badge-${group.test.toLowerCase()}`;
      badge.textContent = group.test;
      const title = document.createElement("h2");
      title.textContent = group.title;
      head.append(badge, title);

      const intro = document.createElement("p");
      intro.className = "signs-group-intro";
      intro.textContent = group.intro;

      section.append(head, intro);

      group.tells.forEach((tell) => {
        section.appendChild(buildTellCard(tell));
      });
      elements.signsGroups.appendChild(section);
    });
  }

  function buildTellCard(tell) {
    const card = document.createElement("article");
    card.className = "signs-tell";
    const name = document.createElement("h3");
    name.textContent = tell.name;
    card.appendChild(name);
    const rows = [
      ["Look for", tell.sign, "sign"],
      ["Why it works", tell.why, "why"],
      ["Example", tell.example, "example"],
      ["Caution", tell.caution, "caution"],
    ];
    rows.forEach(([label, value, kind]) => {
      if (!value) return;
      const row = document.createElement("p");
      row.className = `signs-row signs-row-${kind}`;
      const strong = document.createElement("strong");
      strong.textContent = `${label}: `;
      row.append(strong, document.createTextNode(value));
      card.appendChild(row);
    });
    return card;
  }

  function wireEvents() {
    elements.section.addEventListener("change", changeSection);
    elements.domain.addEventListener("change", () => {
      populateSkills();
      updateMatches();
    });
    [elements.skill, elements.mode, elements.count].forEach((control) => {
      control.addEventListener("change", updateMatches);
    });
    elements.search.addEventListener("input", updateMatches);
    document.querySelectorAll('input[name="difficulty"]').forEach((input) => {
      input.addEventListener("change", updateMatches);
    });
    elements.form.addEventListener("submit", startSession);
    elements.home.addEventListener("click", () => showView("setup"));
    elements.recommendBtn.addEventListener("click", () => {
      elements.mode.value = "adaptive";
      updateMatches();
      startSession();
    });
    elements.hintBtn.addEventListener("click", () => {
      const open = elements.hintBtn.getAttribute("aria-expanded") === "true";
      elements.hintBtn.setAttribute("aria-expanded", String(!open));
      elements.hintPanel.classList.toggle("hidden", open);
      elements.hintBtn.textContent = open ? "Need a hint?" : "Hide hint";
    });
    elements.submit.addEventListener("click", submitResponse);
    elements.next.addEventListener("click", nextQuestion);
    elements.prev.addEventListener("click", previousQuestion);
    elements.finishTest.addEventListener("click", finishMiniTest);
    elements.miniTestStart.addEventListener("click", startMiniTest);
    elements.masterySection.addEventListener("change", renderMastery);
    elements.masterySort.addEventListener("change", renderMastery);
    elements.reviewAll.addEventListener("click", startMiniTestReview);
    elements.exit.addEventListener("click", exitSession);
    elements.bookmark.addEventListener("click", () => toggleSaved("bookmarked"));
    elements.flag.addEventListener("click", () => {
      toggleSaved("flagged");
      renderMiniTestNav();
    });
    elements.practiceAgain.addEventListener("click", () => showView("setup"));
    elements.reviewSession.addEventListener("click", () => renderReview("missed"));
    elements.clearProgress.addEventListener("click", clearProgress);
    document.querySelectorAll(".nav-link").forEach((button) => {
      button.addEventListener("click", () => {
        if (button.dataset.view === "dashboard") renderDashboard();
        else if (button.dataset.view === "review") renderReview();
        else if (button.dataset.view === "signs") renderSigns();
        else showView("setup");
      });
    });
    document.querySelectorAll(".review-tab").forEach((button) => {
      button.addEventListener("click", () => renderReview(button.dataset.list));
    });
    document.addEventListener("keydown", (event) => {
      if (views.quiz.classList.contains("hidden")) return;
      const inField = event.target.closest && event.target.closest("textarea, input");
      if (sessionKind === "review") {
        if (event.key === "ArrowRight" && !inField) nextQuestion();
        if (event.key === "ArrowLeft" && !inField) previousQuestion();
        return;
      }
      if (answered) return;
      const question = currentQuestion();
      if (question.responseType === "multiple-choice" && /^[1-4]$/.test(event.key)) {
        selectChoice(Number(event.key) - 1);
      }
      if (sessionKind === "test") {
        if (event.key === "ArrowRight" && !inField && !elements.next.disabled) nextQuestion();
        if (event.key === "ArrowLeft" && !inField) previousQuestion();
        if (
          event.key === "Enter" &&
          !(event.target.closest && event.target.closest("textarea, button"))
        ) {
          event.preventDefault();
          if (sessionIndex + 1 < session.length) nextQuestion();
          else finishMiniTest();
        }
        return;
      }
      if (
        event.key === "Enter" &&
        !elements.submit.disabled &&
        !(event.target.closest && event.target.closest("textarea, button"))
      ) {
        event.preventDefault();
        submitResponse();
      }
    });
  }

  function exitSession() {
    if (sessionKind === "test" && miniTest && !miniTest.finished) {
      stopMiniTestClock();
      miniTest = null;
      miniTestSummary = null;
    }
    sessionKind = "practice";
    elements.miniTestClock.classList.add("hidden");
    elements.miniTestNav.classList.add("hidden");
    showView("setup");
  }

  populateSections();
  renderMiniTestOptions();
  wireEvents();
  changeSection();
})();
