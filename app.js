/*
 * Quiz logic. Reads the global QUESTIONS array from questions.js.
 * No build step, no server needed — works on GitHub Pages and when
 * you just open index.html locally.
 */

(function () {
  "use strict";

  // ---- Screens & elements ----------------------------------------------
  const setupScreen = document.getElementById("setup");
  const quizScreen = document.getElementById("quiz");
  const resultsScreen = document.getElementById("results");

  const sectionSelect = document.getElementById("sectionSelect");
  const shuffleCheck = document.getElementById("shuffleCheck");
  const startBtn = document.getElementById("startBtn");

  const progressLabel = document.getElementById("progressLabel");
  const scoreLabel = document.getElementById("scoreLabel");
  const barFill = document.getElementById("barFill");
  const tagsEl = document.getElementById("tags");
  const questionText = document.getElementById("questionText");
  const choicesEl = document.getElementById("choices");
  const explanationEl = document.getElementById("explanation");
  const checkBtn = document.getElementById("checkBtn");
  const nextBtn = document.getElementById("nextBtn");

  const finalScore = document.getElementById("finalScore");
  const finalMsg = document.getElementById("finalMsg");
  const restartBtn = document.getElementById("restartBtn");

  const LETTERS = ["A", "B", "C", "D", "E", "F"];

  // ---- State -----------------------------------------------------------
  let quiz = [];        // the questions for this run
  let index = 0;        // current question number (0-based)
  let score = 0;
  let selected = null;  // index of the choice the user picked
  let answered = false; // has the current question been checked?

  // ---- Build the section dropdown from the data ------------------------
  function populateSections() {
    const groups = {}; // "SAT — Math" -> count
    QUESTIONS.forEach((q) => {
      const key = q.test + " — " + q.section;
      groups[key] = (groups[key] || 0) + 1;
    });

    // "All questions" option first.
    const allOpt = document.createElement("option");
    allOpt.value = "__all__";
    allOpt.textContent = "All questions (" + QUESTIONS.length + ")";
    sectionSelect.appendChild(allOpt);

    Object.keys(groups)
      .sort()
      .forEach((key) => {
        const opt = document.createElement("option");
        opt.value = key;
        opt.textContent = key + " (" + groups[key] + ")";
        sectionSelect.appendChild(opt);
      });
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ---- Start / restart -------------------------------------------------
  function startQuiz() {
    const choice = sectionSelect.value;
    let pool =
      choice === "__all__"
        ? QUESTIONS.slice()
        : QUESTIONS.filter((q) => q.test + " — " + q.section === choice);

    if (shuffleCheck.checked) pool = shuffle(pool);

    quiz = pool;
    index = 0;
    score = 0;

    show(quizScreen);
    hide(setupScreen);
    hide(resultsScreen);
    renderQuestion();
  }

  // ---- Render one question ---------------------------------------------
  function renderQuestion() {
    selected = null;
    answered = false;
    const q = quiz[index];

    progressLabel.textContent = "Question " + (index + 1) + " of " + quiz.length;
    scoreLabel.textContent = "Score: " + score;
    barFill.style.width = ((index) / quiz.length) * 100 + "%";

    tagsEl.innerHTML = "";
    [q.test + " " + q.section, q.topic, q.difficulty].forEach((t) => {
      if (!t) return;
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = t;
      tagsEl.appendChild(span);
    });

    questionText.textContent = q.question;

    choicesEl.innerHTML = "";
    q.choices.forEach((text, i) => {
      const btn = document.createElement("button");
      btn.className = "choice";
      btn.innerHTML =
        '<span class="letter">' + LETTERS[i] + "</span><span>" + escapeHtml(text) + "</span>";
      btn.addEventListener("click", () => selectChoice(i, btn));
      choicesEl.appendChild(btn);
    });

    explanationEl.className = "explanation hidden";
    explanationEl.innerHTML = "";
    checkBtn.disabled = true;
    checkBtn.classList.remove("hidden");
    nextBtn.classList.add("hidden");
  }

  function selectChoice(i, btn) {
    if (answered) return;
    selected = i;
    Array.from(choicesEl.children).forEach((c) => c.classList.remove("chosen"));
    btn.style.borderColor = "var(--accent)";
    checkBtn.disabled = false;
  }

  // ---- Check the answer ------------------------------------------------
  function checkAnswer() {
    if (selected === null || answered) return;
    answered = true;
    const q = quiz[index];
    const correctIndex = q.answer;
    const isRight = selected === correctIndex;
    if (isRight) score++;

    Array.from(choicesEl.children).forEach((btn, i) => {
      btn.disabled = true;
      btn.style.borderColor = "";
      if (i === correctIndex) btn.classList.add("correct");
      else if (i === selected) btn.classList.add("wrong");
    });

    explanationEl.className = "explanation " + (isRight ? "right" : "wrong");
    explanationEl.innerHTML =
      '<span class="verdict">' +
      (isRight ? "✓ Correct!" : "✗ Not quite — the answer is " + LETTERS[correctIndex] + ".") +
      "</span>" +
      escapeHtml(q.explanation);

    scoreLabel.textContent = "Score: " + score;
    barFill.style.width = ((index + 1) / quiz.length) * 100 + "%";

    checkBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
    nextBtn.textContent = index + 1 < quiz.length ? "Next question →" : "See results →";
  }

  function nextQuestion() {
    index++;
    if (index < quiz.length) renderQuestion();
    else showResults();
  }

  // ---- Results ---------------------------------------------------------
  function showResults() {
    hide(quizScreen);
    show(resultsScreen);
    const pct = Math.round((score / quiz.length) * 100);
    finalScore.innerHTML = score + " <small>/ " + quiz.length + " (" + pct + "%)</small>";
    finalMsg.textContent = messageFor(pct);
  }

  function messageFor(pct) {
    if (pct === 100) return "Perfect score! You're crushing it. 🎉";
    if (pct >= 80) return "Great work — you really know this material.";
    if (pct >= 60) return "Solid. Review the explanations you missed and go again.";
    if (pct >= 40) return "Good effort. Re-reading the explanations will push this up fast.";
    return "Keep going — every rep helps. Try the same set again and watch it climb.";
  }

  // ---- Helpers ---------------------------------------------------------
  function show(el) { el.classList.remove("hidden"); }
  function hide(el) { el.classList.add("hidden"); }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  // ---- Wire up ---------------------------------------------------------
  startBtn.addEventListener("click", startQuiz);
  checkBtn.addEventListener("click", checkAnswer);
  nextBtn.addEventListener("click", nextQuestion);
  restartBtn.addEventListener("click", () => {
    show(setupScreen);
    hide(resultsScreen);
    hide(quizScreen);
  });

  populateSections();
})();
