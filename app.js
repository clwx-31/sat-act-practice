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
    exit: document.getElementById("exitBtn"),
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
  let clearArmed = false;
  let bankRequestId = 0;
  const bankPromises = new Map();

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

  function startSession(event) {
    if (event) event.preventDefault();
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
    requestAnimationFrame(() => elements.heading.focus({ preventScroll: true }));
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
  }

  function submitResponse() {
    if (answered || response === null || String(response).trim() === "") return;
    const question = currentQuestion();
    answered = true;
    const correct = core.scoreResponse(question, response);
    const attempt = {
      questionId: question.id,
      sectionKey: question.sectionKey,
      correct,
      response: question.responseType === "essay" ? "[local essay draft]" : response,
      timestamp: Date.now(),
      reviewAt: correct === false
        ? Date.now() + 24 * 60 * 60 * 1000
        : correct === true
          ? Date.now() + 7 * 24 * 60 * 60 * 1000
          : null,
    };
    progress.attempts.push(attempt);
    progress.recentIds.push(question.id);
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
    elements.next.focus();
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
    sessionIndex += 1;
    if (sessionIndex < session.length) renderQuestion();
    else showResults();
  }

  function showResults() {
    showView("results");
    const scored = sessionResults.filter((result) => result.correct !== null);
    const correct = scored.filter((result) => result.correct).length;
    const percent = scored.length ? Math.round(correct / scored.length * 100) : null;
    elements.finalScore.textContent = percent === null ? "Complete" : `${percent}%`;
    elements.finalScoreLabel.textContent = percent === null
      ? `${sessionResults.length} writing prompt${sessionResults.length === 1 ? "" : "s"} reviewed`
      : `${correct} of ${scored.length} correct`;
    elements.resultsMessage.textContent = percent === null
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
    const skills = Object.values(summary.bySkill).sort(
      (left, right) => left.accuracy - right.accuracy || right.attempted - left.attempted,
    );
    if (!skills.length) {
      elements.skillTableWrap.innerHTML =
        '<div class="empty-state"><strong>No scored attempts yet.</strong><p>Complete a practice session to see skill-level accuracy.</p></div>';
      return;
    }
    const table = document.createElement("table");
    table.innerHTML =
      "<thead><tr><th>Skill</th><th>Attempts</th><th>Accuracy</th><th>Next step</th></tr></thead>";
    const body = document.createElement("tbody");
    skills.forEach((skill) => {
      const row = document.createElement("tr");
      const accuracy = Math.round(skill.accuracy * 100);
      row.innerHTML =
        `<td>${escapeHtml(skill.skill)}</td><td>${skill.attempted}</td>` +
        `<td><span class="meter"><i style="width:${accuracy}%"></i></span> ${accuracy}%</td>` +
        `<td>${accuracy < 50 ? "Rebuild with Easy" : accuracy < 80 ? "Continue at Medium" : "Try Hard"}</td>`;
      body.appendChild(row);
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
    elements.exit.addEventListener("click", () => showView("setup"));
    elements.bookmark.addEventListener("click", () => toggleSaved("bookmarked"));
    elements.flag.addEventListener("click", () => toggleSaved("flagged"));
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
      if (views.quiz.classList.contains("hidden") || answered) return;
      const question = currentQuestion();
      if (question.responseType === "multiple-choice" && /^[1-4]$/.test(event.key)) {
        selectChoice(Number(event.key) - 1);
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

  populateSections();
  wireEvents();
  changeSection();
})();
