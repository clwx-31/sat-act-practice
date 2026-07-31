#!/usr/bin/env node
"use strict";

const { generateSection } = require("./lib/generation");

const issues = [
  ["public libraries lending household tools", "expand access to equipment", "help residents complete repairs", "increase replacement and maintenance costs", "library patrons"],
  ["high schools beginning classes later", "adjust the daily schedule", "support students' rest and attention", "complicate transportation and activities", "students and families"],
  ["towns converting parking spaces into seating areas", "redesign curb space", "create places for people to gather", "reduce convenient parking", "shoppers and nearby businesses"],
  ["schools requiring a financial-literacy course", "add a graduation requirement", "prepare students for practical decisions", "reduce room for electives", "students and teachers"],
  ["museums offering one free evening each week", "broaden public access", "welcome visitors who cannot attend during the day", "raise staffing expenses", "museum workers and visitors"],
  ["communities replacing lawns with native plants", "change landscaping practices", "reduce water use and support habitat", "require unfamiliar maintenance routines", "residents and grounds crews"],
  ["students completing a community-service project", "connect coursework with local needs", "build civic experience", "place unequal demands on students' time", "students and nonprofit partners"],
  ["cities creating protected bicycle networks", "reallocate street space", "make short bicycle trips safer", "increase traffic changes during construction", "commuters and neighborhood residents"],
  ["schools limiting personal-phone use during class", "reduce digital interruptions", "improve sustained attention", "make urgent family communication harder", "students, teachers, and caregivers"],
  ["towns funding public art in new buildings", "reserve part of construction budgets for art", "create shared cultural spaces", "reduce funds available for other features", "artists and taxpayers"],
  ["employers offering four-day workweek trials", "test a compressed schedule", "increase flexibility and focus", "create coverage challenges", "workers and customers"],
  ["schools replacing some exams with long-term projects", "change how learning is assessed", "measure planning and revision skills", "make grading consistency harder", "students and instructors"],
  ["communities opening streets to pedestrians on weekends", "temporarily restrict vehicle traffic", "support public activity and local events", "complicate deliveries and access", "residents and merchants"],
  ["cafeterias displaying food-waste totals", "make discarded food visible", "encourage less waste", "risk shaming individuals without solving causes", "students and dining staff"],
  ["libraries preserving local digital records", "archive websites and online publications", "protect recent community history", "consume staff time and storage", "researchers and librarians"],
  ["schools adding outdoor learning days", "move selected lessons outside", "connect concepts with direct observation", "make plans vulnerable to weather", "students and teachers"],
  ["cities charging fees for disposable takeout containers", "discourage single-use packaging", "reduce waste", "raise costs for small restaurants and customers", "business owners and diners"],
  ["neighborhoods creating shared delivery lockers", "centralize package drop-offs", "reduce missed deliveries", "require secure space and oversight", "residents and delivery workers"],
  ["schools publishing student newspapers independently", "give student editors greater control", "develop judgment and authentic reporting", "create conflicts over accuracy and responsibility", "student journalists and administrators"],
  ["parks reserving quiet hours each week", "limit amplified sound temporarily", "provide predictable calm", "restrict some group activities", "park visitors and event organizers"],
  ["towns offering repair vouchers for appliances", "subsidize repair instead of replacement", "reduce waste and support repair shops", "spend public funds on private property", "residents and repair workers"],
  ["schools teaching basic coding to every student", "include computing in the core curriculum", "build familiarity with digital systems", "displace other required instruction", "students and curriculum planners"],
  ["community centers hosting intergenerational classes", "mix age groups in shared courses", "encourage exchange of skills and perspectives", "make pacing more complex", "learners and instructors"],
  ["cities planting fruit trees in public spaces", "make edible landscapes available", "provide food and shade", "create cleanup and maintenance demands", "residents and parks staff"],
  ["schools allowing students to design one elective", "support learner-directed study", "increase ownership and curiosity", "make quality and workload difficult to standardize", "students and faculty advisers"],
  ["local governments publishing plain-language budgets", "simplify financial documents", "help more residents understand spending", "omit technical nuance if simplified poorly", "residents and finance staff"],
  ["transit agencies allowing musical performances in stations", "create licensed performance areas", "support artists and enliven travel", "add noise and crowd-management concerns", "performers and riders"],
  ["schools creating peer-tutoring periods", "schedule structured student support", "reinforce learning for tutors and learners", "reduce time for other activities", "students and counselors"],
  ["towns requiring new buildings to include shade", "address hotter outdoor conditions", "improve comfort around buildings", "increase design and construction costs", "pedestrians and developers"],
  ["public agencies using citizen science data", "include volunteer observations in research", "expand geographic coverage", "introduce uneven data quality", "volunteers and professional researchers"],
  ["schools opening libraries before and after classes", "extend access hours", "provide quiet study space", "increase staffing needs", "students and library employees"],
  ["communities creating shared commercial kitchens", "offer reservable licensed cooking space", "help small food businesses begin", "require complex sanitation oversight", "entrepreneurs and inspectors"],
  ["cities replacing some signs with universal symbols", "make navigation less language-dependent", "help diverse travelers", "create ambiguity for unfamiliar symbols", "visitors and transportation planners"],
  ["schools asking students to present exhibitions of learning", "replace some report cards with public demonstrations", "show growth through authentic work", "increase preparation pressure", "students and families"],
  ["towns supporting neighborhood cooling centers", "open public indoor spaces during heat", "protect residents without home cooling", "require reliable staffing and transportation", "residents and emergency planners"],
  ["local theaters offering relaxed performances", "adjust sound, lighting, and movement rules", "welcome audiences with different sensory needs", "alter the experience expected by some patrons", "performers and audience members"],
  ["schools creating device-free lunch areas", "offer spaces without screens", "encourage face-to-face conversation", "limit students' freedom during breaks", "students and staff"],
  ["cities using vacant lots for temporary projects", "permit short-term gardens, art, or markets", "activate unused land", "create uncertainty when permanent development begins", "neighbors and property owners"],
  ["community colleges lending laptops for full terms", "provide longer technology loans", "support students without reliable devices", "increase loss and repair risks", "students and technology staff"],
  ["towns installing public drinking-water refill stations", "expand free water access", "reduce disposable bottle use", "require cleaning and repair", "residents and maintenance crews"],
  ["schools including media-literacy instruction", "teach evaluation of online sources", "strengthen evidence-based judgment", "add another demand to crowded courses", "students and teachers"],
  ["cities prioritizing buses at traffic signals", "reduce transit delays", "make bus travel more reliable", "slightly lengthen some cross-traffic waits", "bus riders and drivers"],
  ["libraries hosting community equipment demonstrations", "let residents try unfamiliar tools", "build practical confidence", "create safety and liability concerns", "participants and library staff"],
  ["schools preserving unstructured time during the day", "limit scheduled activities in one period", "allow rest and independent interests", "reduce formal instructional minutes", "students and administrators"],
  ["towns translating emergency alerts into more languages", "broaden urgent communication", "reach more residents quickly", "increase review time for fast-changing messages", "residents and emergency officials"],
  ["parks using reservation systems for popular areas", "manage peak demand", "make access more predictable", "disadvantage people unable to plan ahead", "visitors and parks staff"],
  ["schools inviting local experts to co-teach short units", "connect courses with practical experience", "bring specialized knowledge into class", "make scheduling and instructional consistency harder", "students, teachers, and guests"],
  ["cities publishing street-repair schedules", "make maintenance plans visible", "help residents plan around disruptions", "create frustration when schedules change", "residents and public-works crews"],
  ["community gardens reserving plots for shared harvests", "grow food for collective use", "support local food programs", "reduce space for individual gardeners", "gardeners and food-pantries"],
  ["schools offering quiet alternatives to large assemblies", "provide another way to receive event content", "improve access for students with sensory needs", "reduce the sense of a shared school event", "students and organizers"],
  ["schools offering bilingual tutoring after class", "provide language support outside lessons", "help multilingual students master content", "strain limited tutoring budgets", "students and language teachers"],
  ["cities converting former rail lines into walking trails", "reuse unused transit corridors", "add safe recreation routes", "require ongoing trail upkeep", "walkers and city planners"],
  ["libraries lending musical instruments to patrons", "expand access to instruments", "let residents explore music affordably", "add repair and replacement costs", "musicians and library staff"],
];

const contexts = [
  ["a one-year pilot", "limited startup funding", "monthly participation data"],
  ["a three-neighborhood trial", "unequal access across neighborhoods", "resident surveys and cost records"],
  ["a voluntary first phase", "staff training requirements", "attendance and satisfaction reports"],
  ["a program reviewed after six months", "space constraints", "usage logs and interviews"],
  ["a small-scale demonstration", "uncertain long-term maintenance", "before-and-after observations"],
  ["a partnership with local organizations", "different stakeholder priorities", "public meetings and written feedback"],
  ["a phased rollout", "technology-access differences", "service data and accessibility reviews"],
  ["a school-year experiment", "conflicting schedule needs", "student, family, and staff feedback"],
  ["a seasonal trial", "weather and demand changes", "weekly counts and maintenance reports"],
  ["a grant-funded launch", "future funding uncertainty", "independent evaluation and budget data"],
  ["a two-site comparison", "differing community readiness", "cost, usage, and equity reviews"],
];

// Composed community names (25 x 23 = 575 unique) give every prompt a distinct
// named setting so essay prompts stay non-duplicate as the target grows.
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

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

const perspectiveFrames = [
  [
    (issue) => `Because the proposal could ${issue[2]}, leaders should act promptly and adjust details after launch.`,
    (issue) => `The risk that it could ${issue[3]} makes a limited trial more responsible than immediate adoption.`,
    (issue) => `${capitalize(issue[4])} should help define success before leaders decide whether the proposal deserves support.`,
  ],
  [
    (issue) => `Access and shared benefit matter most; a policy that can ${issue[2]} should receive priority.`,
    (issue) => `Good intentions are insufficient when a program may ${issue[3]}; costs and tradeoffs must be measured.`,
    (issue) => `Local flexibility is preferable because ${issue[4]} may experience the policy differently.`,
  ],
  [
    (issue) => `Waiting for perfect evidence can preserve existing problems, so the chance to ${issue[2]} justifies experimentation.`,
    (issue) => `A pilot should come first because an unintended effect—the proposal might ${issue[3]}—could be difficult to reverse.`,
    (issue) => `The strongest decision will combine public input from ${issue[4]} with clear outcome data.`,
  ],
  [
    (issue) => `Public institutions should model innovation when it may ${issue[2]}.`,
    (issue) => `Institutions should protect reliability first, especially when change could ${issue[3]}.`,
    (issue) => `Neither innovation nor caution should dominate; the experience of ${issue[4]} should guide a balanced design.`,
  ],
  [
    (issue) => `The proposal's broad social value—its ability to ${issue[2]}—outweighs manageable implementation problems.`,
    (issue) => `Opportunity costs matter: resources used here cannot address other needs, and the proposal may ${issue[3]}.`,
    (issue) => `A transparent review with ${issue[4]} can determine whether benefits are broad enough to justify the tradeoffs.`,
  ],
];

function generate(context) {
  const { sequence, task } = context;
  const issue = issues[sequence % issues.length];
  const setting = contexts[sequence % contexts.length];
  const frames = perspectiveFrames[sequence % perspectiveFrames.length];
  const community = composePlace(sequence);
  const perspectives = frames.map((frame) => frame(issue));
  const domainFocus = {
    "Ideas and Analysis": "analyzing the assumptions and implications of the three perspectives",
    "Development and Support": "developing claims with specific reasons and examples",
    Organization: "building a purposeful progression from thesis through counterargument",
    "Language Use and Conventions": "expressing a nuanced argument with precise, controlled language",
  }[task.domain];
  const prompt = [
    `Issue: ${issue[0]}`,
    "",
    `The community of ${community} is considering whether to ${issue[1]}. Supporters believe the change could ${issue[2]}; critics warn that it could ${issue[3]}. The proposal would begin as ${setting[0]}, with ${setting[1]}, and would be reviewed using ${setting[2]}.`,
    "",
    `Perspective 1: ${perspectives[0]}`,
    `Perspective 2: ${perspectives[1]}`,
    `Perspective 3: ${perspectives[2]}`,
  ].join("\n");
  const thesis = `The community should pursue ${setting[0]} because the opportunity to ${issue[2]} justifies careful experimentation, but continuation should depend on ${setting[2]} and direct input from ${issue[4]}.`;

  return {
    responseType: "essay",
    stimulus: { type: "writing-prompt", content: prompt },
    stem: `Write a unified essay about ${issue[0]}. State your own perspective and analyze its relationship to at least one given perspective. Develop your ideas with reasoning and specific examples. For this practice item, place special emphasis on ${domainFocus}.`,
    correctAnswer: {
      sampleThesis: thesis,
      outline: [
        `Introduction: define the tension between the potential to ${issue[2]} and the risk that the proposal could ${issue[3]}; state the qualified thesis.`,
        `Body 1: explain why the expected benefit matters to ${issue[4]}, using a specific invented or observed example.`,
        `Body 2: engage the caution in Perspective 2, acknowledge the strongest risk, and explain how ${setting[0]} plus ${setting[2]} can address it.`,
        "Body 3: analyze another perspective's assumption and show where it aligns with or differs from the writer's standard for success.",
        "Conclusion: identify what evidence would justify continuing, revising, or ending the proposal.",
      ],
      reviewCriteria: [
        "Ideas and Analysis: establishes a clear position and critically engages at least one given perspective.",
        "Development and Support: explains reasons, implications, and examples rather than merely listing claims.",
        "Organization: uses a logical progression, focused paragraphs, and purposeful transitions.",
        "Language Use and Conventions: uses precise language, varied sentences, and controlled Standard English.",
      ],
    },
    hint: "Spend several minutes naming the value behind each perspective, then choose a position you can qualify and support rather than searching for a predetermined side.",
    explanation: "There is no single required position. A strong response presents a clear thesis, analyzes another perspective fairly, develops reasons with specific support, and maintains purposeful organization and clear language.",
    solutionSteps: [
      "Read the issue and label each perspective's main value, assumption, and likely consequence.",
      "Choose a position that can be stated in one qualified sentence; decide whether it agrees, partly agrees, or disagrees with at least one perspective.",
      "Plan two or three body claims, pairing each with a specific example and an explanation of why the example supports the thesis.",
      "Address a counterargument or limitation fairly, then explain the standard or evidence that resolves it.",
      "Reserve time to check paragraph order, transitions, sentence clarity, grammar, and punctuation.",
    ],
    strategy: "Use roughly 8 minutes to analyze and outline, 27 minutes to draft, and 5 minutes to revise. Depth on two well-explained reasons is more reliable than a long list of undeveloped points.",
    trap: "Do not merely summarize the three perspectives or announce agreement. The essay must develop the writer's own position and analyze relationships among ideas.",
    estimatedSeconds: 2400,
    principles: [
      "A defensible thesis may be qualified; it need not match any supplied perspective exactly.",
      "Examples become evidence only when the essay explains their relevance.",
      "Counterargument analysis should be accurate and connected to the thesis.",
    ],
    format: "essay-prompt",
    tags: ["optional-section", "self-evaluated", "rubric-guided"],
    verification: null,
  };
}

const completed = generateSection("act-writing", generate, {
  generatorName: "act-writing-generator-v1",
  regenerateGenerated: process.argv.includes("--rebuild"),
  finalMultipleChoiceCount: 0,
});
console.log(
  `ACT Writing: kept ${completed.existing}, generated ${completed.generated}, total ${completed.total}.`,
);
