#!/usr/bin/env node
"use strict";

const { loadBank } = require("./lib/content");
const { generateSection } = require("./lib/generation");

const SECTION_KEY = "act-science";
const GENERATOR_NAME = "act-science-generator-v1";
const REBUILD = process.argv.includes("--rebuild");

const studies = [
  ["bean seedlings", "daily light", "hours", "mean height", "cm", "increase"],
  ["yeast cultures", "water temperature", "°C", "gas volume", "mL", "increase"],
  ["model solar panels", "lamp angle", "degrees", "electric current", "mA", "decrease"],
  ["soil samples", "sand content", "%", "drainage time", "seconds", "decrease"],
  ["paper helicopters", "wing length", "cm", "fall time", "seconds", "increase"],
  ["salt solutions", "salt concentration", "%", "freezing point", "°C", "decrease"],
  ["cricket groups", "air temperature", "°C", "chirps per minute", "chirps", "increase"],
  ["foam insulation panels", "panel thickness", "mm", "heat loss", "joules", "decrease"],
  ["algae cultures", "nutrient level", "mg/L", "cell density", "cells/mL", "increase"],
  ["toy cars", "ramp height", "cm", "travel distance", "cm", "increase"],
  ["metal rods", "heating time", "minutes", "length change", "mm", "increase"],
  ["water filters", "gravel depth", "cm", "flow rate", "mL/min", "decrease"],
  ["moss patches", "soil moisture", "%", "covered area", "cm²", "increase"],
  ["pendulums", "string length", "cm", "swing period", "seconds", "increase"],
  ["battery circuits", "number of cells", "cells", "bulb brightness", "lux", "increase"],
  ["ice cubes", "surface area", "cm²", "melting time", "minutes", "decrease"],
  ["compost jars", "turning frequency", "turns/week", "decomposition rate", "g/day", "increase"],
  ["sound tubes", "tube length", "cm", "resonant frequency", "Hz", "decrease"],
  ["radish seeds", "salt level", "g/L", "germination rate", "%", "decrease"],
  ["water samples", "filter passes", "passes", "particle count", "particles/mL", "decrease"],
  ["rubber bands", "added mass", "g", "stretch length", "cm", "increase"],
  ["miniature wind turbines", "wind speed", "m/s", "power output", "mW", "increase"],
  ["leaf disks", "carbon dioxide level", "mg/L", "floating time", "minutes", "decrease"],
  ["rock samples", "acid exposure", "minutes", "mass remaining", "g", "decrease"],
  ["sealed terrariums", "plant count", "plants", "oxygen level", "%", "increase"],
];

const labs = [
  "Alder Lab", "Bayside School", "Cedar Center", "Delta Academy", "Elm Institute",
  "Foxglove Lab", "Granite School", "Harbor Center", "Indigo Academy", "Juniper Lab",
  "Kestrel Institute", "Lakeshore School", "Meadow Center", "Northfield Lab",
  "Oak Academy", "Pine Institute", "Quartz School", "River Center", "Summit Lab",
  "Timber Academy", "Union Institute", "Valley School", "Willow Center",
  "York Lab", "Zephyr Academy",
];

const conditions = [
  "using calibrated digital sensors", "during four repeated trials",
  "with samples assigned at random", "while room temperature stayed constant",
  "using identical containers", "after instruments were zeroed",
  "with measurements recorded every minute", "by two independent observers",
  "with sample order concealed from the recorder", "after a preliminary pilot",
  "using freshly prepared materials", "with equipment cleaned between trials",
  "while humidity was held stable", "using equal starting masses",
  "with results averaged across five samples", "during morning laboratory periods",
  "with uncertainty recorded for each reading",
];

function study(sequence) {
  const base = studies[(sequence + Math.floor(sequence / studies.length)) % studies.length];
  const start = 2 + sequence % 6;
  const step = 2 + (sequence * 3) % 5;
  const outcomeStep = 3 + (sequence * 5) % 7;
  const direction = base[5] === "increase" ? 1 : -1;
  const outcomeStart = direction === 1 ? 12 + sequence % 20 : 30 + sequence % 20;
  const levels = [start, start + step, start + 2 * step, start + 3 * step];
  const outcomes = levels.map((unused, index) => outcomeStart + direction * outcomeStep * index);
  return {
    subject: base[0],
    independent: base[1],
    independentUnit: base[2],
    dependent: base[3],
    dependentUnit: base[4],
    direction: base[5],
    levels,
    outcomes,
    lab: labs[sequence % labs.length],
    condition: conditions[(sequence * 11) % conditions.length],
  };
}

function tableText(s) {
  return [
    `${s.independent} (${s.independentUnit}) | ${s.dependent} (${s.dependentUnit})`,
    ...s.levels.map((level, index) => `${level} | ${s.outcomes[index]}`),
  ].join("\n");
}

const retainedQuestions = loadBank(SECTION_KEY).filter(
  (question) => !REBUILD || question.provenance.generator !== GENERATOR_NAME,
);
const emittedChoiceSets = new Set(
  retainedQuestions
    .filter((question) => Array.isArray(question.choices))
    .map((question) => question.choices.slice().sort().join("||")),
);

function choiceSetKey(correct, wrong) {
  return [correct, ...wrong.map((choice) => choice.text)].slice().sort().join("||");
}

function contextualItem(context, s, data) {
  return item(context, {
    ...data,
    choiceContexts: [
      `${s.lab} ${s.subject}`,
      `${s.lab} ${s.subject} ${s.independent}`,
      `${s.lab} ${s.subject} ${s.dependent}`,
      `${s.lab} ${s.subject} ${s.condition}`,
    ],
  });
}

function item(context, data) {
  let correctText = String(data.correct);
  const seen = new Set([correctText]);
  let wrong = data.wrong
    .map(([text, reason]) => ({ text: String(text), reason }))
    .filter((choice) => {
      if (seen.has(choice.text)) return false;
      seen.add(choice.text);
      return true;
    });
  const fallbacks = [
    ["Cannot be determined from the data", "The supplied data are sufficient to determine the requested result."],
    ["No change occurred", "The table or method shows a measurable difference."],
    ["All tested values were equal", "The recorded values are not all equal."],
  ];
  fallbacks.forEach(([text, reason]) => {
    if (wrong.length >= 3 || seen.has(text)) return;
    seen.add(text);
    wrong.push({ text, reason });
  });
  let setKey = choiceSetKey(correctText, wrong);
  if (emittedChoiceSets.has(setKey)) {
    const originalCorrect = correctText;
    const originalWrong = wrong;
    const contextLabel = (data.choiceContexts || []).find((label) => {
      const candidateCorrect = `${label}: ${originalCorrect}`;
      const candidateWrong = originalWrong.map((choice) => ({
        ...choice,
        text: `${label}: ${choice.text}`,
      }));
      return !emittedChoiceSets.has(choiceSetKey(candidateCorrect, candidateWrong));
    });
    if (!contextLabel) {
      throw new Error(`No fresh ACT Science choice context for ${context.task.subskill}`);
    }
    correctText = `${contextLabel}: ${originalCorrect}`;
    wrong = originalWrong.map((choice) => ({
      ...choice,
      text: `${contextLabel}: ${choice.text}`,
    }));
    setKey = choiceSetKey(correctText, wrong);
  }
  emittedChoiceSets.add(setKey);
  return {
    stimulus: { type: data.type || "experiment", content: data.content },
    stem: data.stem,
    correct: correctText,
    distractors: wrong.slice(0, 3),
    hint: data.hint,
    explanation: data.explanation,
    solutionSteps: [
      "Locate the exact variable, comparison, or claim named in the question.",
      data.reasoning,
      "Choose the option that matches the supplied evidence without adding outside assumptions.",
    ],
    strategy: data.strategy || "Go directly to the relevant table row or method statement before reading every option.",
    trap: data.trap || "Do not substitute outside scientific knowledge for the information supplied in the experiment.",
    estimatedSeconds: context.task.difficulty === "Hard" ? 90 : 65,
    principles: [data.principle],
    calculatorPolicy: "not-permitted",
    format: data.type || "experiment",
    tags: [data.field || "cross-disciplinary"],
    verification: data.verification || null,
  };
}

function interpretation(context) {
  const { sequence, task } = context;
  const s = study(sequence);
  const content = `${s.lab} tested ${s.subject} ${s.condition}. The table shows the results.\n\n${tableText(s)}`;
  if (task.skill === "Read data displays") {
    if (task.subskill === "tables") {
      const index = 1 + sequence % 3;
      return contextualItem(context, s, {
        content,
        type: "table",
        stem: `What ${s.dependent} was recorded when ${s.independent} was ${s.levels[index]} ${s.independentUnit}?`,
        correct: String(s.outcomes[index]),
        wrong: [[s.outcomes[0], "This is the outcome in the first row."], [s.levels[index], "This is the independent-variable value, not the measured outcome."], [s.outcomes[index + (index < 3 ? 1 : -1)], "This outcome comes from a neighboring row."]],
        hint: "Find the row with the specified independent-variable value, then read across.",
        explanation: `The row for ${s.levels[index]} lists ${s.outcomes[index]} ${s.dependentUnit}.`,
        reasoning: "Match the requested row and read the dependent-variable column.",
        principle: "Read a table by matching row conditions before reading the requested column.",
      });
    }
    if (task.subskill === "graphs") {
      const maxIndex = s.direction === "increase" ? 3 : 0;
      return contextualItem(context, s, {
        content: `${content}\n\nImagine these points plotted with ${s.independent} on the horizontal axis.`,
        type: "graph",
        stem: `At which tested ${s.independent} would the graph show the greatest ${s.dependent}?`,
        correct: String(s.levels[maxIndex]),
        wrong: s.levels.filter((unused, index) => index !== maxIndex).map((level) => [level, "The table shows a smaller outcome at this level."]),
        hint: "Identify the greatest value in the outcome column, then trace to its input.",
        explanation: `The greatest ${s.dependent}, ${s.outcomes[maxIndex]}, occurs at ${s.levels[maxIndex]} ${s.independentUnit}.`,
        reasoning: "Find the maximum dependent value and its corresponding horizontal coordinate.",
        principle: "A graph and its source table encode the same ordered pairs.",
      });
    }
    return contextualItem(context, s, {
      content: `${s.lab} arranged four samples from lowest to highest ${s.independent}: Sample A, Sample B, Sample C, Sample D. ${s.condition}, Sample A had ${s.outcomes[0]} ${s.dependentUnit} and Sample D had ${s.outcomes[3]} ${s.dependentUnit}.`,
      type: "diagram",
      stem: `Which sample had the highest tested ${s.independent}?`,
      correct: "Sample D",
      wrong: [["Sample A", "Sample A was assigned the lowest level."], ["Sample B", "Sample B was below Samples C and D."], ["Sample C", "Sample D was explicitly the highest."]],
      hint: "Use the stated ordering from lowest to highest.",
      explanation: "The diagram description orders the samples A through D from lowest to highest, so D is highest.",
      reasoning: "Translate the verbal ordering into sample positions.",
      principle: "Diagram labels must be interpreted using the key or ordering provided.",
    });
  }
  if (task.skill === "Analyze data") {
    if (task.subskill === "trends") {
      return contextualItem(context, s, {
        content,
        type: "table",
        stem: `As ${s.independent} increased across the tested levels, how did ${s.dependent} change?`,
        correct: `It ${s.direction === "increase" ? "increased" : "decreased"} consistently.`,
        wrong: [["It stayed constant.", "The outcome values change in every row."], [`It ${s.direction === "increase" ? "decreased" : "increased"} consistently.`, "This reverses the direction shown."], ["It changed direction twice.", "The values move in one direction throughout."]],
        hint: "Compare the first and last rows, then check whether the middle rows follow the same direction.",
        explanation: `The outcome values move from ${s.outcomes[0]} to ${s.outcomes[3]}, showing a consistent ${s.direction}.`,
        reasoning: "Read the outcome column from top to bottom as the input rises.",
        principle: "A trend describes the direction and consistency of change across ordered data.",
      });
    }
    if (task.subskill === "interpolation") {
      const midpointInput = (s.levels[1] + s.levels[2]) / 2;
      const midpointOutcome = (s.outcomes[1] + s.outcomes[2]) / 2;
      return contextualItem(context, s, {
        content,
        type: "table",
        stem: `Assuming a linear relationship between the middle two rows, what ${s.dependent} is predicted at ${midpointInput} ${s.independentUnit}?`,
        correct: String(midpointOutcome),
        wrong: [[s.outcomes[1], "This uses the lower measured outcome without moving halfway."], [s.outcomes[2], "This uses the upper measured outcome."], [s.outcomes[0], "This uses the first row, outside the specified interval."]],
        hint: "The requested input is halfway between the middle inputs.",
        explanation: `A halfway input gives the average outcome: (${s.outcomes[1]} + ${s.outcomes[2]})/2 = ${midpointOutcome}.`,
        reasoning: "Average the two neighboring outcomes for a linear midpoint estimate.",
        principle: "Linear interpolation estimates between measured points.",
        verification: { kind: "mean", inputs: [s.outcomes[1], s.outcomes[2]], expected: midpointOutcome },
      });
    }
    const difference = Math.abs(s.outcomes[3] - s.outcomes[0]);
    return contextualItem(context, s, {
      content,
      type: "table",
      stem: `What is the absolute difference between the first and last ${s.dependent} values?`,
      correct: String(difference),
      wrong: [[s.outcomes[3] + s.outcomes[0], "This adds rather than subtracts the endpoint values."], [Math.abs(s.levels[3] - s.levels[0]), "This compares input levels instead of outcomes."], [s.outcomes[0], "This is only the first outcome."]],
      hint: "Use the dependent-variable column and subtract endpoint values.",
      explanation: `|${s.outcomes[3]} − ${s.outcomes[0]}| = ${difference} ${s.dependentUnit}.`,
      reasoning: "Read the first and last outcomes and take their absolute difference.",
      principle: "Comparisons must use the requested variable and consistent units.",
    });
  }
  const statement = s.direction === "increase"
    ? `${s.dependent} rises as ${s.independent} rises`
    : `${s.dependent} falls as ${s.independent} rises`;
  if (task.subskill === "graph to text") {
    return contextualItem(context, s, {
      content: `${content}\n\nThe points are plotted and connected in order.`,
      type: "graph",
      stem: "Which sentence best translates the graph's pattern into words?",
      correct: `${statement}.`,
      wrong: [[`${s.dependent} remains constant.`, "The plotted values change."], [`${s.independent} was not varied.`, "Four distinct input levels were tested."], [`The graph contains no ordered relationship.`, "The points follow a consistent direction."]],
      hint: "Describe what happens to the vertical variable as the horizontal variable increases.",
      explanation: `The plotted points show that ${statement}.`,
      reasoning: "Translate horizontal movement into the corresponding vertical direction.",
      principle: "A verbal graph description must name both variables and the direction of association.",
    });
  }
  return contextualItem(context, s, {
    content: `${s.lab} reports that ${statement} for ${s.subject} ${s.condition}.`,
    type: "table",
    stem: "Which two-row table is consistent with the report?",
    correct: s.direction === "increase" ? "Input 2 → Output 10; Input 4 → Output 18" : "Input 2 → Output 18; Input 4 → Output 10",
    wrong: s.direction === "increase"
      ? [["Input 2 → Output 18; Input 4 → Output 10", "This shows a decrease."], ["Input 2 → Output 10; Input 4 → Output 10", "This shows no change."], ["Input 4 → Output 10; Input 2 → Output 18", "Ordered by input, this also shows a decrease."]]
      : [["Input 2 → Output 10; Input 4 → Output 18", "This shows an increase."], ["Input 2 → Output 10; Input 4 → Output 10", "This shows no change."], ["Input 4 → Output 18; Input 2 → Output 10", "Ordered by input, this shows an increase."]],
    hint: "As input moves from 2 to 4, make the output move in the stated direction.",
    explanation: `Only the correct table shows the reported ${s.direction}.`,
    reasoning: "Compare outputs at the lower and higher inputs.",
    principle: "A table-to-text translation must preserve variable direction.",
  });
}

function investigation(context) {
  const { sequence, task } = context;
  const s = study(sequence);
  const method = `${s.lab} placed ${s.subject} into four groups with different ${s.independent} levels. All groups used equal starting samples and identical containers. After the same amount of time, researchers measured ${s.dependent}. The work was conducted ${s.condition}.`;
  if (task.skill === "Experimental design") {
    const answers = {
      variables: [`${s.independent}`, `${s.dependent}`, "container type", "starting sample size"],
      controls: ["Using equal starting samples and identical containers", `Varying ${s.independent}`, `Measuring ${s.dependent}`, "Using four groups"],
      procedures: [`Measure ${s.dependent} after the same duration for every group.`, "Measure each group after a different duration.", `Change both ${s.independent} and container type.`, "Use no recorded outcome."],
    };
    const correct = answers[task.subskill][0];
    return contextualItem(context, s, {
      content: method,
      stem: task.subskill === "variables"
        ? "Which factor is the independent variable?"
        : task.subskill === "controls"
          ? "Which method feature most directly controls potential confounding variables?"
          : "Which procedure is most appropriate for a fair comparison?",
      correct,
      wrong: answers[task.subskill].slice(1).map((choice) => [choice, task.subskill === "variables" ? "This is an outcome or controlled condition, not the deliberately varied factor." : "This does not hold comparison conditions constant as directly as the correct procedure."]),
      hint: "Separate what researchers changed, what they measured, and what they held constant.",
      explanation: task.subskill === "variables"
        ? `${s.independent} is deliberately varied among groups.`
        : "A fair comparison changes only the intended factor and measures groups on the same schedule.",
      reasoning: "Classify each method detail as independent, dependent, or controlled.",
      principle: "A controlled experiment varies one primary factor while keeping other relevant conditions consistent.",
    });
  }
  if (task.skill === "Extend an investigation") {
    return contextualItem(context, s, {
      content: `${method}\nThe table showed a consistent ${s.direction} in ${s.dependent} across the tested range.`,
      stem: task.subskill === "prediction"
        ? `If the trend continues just beyond the tested range, what is the most reasonable prediction?`
        : "Which follow-up study best tests whether the pattern applies more broadly?",
      correct: task.subskill === "prediction"
        ? `${s.dependent} will likely continue to ${s.direction} over the next small increase in ${s.independent}.`
        : `Repeat the procedure with additional ${s.independent} levels and independently prepared ${s.subject}.`,
      wrong: task.subskill === "prediction"
        ? [["The outcome must reverse immediately.", "The observed trend gives no basis for an immediate reversal."], ["The outcome will remain exactly constant.", "The tested range shows consistent change."], ["The experiment proves the trend continues without limit.", "A short measured range cannot justify unlimited extrapolation."]]
        : [["Change every condition at once.", "Multiple simultaneous changes prevent clear interpretation."], ["Repeat only the same measurement without new samples or levels.", "This does not test broader applicability."], ["Remove the dependent-variable measurement.", "Without the outcome, the pattern cannot be tested."]],
      hint: "Extend cautiously: preserve the original design and avoid claims far beyond measured conditions.",
      explanation: "The correct choice extends the observed pattern or method by one controlled, testable step.",
      reasoning: "Use the measured direction and preserve comparability in the next test.",
      principle: "Predictions should stay near the data range; follow-ups should isolate the same relationship with broader evidence.",
    });
  }
  const choices = {
    precision: ["Use an instrument with finer measurement increments.", "Use fewer recorded digits than the instrument provides.", "Estimate every value without a scale.", "Change instruments for every group without calibration."],
    limitations: [`The tested ${s.independent} range may not represent values outside that range.`, "The experiment has no independent variable.", "The measured outcome was never recorded.", "Identical containers make comparison impossible."],
    replication: ["Have another team repeat the same procedure with new samples.", "Have the original team rewrite its conclusion without new data.", "Combine all groups before measuring.", "Discard the method description."],
  };
  return contextualItem(context, s, {
    content: method,
    stem: task.subskill === "precision"
      ? "Which change would most directly improve measurement precision?"
      : task.subskill === "limitations"
        ? "Which is a reasonable limitation of the study?"
        : "Which action best tests whether the result is replicable?",
    correct: choices[task.subskill][0],
    wrong: choices[task.subskill].slice(1).map((choice) => [choice, "This would not address the requested issue and may reduce the study's reliability."]),
    hint: "Match the proposed change to precision, scope, or independent repetition.",
    explanation: task.subskill === "precision"
      ? "Finer measurement increments reduce rounding uncertainty."
      : task.subskill === "limitations"
        ? "Conclusions should not automatically extend beyond the tested input range."
        : "Independent repetition with new samples directly tests replicability.",
    reasoning: "Identify whether the question concerns instrument resolution, scope of inference, or repeated evidence.",
    principle: "Precision concerns resolution; limitations bound conclusions; replication requires repeating a documented method.",
  });
}

function evaluation(context) {
  const { sequence, task } = context;
  const s = study(sequence);
  const evidence = `${s.lab} measured ${s.subject} ${s.condition}. Across four increasing ${s.independent} levels, ${s.dependent} showed a consistent ${s.direction}.`;
  if (task.skill === "Evaluate explanations") {
    if (task.subskill === "claims and evidence") {
      return contextualItem(context, s, {
        content: evidence,
        stem: "Which claim is most directly supported?",
        correct: `Within the tested range, higher ${s.independent} was associated with ${s.direction === "increase" ? "higher" : "lower"} ${s.dependent}.`,
        wrong: [["The tested factor has no relationship with the outcome.", "The outcome changed consistently across levels."], ["The pattern must hold under every possible condition.", "The evidence covers only the tested conditions."], ["The outcome caused researchers to change the input.", "The input was deliberately varied first."]],
        hint: "Use a qualified claim restricted to the tested range.",
        explanation: "The correct claim matches the observed direction without extending beyond the data.",
        reasoning: "Connect the varied factor and measured response while preserving scope.",
        principle: "Evidence supports claims only within the conditions and range actually tested.",
      });
    }
    return contextualItem(context, s, {
      content: `${evidence}\nModel A predicts the observed ${s.direction}. Model B predicts no change.`,
      stem: "Which model is better supported by the reported evidence?",
      correct: "Model A",
      wrong: [["Model B", "Model B predicts no change, contrary to the observed trend."], ["Both models equally", "The predictions differ, and only one matches the evidence."], ["Neither model can be compared with data", "Both models make testable predictions about the measured outcome."]],
      hint: "Compare each model's prediction with the direction in the evidence.",
      explanation: `Model A predicts the observed ${s.direction}, whereas Model B does not.`,
      reasoning: "Match predicted and measured outcome patterns.",
      principle: "A model gains support when its predictions match observed evidence better than alternatives.",
    });
  }
  if (task.skill === "Draw conclusions") {
    return contextualItem(context, s, {
      content: evidence,
      stem: task.subskill === "inference"
        ? "Which inference is most reasonable?"
        : "Which conclusion can be generalized most safely?",
      correct: task.subskill === "inference"
        ? `The tested factor may help explain variation in ${s.dependent} under these conditions.`
        : `The relationship is supported for ${s.subject} over the tested ${s.independent} range.`,
      wrong: [["The factor is the only possible influence on the outcome.", "Other factors may also matter."], ["The pattern has been proven for every organism and material.", "The study tested one defined subject."], ["The measurements show no trend.", "The evidence explicitly reports a consistent trend."]],
      hint: "Choose the conclusion with scope matching the tested subject, range, and conditions.",
      explanation: "The correct conclusion is cautious and limited to what the experiment measured.",
      reasoning: "Distinguish a supported association from an exclusive cause or universal law.",
      principle: "Scientific conclusions should match the population, range, and design represented by the evidence.",
    });
  }
  const scientistA = `Scientist A says changing ${s.independent} explains the observed ${s.direction} in ${s.dependent}.`;
  const scientistB = `Scientist B says an uncontrolled condition, not ${s.independent}, produced the pattern.`;
  const base = `${s.lab} studied ${s.subject} ${s.condition}.\n${scientistA}\n${scientistB}\nBoth scientists agree that the measurements show a consistent ${s.direction}.`;
  if (task.subskill === "agreement and disagreement") {
    return contextualItem(context, s, {
      content: base,
      type: "conflicting-viewpoints",
      stem: "On which point do the scientists agree?",
      correct: `The measurements show a consistent ${s.direction}.`,
      wrong: [[`${s.independent} is definitely the cause.`, "Scientist B rejects this claim."], ["An uncontrolled condition definitely caused the pattern.", "Scientist A rejects this claim."], ["No pattern appears in the measurements.", "Both explicitly recognize a pattern."]],
      hint: "Separate the shared observation from competing explanations.",
      explanation: "Both accept the measured trend but disagree about its cause.",
      reasoning: "Mark the statement explicitly attributed to both scientists.",
      principle: "Conflicting viewpoints may share evidence while interpreting it differently.",
    });
  }
  return contextualItem(context, s, {
    content: base,
    type: "conflicting-viewpoints",
    stem: "Which additional evidence would most strongly favor Scientist A over Scientist B?",
    correct: `The pattern appeared again when other conditions were controlled and only ${s.independent} was varied.`,
    wrong: [["The original measurements were printed in a larger font.", "Presentation does not distinguish causal explanations."], ["A different outcome was measured without recording the input.", "This does not test either explanation."], ["Both scientists repeated their opinions.", "Repeated claims are not new evidence."]],
    hint: "Look for a controlled test that separates the two proposed causes.",
    explanation: `Reproducing the pattern while isolating ${s.independent} supports Scientist A's explanation and weakens the uncontrolled-condition account.`,
    reasoning: "Choose evidence that changes one proposed cause while controlling the rival cause.",
    principle: "Discriminating evidence favors one explanation by testing a prediction on which alternatives differ.",
  });
}

function generate(context) {
  if (context.task.domain === "Interpretation of Data") return interpretation(context);
  if (context.task.domain === "Scientific Investigation") return investigation(context);
  return evaluation(context);
}

const completed = generateSection(SECTION_KEY, generate, {
  generatorName: GENERATOR_NAME,
  regenerateGenerated: REBUILD,
});
console.log(
  `ACT Science: kept ${completed.existing}, generated ${completed.generated}, total ${completed.total}.`,
);
