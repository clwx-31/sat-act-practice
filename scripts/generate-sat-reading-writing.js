#!/usr/bin/env node
"use strict";

const { generateSection } = require("./lib/generation");

// Place names are composed from two coprime banks (25 x 23 = 575 unique
// combinations) so that every sequence 1..575 yields a distinct place. Because a
// place name appears in every passage, this guarantees the generated items never
// collapse to a structural or exact duplicate as the per-section target grows.
const placeFirsts = [
  "Alder", "Briar", "Cedar", "Dunlin", "Elm", "Fox", "Granite", "Hazel",
  "Indigo", "Juniper", "Kestrel", "Linden", "Maple", "Northwind", "Oak",
  "Pine", "Quartz", "River", "Silver", "Tamarack", "Umber", "Valley",
  "Willow", "Yarrow", "Zephyr",
];

const placeSeconds = [
  "Harbor", "Glen", "Point", "Bay", "Crossing", "Hollow", "Falls", "Ridge",
  "Lake", "Mesa", "Cove", "Park", "Quay", "Terrace", "Haven", "Hill", "Bend",
  "Marsh", "Field", "Forge", "Beach", "Creek", "Plain",
];

function composePlace(sequence) {
  return `${placeFirsts[sequence % placeFirsts.length]} ${placeSeconds[sequence % placeSeconds.length]}`;
}

const projects = [
  ["a seed library", "borrow locally adapted seeds", "returned seeds from successful plants"],
  ["a tool-sharing cabinet", "borrow repair tools", "donated equipment and maintenance lessons"],
  ["a rain-garden network", "capture storm runoff", "fewer puddles after heavy rain"],
  ["a neighborhood archive", "preserve oral histories", "recorded interviews and digitized photographs"],
  ["a mobile art studio", "join free workshops", "murals designed by young residents"],
  ["a bicycle repair stand", "make basic repairs", "shorter waits and more confident riders"],
  ["a native-plant nursery", "choose hardy seedlings", "more habitat in household gardens"],
  ["a shared rehearsal room", "practice after school", "new ensembles and public performances"],
  ["a food-scrap exchange", "deliver compostable waste", "finished compost for local gardens"],
  ["a shoreline cleanup team", "remove litter safely", "monthly surveys of collected materials"],
  ["a community map", "mark accessible routes", "clearer trip planning for residents"],
  ["a lending library of games", "borrow tabletop games", "weekly intergenerational game nights"],
  ["a creek-monitoring club", "test local water samples", "a public record of seasonal changes"],
  ["a repair café", "learn simple mending skills", "fewer household items discarded"],
  ["a pop-up produce market", "buy from nearby growers", "fresh food within walking distance"],
  ["a language exchange", "practice conversation", "new friendships among participants"],
  ["a cooling-center guide", "locate shaded public spaces", "updated maps during hot weather"],
  ["a student news desk", "report neighborhood events", "a monthly digital bulletin"],
  ["a pollinator corridor", "plant connected flower beds", "more continuous habitat"],
  ["a free concert series", "hear local performers", "larger audiences in the town square"],
  ["a solar-charging bench", "power small devices outdoors", "steadier access during outages"],
];

const researchers = [
  "Amina Cole", "Ben Ito", "Celia Ramos", "Dev Malik", "Elise Park",
  "Farah Stone", "Gavin Reed", "Hana Bell", "Ivo Santos", "Jada Price",
  "Kai Monroe", "Lina Shah", "Marek Young", "Nora Flynn", "Owen Brooks",
  "Priya Lake", "Quinn Bailey", "Rosa Chen", "Samir Webb", "Talia Green",
];

const species = [
  "shore crabs", "meadow moths", "desert ants", "tree frogs", "marsh snails",
  "orchard bees", "reef fish", "forest beetles", "grassland sparrows", "pond turtles",
  "alpine flowers", "coastal grasses", "mangrove seedlings", "prairie clover", "lichen patches",
];

const vocabulary = [
  ["tentative", "not yet certain", "preliminary", "decisive", "careless", "ordinary"],
  ["bolster", "make stronger", "support", "question", "replace", "conceal"],
  ["novel", "new and unusual", "innovative", "familiar", "minor", "temporary"],
  ["sparse", "thinly scattered", "limited", "crowded", "colorful", "orderly"],
  ["sustain", "keep going", "maintain", "measure", "announce", "shorten"],
  ["marked", "clearly noticeable", "pronounced", "accidental", "hidden", "gradual"],
  ["concede", "admit as true", "acknowledge", "deny", "predict", "repeat"],
  ["refine", "improve through small changes", "polish", "abandon", "copy", "display"],
  ["robust", "strong and dependable", "resilient", "delicate", "brief", "decorative"],
  ["offset", "counterbalance", "compensate for", "document", "cause", "separate"],
  ["ambiguous", "open to more than one meaning", "unclear", "accurate", "lively", "complete"],
  ["readily", "without much difficulty", "easily", "reluctantly", "rarely", "privately"],
  ["retain", "continue to have", "keep", "exchange", "discover", "divide"],
  ["subtle", "not immediately obvious", "slight", "dramatic", "careless", "public"],
  ["verify", "check for accuracy", "confirm", "estimate", "illustrate", "challenge"],
  ["diminish", "become smaller", "decrease", "combine", "emerge", "stabilize"],
  ["coherent", "logically connected", "consistent", "lengthy", "unusual", "unfinished"],
  ["plausible", "seemingly reasonable", "credible", "certain", "popular", "complex"],
  ["prompt", "cause to happen", "trigger", "delay", "observe", "describe"],
  ["allocate", "set aside for a purpose", "assign", "borrow", "count", "protect"],
  ["comprehensive", "covering all major parts", "thorough", "brief", "neutral", "repeated"],
  ["undermine", "weaken", "erode", "summarize", "approve", "locate"],
  ["distinct", "clearly different", "separate", "similar", "distant", "valuable"],
  ["conventional", "based on usual practice", "traditional", "experimental", "efficient", "private"],
  ["negligible", "too small to matter", "insignificant", "harmful", "steady", "unexpected"],
  ["facilitate", "make easier", "enable", "prevent", "record", "imitate"],
  ["persistent", "continuing despite difficulty", "enduring", "occasional", "gentle", "uncertain"],
  ["validate", "show to be sound", "substantiate", "revise", "introduce", "simplify"],
  ["discrete", "separate and distinct", "individual", "continuous", "visible", "equal"],
  ["innovative", "using a new approach", "original", "costly", "traditional", "precise"],
  ["constrain", "limit", "restrict", "encourage", "calculate", "connect"],
  ["compatible", "able to work together", "consistent", "valuable", "identical", "portable"],
];

const precisionContexts = [
  ["the change appeared in every trial but remained small", "modest", ["invisible", "enormous", "accidental"]],
  ["the schedule could be changed as new evidence arrived", "flexible", ["rigid", "secret", "ancient"]],
  ["the instructions included every step without unnecessary detail", "concise", ["vague", "lengthy", "decorative"]],
  ["the two measurements differed by less than the instrument's margin of error", "negligible", ["dramatic", "exact", "harmful"]],
  ["the material returned to its original shape after repeated bending", "resilient", ["fragile", "ornamental", "temporary"]],
  ["the committee had not yet made a final decision", "provisional", ["permanent", "unrelated", "unanimous"]],
  ["the explanation connected every result to the proposed mechanism", "coherent", ["random", "brief", "popular"]],
  ["the new procedure could be performed with the equipment already available", "practical", ["theoretical", "costly", "ceremonial"]],
  ["the pattern was easy to notice in each data set", "pronounced", ["subtle", "uncertain", "ordinary"]],
  ["the estimate included all major sources of cost", "comprehensive", ["partial", "casual", "early"]],
  ["the material allowed light through but blurred fine details", "translucent", ["opaque", "reflective", "colorless"]],
  ["the conclusion followed directly from repeated measurements", "well-supported", ["speculative", "unrelated", "premature"]],
  ["the two devices could exchange data without an adapter", "compatible", ["identical", "portable", "fragile"]],
  ["the adjustment affected one narrow part of the process", "targeted", ["random", "complete", "temporary"]],
  ["the response continued for several days after the treatment ended", "persistent", ["instantaneous", "minor", "predictable"]],
  ["the team could reproduce the result under the same conditions", "reliable", ["novel", "complex", "accidental"]],
];

const vocabularyClauses = {
  tentative: "described its conclusion as tentative because another trial could still change it",
  bolster: "said that another successful trial would bolster the proposal by making the evidence stronger",
  novel: "called the approach novel because no local program had used it before",
  sparse: "described attendance as sparse after only a few residents arrived",
  sustain: "asked whether volunteers could sustain the weekly schedule throughout the year",
  marked: "reported a marked increase that was large enough to notice immediately",
  concede: "had to concede that the opposing estimate was accurate after checking the records",
  refine: "used feedback to refine the instructions through several small improvements",
  robust: "called the method robust after it produced dependable results under varied conditions",
  offset: "added weekend hours to offset the access lost during a weekday closure",
  ambiguous: "revised an ambiguous sign that readers had interpreted in two different ways",
  readily: "noted that visitors could readily locate the entrance without asking for help",
  retain: "changed the schedule but chose to retain the popular evening session",
  subtle: "documented a subtle color shift that was difficult to notice at first",
  verify: "repeated the count to verify that the recorded total was accurate",
  diminish: "watched the waiting line diminish as more service windows opened",
  coherent: "praised the coherent proposal because every recommendation followed logically from the evidence",
  plausible: "called the explanation plausible because it was reasonable even though not yet proven",
  prompt: "found that a reminder could prompt more residents to return borrowed tools",
  allocate: "voted to allocate part of the budget specifically for equipment repairs",
  comprehensive: "created a comprehensive guide covering every major stage of the process",
  undermine: "warned that missing records could undermine confidence in the conclusion",
  distinct: "sorted the observations into three distinct groups with clearly different features",
  conventional: "compared the experimental design with a conventional one based on standard practice",
  negligible: "treated the tiny timing difference as negligible because it could not affect the result",
  facilitate: "added clear labels to facilitate navigation and make finding rooms easier",
  persistent: "investigated a persistent error that continued after several attempted fixes",
  validate: "ran an independent trial to validate the original finding and show it was sound",
  discrete: "divided the work into discrete stages that could be completed separately",
  innovative: "praised an innovative design that solved the problem in a new way",
  constrain: "noted that a narrow doorway would constrain the size of equipment brought inside",
  compatible: "confirmed that the two file formats were compatible and could work together",
};

const names = [
  "Amara", "Bennett", "Camila", "Darius", "Emi", "Felix", "Greta", "Hector",
  "Imani", "Jonah", "Keira", "Luis", "Mei", "Noah", "Olive", "Pavel",
  "Rina", "Soren", "Tess", "Uma", "Vik", "Willa", "Xiomara", "Yusuf", "Zara",
];

// Coprime-length banks (17 and 13) used to vary the two structures in
// rhetorical-synthesis notes so the passages remain distinct at higher volume.
const builtForms = [
  "pavilion", "canopy", "boardwalk", "footbridge", "overlook", "gateway",
  "trellis", "band shell", "study nook", "observation deck", "kiosk",
  "shelter", "colonnade", "viewing platform", "reading porch", "garden arch",
  "sun shade",
];

const materials = [
  "overlapping wooden slats", "woven bamboo panels", "perforated steel sheets",
  "recycled timber beams", "interlocking clay tiles", "stretched canvas sails",
  "laminated glass fins", "cast-concrete ribs", "brushed aluminum louvers",
  "reclaimed brick arches", "carved limestone blocks", "folded copper plates",
  "tensioned cable netting",
];

// Program descriptors (coprime lengths 19 and 17) give short passages two
// strongly varying tokens so they do not collide as volume grows.
const programAdjs = [
  "riverside", "downtown", "hillside", "lakefront", "westside", "eastgate",
  "old-town", "midtown", "uptown", "northshore", "southbank", "parkview",
  "gateway", "seaside", "meadow", "orchard", "foothill", "canalside", "bayfront",
];

const programNouns = [
  "revitalization", "stewardship", "access", "resilience", "literacy",
  "wellness", "heritage", "mobility", "greening", "recovery", "outreach",
  "renewal", "exchange", "cooperative", "commons", "collective", "alliance",
];

function composeProgram(sequence) {
  return `${programAdjs[sequence % programAdjs.length]} ${programNouns[sequence % programNouns.length]}`;
}

function common({
  stem,
  correct,
  distractors,
  hint,
  explanation,
  steps,
  strategy,
  trap,
  principles,
  stimulus = null,
  format = "passage",
  seconds = 70,
  tags = [],
}) {
  return {
    stem,
    correct,
    distractors,
    hint,
    explanation,
    solutionSteps: steps,
    strategy,
    trap,
    principles,
    stimulus,
    format,
    estimatedSeconds: seconds,
    tags,
  };
}

function scenario(sequence) {
  const project = projects[(sequence + Math.floor(sequence / projects.length)) % projects.length];
  return {
    place: composePlace(sequence),
    name: names[(sequence + Math.floor(sequence / names.length)) % names.length],
    researcher: researchers[
      (sequence + Math.floor(sequence / researchers.length)) % researchers.length
    ],
    species: species[(sequence + Math.floor(sequence / species.length)) % species.length],
    project,
  };
}

function centralIdea({ sequence, task }) {
  const value = scenario(sequence);
  const [project, action, result] = value.project;
  const variants = [
    `Residents of ${value.place} once had few ways to ${action}. Volunteers then created ${project}. The project now allows neighbors to ${action} and has led to ${result}.`,
    `When ${value.place} opened ${project}, organizers expected modest interest. Instead, residents quickly began to ${action}. Within a season, the project had also produced ${result}.`,
    `${value.name} helped launch ${project} in ${value.place}. What began as a one-day experiment became a regular program where residents ${action}; participants also report ${result}.`,
    `An unused corner of ${value.place} was converted into ${project}. By making it possible to ${action}, the change encouraged participation and eventually resulted in ${result}.`,
  ];
  const passage = variants[sequence % variants.length];
  const isDetail = task.subskill === "supporting detail";
  const correct = isDetail
    ? `The project enabled residents to ${action}.`
    : `${value.place}'s ${project} expanded access to an activity and produced an additional community benefit.`;
  const stem = isDetail
    ? "Which choice states a detail from the text?"
    : "Which choice best states the main idea of the text?";
  return common({
    stimulus: { type: "passage", content: passage },
    stem,
    correct,
    distractors: [
      {
        text: `${value.place} ended the project after a one-day trial.`,
        reason: "The text says the project became or remains active, not that it ended.",
      },
      {
        text: `Only trained professionals were allowed to use ${project}.`,
        reason: "The passage describes resident participation and never limits access to professionals.",
      },
      {
        text: `${result} was the project's only stated goal.`,
        reason: "The result is an outcome, while the project also gives residents a way to participate.",
      },
    ],
    hint: isDetail
      ? "Return to the sentence describing what residents do."
      : "Look for a choice broad enough to cover both access and the added result.",
    explanation: isDetail
      ? `The text directly states that residents can ${action}.`
      : `The passage centers on how ${project} lets residents ${action} and also leads to ${result}.`,
    steps: [
      "Identify the project introduced in the passage.",
      "Note both what residents can do and the additional result.",
      "Choose the option that matches the requested detail or includes both central points without adding a claim.",
    ],
    strategy: "Summarize each sentence in a few words, then combine only the recurring ideas.",
    trap: "A choice may repeat a vivid detail but distort its role or make it the entire main idea.",
    principles: ["A main idea must cover the passage as a whole; a detail must be explicitly stated."],
  });
}

function inference({ sequence, task }) {
  const value = scenario(sequence);
  const before = 18 + (sequence % 9);
  const after = before + 9 + (sequence % 7);
  const condition = [
    "after shallow water collected among the plots",
    "when the lamps emitted a warmer color",
    "after the wind dropped below five kilometers per hour",
    "when fresh leaves appeared on nearby plants",
    "after volunteers added a shaded resting platform",
  ][sequence % 5];
  const passage = `Near ${value.place}, beside ${value.project[0]}, ${value.researcher} usually recorded about ${before} ${value.species} during each survey. On three surveys ${condition}, the count rose to an average of ${after}. Surveys without that condition remained near ${before}.`;
  const textCompletion = task.subskill === "text completion";
  return common({
    stimulus: { type: "passage", content: passage },
    stem: textCompletion
      ? "Which choice most logically completes the researcher's conclusion?"
      : "Which conclusion is best supported by the text?",
    correct: `The stated condition may influence how many ${value.species} are observed.`,
    distractors: [
      {
        text: `The condition permanently doubled the population of ${value.species}.`,
        reason: "The observation counts rose temporarily and did not double; population size was not measured.",
      },
      {
        text: `${value.species} can be observed only under the stated condition.`,
        reason: `The researcher observed about ${before} even without the condition.`,
      },
      {
        text: `The survey method caused the stated condition to occur.`,
        reason: "The passage reports an association and gives no evidence that surveying caused the condition.",
      },
    ],
    hint: "Prefer a cautious conclusion that reflects the observed association without claiming causation.",
    explanation: `Counts were consistently higher ${condition}, so the condition may affect observations; the data do not establish a permanent change or a cause.`,
    steps: [
      `Compare the usual count of ${before} with the conditional average of ${after}.`,
      "Notice that the count changes alongside one condition.",
      "Select the qualified conclusion and reject absolute or causal claims.",
    ],
    strategy: "Match the strength of the conclusion to the strength of the evidence.",
    trap: "Words such as “always,” “only,” and “caused” make a choice stronger than correlational evidence permits.",
    principles: ["An observed association supports a cautious inference, not automatic causation."],
  });
}

function commandOfEvidence({ sequence, task }) {
  const value = scenario(sequence);
  const [project, action, result] = value.project;
  const projectName = project.replace(/^a /, "");
  const baseline = 40 + (sequence % 21);
  const improved = baseline + 12 + (sequence % 10);
  const quantitative = task.subskill === "quantitative evidence";
  const claim = quantitative
    ? `${value.place}'s revised workshop format increased completion rates.`
    : `The ${projectName} in ${value.place} makes it easier for residents to ${action}.`;
  const passage = quantitative
    ? `A coordinator compared completion rates before and after ${value.place} revised a workshop.`
    : `A student is evaluating the claim that ${claim.toLowerCase()} Organizers also noted ${result}.`;
  const content = quantitative
    ? `${passage}\n\nFormat | Completion rate\nOriginal format | ${baseline}%\nRevised format | ${improved}%`
    : passage;
  const correct = quantitative
    ? `The completion rate rose from ${baseline}% in the original format to ${improved}% in the revised format.`
    : `In a resident survey, ${78 + sequence % 13}% of users said the ${projectName} enabled them to ${action} when they could not do so beforehand.`;
  return common({
    stimulus: { type: quantitative ? "table" : "passage", content },
    stem: quantitative
      ? `Which choice most effectively uses the table to support the claim that ${claim.toLowerCase()}`
      : "Which finding, if true, would most directly support the claim?",
    correct,
    distractors: [
      {
        text: quantitative
          ? `The original workshop had a completion rate of ${baseline}%.`
          : `Residents also reported ${result}.`,
        reason: "This gives only one value or an unrelated observation, so it does not establish the claimed improvement.",
      },
      {
        text: quantitative
          ? `The revised format lasted the same number of minutes as the original.`
          : `The ${projectName} uses a sign painted in ${value.place}'s official colors.`,
        reason: "This information does not compare the outcome named in the claim.",
      },
      {
        text: quantitative
          ? `Both formats had completion rates below 100%.`
          : `Organizers discussed offering the program on an additional weekday.`,
        reason: "This may be true but does not directly connect the tested condition with greater accuracy.",
      },
    ],
    hint: "Look for evidence that directly compares the relevant condition and outcome.",
    explanation: `The correct choice provides a direct comparison showing the outcome improved under the condition named in the claim.`,
    steps: [
      "Underline the claim's cause or condition and its measured outcome.",
      "Find the option containing both elements and a meaningful comparison.",
      "Reject facts that mention the study but not the claimed relationship.",
    ],
    strategy: "Translate the claim into “condition → outcome,” then find evidence with the same two-part structure.",
    trap: "A true statement about the study can still be irrelevant to the specific claim.",
    principles: ["Strong command-of-evidence answers directly address every part of the claim."],
    format: quantitative ? "table" : "evidence",
  });
}

function wordsInContext({ sequence, task }) {
  const [word, definition, correct, ...wrong] = vocabulary[sequence % vocabulary.length];
  const value = scenario(sequence);
  const precision = task.subskill === "precision";
  const precisionItem = precisionContexts[Math.floor(sequence / 6) % precisionContexts.length];
  const passage = precision
    ? `While evaluating ${value.project[0]} in ${value.place}, ${value.researcher} noted that ${precisionItem[0]}. The researcher therefore described it as ______.`
    : `A report on ${value.project[0]} in ${value.place} ${vocabularyClauses[word]}.`;
  const precisionCorrect = precisionItem[1];
  return common({
    stimulus: { type: "passage", content: passage },
    stem: precision
      ? "Which choice completes the text with the most logical and precise word?"
      : `As used in the text, “${word}” most nearly means`,
    correct: precision ? precisionCorrect : correct,
    distractors: precision
      ? [
          { text: precisionItem[2][0], reason: `“${precisionItem[2][0]}” contradicts or fails to capture the stated qualities.` },
          { text: precisionItem[2][1], reason: `“${precisionItem[2][1]}” describes a different feature from the one emphasized.` },
          { text: precisionItem[2][2], reason: `“${precisionItem[2][2]}” is not supported by the contextual clues.` },
        ]
      : wrong.map((choice) => ({
          text: choice,
          reason: `“${choice}” does not match the contextual meaning “${definition}.”`,
        })),
    hint: "Replace the tested word with each option and check the logic of the surrounding clause.",
    explanation: precision
      ? `“${precisionCorrect}” most precisely captures the description that ${precisionItem[0]}.`
      : `In context, “${word}” means ${definition}, so “${correct}” is the closest match.`,
    steps: [
      "Read the sentence without the tested word.",
      "Use the surrounding contrast or cause to predict a meaning.",
      "Choose the option matching that prediction in both meaning and tone.",
    ],
    strategy: "Predict a simple synonym before reading the choices.",
    trap: "A familiar dictionary meaning may not fit the specific sentence.",
    principles: ["Context determines which sense and connotation of a word is intended."],
    format: "passage",
  });
}

function textPurpose({ sequence, task }) {
  const value = scenario(sequence);
  const functionQuestion = task.subskill === "function of a sentence";
  const [project, action, result] = value.project;
  const changes = [
    "simplified the instructions and rearranged the shared equipment",
    "added illustrated signs and moved supplies closer to the entrance",
    "divided the process into shorter stages and trained peer guides",
    "introduced advance reservations and a clearly marked help desk",
    "tested color-coded labels and a shorter orientation",
    "created portable supply kits and posted a step-by-step map",
    "expanded evening access and replaced technical terms with plain language",
    "paired new participants with experienced volunteers and reduced paperwork",
  ];
  const audiences = [
    "first-time participants", "after-school groups", "weekend visitors",
    "older residents", "new volunteers", "multilingual families",
    "commuters", "local shop owners", "student clubs", "neighborhood artists",
    "caregivers with young children", "public-library patrons", "recreation teams",
    "community gardeners", "museum visitors",
  ];
  const change = changes[sequence % changes.length];
  const audience = audiences[(sequence * 7) % audiences.length];
  const passage = `${value.researcher} and other designers in ${value.place} tested a new system related to ${project} during a pilot for ${audience}. Early trials made it difficult for residents to ${action}. The team then ${change}. In later trials, participation rose by ${20 + sequence % 31}%, and organizers reported ${result}.`;
  return common({
    stimulus: { type: "passage", content: passage },
    stem: functionQuestion
      ? "What is the main function of the third sentence in the text as a whole?"
      : "Which choice best describes the overall purpose of the text?",
    correct: functionQuestion
      ? "It identifies the design change made in response to an initial weakness."
      : `To describe how changes to ${project} improved participation and results`,
    distractors: [
      {
        text: functionQuestion
          ? `It argues that every town should adopt ${project}.`
          : `To argue that every town should create ${project} immediately`,
        reason: "The text reports one test and does not make a universal recommendation or comparison.",
      },
      {
        text: functionQuestion
          ? "It gives the numerical result of the later participation test."
          : `To list every piece of equipment used for ${project}`,
        reason: "The numerical result appears in the final sentence, and the passage does not list every manufacturing stage.",
      },
      {
        text: functionQuestion
          ? "It introduces a problem that the engineers never addressed."
          : "To explain why the early trials were more successful than the later trials",
        reason: "The design change addresses the bending problem, and the revised panels performed better.",
      },
    ],
    hint: "Track the sequence: initial design, problem, change, result.",
    explanation: functionQuestion
      ? "The third sentence presents the team's response to the weakness identified immediately before it."
      : "The text traces a design problem, a modification, and improved test performance.",
    steps: [
      "Label each sentence's role in the sequence.",
      "Connect the tested sentence to the problem before it and result after it.",
      "Choose the answer that describes that relationship without overgeneralizing.",
    ],
    strategy: "Reduce the passage to a structure such as problem → change → result.",
    trap: "Do not confuse a sentence's topic with its function in the whole passage.",
    principles: ["Text-structure questions ask what a part accomplishes, not merely what it mentions."],
  });
}

function crossText({ sequence }) {
  const value = scenario(sequence);
  const [project, action] = value.project;
  const topic = `expanding ${project} so more residents can ${action}`;
  const secondAuthor = researchers[(sequence * 7 + 3) % researchers.length];
  const passage = `Text 1\nResearcher ${value.researcher} argues that ${topic} in ${value.place} would broaden access, provided organizers collect feedback after a trial period and monitor ${value.project[2]}.\n\nText 2\nPlanner ${secondAuthor} supports a limited ${value.place} test of ${topic}, with attendance records and participant interviews reviewed before any permanent decision.`;
  return common({
    stimulus: { type: "paired-passages", content: passage },
    stem: "Based on the texts, both authors would most likely agree with which statement?",
    correct: "The proposal should be tried and evaluated before a permanent decision is made.",
    distractors: [
      {
        text: "The proposal should be adopted permanently without collecting evidence.",
        reason: "Both authors explicitly favor a trial or evaluation before a permanent decision.",
      },
      {
        text: "The proposal would reduce access for nearly everyone.",
        reason: "Text 1 expects broader access, and Text 2 does not claim widespread harm.",
      },
      {
        text: "Public feedback has no useful role in evaluating the proposal.",
        reason: "Text 1 explicitly calls for feedback, while Text 2 supports evaluation rather than dismissing evidence.",
      },
    ],
    hint: "Find the overlap between “trial period” in Text 1 and “limited basis” in Text 2.",
    explanation: "Both authors support a temporary test followed by evaluation before any permanent adoption.",
    steps: [
      "Summarize each author's position separately.",
      "Identify the shared element: a limited test before permanence.",
      "Reject choices that contradict either author.",
    ],
    strategy: "Write a short phrase for each text, then look for their intersection.",
    trap: "A choice supported by only one text cannot be the answer to an agreement question.",
    principles: ["Cross-text answers must be compatible with both authors' stated positions."],
    format: "paired-passages",
  });
}

function rhetoricalSynthesis({ sequence, task }) {
  const value = scenario(sequence);
  const yearA = 2008 + (sequence % 8);
  const yearB = yearA + 5 + (sequence % 4);
  // Built form (17), material (13), and a second composed place/designer add
  // several independently varying tokens so notes stay distinct at scale.
  const formA = builtForms[sequence % builtForms.length];
  const formB = builtForms[(sequence + 8) % builtForms.length];
  const material = materials[sequence % materials.length];
  const placeB = composePlace(sequence + 311);
  const designerB = researchers[(sequence * 7 + 3) % researchers.length];
  const structureA = `${value.place} ${formA}`;
  const structureB = `${placeB} ${formB}`;
  const goal = task.subskill === "student notes"
    ? "introduce the later project and identify who designed it"
    : "emphasize a similarity between the two projects";
  const notes = [
    `${value.name} designed the ${structureA} in ${yearA}.`,
    `The ${formA} uses ${material}.`,
    `${designerB} designed the ${structureB} in ${yearB}.`,
    `The ${formB} also uses ${material}.`,
  ];
  const correct = task.subskill === "student notes"
    ? `Designed by ${designerB}, the ${structureB} was completed in ${yearB}.`
    : `Both the ${structureA} and the ${structureB} use ${material}.`;
  return common({
    stimulus: { type: "notes", content: notes.map((note) => `• ${note}`).join("\n") },
    stem: `The student wants to ${goal}. Which choice most effectively uses relevant information from the notes to accomplish this goal?`,
    correct,
    distractors: [
      {
        text: `${value.name} designed the ${structureA} in ${yearA}.`,
        reason: "This mentions only the earlier project and does not accomplish the stated goal.",
      },
      {
        text: `The ${structureB} was completed after the ${structureA}.`,
        reason: "The date relationship is accurate but does not provide the requested designer or material similarity.",
      },
      {
        text: `${material.charAt(0).toUpperCase()}${material.slice(1)} can be used in outdoor structures.`,
        reason: "This generalizes beyond the notes and omits the specific projects required by the goal.",
      },
    ],
    hint: "Use only the notes that directly serve the stated rhetorical goal.",
    explanation: "The correct choice selects the exact details needed for the goal without adding irrelevant information.",
    steps: [
      "Underline the requested goal.",
      "Mark which notes supply the required facts.",
      "Choose the concise option that uses those facts accurately.",
    ],
    strategy: "Treat the goal as a checklist; an answer must satisfy every part and no unrelated purpose.",
    trap: "A factually accurate choice may still fail the requested rhetorical goal.",
    principles: ["Rhetorical synthesis requires relevant, accurate, and goal-directed use of notes."],
    format: "notes",
  });
}

function transitions({ sequence, task }) {
  const value = scenario(sequence);
  const [project, action, result] = value.project;
  const relation = sequence % 4;
  const examples = [
    {
      text: `The first version of ${project} made it difficult to ${action}. ______, organizers revised the instructions before the next session in ${value.place}.`,
      correct: "Consequently",
      wrong: ["Similarly", "For example", "Nevertheless"],
      reason: "The reinforcement is a result of the leak.",
      principle: "cause and effect",
    },
    {
      text: `Most ${value.place} participants preferred using ${project} in the morning. ______, several residents could ${action} only in the evening.`,
      correct: "However",
      wrong: ["Therefore", "For instance", "Likewise"],
      reason: "The second sentence contrasts with the majority preference.",
      principle: "contrast",
    },
    {
      text: `The ${project} has produced several benefits in ${value.place}. ______, organizers have documented ${result}.`,
      correct: "For example",
      wrong: ["Instead", "Consequently", "Meanwhile"],
      reason: "The ferry schedules illustrate the general claim.",
      principle: "example",
    },
    {
      text: `The ${project} allows residents to ${action}. ______, it has led to ${result}.`,
      correct: "In addition",
      wrong: ["In contrast", "As a result", "Specifically"],
      reason: "The second sentence adds another related benefit.",
      principle: "addition",
    },
  ];
  const item = examples[relation];
  const lead = `As part of ${value.place}'s ${composeProgram(sequence)} initiative, `;
  const content = `${lead}${item.text.charAt(0).toLowerCase()}${item.text.slice(1)}`;
  return common({
    stimulus: { type: "passage", content },
    stem: "Which choice completes the text with the most logical transition?",
    correct: item.correct,
    distractors: item.wrong.map((choice) => ({
      text: choice,
      reason: `“${choice}” signals a relationship other than the required ${item.principle} relationship.`,
    })),
    hint: "Describe the logical relationship between the sentences before selecting a transition.",
    explanation: `${item.correct} is correct because ${item.reason.toLowerCase()}`,
    steps: [
      "Read the sentences without a transition.",
      `Identify the relationship as ${item.principle}.`,
      `Select “${item.correct},” which explicitly signals that relationship.`,
    ],
    strategy: "Name the relationship—contrast, result, example, or addition—before checking the options.",
    trap: "Transitions are not interchangeable merely because they sound formal.",
    principles: [`A transition must express the exact ${item.principle} relationship between ideas.`],
    format: "passage",
  });
}

function boundaries({ sequence, task }) {
  const value = scenario(sequence);
  const [project, action, result] = value.project;
  const variants = [
    {
      stem: `The ${value.place} center opened ${project} at noon ______ residents immediately began to ${action}.`,
      correct: ";",
      wrong: [",", "", ": and"],
      explanation: "Both sides are independent clauses, so a semicolon can join them.",
      principle: "Join related independent clauses with a semicolon or a comma plus a coordinating conjunction.",
    },
    {
      stem: `The ${value.place} workshop for ${project} requires three tools ______ a ruler, a pencil, and a craft knife.`,
      correct: ":",
      wrong: [",", ";", "— and"],
      explanation: "A complete clause introduces a list, so a colon is appropriate.",
      principle: "Use a colon after a complete clause to introduce a list or explanation.",
    },
    {
      stem: `While documenting ${result} in ${value.place}, ${value.name} revised the guide to ${project} twice ______ and then asked a classmate to check how clearly it explained how to ${action}.`,
      correct: ",",
      wrong: [";", ":", ""],
      explanation: "A comma before “and” correctly joins two independent clauses.",
      principle: "Use a comma before a coordinating conjunction joining independent clauses.",
    },
    {
      stem: `After documenting ${result} in ${value.place} ______ the students compared their records of ${project}.`,
      correct: ",",
      wrong: [";", ":", ""],
      explanation: "A comma separates the introductory dependent phrase from the main clause.",
      principle: "Place a comma after an introductory dependent phrase or clause.",
    },
  ];
  const item = variants[sequence % variants.length];
  return common({
    stimulus: { type: "sentence", content: item.stem },
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    correct: item.correct || "NO PUNCTUATION",
    distractors: item.wrong.map((choice) => ({
      text: choice || "NO PUNCTUATION",
      reason: `This punctuation does not create the sentence boundary required by the clause structure.`,
    })),
    hint: "Identify whether the words on each side of the blank form independent clauses.",
    explanation: item.explanation,
    steps: [
      "Locate the verbs and subjects around the blank.",
      "Determine the clause relationship.",
      "Apply the punctuation rule that matches that structure.",
    ],
    strategy: "Classify the clauses before judging punctuation by sound.",
    trap: "A pause in speech does not by itself justify a comma.",
    principles: [item.principle],
    format: "sentence",
  });
}

function formStructureSense({ sequence, task }) {
  const value = scenario(sequence);
  const name = value.name;
  const templates = {
    "subject-verb agreement": {
      content: `At the ${value.place} archive, a set of detailed sketches from ${name}'s field notebook ______ beside records of ${value.project[0]}.`,
      correct: "is preserved",
      wrong: ["are preserved", "preserve", "have preserved"],
      rule: "The singular head noun “set” requires a singular verb.",
    },
    "pronoun agreement": {
      content: `When the two designers presented models for ${value.project[0]} in ${value.place}, ______ explained a different feature.`,
      correct: "each",
      wrong: ["it", "he or she was", "them"],
      rule: "“Each” clearly refers to the designers individually and functions as the sentence's subject.",
    },
    "verb form": {
      content: `By the time the doors opened for the ${value.place} benefit supporting ${value.project[0]}, the musicians ______ their final sound check.`,
      correct: "had completed",
      wrong: ["complete", "will complete", "are completing"],
      rule: "Past perfect marks an action completed before another past event.",
    },
    "modifier placement": {
      content: `At an observation event in ${value.place}, which revision most clearly indicates that ${name}, not the telescope, was standing on the platform?`,
      correct: `Standing on the platform, ${name} adjusted the telescope.`,
      wrong: [
        `Standing on the platform, the telescope was adjusted by ${name}.`,
        `${name} adjusted, standing on the platform, the telescope.`,
        `The telescope standing on the platform was adjusted by ${name}.`,
      ],
      rule: "An introductory modifier should sit next to the noun it describes.",
    },
    "parallel structure": {
      content: `While documenting ${value.project[0]} in ${value.place}, the internship taught ${name} to catalog samples, operate a scanner, and ______.`,
      correct: "write concise reports",
      wrong: ["concise reports were written", "writing concise reports", "the reports are concise"],
      rule: "Items in a series should share the same grammatical form.",
    },
  };
  const item = templates[task.subskill];
  return common({
    stimulus: { type: "sentence", content: item.content },
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    correct: item.correct,
    distractors: item.wrong.map((choice) => ({
      text: choice,
      reason: `“${choice}” does not satisfy the governing rule: ${item.rule}`,
    })),
    hint: `Focus on ${task.subskill}, not merely on which option sounds familiar.`,
    explanation: item.rule,
    steps: [
      `Identify the sentence feature testing ${task.subskill}.`,
      "Find the word or phrase that controls the required form.",
      "Select the only option that satisfies the rule and preserves the intended meaning.",
    ],
    strategy: "State the grammar rule in your own words before comparing forms.",
    trap: "Nearby plural nouns or familiar phrasing can distract from the actual controlling structure.",
    principles: [item.rule],
    format: "sentence",
  });
}

function generate(context) {
  const { task } = context;
  if (task.skill === "Central Ideas and Details") return centralIdea(context);
  if (task.skill === "Inferences") return inference(context);
  if (task.skill === "Command of Evidence") return commandOfEvidence(context);
  if (task.skill === "Words in Context") return wordsInContext(context);
  if (task.skill === "Text Structure and Purpose") return textPurpose(context);
  if (task.skill === "Cross-Text Connections") return crossText(context);
  if (task.skill === "Rhetorical Synthesis") return rhetoricalSynthesis(context);
  if (task.skill === "Transitions") return transitions(context);
  if (task.skill === "Boundaries") return boundaries(context);
  if (task.skill === "Form, Structure, and Sense") return formStructureSense(context);
  throw new Error(`No SAT Reading and Writing generator for ${task.skill}`);
}

const result = generateSection("sat-reading-writing", generate, {
  generatorName: "sat-reading-writing-generator-v1",
  regenerateGenerated: process.argv.includes("--rebuild"),
});
console.log(
  `SAT Reading and Writing: kept ${result.existing}, generated ${result.generated}, total ${result.total}.`,
);
