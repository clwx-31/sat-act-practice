"use strict";

module.exports = {
  id: "act-english-p021",
  type: "personal-essay",
  title: "Everything in the Second Drawer",
  content: `[1] My uncle died in February and left me his {1 toolbox which} was
not a gift so much as a problem in a steel case. It {2 weighed} sixty pounds. It
came with no list.

[2] {3} I knew roughly eleven of the tools. The rest were shapes. There
{4 was} a thing like a flattened spoon, a thing like a pair of pliers that had
been stepped on, and {5 four wooden-handled objects in the second drawer that I
could not have named under oath}.

[3] I could have looked them all up in {6 an afternoon's time of about an hour
or two}. I did not. Instead I left the drawer {7 shut, I used the eleven I
already knew}, and for most of a year the toolbox was a box with eleven tools in
it and a locked room underneath.

[4] {8 Similarly,} what changed was a broken window sash. The cord had snapped
somewhere inside the frame, and reaching it meant prying off a strip of moulding
without splitting it, and nothing I owned would do that without leaving a scar.
I opened the second drawer because I had run out of {9 other stuff to try}.
{10 Bevelled thin enough to slide under a layer of paint, I found that the
flattened spoon was a pry bar.} It took the moulding off in one {11 piece, the
cord was replaced} in twenty minutes.

[5] {12} After that I stopped looking things up and started running into them. A
tool means nothing until you have the problem it solves. My {13 uncle's}
toolbox was not a set of tools. I {14 think} of it now as a set of problems he
had already had.

[6] {15} There are still two things in that drawer I have not identified. I am
waiting.`,
  questions: [
    {
      number: 1,
      subskill: "commas",
      family: "nonrestrictive-clause",
      difficulty: "Easy",
      keep: false,
      key: "toolbox, which",
      noChange: "A nonrestrictive clause beginning with 'which' needs a comma before it.",
      wrong: [
        ["toolbox that", "'That' introduces a restrictive clause, implying he owned more than one toolbox."],
        ["toolbox, that", "A comma cannot precede 'that,' which introduces only restrictive clauses."],
      ],
      why:
        "There is one toolbox, already identified by 'his,' so the clause adds information rather " +
        "than picking one out. Such a clause takes 'which' and a comma.",
      steps: [
        "Ask whether the clause identifies which toolbox or describes the only one. It describes.",
        "Use 'which' with a comma in front of it.",
      ],
      hint: "If the noun is already identified, the clause that follows is nonrestrictive.",
      trap: "The sentence reads smoothly without the comma, so nothing sounds missing.",
    },
    {
      number: 2,
      subskill: "verb forms",
      family: "simple-past-in-a-narrative",
      difficulty: "Medium",
      keep: true,
      wrong: [
        ["weighs", "The present tense conflicts with the past-tense narration around it."],
        ["had weighed", "The past perfect places the weight before an earlier past that is never named."],
        ["was weighing", "The progressive suggests a temporary condition rather than a fixed property."],
      ],
      why:
        "The paragraph narrates in the simple past — 'died,' 'left,' 'came.' A fixed property " +
        "reported inside that narration takes the same tense.",
      steps: [
        "Check the tense of the verbs around it.",
        "Keep the simple past that matches them.",
      ],
      hint: "Match the tense the paragraph is already using.",
      trap: "The toolbox still weighs sixty pounds, which makes the present tense feel more accurate.",
    },
    {
      number: 3,
      subskill: "introductions",
      family: "paragraph-opening",
      difficulty: "Medium",
      stem: "Which choice, if added here, provides the most effective opening for this paragraph?",
      key: "The trouble with inheriting tools is that they arrive without their reasons.",
      wrong: [
        [
          "My uncle had worked as a finish carpenter for most of his adult life.",
          "His trade is never taken up again and explains nothing about the drawer.",
        ],
        [
          "Steel toolboxes of that era were built to outlast the people who owned them.",
          "The construction of the box is not what this paragraph goes on to describe.",
        ],
        [
          "There were a number of things about the toolbox that I did not understand.",
          "The vague plural restates the paragraph's content instead of framing it.",
        ],
      ],
      why:
        "Paragraph 1 ends on 'It came with no list.' This paragraph is about what that absence meant, " +
        "so the opening should name it.",
      steps: [
        "Read the last sentence of paragraph 1 and note what it withholds.",
        "Choose the opening that turns that absence into the paragraph's subject.",
      ],
      hint: "The previous paragraph ends on a lack; the opening should say what the lack costs.",
      trap: "The detail about his trade is the most human choice and leads nowhere in the essay.",
    },
    {
      number: 4,
      subskill: "subject-verb agreement",
      family: "expletive-there-agreement",
      difficulty: "Easy",
      keep: false,
      key: "were",
      noChange: "With 'there' as the placeholder, the verb agrees with the plural list that follows.",
      wrong: [
        ["is", "The verb is still singular and the present tense breaks the past-tense narration."],
        ["has been", "The singular present perfect misses both the number and the time frame."],
      ],
      why:
        "In a sentence beginning 'There,' the real subject comes after the verb. Here it is a series " +
        "of three items, which is plural.",
      steps: [
        "Look past the verb for the real subject: a thing, a thing, and four objects.",
        "Match the verb to that plural.",
      ],
      hint: "'There' is never the subject; find the noun that follows the verb.",
      trap: "The first item in the series is singular and sits closest to the verb.",
    },
    {
      number: 5,
      subskill: "parallelism",
      family: "parallel-noun-series",
      difficulty: "Medium",
      keep: false,
      key: "four wooden-handled objects that I could not have named under oath",
      noChange: "The third item carries a location phrase the first two do not, breaking the pattern.",
      wrong: [
        [
          "in the second drawer four wooden-handled objects I could not have named under oath",
          "Moving the phrase to the front makes the mismatch with the first two items worse.",
        ],
        [
          "four wooden-handled objects, in the second drawer, that I could not have named under oath",
          "Setting the phrase off with commas leaves it interrupting the item's own clause.",
        ],
      ],
      why:
        "The series lists three unidentifiable things, each described by what it resembles or is. " +
        "The drawer is named in the next paragraph, so the third item does not need it here.",
      steps: [
        "Read the three items in isolation and compare their shapes.",
        "Cut from the third whatever the first two do not carry.",
      ],
      hint: "The paragraph after this one already establishes which drawer.",
      trap: "The location is a real detail, which makes deleting it feel like losing specificity.",
    },
    {
      number: 6,
      subskill: "conciseness",
      family: "self-contradicting-measure",
      difficulty: "Easy",
      keep: false,
      key: "an afternoon",
      noChange: "'An afternoon's time of about an hour or two' names two different durations at once.",
      wrong: [
        ["an afternoon's time", "'Time' repeats what the unit 'afternoon' already supplies."],
        ["about an hour or two of an afternoon", "The phrase still stacks one duration inside another."],
      ],
      why:
        "An afternoon is already a length of time, and it is not one or two hours. The stacked " +
        "phrasing is both redundant and inconsistent with itself.",
      steps: [
        "Notice that the phrase gives two incompatible durations.",
        "Keep the single unit that carries the meaning.",
      ],
      hint: "When a phrase measures the same thing twice, the measurements should at least agree.",
      trap: "The hedging sounds precise, which is how contradictory precision survives.",
    },
    {
      number: 7,
      subskill: "clause relationships",
      family: "comma-splice",
      difficulty: "Medium",
      keep: false,
      key: "shut and used the eleven I already knew",
      noChange: "Two independent clauses are joined by a comma with no conjunction.",
      wrong: [
        [
          "shut, and I used the eleven I already knew,",
          "The added subject is correct but the trailing comma cuts the series that follows.",
        ],
        [
          "shut; I used the eleven I already knew",
          "A semicolon repairs the splice but severs the two halves of one continuous action.",
        ],
      ],
      why:
        "'Left' and 'used' share the subject 'I,' so the sentence can drop the second subject " +
        "entirely and run them as a compound predicate, which is what the rest of the sentence needs.",
      steps: [
        "Notice that both verbs belong to the same subject.",
        "Join them without a comma so the sentence can continue into its third clause.",
      ],
      hint: "The sentence has a third part after this; the fix has to leave room for it.",
      trap: "The semicolon is the reflex repair and stops the sentence dead in the middle.",
    },
    {
      number: 8,
      subskill: "transitions",
      family: "comparison-versus-sequence-transition",
      difficulty: "Medium",
      keep: false,
      key: "In the end,",
      noChange: "'Similarly' claims a likeness, but this paragraph reports what finally broke the habit.",
      wrong: [
        ["Consequently,", "The broken sash was not caused by anything in the previous paragraph."],
        ["For instance,", "The sash is not an example of leaving the drawer shut; it is what ended it."],
      ],
      why:
        "Paragraph 3 describes a year of avoidance. This paragraph names the thing that ended it, so " +
        "the transition should mark arrival rather than resemblance.",
      steps: [
        "Ask what this paragraph does to the previous one: it ends the situation described there.",
        "Choose the transition that marks that arrival.",
      ],
      hint: "Name the relationship in your own words before reading the choices.",
      trap: "'Similarly' is doing nothing at all, and words doing nothing are easy to read past.",
    },
    {
      number: 9,
      subskill: "precision",
      family: "vague-noun",
      difficulty: "Easy",
      keep: false,
      key: "alternatives",
      noChange: "'Other stuff to try' is casual and vague in a sentence that turns the essay.",
      wrong: [
        ["other things I could try", "The phrasing is longer and no more exact than the original."],
        ["additional options of some kind", "'Of some kind' adds vagueness rather than removing it."],
      ],
      why:
        "This is the sentence in which the narrator gives in. A single precise noun states the " +
        "condition — nothing else was left — without softening it.",
      steps: [
        "Ask what the narrator had actually run out of.",
        "Use the one noun that names it.",
      ],
      hint: "The essay's voice elsewhere is plain and exact; match it here.",
      trap: "'Stuff' sounds conversational, which can read as the essay's natural register.",
    },
    {
      number: 10,
      subskill: "modifiers",
      family: "dangling-participle",
      difficulty: "Hard",
      keep: false,
      key: "Bevelled thin enough to slide under a layer of paint, the flattened spoon was a pry bar.",
      noChange: "The opening phrase describes the spoon, but the noun after the comma is 'I.'",
      wrong: [
        [
          "Bevelling it thin enough to slide under a layer of paint, the flattened spoon was a pry bar.",
          "The active form makes the spoon do the bevelling to itself.",
        ],
        [
          "Bevelled thin enough to slide under a layer of paint, I discovered a pry bar in the flattened spoon.",
          "The phrase still lands on 'I,' who was not bevelled.",
        ],
      ],
      why:
        "A participial phrase at the head of a sentence attaches to the first noun after the comma. " +
        "The spoon is what is bevelled, so the spoon has to be that noun.",
      steps: [
        "Ask what is bevelled thin. The flattened spoon is.",
        "Rewrite so 'the flattened spoon' follows the comma.",
      ],
      hint: "Read the opening phrase, then the first noun after the comma, and see if they match.",
      trap: "The narrator really did make the discovery, which makes the original feel accurate.",
    },
    {
      number: 11,
      subskill: "semicolons and colons",
      family: "semicolon-between-balanced-clauses",
      difficulty: "Hard",
      keep: false,
      key: "piece; the cord was replaced",
      noChange: "A comma alone cannot join two independent clauses of equal weight.",
      wrong: [
        [
          "piece: the cord was replaced",
          "A colon introduces an explanation, but the second clause reports the next step.",
        ],
        [
          "piece and the cord was replaced",
          "Without a comma before 'and' the two clauses run together unpunctuated.",
        ],
      ],
      why:
        "Both clauses are complete and equally weighted — what the tool did, and what became possible " +
        "because of it. A semicolon joins equals without subordinating either.",
      steps: [
        "Confirm both sides stand alone as sentences. They do.",
        "Ask whether the second explains the first or follows it. It follows.",
      ],
      hint: "Two short result clauses of similar weight want a semicolon.",
      trap: "The second clause reads like a consequence, which points the eye toward a colon.",
    },
    {
      number: 12,
      subskill: "relevance",
      family: "irrelevant-detail",
      difficulty: "Medium",
      stem:
        "At this point, the writer is considering adding the following true sentence: “Sash cords " +
        "are usually cotton and are meant to be replaced every few decades.” Should the writer make " +
        "this addition?",
      key: "No, because the essay has finished with the window and is turning to what the drawer taught.",
      wrong: [
        [
          "Yes, because it explains why the cord in the narrator's window had snapped.",
          "Why the cord failed is not a question the essay ever raises or needs answered.",
        ],
        [
          "Yes, because it demonstrates the kind of knowledge the narrator gained from the toolbox.",
          "The narrator learned what a tool was for, not the maintenance interval of a cord.",
        ],
        [
          "No, because the essay has already described how the moulding was removed.",
          "The removal is not what makes the added sentence out of place here.",
        ],
      ],
      why:
        "The window was an occasion, not a subject. This paragraph leaves it behind for the general " +
        "claim about tools and problems, and a maintenance fact pulls back toward the sash.",
      steps: [
        "Notice where the paragraph break falls and what changes across it.",
        "Test the sentence against the new subject rather than the old one.",
      ],
      hint: "Ask which paragraph the sentence would belong to, if any.",
      trap: "The detail is genuinely about the thing just described, one paragraph too late.",
    },
    {
      number: 13,
      subskill: "apostrophes",
      family: "singular-possessive",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["uncles", "The bare plural shows no possession and implies more than one uncle."],
        ["uncles'", "The plural possessive contradicts the single uncle the essay describes."],
        ["uncle", "The singular is right in number but marks no possessive relationship."],
      ],
      why:
        "One uncle owns the toolbox, so the noun takes the singular possessive: apostrophe, then s.",
      steps: [
        "Ask how many uncles the essay names. One.",
        "Keep the singular possessive.",
      ],
      hint: "Count the owners before you place the apostrophe.",
      trap: "The plural and the possessive sound identical, so the ear gives no signal.",
    },
    {
      number: 14,
      subskill: "consistency",
      family: "tense-shift-into-the-present",
      difficulty: "Medium",
      keep: true,
      wrong: [
        ["thought", "The past tense would end a view the essay says the narrator still holds."],
        ["had thought", "The past perfect places the understanding before the events that produced it."],
        ["was thinking", "The progressive describes one stretch of time rather than a settled view."],
      ],
      why:
        "The paragraph moves deliberately from what happened to how the narrator now understands it. " +
        "The present tense is what marks that the understanding is current.",
      steps: [
        "Notice the shift the paragraph makes from narration to reflection.",
        "Keep the present tense that places the reflection now.",
      ],
      hint: "A tense shift is only an error when it is unintended; here the sentence means to shift.",
      trap: "The sentences before it are past tense, which makes matching them feel like consistency.",
    },
    {
      number: 15,
      subskill: "support",
      family: "supporting-detail",
      difficulty: "Hard",
      stem:
        "Given that all the choices are true, which one, if added here, most effectively supports " +
        "the idea the essay closes on?",
      key: "I have stopped guessing what they are, because guessing is how I lost the first year.",
      wrong: [
        [
          "One of them appears to be some kind of specialised clamp.",
          "Guessing at the tool is precisely the habit the essay says it abandoned.",
        ],
        [
          "The toolbox now sits under my own workbench rather than in a closet.",
          "Where the box is kept says nothing about how the narrator now approaches it.",
        ],
        [
          "My uncle owned several tools that were no longer manufactured by anyone.",
          "The rarity of the tools is a fact about them rather than about waiting.",
        ],
      ],
      why:
        "The closing is two words long and rests entirely on why waiting is the right response. Only " +
        "one choice connects the waiting to the year the narrator wasted not waiting.",
      steps: [
        "Read the final sentence and ask what makes 'I am waiting' meaningful.",
        "Keep the choice that ties it to the essay's own argument.",
      ],
      hint: "The support has to explain the last two words, not add a fact about the drawer.",
      trap: "The choice that identifies a tool is the most concrete and contradicts the essay.",
    },
    {
      number: 16,
      subskill: "purpose",
      family: "goal-assessment",
      difficulty: "Hard",
      stem:
        "Suppose the writer's goal had been to write an essay about knowledge that cannot be " +
        "acquired in advance of needing it. Would this essay accomplish that goal?",
      key: "Yes, because a year of avoidance ended the moment a problem arrived that only the unknown tool could solve.",
      wrong: [
        [
          "Yes, because the narrator could have identified every tool in a single afternoon.",
          "That the shortcut existed is what the essay rejects, not what it demonstrates.",
        ],
        [
          "No, because the narrator admits to having left the second drawer closed for most of a year.",
          "The closed drawer is the essay's evidence, not a failure of its argument.",
        ],
        [
          "No, because the essay is about inheriting an uncle's possessions rather than about learning.",
          "The inheritance is the occasion; the essay's claim is about how tools become legible.",
        ],
      ],
      why:
        "Looking the tools up was always available and would have taught nothing. The flattened spoon " +
        "became a pry bar at the moment a strip of moulding needed prying, and not before.",
      steps: [
        "Name what the essay says looking things up would have failed to provide.",
        "Keep the reason that pairs the year of avoidance with the moment it ended.",
      ],
      hint: "The essay states its claim outright in the fifth paragraph.",
      trap: "One wrong choice cites a true fact from the essay and treats it as the counterargument.",
    },
  ],
};
