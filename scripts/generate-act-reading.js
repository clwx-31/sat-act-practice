#!/usr/bin/env node
"use strict";

const { generateSection } = require("./lib/generation");

const places = [
  "Ashford", "Bluewater", "Copperfield", "Dovetail", "Evergreen",
  "Fairhaven", "Gold Creek", "Highland", "Ironwood", "Jasper Bay",
  "Kingsley", "Longmeadow", "Moonstone", "Newbridge", "Osprey Point",
  "Parkside", "Quarry Lake", "Redbud", "Summit Grove", "Thistle Bay",
  "Upland", "Veridian", "Wildrose", "Yew Harbor", "Zinc Ridge",
];

const projects = [
  ["a neighborhood film archive", "digitize aging home movies", "families could view shared local history"],
  ["a floating classroom", "study the harbor from a small research boat", "students connected lessons with direct observation"],
  ["a public poetry trail", "install short poems along walking paths", "readers encountered literature during daily routines"],
  ["a restored train depot", "convert an unused station into studios", "artists gained affordable workspace"],
  ["a night-market map", "document stalls and accessible routes", "visitors planned trips more confidently"],
  ["a community bread oven", "teach traditional baking methods", "neighbors exchanged techniques and stories"],
  ["a tree-canopy survey", "measure shade on residential blocks", "planners identified the hottest walking routes"],
  ["a costume lending room", "share performance clothing", "small theater groups lowered production costs"],
  ["an urban bird atlas", "record seasonal sightings", "residents noticed migration patterns"],
  ["a tactile museum guide", "describe exhibits through raised diagrams", "more visitors explored objects independently"],
  ["a schoolyard geology walk", "label exposed rock samples", "students practiced observation outside class"],
  ["a mobile recording booth", "collect songs and spoken memories", "performers contributed to a public audio collection"],
  ["a repairable-furniture workshop", "teach joinery and fabric repair", "participants kept useful chairs and tables in service"],
  ["a rain-barrel cooperative", "capture water from household roofs", "gardens relied less on treated water"],
  ["a local-language theater series", "stage plays in several languages", "audiences heard stories in familiar voices"],
  ["a pedestrian-count project", "track foot traffic at intersections", "designers compared possible crosswalk changes"],
  ["a seedling adoption day", "distribute native young trees", "residents expanded habitat across many yards"],
  ["a public microscope lab", "examine prepared slides", "visitors compared structures too small to see unaided"],
  ["a neighborhood recipe podcast", "record cooks explaining favorite dishes", "listeners learned both methods and family histories"],
  ["a shoreline sketch club", "draw changing coastal views", "members created a visual record of erosion"],
  ["an outdoor translation board", "post community notices in several languages", "more residents could follow local updates"],
  ["a bicycle cargo trial", "lend cargo bicycles to households", "participants tested alternatives for short errands"],
  ["a makers' material exchange", "share fabric, wood, and hardware", "unused supplies became new projects"],
  ["a dawn concert series", "present music in a riverside park", "performances reached early-shift workers"],
  ["a community astronomy log", "record nightly sky conditions", "observers compared visibility across seasons"],
];

const names = [
  "Adisa", "Bruno", "Carmen", "Deepa", "Elias", "Fiona", "Gita", "Harlan",
  "Ines", "Jamal", "Kira", "Luc", "Mina", "Niko", "Opal", "Pablo",
  "Reese", "Suki", "Tomas", "Una", "Vera", "Will", "Xia", "Yosef", "Zola",
];

const contextWords = [
  ["reserved", "quiet and restrained", "subdued", ["booked", "enthusiastic", "uncertain"]],
  ["yield", "produce a result", "generate", ["surrender", "bend", "delay"]],
  ["trace", "follow the development of", "track", ["copy", "erase", "decorate"]],
  ["deliberate", "careful and intentional", "considered", ["slow", "accidental", "public"]],
  ["illuminate", "make easier to understand", "clarify", ["light physically", "hide", "repeat"]],
  ["modest", "limited in size", "small", ["proud", "ancient", "exact"]],
  ["anchor", "provide a stable basis for", "ground", ["weigh down", "interrupt", "replace"]],
  ["fluid", "able to change easily", "flexible", ["watery", "permanent", "formal"]],
  ["draw", "attract", "bring in", ["sketch", "pull physically", "finish"]],
  ["register", "be noticed", "be perceptible", ["enroll", "record", "approve"]],
  ["temper", "make less extreme", "moderate", ["heat", "test", "combine"]],
  ["cultivate", "develop over time", "foster", ["farm", "measure", "limit"]],
  ["prominent", "easy to notice", "conspicuous", ["famous", "hidden", "temporary"]],
  ["novel", "new and unusual", "original", ["fictional", "ordinary", "brief"]],
  ["sustain", "continue to support", "maintain", ["prove", "shorten", "observe"]],
  ["render", "cause to become", "make", ["draw", "return", "translate"]],
  ["probe", "investigate closely", "examine", ["touch", "announce", "simplify"]],
  ["qualify", "limit a claim", "narrow", ["become eligible", "praise", "repeat"]],
  ["marked", "clearly noticeable", "pronounced", ["written", "random", "minor"]],
  ["account", "explanation", "description", ["bill", "bank record", "importance"]],
];

const audiences = [
  "middle-school volunteers", "retired tradespeople", "first-time visitors",
  "after-school clubs", "weekend commuters", "multilingual families",
  "local artists", "recreation groups", "public-library patrons",
  "neighborhood gardeners", "young musicians", "museum docents",
  "small-business owners", "caregivers and children", "student journalists",
  "community scientists", "new residents",
];

const records = [
  "weekly field notes", "a public photo log", "anonymous exit surveys",
  "a volunteer journal", "monthly attendance summaries", "recorded interviews",
  "a set of annotated maps", "short audio diaries", "a shared observation board",
  "dated sketches", "a digital project timeline", "facilitator checklists",
  "participant reflection cards", "a materials inventory", "session transcripts",
  "a public progress chart", "a collection of route diagrams", "daily count sheets",
  "a project newsletter",
];

function scenario(sequence) {
  return {
    place: places[sequence % places.length],
    project: projects[(sequence + Math.floor(sequence / projects.length)) % projects.length],
    name: names[(sequence * 11 + Math.floor(sequence / names.length)) % names.length],
    secondName: names[(sequence * 17 + 7) % names.length],
  };
}

function background(sequence) {
  return `The effort involved ${audiences[(sequence * 7) % audiences.length]} and was documented through ${records[(sequence * 11) % records.length]}.`;
}

function withoutArticle(project) {
  return project.replace(/^(?:a|an) /, "");
}

function mc(context, options) {
  return {
    stimulus: { type: options.type || "passage", content: options.passage },
    stem: options.stem,
    correct: options.correct,
    distractors: options.wrong.map(([text, reason]) => ({ text, reason })),
    hint: options.hint,
    explanation: options.explanation,
    solutionSteps: [
      "Identify exactly what the question asks about the passage.",
      options.reasoning,
      "Eliminate choices that contradict, exaggerate, or omit the relevant evidence.",
    ],
    strategy: options.strategy || "Return to the relevant lines and paraphrase them before comparing choices.",
    trap: options.trap || "A plausible statement is not correct unless the passage supports it.",
    principles: [options.principle],
    format: options.type || "passage",
    estimatedSeconds: context.task.difficulty === "Hard" ? 95 : 75,
    tags: options.tags || [],
  };
}

function keyIdeas(context) {
  const { sequence, task } = context;
  const value = scenario(sequence);
  const [project, action, outcome] = value.project;
  if (task.skill === "Central Ideas, Themes, and Summaries") {
    const passage = `${value.name} initially doubted that ${project} in ${value.place} would attract much interest. After helping volunteers ${action}, however, ${value.name} watched newcomers return with friends and offer ideas of their own. By the final session, ${outcome}. ${background(sequence)}`;
    const isTheme = task.subskill === "theme";
    const isSummary = task.subskill === "summary";
    return mc(context, {
      passage,
      stem: isTheme
        ? "Which theme is most strongly conveyed by the passage?"
        : isSummary
          ? "Which choice provides the best summary of the passage?"
          : "Which choice best states the passage's main idea?",
      correct: isTheme
        ? "Direct participation can replace skepticism with a sense of shared possibility."
        : `${value.name}'s doubts about ${project} faded after seeing residents participate and contribute.`,
      wrong: [
        ["Community projects succeed only when nobody questions them.", "The passage includes initial doubt and does not make an absolute claim."],
        [`${value.name} completed the entire project without help.`, "Volunteers and newcomers clearly participate."],
        [`The main purpose of ${project} was to generate a profit.`, "No financial goal is mentioned."],
      ],
      hint: "Track how the character's attitude changes from the first sentence to the last.",
      explanation: `The passage centers on ${value.name}'s shift from doubt to confidence after witnessing shared participation.`,
      reasoning: "Compare the opening doubt with the later evidence of returning and contributing participants.",
      principle: "A main idea or theme must account for the passage's central development.",
    });
  }
  if (task.skill === "Relationships") {
    const patterns = {
      sequence: {
        passage: `In ${value.place}, ${value.name} first recruited volunteers for ${project}. The group then learned to ${action}. After three practice sessions, the team opened the project to the public, with the result that ${outcome}. ${background(sequence)}`,
        stem: "Which event occurred immediately before the project opened to the public?",
        correct: "The team completed three practice sessions.",
        wrong: [["The project produced its final outcome.", "That occurred after the public opening."], ["Volunteers were recruited after the public opening.", "Recruitment occurred first."], ["The team closed the project permanently.", "No permanent closure is described."]],
        explanation: "The passage states that three practice sessions occurred just before the public opening.",
      },
      "cause and effect": {
        passage: `The original schedule for ${value.place}'s ${withoutArticle(project)} overlapped with most bus arrivals. Because few residents could participate, ${value.name} moved sessions thirty minutes later. Attendance then increased, and ${outcome}. ${background(sequence)}`,
        stem: "According to the passage, why did the schedule change?",
        correct: "The original time made participation difficult for many residents.",
        wrong: [["The project had already ended.", "The project continued after the change."], ["Bus service stopped permanently.", "The passage says sessions overlapped with arrivals, not that service stopped."], ["Organizers wanted attendance to decrease.", "Attendance increased, and the change responded to low participation."]],
        explanation: "The schedule changed because its overlap with bus arrivals limited participation.",
      },
      comparison: {
        passage: `${value.name} favored written instructions for ${project}, while ${value.secondName} preferred live demonstrations. A pilot in ${value.place} found that written steps helped participants review details, whereas demonstrations made it easier to ask immediate questions. ${background(sequence)}`,
        stem: "How does the passage distinguish the two approaches?",
        correct: "Written instructions support later review, while demonstrations support immediate questions.",
        wrong: [["Both approaches prevent participants from asking questions.", "The passage says demonstrations facilitate questions."], ["Written instructions are described as faster in every situation.", "No universal speed comparison is given."], ["Demonstrations provide a permanent written record.", "That benefit belongs more logically to written instructions and is not stated for demonstrations."]],
        explanation: "The final sentence explicitly assigns a different advantage to each approach.",
      },
    };
    const item = patterns[task.subskill];
    return mc(context, {
      ...item,
      hint: "Locate the sentence containing the relevant time, cause, or comparison signal.",
      reasoning: "Use sequence markers or contrast words to map the relationship.",
      principle: "Relationship questions depend on the passage's explicit order, cause, or comparison.",
    });
  }
  if (task.skill === "Inferences and Conclusions") {
    const passage = `Before ${value.place} offered ${project}, only ${22 + sequence % 12} residents attended related events each month. During the first three months of the project, monthly attendance averaged ${51 + sequence % 18}, and many participants returned more than once. Organizers kept the schedule unchanged during that period. ${background(sequence)}`;
    return mc(context, {
      passage,
      stem: task.subskill === "conclusion"
        ? "Which conclusion is best supported by the passage?"
        : "It can reasonably be inferred that",
      correct: `The new ${withoutArticle(project)} was associated with greater and repeated participation.`,
      wrong: [
        ["The schedule change caused attendance to rise.", "The schedule remained unchanged."],
        ["Every resident attended the project.", "The passage gives limited attendance counts, not universal participation."],
        ["The project reduced monthly attendance.", "The stated average rose after the project began."],
      ],
      hint: "Compare the before-and-after attendance and note whether participants returned.",
      explanation: "Attendance increased and repeat participation occurred after the project began.",
      reasoning: "The before-and-after values and repeat visits support a cautious association.",
      principle: "A valid inference stays within the evidence and avoids unsupported causation.",
    });
  }
  const passage = `${value.name} brought three supplies to the ${value.place} ${withoutArticle(project)}: a notebook, a measuring tape, and a camera. The notebook held written observations, the tape was used for scale, and the camera documented changes over time. ${background(sequence)}`;
  return mc(context, {
    passage,
    stem: task.subskill === "locate detail"
      ? "According to the passage, which item was used to show scale?"
      : "What role did the camera serve?",
    correct: task.subskill === "locate detail"
      ? "The measuring tape"
      : "It documented changes over time.",
    wrong: task.subskill === "locate detail"
      ? [["The notebook", "The notebook held observations."], ["The camera", "The camera documented changes rather than scale."], ["A compass", "No compass is mentioned."]]
      : [["It measured scale.", "The measuring tape served that role."], ["It stored written observations.", "The notebook stored the written observations."], ["It scheduled volunteer shifts.", "The passage does not mention scheduling."]],
    hint: "Match each named supply with the role assigned to it in the second sentence.",
    explanation: task.subskill === "locate detail"
      ? "The passage directly says the measuring tape was used for scale."
      : "The passage directly identifies documenting change as the camera's function.",
    reasoning: "Locate the object in the list, then confirm its function in the following clause.",
    principle: "Detail answers must match the passage exactly without exchanging the roles of nearby items.",
  });
}

function craftStructure(context) {
  const { sequence, task } = context;
  const value = scenario(sequence);
  const [project, action, outcome] = value.project;
  if (task.skill === "Text Structure") {
    const passage = `At first, ${value.place}'s ${withoutArticle(project)} had no permanent location. Next, ${value.name} arranged temporary sessions in three public buildings. After attendance grew, the town provided a dedicated room where participants could ${action}. The passage concludes by noting ${outcome}. ${background(sequence)}`;
    return mc(context, {
      passage,
      stem: task.subskill === "organization"
        ? "Which choice best describes the passage's organization?"
        : "What is the main function of the third sentence?",
      correct: task.subskill === "organization"
        ? "It traces the project from an initial limitation through a temporary solution to a lasting arrangement."
        : "It describes the more permanent response made after participation increased.",
      wrong: task.subskill === "organization"
        ? [["It compares two unrelated towns.", "Only one town and project are discussed."], ["It lists objections without presenting a response.", "The passage presents solutions and no list of objections."], ["It states a theory and then disproves it.", "No theory-testing structure appears."]]
        : [["It introduces the project's original lack of space.", "That occurs in the first sentence."], ["It gives instructions for joining the project.", "The sentence describes a town action, not participant instructions."], ["It argues that temporary spaces are always preferable.", "The move to a dedicated room suggests no such argument."]],
      hint: "Label each sentence as problem, temporary response, permanent response, or result.",
      explanation: "The passage moves chronologically from no location to temporary sites and then a dedicated room.",
      reasoning: "Track how the project's location changes across the sentences.",
      principle: "Structure describes how ideas develop; function describes what one part contributes.",
    });
  }
  if (task.skill === "Word Meaning and Word Choice") {
    const [word, definition, correct, wrongWords] = contextWords[sequence % contextWords.length];
    const passage = `In describing ${value.place}'s ${withoutArticle(project)}, the author uses “${word}” to mean “${definition}”: the surrounding sentences emphasize that participants could ${action} and that the effort led to ${outcome}. ${background(sequence)}`;
    const isConnotation = task.subskill === "connotation";
    const isFigurative = task.subskill === "figurative language";
    return mc(context, {
      passage,
      stem: isConnotation
        ? `Which choice best describes the connotation of “${word}” in context?`
        : isFigurative
          ? `Which choice best expresses the figurative meaning of “${word}”?`
          : `As used in the passage, “${word}” most nearly means`,
      correct: isConnotation ? `It suggests something ${definition} in a generally constructive way.` : correct,
      wrong: isConnotation
        ? [["It expresses intense anger toward the participants.", "The context is descriptive and constructive, not angry."], ["It makes the project seem impossible to understand.", "The definition and results make the idea understandable."], ["It dismisses the outcome as worthless.", "The passage presents a useful result."]]
        : wrongWords.map((choice) => [choice, `This meaning does not match the explicit contextual clue “${definition}.”`]),
      hint: "Substitute the stated contextual meaning and check the sentence.",
      explanation: isConnotation
        ? `The context gives “${word}” a constructive sense connected with ${definition}.`
        : `The passage uses “${word}” to mean ${definition}, making “${correct}” the closest choice.`,
      reasoning: "Use the definition and surrounding project result rather than an unrelated common meaning.",
      principle: "Context controls a word's intended meaning and connotation.",
    });
  }
  const passage = task.subskill === "narration"
    ? `I arrived early at ${value.place}'s ${withoutArticle(project)}, unsure whether I could ${action}. ${value.name} showed me the first step, and by noon I was helping another newcomer. ${background(sequence)}`
    : `${value.name} describes ${value.place}'s ${withoutArticle(project)} with cautious approval, praising the reported result—${outcome}—while noting that long-term funding is not yet guaranteed. ${background(sequence)}`;
  return mc(context, {
    passage,
    stem: task.subskill === "narration"
      ? "From which point of view is the passage narrated?"
      : task.subskill === "perspective"
        ? `Which choice best characterizes ${value.name}'s perspective?`
        : "What is the author's primary purpose?",
    correct: task.subskill === "narration"
      ? "First person, by a participant whose confidence grows"
      : task.subskill === "perspective"
        ? "Supportive of the result but aware of an unresolved concern"
        : "To present both a benefit of the project and a limitation affecting its future",
    wrong: [
      ["Entirely dismissive of the project", "The passage recognizes a benefit or growing confidence."],
      ["Unqualified certainty that the project will continue forever", "The passage includes uncertainty or a limited personal experience."],
      ["A technical explanation of how to construct the project", "The passage discusses experience or evaluation, not construction steps."],
    ],
    hint: "Notice pronouns and words that signal approval, uncertainty, or purpose.",
    explanation: task.subskill === "narration"
      ? "The first-person pronoun “I” identifies a participant narrator whose confidence grows through experience."
      : "The correct choice accounts for both the positive observation and the qualification in the passage.",
    reasoning: "Identify who speaks and separate the speaker's approval from the stated limitation.",
    principle: "Point of view concerns the narrator; perspective and purpose concern attitude and rhetorical aim.",
  });
}

function integration(context) {
  const { sequence, task } = context;
  const value = scenario(sequence);
  const [project, action, outcome] = value.project;
  if (task.skill === "Arguments") {
    const claim = `${value.place} should continue ${project} for another year.`;
    const passage = `${value.name} argues that ${claim} The program enabled residents to ${action}, and attendance increased each month. The current report, however, does not compare the program's cost with other projects. ${background(sequence)}`;
    if (task.subskill === "claims and evidence") {
      return mc(context, {
        passage,
        stem: "Which choice identifies the passage's central claim?",
        correct: claim,
        wrong: [["Attendance increased each month.", "This is evidence supporting the claim, not the claim itself."], ["The program offered an activity to residents.", "This summarizes a supporting detail rather than the recommendation."], ["Cost comparisons are always unnecessary.", "The passage notes the missing comparison rather than dismissing it."]],
        hint: "Find the statement the author wants the reader to accept.",
        explanation: "The recommendation to continue the project is the claim; participation and attendance are evidence.",
        reasoning: "Separate the recommendation from the facts offered in support.",
        principle: "A claim is the arguable conclusion; evidence supplies reasons to accept it.",
      });
    }
    if (task.subskill === "reasoning") {
      return mc(context, {
        passage,
        stem: "Which choice best describes a limitation in the argument's reasoning?",
        correct: "It does not consider whether the project's benefits justify its cost relative to alternatives.",
        wrong: [["It provides no evidence that residents participated.", "The passage mentions both participation and rising attendance."], ["It claims the project has already operated for a century.", "No such claim appears."], ["It proves that every alternative project would fail.", "The passage neither makes nor proves this claim."]],
        hint: "Focus on the concern introduced by “however.”",
        explanation: "The missing cost comparison limits the case for continuing the project.",
        reasoning: "Connect the final sentence's missing information to the recommendation.",
        principle: "Strong reasoning considers relevant costs, alternatives, and limitations.",
      });
    }
    return mc(context, {
      passage,
      stem: task.subskill === "strengthen or weaken"
        ? "Which finding would most strengthen the argument?"
        : "Which evidence most directly supports the claim?",
      correct: `An independent review found that the ${project} produced ${outcome} at a lower cost per participant than similar programs.`,
      wrong: [["The project logo uses three colors.", "Logo design does not address benefits or cost."], ["A nearby building was painted last year.", "This fact is unrelated to the project."], ["Some residents prefer a different font on the schedule.", "Font preference does not materially support continuation."]],
      hint: "Look for evidence addressing both the documented benefit and the missing cost comparison.",
      explanation: "The independent finding adds comparative cost evidence while confirming a benefit.",
      reasoning: "Identify the argument's gap, then choose evidence that fills it.",
      principle: "The strongest supporting evidence is relevant, specific, and responsive to the argument's weakness.",
    });
  }
  if (task.skill === "Multiple Texts") {
    const passage = `Passage A\n${value.name} supports expanding ${project} because it allows residents to ${action}, but recommends a six-month trial informed by ${records[(sequence * 11) % records.length]}.\n\nPassage B\n${value.secondName} also values opportunities to ${action} but argues that programs serving ${audiences[(sequence * 7) % audiences.length]} should be evaluated before expansion.`;
    return mc(context, {
      passage,
      type: "paired-passages",
      stem: task.subskill === "compare perspectives"
        ? "How do the authors' perspectives differ?"
        : "Which statement best synthesizes the two passages?",
      correct: task.subskill === "compare perspectives"
        ? "Passage A favors a trial expansion, while Passage B favors evaluating current programs first."
        : "Both value the activity, but they recommend different next steps before broader expansion.",
      wrong: [["Both demand immediate permanent expansion.", "Each author recommends an intermediate evaluative step."], ["Passage B opposes all opportunities to participate.", "Passage B explicitly values those opportunities."], ["The authors discuss unrelated projects.", "Both address the same project and activity."]],
      hint: "Separate what the authors value from the different action each recommends.",
      explanation: "The authors share a goal but differ on whether expansion or evaluation should come first.",
      reasoning: "Compare the verbs attached to each recommendation.",
      principle: "Multiple-text answers must represent each author's position accurately.",
    });
  }
  const oldValue = 38 + sequence % 17;
  const newValue = oldValue + 14 + sequence % 12;
  const passage = `A ${value.place} report compared participation in ${project} among ${audiences[(sequence * 7) % audiences.length]}.\n\nPeriod | Participants\nFirst month | ${oldValue}\nThird month | ${newValue}\n\nThe text notes that the schedule and location remained unchanged and that counts came from ${records[(sequence * 11) % records.length]}.`;
  return mc(context, {
    passage,
    type: "table",
    stem: task.subskill === "integrate table data"
      ? "Which statement accurately integrates the table with the text?"
      : "Which description best matches the trend shown by the data?",
    correct: `Participation increased from ${oldValue} to ${newValue} while the reported schedule and location stayed the same.`,
    wrong: [[`Participation fell by ${newValue - oldValue}.`, "The later value is higher, not lower."], ["The table proves that a schedule change caused the increase.", "The schedule did not change, and the table alone cannot prove causation."], [`Participation remained exactly ${oldValue}.`, "The third-month value differs from the first-month value."]],
    hint: "Compare the two numerical values and then incorporate only the stated unchanged conditions.",
    explanation: `The table shows an increase of ${newValue - oldValue}, and the text says schedule and location were unchanged.`,
    reasoning: "Read the direction of change and avoid adding a causal claim.",
    principle: "Integrate visual data by reporting exact trends and relevant textual qualifications.",
  });
}

function generate(context) {
  if (context.task.domain === "Key Ideas and Details") return keyIdeas(context);
  if (context.task.domain === "Craft and Structure") return craftStructure(context);
  return integration(context);
}

const completed = generateSection("act-reading", generate, {
  generatorName: "act-reading-generator-v1",
  regenerateGenerated: process.argv.includes("--rebuild"),
});
console.log(
  `ACT Reading: kept ${completed.existing}, generated ${completed.generated}, total ${completed.total}.`,
);
