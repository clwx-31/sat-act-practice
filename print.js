(function () {
  "use strict";

  const core = window.PracticeCore;
  const booklet = window.PracticeBooklet;

  const elements = {
    formGrid: document.getElementById("formGrid"),
    formSummary: document.getElementById("formSummary"),
    seedInput: document.getElementById("seedInput"),
    reroll: document.getElementById("rerollBtn"),
    openTest: document.getElementById("openTestBtn"),
    downloadTest: document.getElementById("downloadTestBtn"),
    openKey: document.getElementById("openKeyBtn"),
    downloadKey: document.getElementById("downloadKeyBtn"),
    status: document.getElementById("printStatus"),
    shareLink: document.getElementById("shareLink"),
    copyLink: document.getElementById("copyLinkBtn"),
  };

  const bankPromises = new Map();
  let selectedId = core.ALL_BLUEPRINTS[0].id;

  /* ------------------------------------------------------------------ state */

  // A seed is short and typeable so a form can be quoted out loud or written
  // on a printed booklet and rebuilt later.
  function randomSeed() {
    const alphabet = "abcdefghijkmnpqrstuvwxyz23456789";
    let seed = "";
    const values = new Uint32Array(6);
    if (window.crypto && window.crypto.getRandomValues) {
      window.crypto.getRandomValues(values);
    } else {
      for (let index = 0; index < values.length; index += 1) {
        values[index] = Math.floor(Math.random() * 0xffffffff);
      }
    }
    values.forEach((value) => {
      seed += alphabet[value % alphabet.length];
    });
    return seed;
  }

  function readUrl() {
    const params = new URLSearchParams(window.location.search);
    const form = params.get("form");
    if (form && core.blueprintById(form)) selectedId = form;
    const seed = (params.get("seed") || "").trim();
    elements.seedInput.value = seed || randomSeed();
  }

  function updateShareLink() {
    const url = new URL(window.location.href);
    url.search = "";
    url.searchParams.set("form", selectedId);
    url.searchParams.set("seed", elements.seedInput.value.trim());
    elements.shareLink.value = url.toString();
    // Keep the address bar shareable without adding a history entry per edit.
    // Some browsers reject this on file:// pages, where the box above is the
    // link anyway.
    try {
      window.history.replaceState(null, "", url.search);
    } catch (error) {
      /* the share box still holds the full link */
    }
  }

  /* --------------------------------------------------------------- rendering */

  function renderForms() {
    elements.formGrid.innerHTML = "";
    core.ALL_BLUEPRINTS.forEach((blueprint) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "form-card";
      button.setAttribute("role", "radio");
      const active = blueprint.id === selectedId;
      button.setAttribute("aria-checked", active ? "true" : "false");
      button.classList.toggle("active", active);

      const title = document.createElement("strong");
      title.textContent = blueprint.label;
      const meta = document.createElement("span");
      meta.className = "form-meta";
      meta.textContent =
        `${core.blueprintTotal(blueprint)} questions · ${blueprint.minutes} minutes · ` +
        `${blueprint.sections.length} section${blueprint.sections.length === 1 ? "" : "s"}`;
      const summary = document.createElement("span");
      summary.className = "form-summary";
      summary.textContent = blueprint.summary;

      button.append(title, meta, summary);
      button.addEventListener("click", () => {
        selectedId = blueprint.id;
        renderForms();
        updateSummary();
        updateShareLink();
      });
      elements.formGrid.appendChild(button);
    });
  }

  function updateSummary() {
    const blueprint = core.blueprintById(selectedId);
    if (!blueprint) return;
    const parts = blueprint.sections.map(
      (entry) => `${entry.label} ${entry.count}q/${entry.minutes}min`,
    );
    elements.formSummary.textContent = `${blueprint.label}: ${parts.join(" · ")}.`;
  }

  function setStatus(message, kind) {
    elements.status.className = `status-line${kind ? ` ${kind}` : ""}`;
    elements.status.textContent = message;
  }

  /* ---------------------------------------------------------------- building */

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

  async function buildModel() {
    const blueprint = core.blueprintById(selectedId);
    if (!blueprint) throw new Error("Choose a form first.");
    const seed = elements.seedInput.value.trim() || randomSeed();
    elements.seedInput.value = seed;

    const keys = [...new Set(blueprint.sections.map((entry) => entry.sectionKey))];
    const banks = await Promise.all(keys.map((key) => loadBank(key)));
    const bankBySection = Object.fromEntries(
      keys.map((key, index) => [key, banks[index]]),
    );

    const form = core.buildTestForm(bankBySection, blueprint, seed);
    const short = form.find((group) => group.questions.length < group.entry.count);
    if (short) {
      throw new Error(
        `The ${short.label} bank is short of the ${short.entry.count} items this form needs.`,
      );
    }
    return booklet.buildModel(form, blueprint, seed);
  }

  function documentFor(model, kind) {
    return kind === "key"
      ? booklet.renderKeyHtml(model)
      : booklet.renderBookletHtml(model);
  }

  function fileNameFor(model, kind) {
    return `${model.blueprint.id}-${model.formCode}-${kind}.html`;
  }

  // Opened in a tab the browser's own print dialog can turn into a PDF, which
  // is the only route to a PDF that needs nothing installed.
  async function openBooklet(kind) {
    const target = window.open("", "_blank");
    if (!target) {
      setStatus(
        "Allow pop-ups for this site, or use Download instead.",
        "error",
      );
      return;
    }
    target.document.write(
      "<p style='font:14px system-ui;padding:2rem'>Building your booklet…</p>",
    );
    setStatus("Building…", "loading");
    try {
      const model = await buildModel();
      target.document.open();
      target.document.write(documentFor(model, kind));
      target.document.close();
      target.document.title = fileNameFor(model, kind).replace(/\.html$/, "");
      updateShareLink();
      setStatus(
        `Form ${model.formCode} opened in a new tab. Print it, then choose ` +
          `"Save as PDF".`,
      );
    } catch (error) {
      target.close();
      setStatus(error.message, "error");
    }
  }

  async function downloadBooklet(kind) {
    setStatus("Building…", "loading");
    try {
      const model = await buildModel();
      const blob = new Blob([documentFor(model, kind)], {
        type: "text/html;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = fileNameFor(model, kind);
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 30000);
      updateShareLink();
      setStatus(`Downloaded ${fileNameFor(model, kind)}.`);
    } catch (error) {
      setStatus(error.message, "error");
    }
  }

  async function copyShareLink() {
    updateShareLink();
    try {
      await navigator.clipboard.writeText(elements.shareLink.value);
      setStatus("Link copied. Anyone who opens it gets this exact form.");
    } catch (error) {
      elements.shareLink.select();
      setStatus("Press ⌘C or Ctrl+C to copy the selected link.");
    }
  }

  /* ------------------------------------------------------------------- wiring */

  elements.reroll.addEventListener("click", () => {
    elements.seedInput.value = randomSeed();
    updateShareLink();
    setStatus("New seed ready. Build the booklet to draw a fresh form.");
  });
  elements.seedInput.addEventListener("change", updateShareLink);
  elements.openTest.addEventListener("click", () => openBooklet("test"));
  elements.downloadTest.addEventListener("click", () => downloadBooklet("test"));
  elements.openKey.addEventListener("click", () => openBooklet("key"));
  elements.downloadKey.addEventListener("click", () => downloadBooklet("key"));
  elements.copyLink.addEventListener("click", copyShareLink);

  readUrl();
  renderForms();
  updateSummary();
  updateShareLink();
})();
