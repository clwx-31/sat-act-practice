#!/usr/bin/env node
"use strict";

const { generateSection } = require("./lib/generation");

const places = [
  "Alder Bay", "Birch Square", "Cobalt Ridge", "Driftwood", "Eastmere",
  "Fern Hollow", "Garnet Point", "Harbor Glen", "Ivory Creek", "Juniper Hill",
  "Kingfisher", "Lake Briar", "Meadowgate", "North Cedar", "Orchard Bend",
  "Prairie View", "Quartz Harbor", "Rosefield", "Stonebridge", "Timber Cove",
  "Union Marsh", "Violet Lake", "Westhaven", "Yellow Pine", "Zephyr Grove",
];

const activities = [
  ["oral-history archive", "record interviews", "preserved neighborhood memories"],
  ["street-tree inventory", "measure young trees", "a map of canopy growth"],
  ["student radio hour", "produce short reports", "weekly local broadcasts"],
  ["community kiln", "fire ceramic work", "shared exhibitions"],
  ["walking-school-bus program", "travel in supervised groups", "safer morning routes"],
  ["wetland boardwalk", "observe marsh wildlife", "accessible viewing platforms"],
  ["instrument library", "borrow musical instruments", "new youth ensembles"],
  ["solar-lantern workshop", "assemble portable lights", "evening study kits"],
  ["recipe archive", "document family dishes", "an illustrated community cookbook"],
  ["public chess club", "learn strategic play", "weekend tournaments"],
  ["costume-repair room", "mend stage clothing", "fewer discarded garments"],
  ["neighborhood weather station", "record daily conditions", "a public climate log"],
  ["accessible trail guide", "compare route features", "clear mobility information"],
  ["rooftop herb garden", "grow cooking herbs", "produce for a teaching kitchen"],
  ["youth translation desk", "translate public notices", "more accessible announcements"],
  ["river-sound project", "record natural soundscapes", "a seasonal audio collection"],
  ["mobile makerspace", "use fabrication tools", "student-designed prototypes"],
  ["community telescope night", "observe the night sky", "shared astronomy journals"],
  ["local-history mural", "paint scenes from interviews", "a collaborative public artwork"],
  ["lending shelf for tools", "borrow household tools", "more completed home repairs"],
  ["native-seed exchange", "share regional seeds", "more diverse home gardens"],
  ["pop-up dance studio", "attend free lessons", "monthly performances"],
  ["creek-restoration team", "plant streamside grasses", "more stable creek banks"],
  ["bicycle skills course", "practice safe riding", "more confident commuters"],
  ["community data lab", "analyze public information", "clear neighborhood reports"],
];

const names = [
  "Ari", "Bianca", "Chen", "Dante", "Evelyn", "Fatima", "Gus", "Hyejin",
  "Isaac", "Jo", "Kofi", "Leila", "Mateo", "Nadia", "Omar", "Pia",
  "Quentin", "Ruth", "Sana", "Theo", "Usha", "Val", "Wen", "Xavier", "Yara",
];

function scenario(sequence) {
  return {
    place: places[sequence % places.length],
    activity: activities[(sequence + Math.floor(sequence / activities.length)) % activities.length],
    name: names[(sequence * 7 + Math.floor(sequence / names.length)) % names.length],
  };
}

function withArticle(phrase) {
  return `${/^[aeiou]/i.test(phrase) ? "an" : "a"} ${phrase}`;
}

function result({
  stimulus,
  stem,
  correct,
  wrong,
  explanation,
  principle,
  hint,
  strategy,
  trap,
  format = "passage-editing",
}) {
  return {
    stimulus: { type: format === "sentence" ? "sentence" : "passage", content: stimulus },
    stem,
    correct,
    distractors: wrong.map(([text, reason]) => ({ text, reason })),
    hint,
    explanation,
    solutionSteps: [
      "Read the full sentence or paragraph to identify its intended meaning.",
      `Apply the rule or rhetorical goal: ${principle}`,
      "Test each option in context and select the only choice that is correct, clear, and relevant.",
    ],
    strategy,
    trap,
    principles: [principle],
    format,
    estimatedSeconds: 45,
    tags: [],
  };
}

function topicDevelopment(context) {
  const { sequence, task } = context;
  const value = scenario(sequence);
  const [activity, action, outcome] = value.activity;
  const detail = [
    "volunteers completed training before meeting participants",
    "organizers surveyed users after each session",
    "the team posted a public schedule at the library",
    "participants worked in pairs during the first week",
  ][sequence % 4];
  const passage = `Coordinator ${value.name} helped create the ${value.place} ${activity} so residents could ${action}. During its first month, ${detail}. By spring, the project had produced ${outcome}.`;

  if (task.subskill === "purpose") {
    return result({
      stimulus: passage,
      stem: "The writer's main purpose in this paragraph is to",
      correct: `describe the goal and early result of the ${activity}`,
      wrong: [
        [`argue that every town must create a ${activity}`, "The paragraph describes one program without making a universal demand."],
        ["explain every step required to run a public project", "The paragraph gives a goal and result, not complete instructions."],
        [`criticize the volunteers who helped residents ${action}`, "The text presents the volunteers neutrally and offers no criticism."],
      ],
      explanation: `The paragraph introduces why the ${activity} was created and reports its result: ${outcome}.`,
      principle: "Identify the paragraph's central rhetorical purpose, not a single detail.",
      hint: "Summarize the first and last sentences together.",
      strategy: "Reduce the paragraph to a verb phrase such as “describe a project and its result.”",
      trap: "A choice can mention the topic while overstating the writer's aim.",
    });
  }

  if (task.subskill === "relevance") {
    const added = `The official bird of a distant state was selected in 1931.`;
    return result({
      stimulus: `${passage} ${added}`,
      stem: "Which sentence should be deleted because it is least relevant to the paragraph's focus?",
      correct: added,
      wrong: [
        [`The ${value.place} ${activity} was created so residents could ${action}.`, "This states the project's purpose."],
        [`During its first month, ${detail}.`, "This is relevant information about the project's early operation."],
        [`By spring, the project had produced ${outcome}.`, "This reports the result that completes the paragraph."],
      ],
      explanation: "The sentence about a distant state's bird has no logical connection to the local project.",
      principle: "Every sentence in a unified paragraph should develop its controlling idea.",
      hint: "Identify the paragraph's repeated topic, then find the sentence that does not contribute to it.",
      strategy: "State the paragraph topic in five words and test every sentence against it.",
      trap: "An interesting fact is not automatically a relevant fact.",
    });
  }

  return result({
    stimulus: passage,
    stem: `Which choice would provide the most relevant and specific support for the claim that residents used the ${activity}?`,
    correct: `Sign-in records show that ${45 + sequence % 40} residents participated in at least two sessions.`,
    wrong: [
      [`The ${activity} has a blue storage cabinet.`, "The cabinet's color does not demonstrate resident use."],
      [`Several towns have public buildings.`, "This broad fact does not provide evidence about this project."],
      [`The organizers considered changing the project's logo.`, "A possible logo change does not show participation."],
    ],
    explanation: "Sign-in records directly document repeated resident participation.",
    principle: "Effective support must be specific, relevant, and directly connected to the claim.",
    hint: "Look for measurable evidence of actual participation.",
    strategy: "Match the noun and action in the claim to the evidence.",
    trap: "Background details about a project may be true without supporting the stated claim.",
  });
}

function organization(context) {
  const { sequence, task } = context;
  const value = scenario(sequence);
  const [activity, action, outcome] = value.activity;
  if (task.subskill === "organization") {
    const sentences = [
      `${value.name} and other organizers first identified a ${value.place} space for the ${activity}.`,
      `Next, they invited residents to ${action}.`,
      `After several sessions, they evaluated attendance and feedback.`,
      `Finally, they published a report describing ${outcome}.`,
    ];
    return result({
      stimulus: rotateSentences(sentences, sequence),
      stem: "Which ordering of the four numbered sentences makes the paragraph most logical?",
      correct: "1, 2, 3, 4",
      wrong: [
        ["4, 2, 1, 3", "This begins with the final report before the project has been organized."],
        ["2, 4, 3, 1", "This places participation and reporting before the space is identified."],
        ["3, 1, 4, 2", "This evaluates sessions before they occur."],
      ],
      explanation: "The correct order follows the project's chronology from preparation through final reporting.",
      principle: "Arrange process details in a clear chronological or logical progression.",
      hint: "Find the preparation step and the final outcome first.",
      strategy: "Use sequence words such as “first,” “next,” and “finally” as anchors.",
      trap: "Do not choose an order that sounds varied but breaks cause-and-effect chronology.",
    });
  }
  if (task.subskill === "introductions") {
    return result({
      stimulus: `The paragraph will explain how ${value.name} helped ${value.place} create ${withArticle(activity)}, invited residents to ${action}, and eventually helped produce ${outcome}.`,
      stem: "Which opening sentence most effectively introduces the paragraph?",
      correct: `${value.place}'s ${activity} grew from a simple plan into a useful community resource.`,
      wrong: [
        ["Communities have existed throughout history.", "This is far too broad to introduce the specific project."],
        [`The paint used in ${value.place}'s meeting room is pale green.`, "This detail is unrelated to the paragraph's focus."],
        [`Some residents prefer to work alone rather than ${action}.`, "This introduces an unsupported contrast instead of the project's development."],
      ],
      explanation: "The correct choice previews both the project and its development into a community resource.",
      principle: "An effective introduction establishes the paragraph's specific topic and direction.",
      hint: "Choose a sentence broad enough to cover all listed details but specific to this project.",
      strategy: "Preview, do not summarize every detail.",
      trap: "Avoid introductions that are either universal and vague or narrowly unrelated.",
    });
  }
  if (task.subskill === "conclusions") {
    return result({
      stimulus: `According to ${value.name}'s report, residents in ${value.place} used ${activity} to ${action}, and the project produced ${outcome}.`,
      stem: "Which concluding sentence most effectively follows from the information given?",
      correct: `Together, these results show how the ${activity} turned participation into a lasting local benefit.`,
      wrong: [
        ["No community project ever encounters a problem.", "This absolute claim is unsupported and implausible."],
        [`The project should immediately expand to every city in the country.`, "The local evidence does not justify a nationwide prescription."],
        [`The organizers bought pencils on a Tuesday.`, "This detail neither synthesizes nor concludes the paragraph."],
      ],
      explanation: "The correct sentence synthesizes participation and outcome without introducing a new unsupported claim.",
      principle: "A conclusion should synthesize the paragraph's main point rather than add an unrelated detail.",
      hint: "Look for a choice connecting resident participation with the stated result.",
      strategy: "Prefer synthesis over repetition or a sudden new claim.",
      trap: "A dramatic recommendation is not an effective conclusion unless the paragraph supports it.",
    });
  }
  return transitionQuestion(value, sequence);
}

function rotateSentences(sentences, sequence) {
  const label = ["1", "2", "3", "4"];
  return sentences.map((sentence, index) => `${label[index]}. ${sentence}`).join(" ");
}

function transitionQuestion(value, sequence) {
  const [activity, action, outcome] = value.activity;
  const patterns = [
    [`Early sessions drew few participants. ______, organizers extended evening hours so more residents could ${action}.`, "Therefore", ["Similarly", "For example", "Nevertheless"], "cause and effect"],
    [`Most residents supported the ${activity}. ______, a few worried about its weekend schedule.`, "However", ["Consequently", "For example", "Likewise"], "contrast"],
    [`The project produced several benefits. ______, it led to ${outcome}.`, "For example", ["Instead", "Nevertheless", "Meanwhile"], "example"],
    [`The ${activity} allowed residents to ${action}. ______, it provided training for new volunteers.`, "In addition", ["In contrast", "As a result", "Specifically"], "addition"],
  ];
  const [stimulus, correct, wrong, relation] = patterns[sequence % patterns.length];
  return result({
    stimulus: `${stimulus} ${value.name} coordinated the program in ${value.place}.`,
    stem: "Which choice provides the most logical transition?",
    correct,
    wrong: wrong.map((choice) => [choice, `“${choice}” does not signal the required ${relation} relationship.`]),
    explanation: `“${correct}” correctly signals ${relation}.`,
    principle: `Choose a transition that expresses the exact ${relation} relationship.`,
    hint: "Describe the relationship between the sentences before considering the choices.",
    strategy: "Name the relationship first, then match it to a transition.",
    trap: "Formal-sounding transitions are not interchangeable.",
  });
}

function languageUse(context) {
  const { sequence, task } = context;
  const value = scenario(sequence);
  const [activity, action] = value.activity;
  if (task.subskill === "precision") {
    return result({
      stimulus: `${value.name}, the ${value.place} coordinator, wanted to describe attendance at the ${activity} accurately: the increase was steady across six weeks, not sudden. Attendance ______ during the trial.`,
      stem: "Which choice most precisely completes the sentence?",
      correct: "rose gradually",
      wrong: [
        ["exploded", "This suggests a sudden dramatic increase, contrary to the context."],
        ["changed somehow", "This is too vague to express the direction and pace."],
        ["was awesome", "This informal evaluation is imprecise and does not describe the pattern."],
      ],
      explanation: "“Rose gradually” precisely conveys a steady increase over time.",
      principle: "Choose language that matches the exact meaning, degree, and tone established by context.",
      hint: "Use both clues: the direction is upward and the pace is steady.",
      strategy: "Translate the context into two required features before selecting a word.",
      trap: "An energetic word can be less accurate than a restrained one.",
    });
  }
  if (task.subskill === "conciseness") {
    return result({
      stimulus: `${value.name} and other residents in ${value.place} collaborated together to plan the ${activity}.`,
      stem: "Which revision is clearest and most concise?",
      correct: `${value.name} and other residents in ${value.place} collaborated to plan the ${activity}.`,
      wrong: [
        [`${value.name} and other residents in ${value.place} collaborated together jointly to plan the ${activity}.`, "“Together jointly” adds more redundancy."],
        [`The ${activity} was planned in a collaborative manner by ${value.name} and other residents in ${value.place}.`, "This wordy passive construction weakens the sentence."],
        [`Planning of the ${activity} was something ${value.name} and other residents in ${value.place} did collaboratively together.`, "This is unnecessarily wordy and repeats the idea of collaboration."],
      ],
      explanation: "“Collaborated” already means worked together, so “together” is redundant.",
      principle: "Remove redundancy while preserving all meaningful information.",
      hint: "Look for two words that express the same idea.",
      strategy: "Prefer the shortest grammatically complete choice that keeps the meaning.",
      trap: "Longer phrasing is not automatically more formal or precise.",
    });
  }
  if (task.subskill === "style and tone") {
    return result({
      stimulus: `A formal ${value.place} report by ${value.name} states that the ${activity} enabled residents to ${action}.`,
      stem: "Which sentence best maintains the report's formal tone?",
      correct: `Participation data indicate that the program expanded access.`,
      wrong: [
        ["The program was totally amazing for everybody.", "The slang and absolute claim are inappropriate for a formal report."],
        ["You would have loved how cool the whole thing was.", "Second person and casual wording disrupt the formal tone."],
        ["Honestly, the project kind of worked out okay.", "Conversational qualifiers make the statement vague and informal."],
      ],
      explanation: "The correct choice uses precise, evidence-oriented language appropriate to a formal report.",
      principle: "Maintain a consistent level of formality suited to purpose and audience.",
      hint: "Look for objective language rather than slang or direct address.",
      strategy: "Check pronouns, slang, and unsupported intensifiers.",
      trap: "Enthusiasm does not substitute for appropriate tone.",
    });
  }
  return result({
    stimulus: `${value.name}'s ${value.place} guide to the ${activity} first addresses readers directly: “You can ${action} during weekend sessions.” It then states, “______.”`,
    stem: "Which choice most effectively maintains the guide's point of view?",
    correct: "You should register before Friday.",
    wrong: [
      ["Residents should register before Friday.", "This shifts from second person to third person."],
      ["I should register before Friday.", "This shifts from second person to first person."],
      ["Registration before Friday was recommended by them.", "This shifts perspective and introduces an unclear pronoun."],
    ],
    explanation: "Using “you” maintains the second-person point of view established in the first sentence.",
    principle: "Keep person, number, tense, and tone consistent unless a clear reason requires a shift.",
    hint: "Identify the pronoun perspective in the quoted first sentence.",
    strategy: "Circle the controlling pronoun and match it.",
    trap: "A grammatically complete choice may still create an unjustified shift.",
  });
}

function conventions(context) {
  const { sequence, task } = context;
  const value = scenario(sequence);
  const [activity, action, outcome] = value.activity;
  const templates = {
    "clause relationships": {
      stimulus: `The ${value.place} ${activity} opened on Saturday ______ residents began to ${action} that afternoon.`,
      correct: ";",
      wrong: [[",", "A comma alone cannot join two independent clauses."], ["", "No punctuation creates a run-on sentence."], [": and", "A colon followed by “and” is not appropriate between these clauses."]],
      explanation: "A semicolon correctly joins the two related independent clauses.",
      principle: "Join related independent clauses with a semicolon or a comma plus a coordinating conjunction.",
    },
    modifiers: {
      stimulus: `Which revision clearly indicates that ${value.name}, not the display, was walking through ${value.place}?`,
      correct: `Walking through ${value.place}, ${value.name} examined the display.`,
      wrong: [
        [`Walking through ${value.place}, the display was examined by ${value.name}.`, "The opening modifier illogically describes the display."],
        [`The display walking through ${value.place} was examined by ${value.name}.`, "This wording says the display was walking."],
        [`${value.name} examined, walking through ${value.place}, the display.`, "The interrupting modifier creates avoidable ambiguity."],
      ],
      explanation: "Placing the person's name immediately after the modifier makes the intended meaning clear.",
      principle: "Place a modifying phrase next to the word it logically describes.",
    },
    parallelism: {
      stimulus: `At the ${value.place} ${activity}, the volunteer learned to greet visitors, organize supplies, and ______.`,
      correct: "explain the schedule",
      wrong: [["the schedule was explained", "This passive clause is not parallel with the two infinitive phrases."], ["explaining the schedule", "The gerund does not match “to greet” and “organize.”"], ["an explanation of the schedule", "The noun phrase breaks the parallel verb pattern."]],
      explanation: "“Explain” matches the base-form verbs “greet” and “organize” governed by “to.”",
      principle: "Coordinate items should use parallel grammatical forms.",
    },
    "subject-verb agreement": {
      stimulus: `A collection of photographs documenting ${outcome} ______ in the ${value.place} archive.`,
      correct: "is stored",
      wrong: [["are stored", "The plural noun in the modifying phrase is not the subject."], ["store", "This plural/base verb does not agree with “collection.”"], ["have stored", "This verb form is both intransitive here and disagrees with the subject."]],
      explanation: "The singular subject “collection” requires the singular verb phrase “is stored.”",
      principle: "A verb agrees with the head noun of its subject, not a nearby noun in a prepositional phrase.",
    },
    pronouns: {
      stimulus: `At the ${value.place} ${activity}, neither ${value.name} nor the other coordinator had brought ______ identification badge.`,
      correct: "their",
      wrong: [["its", "“Its” refers to a nonhuman singular noun."], ["our", "“Our” incorrectly includes the speaker."], ["your", "“Your” incorrectly addresses the reader."]],
      explanation: "Singular “their” clearly and inclusively refers to either coordinator.",
      principle: "A pronoun must agree clearly with its antecedent in person and number.",
    },
    "verb forms": {
      stimulus: `By the time the first ${value.place} ${activity} session began, the organizers ______ every supply cabinet.`,
      correct: "had labeled",
      wrong: [["label", "Present tense does not show completion before the past event."], ["will label", "Future tense conflicts with the past sequence."], ["are labeling", "Present progressive does not fit the completed past action."]],
      explanation: "Past perfect “had labeled” marks an action completed before another past action.",
      principle: "Use past perfect for an action completed before another past event.",
    },
    comparisons: {
      stimulus: `For the ${value.place} ${activity}, the revised guide was clearer than ______.`,
      correct: "the original guide",
      wrong: [["the original guide's pages", "This compares a guide with pages rather than with another guide."], ["the writers had expected", "This creates an illogical comparison of a guide and an expectation."], ["any guide", "This illogically includes the revised guide in the group it exceeds."]],
      explanation: "The sentence logically compares one guide with another guide.",
      principle: "Comparisons must place logically comparable items in parallel structures.",
    },
    commas: {
      stimulus: `After the final ${value.place} ${activity} session ______ the team published its report.`,
      correct: ",",
      wrong: [[";", "A semicolon cannot separate an introductory dependent phrase from the main clause."], [":", "A colon is not used after an introductory phrase."], ["NO PUNCTUATION", "A comma should mark the end of the introductory phrase."]],
      explanation: "A comma follows the introductory phrase.",
      principle: "Use a comma after an introductory dependent phrase or clause.",
    },
    "semicolons and colons": {
      stimulus: `The ${value.place} workshop for the ${activity} required three items ______ gloves, a ruler, and a notebook.`,
      correct: ":",
      wrong: [[",", "A comma alone does not appropriately introduce this list after a complete clause."], [";", "A semicolon is not used to introduce a list of sentence elements."], ["— and", "The dash plus conjunction is unnecessary and ungrammatical here."]],
      explanation: "A colon correctly introduces the list after a complete clause.",
      principle: "Use a colon after a complete clause to introduce a list or explanation.",
    },
    apostrophes: {
      stimulus: `After the ${value.place} ${activity} session, the two coordinators compared the ______ notes.`,
      correct: "volunteers'",
      wrong: [["volunteer's", "This form is singular possessive, but the sentence refers to multiple volunteers."], ["volunteers", "This plural lacks the apostrophe needed to show possession."], ["volunteer'es", "This is not a valid plural possessive form."]],
      explanation: "The notes belong to multiple volunteers, so the plural possessive is “volunteers'.”",
      principle: "Form the possessive of a regular plural ending in s by adding an apostrophe after the s.",
    },
    "dashes and parentheses": {
      stimulus: `The final ${value.place} ${activity} session ______ originally planned for Tuesday ______ moved to Thursday.`,
      correct: "(originally planned for Tuesday)",
      wrong: [["originally planned for Tuesday", "Without punctuation, the nonessential interruption is not clearly set off."], ["— originally planned for Tuesday)", "The punctuation marks do not form a matching pair."], [", originally planned for Tuesday—", "A comma and dash cannot serve as a matched pair here."]],
      explanation: "Matching parentheses correctly set off the nonessential information.",
      principle: "Use matching punctuation marks to enclose a nonessential interruption.",
    },
  };
  const item = templates[task.subskill];
  return result({
    stimulus: item.stimulus,
    stem: "Which choice produces the clearest sentence that conforms to Standard English?",
    correct: item.correct || "NO PUNCTUATION",
    wrong: item.wrong.map(([text, reason]) => [text || "NO PUNCTUATION", reason]),
    explanation: item.explanation,
    principle: item.principle,
    hint: `Identify the rule governing ${task.subskill} before comparing choices.`,
    strategy: "Analyze the sentence structure first; do not rely only on how punctuation or wording sounds.",
    trap: "A nearby noun or natural pause may distract from the controlling grammatical structure.",
    format: "sentence",
  });
}

function generate(context) {
  const { task } = context;
  if (task.skill === "Topic Development") return topicDevelopment(context);
  if (task.skill === "Organization, Unity, and Cohesion") return organization(context);
  if (task.skill === "Effective Language Use") return languageUse(context);
  return conventions(context);
}

const completed = generateSection("act-english", generate, {
  generatorName: "act-english-generator-v1",
  regenerateGenerated: process.argv.includes("--rebuild"),
});
console.log(
  `ACT English: kept ${completed.existing}, generated ${completed.generated}, total ${completed.total}.`,
);
