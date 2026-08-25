"use strict";

module.exports = {
  id: "act-english-p030",
  type: "informative-essay",
  title: "The Air Has",
  content: `[1] On a still night a train two miles {1 off is audible and} at noon
the same train is not. The train has not changed. The air {2 has}.

[2] {3 Nevertheless,} sound travels faster through warm air than through cold.
That single fact explains most of what follows, because a sound wave crossing
air of uneven temperature does not {4 travel} in a straight line: the part of
the wave in warmer air outruns the part in cooler {5 air, the whole front
tilts}.

[3] During the day the ground absorbs sunlight and warms the air directly above
it, which leaves a layer near the surface warmer than the air {6 that is located
higher up above it}. {7 Leaving a source near the ground, the bottom of the
wavefront moves fastest and the front tilts upward.} Within a few hundred metres
the sound has bent away over the listener's head, and there is a zone into which
almost nothing arrives.

[4] {8 Similarly,} after sunset the ground radiates its heat away and cools
faster than the air above it. The arrangement inverts: cold at the bottom,
warmer higher up. Now the top of the wavefront is the fast part, the front tilts
downward, and sound that would have escaped upward is bent back toward the
ground, where {9 it} {10 keeps on}.

[5] The night is also quieter and the wind is {11 steadier, both of those
help}. But neither is why the train can be heard. It can be heard because the
air over the field has turned into a lens.`,
  questions: [
    {
      number: 1,
      subskill: "commas",
      family: "comma-before-a-coordinating-conjunction",
      difficulty: "Easy",
      keep: false,
      key: "off is audible, and",
      noChange: "Two independent clauses joined by 'and' need a comma before the conjunction.",
      wrong: [
        ["off is audible; and", "A semicolon and a coordinating conjunction do the same job, so both is redundant."],
        ["off, is audible and", "The comma now separates the subject from its own verb."],
      ],
      why:
        "'A train two miles off is audible' and 'at noon the same train is not' are both complete " +
        "clauses, so the 'and' between them takes a comma.",
      steps: [
        "Check whether the words on each side of 'and' could stand alone. They could.",
        "Place a comma immediately before the conjunction.",
      ],
      hint: "The second clause has its own subject and verb, however short it looks.",
      trap: "The opening phrase already sets a rhythm that makes another pause feel excessive.",
    },
    {
      number: 2,
      subskill: "subject-verb agreement",
      family: "elliptical-verb-agreement",
      difficulty: "Medium",
      keep: true,
      wrong: [
        ["have", "The plural verb does not agree with the singular mass noun 'The air.'"],
        ["had", "The past perfect breaks the parallel with 'has not changed' in the sentence before."],
        ["does", "The substituted auxiliary does not match 'has changed,' which the clause completes."],
      ],
      why:
        "The sentence completes 'The train has not changed' with its opposite, so it needs the same " +
        "auxiliary, and 'The air' is singular.",
      steps: [
        "Read the previous sentence and note the auxiliary it uses.",
        "Match it, and check the subject's number.",
      ],
      hint: "The two sentences are a matched pair; the second borrows the first's verb.",
      trap: "The clause is two words long, which leaves nothing nearby to check the agreement against.",
    },
    {
      number: 3,
      subskill: "transitions",
      family: "concession-versus-opening-transition",
      difficulty: "Medium",
      keep: false,
      key: "To begin with,",
      noChange: "'Nevertheless' concedes something, but nothing has been claimed for it to answer.",
      wrong: [
        ["Consequently,", "The behaviour of sound in warm air is not caused by the train being audible."],
        ["In contrast,", "The paragraph begins the explanation rather than opposing the first paragraph."],
      ],
      why:
        "Paragraph 1 poses a puzzle and paragraph 2 starts answering it. The transition should mark " +
        "the first step of an explanation.",
      steps: [
        "Ask what this paragraph does: it begins an account.",
        "Choose the transition that marks a beginning.",
      ],
      hint: "The sentence supplies a foundational fact, and the paragraph builds on it.",
      trap: "'Nevertheless' sounds considered and answers an objection nobody made.",
    },
    {
      number: 4,
      subskill: "verb forms",
      family: "present-tense-for-a-standing-fact",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["travels", "The verb must stay in the base form after the auxiliary 'does not.'"],
        ["travelled", "The past tense breaks the present-tense explanation and follows 'does not' wrongly."],
        ["be travelling", "The progressive cannot follow 'does not' in standard usage."],
      ],
      why:
        "'Does not' requires the base form of the verb, and the paragraph states a physical fact in " +
        "the present tense.",
      steps: [
        "Note the auxiliary in front of the verb: 'does not.'",
        "Use the base form that must follow it.",
      ],
      hint: "The auxiliary already carries the tense, so the main verb stays plain.",
      trap: "The singular subject invites an -s ending the auxiliary has already absorbed.",
    },
    {
      number: 5,
      subskill: "clause relationships",
      family: "comma-splice",
      difficulty: "Medium",
      keep: false,
      key: "air, and the whole front tilts",
      noChange: "Two independent clauses are joined by a comma with no conjunction.",
      wrong: [
        [
          "air, the whole front tilting",
          "The participle leaves the second half without a main verb of its own.",
        ],
        [
          "air; and the whole front tilts",
          "A semicolon and a coordinating conjunction do the same job, so both together is redundant.",
        ],
      ],
      why:
        "Both halves are complete clauses. The tilt is the consequence of the outrunning, and a comma " +
        "with 'and' joins them without breaking the sentence that has already run through a colon.",
      steps: [
        "Test each side of the comma as a sentence. Both stand.",
        "Add a coordinating conjunction after the comma.",
      ],
      hint: "The sentence has already used its colon; the second join has to be lighter.",
      trap: "The colon earlier makes the sentence feel fully punctuated already.",
    },
    {
      number: 6,
      subskill: "conciseness",
      family: "stacked-redundancy",
      difficulty: "Easy",
      keep: false,
      key: "higher up",
      noChange: "'That is located' and 'above it' both restate what 'higher up' already says.",
      wrong: [
        ["that is higher up above it", "'Above it' still repeats the direction 'higher up' supplies."],
        ["located higher up", "'Located' adds a word without adding any information."],
      ],
      why:
        "'Higher up' states the position completely. The relative clause and the second prepositional " +
        "phrase each repeat part of it.",
      steps: [
        "Strike every phrase that repeats the position already given.",
        "Keep the two words that carry it.",
      ],
      hint: "Two separate redundancies are stacked here, not one.",
      trap: "The longer phrasing reads as careful description rather than as padding.",
    },
    {
      number: 7,
      subskill: "modifiers",
      family: "dangling-participle",
      difficulty: "Hard",
      keep: false,
      key: "Leaving a source near the ground, sound moves fastest at the bottom of its own wavefront, and the front tilts upward.",
      noChange: "The opening phrase describes the sound, but the noun after the comma is 'the bottom.'",
      wrong: [
        [
          "Leaving a source near the ground, the front tilts upward as the bottom of the wavefront moves fastest.",
          "The phrase now describes 'the front,' which is produced by the sound rather than leaving the source.",
        ],
        [
          "Left near the ground by its source, the bottom of the wavefront moves fastest and the front tilts upward.",
          "The passive participle still lands on 'the bottom,' which is not what the source released.",
        ],
      ],
      why:
        "A participial phrase at the head of a sentence attaches to the first noun after the comma. " +
        "Sound leaves the source; a part of a wavefront does not.",
      steps: [
        "Ask what leaves a source near the ground. The sound does.",
        "Rewrite so 'sound' follows the comma.",
      ],
      hint: "Read the opening phrase, then the first noun after the comma, and see if they match.",
      trap: "The sentence describes the physics correctly, so nothing sounds factually wrong.",
    },
    {
      number: 8,
      subskill: "transitions",
      family: "comparison-versus-contrast-transition",
      difficulty: "Medium",
      keep: false,
      key: "At night, though,",
      noChange: "'Similarly' claims a likeness, but this paragraph describes the reverse arrangement.",
      wrong: [
        ["Consequently,", "The ground cooling after sunset is not caused by the daytime warming."],
        ["For instance,", "Night is not an example of the daytime case but its opposite."],
      ],
      why:
        "Paragraph 3 describes sound bending upward by day. This paragraph describes it bending " +
        "downward at night, so the transition has to mark the reversal.",
      steps: [
        "Ask how this paragraph relates to the last: it inverts it.",
        "Choose the transition that marks contrast.",
      ],
      hint: "The sentence after this one says the arrangement 'inverts.'",
      trap: "The two paragraphs are structurally parallel, which makes 'Similarly' feel apt.",
    },
    {
      number: 9,
      subskill: "pronouns",
      family: "pronoun-with-a-clear-antecedent",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["they", "The plural pronoun does not agree with the singular mass noun 'sound.'"],
        ["that", "The bare demonstrative points at the clause rather than at a noun."],
        ["the ground", "Naming the ground reverses the meaning, since the sound is what continues."],
      ],
      why:
        "The pronoun refers to 'sound,' the subject of the clause it belongs to, and sound is a mass " +
        "noun taking singular agreement.",
      steps: [
        "Find what is bent back toward the ground: the sound.",
        "Keep the singular pronoun that matches it.",
      ],
      hint: "The subject of the clause before the comma is the antecedent.",
      trap: "'Metres' and 'wavefronts' appear in the plural nearby and colour the ear.",
    },
    {
      number: 10,
      subskill: "precision",
      family: "vague-idiom",
      difficulty: "Medium",
      keep: false,
      key: "carries",
      noChange: "'Keeps on' is vague and does not name what the sound does over distance.",
      wrong: [
        ["goes on for a while", "The phrase adds a hedge and still names no behaviour."],
        ["continues to be present", "The wording is longer and less exact than a single verb."],
      ],
      why:
        "The essay's whole subject is sound reaching a distant listener. 'Carries' is the verb for " +
        "that, and it answers the train in the first paragraph.",
      steps: [
        "Ask what the paragraph has been explaining: why sound reaches far at night.",
        "Use the verb that names travelling a distance.",
      ],
      hint: "The right verb is the one the first paragraph's train would need.",
      trap: "'Keeps on' is idiomatic and reads as a natural close to the sentence.",
    },
    {
      number: 11,
      subskill: "semicolons and colons",
      family: "semicolon-between-balanced-clauses",
      difficulty: "Hard",
      keep: false,
      key: "steadier; both of those help",
      noChange: "A comma alone cannot join two independent clauses of equal weight.",
      wrong: [
        [
          "steadier: both of those help",
          "A colon introduces an explanation, but the second clause simply adds a verdict.",
        ],
        [
          "steadier and both of those help",
          "Without a comma before 'and' the two clauses run together unpunctuated.",
        ],
      ],
      why:
        "Both clauses are complete — what else is true of night, and the verdict on it. A semicolon " +
        "joins equals and keeps the concession compact before the sentence that overturns it.",
      steps: [
        "Confirm both sides stand alone as sentences. They do.",
        "Ask whether the second explains the first or judges it. It judges.",
      ],
      hint: "The clause is a concession the next sentence takes back; it should stay tight.",
      trap: "The clauses are short, which makes a comma feel sufficient.",
    },
    {
      number: 12,
      subskill: "organization",
      family: "paragraph-move",
      difficulty: "Hard",
      stem:
        "The writer is considering moving Paragraph 2 so that it appears immediately after " +
        "Paragraph 4. Should the writer make this change?",
      key: "No, because Paragraphs 3 and 4 both depend on the fact that warm air carries sound faster.",
      wrong: [
        [
          "No, because Paragraph 2 is the only paragraph that does not mention temperature.",
          "Paragraph 2 is entirely about temperature, so the stated reason is false.",
        ],
        [
          "Yes, because the essay would then describe the daytime case before explaining any theory.",
          "Describing the effect before its cause is what makes the daytime case unreadable.",
        ],
        [
          "Yes, because the closing paragraph already summarises the principle involved.",
          "The closing calls the air a lens, which assumes the principle rather than stating it.",
        ],
      ],
      why:
        "Paragraph 2 supplies the single fact — speed varies with temperature — that both the daytime " +
        "and the night-time paragraphs apply. Moving it after them leaves both without a premise.",
      steps: [
        "Identify what Paragraph 2 establishes and where it is used.",
        "Check whether the paragraphs after it could be read without it. They could not.",
      ],
      hint: "Ask which paragraphs depend on this one, not which one reads best first.",
      trap: "The essay's most striking material is in Paragraphs 3 and 4, which invites leading with it.",
    },
    {
      number: 13,
      subskill: "purpose",
      family: "goal-assessment",
      difficulty: "Hard",
      stem:
        "Suppose the writer's goal had been to explain a familiar experience by showing that the " +
        "thing that changed was not the thing being observed. Would this essay accomplish that goal?",
      key: "Yes, because it opens by stating the train has not changed and closes by calling the air a lens.",
      wrong: [
        [
          "Yes, because it explains that the ground radiates its heat away after sunset.",
          "The cooling is one step in the mechanism, not the essay's claim about what changed.",
        ],
        [
          "No, because the essay concedes that the night is quieter and the wind is steadier.",
          "It raises both only to say neither is the reason, which sharpens the claim.",
        ],
        [
          "No, because a listener at midnight is in a different position from one at noon.",
          "The essay places the same listener and the same train in both cases.",
        ],
      ],
      why:
        "The first paragraph rules out the train in three words and the last rules out quiet and wind " +
        "before naming the air. Everything between explains how air becomes a lens.",
      steps: [
        "Read the first and last paragraphs together and note what each rules out.",
        "Keep the reason that names both ends of that frame.",
      ],
      hint: "The essay's argument is stated twice, at the beginning and at the end.",
      trap: "One wrong choice cites a real concession and mistakes it for a contradiction.",
    },
  ],
};
