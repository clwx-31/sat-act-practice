"use strict";

module.exports = {
  id: "act-english-p014",
  type: "informative-essay",
  title: "A Workshop, Not a Millennium",
  content: `[1] Tour guides say {1 it and so do} a good many textbooks: the window
glass in very old buildings {2 are} thicker at the bottom because glass is
really a liquid, and across centuries it has crept downward. It is a wonderful
explanation. It is also wrong.

[2] {3} Glass {4 is} not a liquid in any sense a person standing in a cathedral
would recognize. It is an amorphous solid: its molecules sit without the regular
repeating pattern of a {5 crystal, this is why it fractures} the way it does.
Estimates of how far room-temperature window glass would flow in a thousand
years give numbers {6 that are too small in size to be measured at all}.

[3] The real explanation is in how the panes were made. Before the nineteenth
century most window glass came from the crown method, in which a glassblower
{7 gathered a blob of molten glass, spun it on the end of a rod, and cut panes
from the disc it became}. {8 Spun fast enough, the glassblower opened the blob
into a wide flat disc.} A disc made that way is thin near its rim and
{9 more thick as you go in}.

[4] {10 Nevertheless,} a glazier setting those panes had a choice to make. Most
of them set the heavier edge {11 down, it is steadier in the frame and easier to
seal.} That is a workshop habit rather than a law of physics, and it shows:
plenty of surviving panes are thicker at the top, and some of {12 them} are
thicker along one side.

[5] {13} The myth lasts because it explains something true with something
satisfying. The panes really are uneven. {14} The reason is a workshop, not a
millennium.`,
  questions: [
    {
      number: 1,
      subskill: "commas",
      family: "comma-before-a-coordinating-conjunction",
      difficulty: "Easy",
      keep: false,
      key: "it, and so do",
      noChange: "Two independent clauses joined by 'and' need a comma before the conjunction.",
      wrong: [
        ["it; and so do", "A semicolon and a coordinating conjunction do the same job, so both is redundant."],
        ["it and so do,", "The comma now falls after the conjunction and before its own subject."],
      ],
      why:
        "'Tour guides say it' and 'so do a good many textbooks' are both complete clauses, so the " +
        "'and' joining them takes a comma before it.",
      steps: [
        "Check whether the words on each side of 'and' could stand alone. They could.",
        "Place a comma immediately before the conjunction.",
      ],
      hint: "The inverted second clause still has a subject and a verb.",
      trap: "'So do' is short and reads as a fragment rather than as a full clause.",
    },
    {
      number: 2,
      subskill: "subject-verb agreement",
      family: "subject-across-a-prepositional-phrase",
      difficulty: "Medium",
      keep: false,
      key: "is",
      noChange: "The plural verb has been matched to 'buildings' rather than to 'the window glass.'",
      wrong: [
        ["were", "The verb is still plural and the past tense breaks the present-tense claim."],
        ["have been", "The plural present perfect misses both the number and the standing assertion."],
      ],
      why:
        "The subject is 'the window glass,' a mass noun taking a singular verb. 'In very old " +
        "buildings' is a prepositional phrase and cannot supply the subject.",
      steps: [
        "Cross out 'in very old buildings.'",
        "Read 'the window glass … is' and match the verb.",
      ],
      hint: "Delete the phrase between the subject and the verb before deciding.",
      trap: "'Buildings' is plural and sits directly before the verb, which is where the ear listens.",
    },
    {
      number: 3,
      subskill: "introductions",
      family: "paragraph-opening",
      difficulty: "Medium",
      stem: "Which choice, if added here, provides the most effective opening for this paragraph?",
      key: "The claim fails at its first step, which is the claim about what glass is.",
      wrong: [
        [
          "Glass has been manufactured in Europe since at least the Roman period.",
          "The antiquity of glassmaking is never taken up again anywhere in the essay.",
        ],
        [
          "Physicists and materials scientists have studied the structure of glass for decades.",
          "Who has studied glass is not what this paragraph goes on to establish.",
        ],
        [
          "There are a number of misconceptions about ordinary materials in everyday life.",
          "The general observation states the essay's category instead of entering its argument.",
        ],
      ],
      why:
        "Paragraph 1 ends by calling the explanation wrong. This paragraph takes apart the first half " +
        "of it, so the opening should say which half is being taken apart.",
      steps: [
        "Note what the previous paragraph asserts: the explanation is wrong.",
        "Choose the opening that begins showing where it is wrong.",
      ],
      hint: "The paragraph is a refutation; its first sentence should name what is being refuted.",
      trap: "Every choice is true about glass, so accuracy does not narrow the field.",
    },
    {
      number: 4,
      subskill: "verb forms",
      family: "present-tense-for-a-standing-fact",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["was", "The past tense would confine a permanent property of glass to some earlier time."],
        ["has been", "The present perfect implies a span that began and might end."],
        ["is being", "The progressive suggests a temporary state rather than what glass simply is."],
      ],
      why:
        "The sentence states what glass is, always. The simple present is the tense for a standing " +
        "physical fact, and the paragraph around it uses that tense throughout.",
      steps: [
        "Check the tense of the verbs nearby: 'is,' 'sit,' 'give.' All simple present.",
        "Keep the underlined verb in that tense.",
      ],
      hint: "A property of a material does not belong to any particular time.",
      trap: "The sentence is refuting a historical claim, which invites a past tense.",
    },
    {
      number: 5,
      subskill: "clause relationships",
      family: "comma-splice",
      difficulty: "Medium",
      keep: false,
      key: "crystal, which is why it fractures",
      noChange: "Two independent clauses are joined by a comma with no conjunction.",
      wrong: [
        [
          "crystal, that is why it fractures",
          "'That is' begins a new independent clause, so the splice is unchanged.",
        ],
        [
          "crystal and this is why it fractures",
          "Without a comma before 'and' the two clauses run together unpunctuated.",
        ],
      ],
      why:
        "Replacing the demonstrative with the relative pronoun 'which' turns the second half into a " +
        "clause that depends on the first, which is what the sentence means.",
      steps: [
        "Test each side of the comma as a sentence. Both stand, so it is a splice.",
        "Subordinate the second half rather than leaving it independent.",
      ],
      hint: "The second half explains the first, so make it grammatically dependent on it.",
      trap: "'This is why' is such a natural phrase that it does not read as a new sentence.",
    },
    {
      number: 6,
      subskill: "conciseness",
      family: "stacked-redundancy",
      difficulty: "Easy",
      keep: false,
      key: "too small to measure",
      noChange: "'In size,' 'to be measured,' and 'at all' each repeat something already stated.",
      wrong: [
        ["that are too small to be measured", "The relative clause and passive add words without meaning."],
        ["too small in size to measure", "'In size' repeats what 'small' has already established."],
      ],
      why:
        "'Small' already concerns size, and 'too small to measure' already means measurement fails. " +
        "Every remaining word restates one of those two ideas.",
      steps: [
        "Strike each phrase that repeats an idea the sentence already carries.",
        "Keep the shortest version that still says it.",
      ],
      hint: "Three separate redundancies are stacked here, not one.",
      trap: "The long version sounds rigorous, and rigor is what a science paragraph seems to want.",
    },
    {
      number: 7,
      subskill: "parallelism",
      family: "parallel-verb-series",
      difficulty: "Hard",
      keep: true,
      wrong: [
        [
          "gathered a blob of molten glass, spinning it on the end of a rod, and cut panes from the disc it became",
          "The middle item shifts to an -ing form the other two do not use.",
        ],
        [
          "gathered a blob of molten glass, spun it on the end of a rod, and panes were cut from the disc it became",
          "The third item becomes a passive clause with a different subject.",
        ],
        [
          "would gather a blob of molten glass, spun it on the end of a rod, and cut panes from the disc it became",
          "The first item takes a modal the other two do not share.",
        ],
      ],
      why:
        "Three past-tense verbs share the subject 'a glassblower' and describe one continuous " +
        "operation. Repeating the form is what holds the sequence together.",
      steps: [
        "Read 'a glassblower' into each of the three items in turn.",
        "Keep the version in which all three are simple past.",
      ],
      hint: "In a series, compare the first word of each item before anything else.",
      trap: "The items are long, which makes the mismatch in the middle hard to hear.",
    },
    {
      number: 8,
      subskill: "modifiers",
      family: "dangling-participle",
      difficulty: "Hard",
      keep: false,
      key: "Spun fast enough, the blob opened into a wide flat disc.",
      noChange: "The opening phrase describes the blob, but the noun after the comma is the glassblower.",
      wrong: [
        [
          "Spinning fast enough, the glassblower opened the blob into a wide flat disc.",
          "The active form is grammatical but says the glassblower was the thing spinning.",
        ],
        [
          "Spun fast enough, a wide flat disc was opened out of the blob.",
          "The phrase now describes the disc, which does not exist until after the spinning.",
        ],
      ],
      why:
        "A participial phrase at the head of a sentence attaches to the first noun after the comma. " +
        "The blob is what gets spun, so the blob has to be that noun.",
      steps: [
        "Ask what is spun fast enough. The blob is.",
        "Rewrite so 'the blob' follows the comma.",
      ],
      hint: "Read the opening phrase, then the first noun after the comma, and see whether they match.",
      trap: "The glassblower really is doing the work, which makes the sentence feel accurate.",
    },
    {
      number: 9,
      subskill: "precision",
      family: "imprecise-comparative",
      difficulty: "Medium",
      keep: false,
      key: "thicker toward its center",
      noChange: "'More thick as you go in' is nonstandard and shifts to addressing the reader.",
      wrong: [
        ["thicker as you go in", "The comparative is fixed but the sentence still turns to 'you.'"],
        ["more thick toward its center", "'More thick' is not the standard comparative form of 'thick.'"],
      ],
      why:
        "'Thick' forms its comparative with -er, and the paragraph describes the disc in the third " +
        "person throughout. Both problems have to be fixed at once.",
      steps: [
        "Correct the comparative form to 'thicker.'",
        "Replace the second-person phrase with a description of the disc itself.",
      ],
      hint: "Two things are wrong here, and each wrong choice fixes only one of them.",
      trap: "Each distractor repairs half the sentence, and half a repair reads as a repair.",
    },
    {
      number: 10,
      subskill: "transitions",
      family: "consequence-versus-concession-transition",
      difficulty: "Medium",
      keep: false,
      key: "So",
      noChange: "'Nevertheless' concedes something, but the glazier's choice follows from uneven panes.",
      wrong: [
        ["Even so,", "Like 'Nevertheless,' it sets up an objection the essay is not raising."],
        ["Similarly,", "The glazier's choice is not like the manufacturing described before it."],
      ],
      why:
        "Paragraph 3 establishes that every pane came out uneven. That is precisely why a glazier had " +
        "to decide which way up to set it, so the transition marks consequence.",
      steps: [
        "State the relationship: uneven panes force the choice.",
        "Choose the transition that marks a consequence.",
      ],
      hint: "Ask whether the previous paragraph causes this one or is contradicted by it.",
      trap: "Concessive transitions sound judicious, so they get used where nothing is being conceded.",
    },
    {
      number: 11,
      subskill: "semicolons and colons",
      family: "semicolon-between-balanced-clauses",
      difficulty: "Hard",
      keep: false,
      key: "down; it is steadier in the frame and easier to seal.",
      noChange: "A comma alone cannot join two independent clauses of equal weight.",
      wrong: [
        [
          "down: it is steadier in the frame and easier to seal.",
          "A colon introduces an explanation, but the clause states a parallel practical fact.",
        ],
        [
          "down, and it is steadier in the frame, and easier to seal.",
          "The extra comma before 'and easier' breaks a two-item pair that needs none.",
        ],
      ],
      why:
        "Both clauses are complete and carry equal weight — what glaziers did, and why it worked. A " +
        "semicolon joins equals without subordinating either.",
      steps: [
        "Confirm both sides stand alone as sentences. They do.",
        "Join them with the mark that keeps them equal.",
      ],
      hint: "Two full sentences of similar weight are what a semicolon is for.",
      trap: "The second clause gives a reason, which points the eye toward a colon.",
    },
    {
      number: 12,
      subskill: "pronouns",
      family: "plural-antecedent",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["it", "The singular pronoun cannot stand for the plural noun 'panes.'"],
        ["those", "The demonstrative points outward instead of back to a noun in the sentence."],
        ["which", "A relative pronoun cannot be the object of the preposition 'of' here."],
      ],
      why:
        "The pronoun refers to 'surviving panes,' the plural noun in the first half of the sentence, " +
        "so the plural object pronoun is correct.",
      steps: [
        "Find what some of are thicker along one side: the panes.",
        "Match the pronoun to that noun in number.",
      ],
      hint: "'Some of' requires a plural to draw from.",
      trap: "'Glass' appears throughout the essay as a singular mass noun, which colors the ear.",
    },
    {
      number: 13,
      subskill: "relevance",
      family: "irrelevant-detail",
      difficulty: "Medium",
      stem:
        "At this point, the writer is considering adding the following true sentence: “Obsidian, a " +
        "naturally occurring volcanic glass, is also an amorphous solid.” Should the writer make " +
        "this addition?",
      key: "No, because the paragraph is about why a false explanation persists, not about other glasses.",
      wrong: [
        [
          "Yes, because it reinforces the second paragraph's point about the structure of glass.",
          "Reinforcing an earlier paragraph is not what this closing paragraph is doing.",
        ],
        [
          "Yes, because it shows that glass occurs in nature as well as in workshops.",
          "Where glass comes from has no bearing on why the myth about windows survives.",
        ],
        [
          "No, because the essay has already established that obsidian is not window glass.",
          "The essay never mentions obsidian, so the reason describes something absent.",
        ],
      ],
      why:
        "The final paragraph explains the myth's durability: it accounts for a real observation with " +
        "a memorable story. A second example of amorphous solids does not serve that.",
      steps: [
        "Name what the paragraph is doing: explaining why a wrong idea sticks.",
        "Test the sentence against that purpose rather than against its accuracy.",
      ],
      hint: "A true sentence can still belong to a different paragraph.",
      trap: "The sentence genuinely does relate to paragraph 2, which is not the paragraph it is in.",
    },
    {
      number: 14,
      subskill: "support",
      family: "supporting-detail",
      difficulty: "Hard",
      stem:
        "Given that all the choices are true, which one, if added here, most effectively supports " +
        "the paragraph's explanation of why the myth is so durable?",
      key: "A story about centuries of slow motion is easier to hold onto than a fact about how a disc was cut.",
      wrong: [
        [
          "Cathedral windows are among the oldest surviving glass in Europe.",
          "The age of the windows is what the myth explains, not why the myth is memorable.",
        ],
        [
          "The cylinder method eventually replaced the crown method in most European glassworks.",
          "A change in manufacturing technique says nothing about the persistence of a belief.",
        ],
        [
          "Some museums have measured the thickness of individual panes at top and bottom.",
          "Measurements are evidence against the myth, not an account of why it survives.",
        ],
      ],
      why:
        "The paragraph claims the myth lasts because it is satisfying. The support has to say what " +
        "makes it satisfying, which is that it is a better story than the true explanation.",
      steps: [
        "Name the claim: the myth survives on its appeal, not its accuracy.",
        "Keep the choice that describes that appeal.",
      ],
      hint: "The question asks why people keep the idea, not whether the idea is false.",
      trap: "The measurement choice is the most rigorous and answers the wrong question entirely.",
    },
    {
      number: 15,
      subskill: "purpose",
      family: "goal-assessment",
      difficulty: "Hard",
      stem:
        "Suppose the writer's goal had been to correct a common belief while explaining what the " +
        "belief got right. Would this essay accomplish that goal?",
      key: "Yes, because it rejects the flowing-glass account while confirming that the panes really are uneven.",
      wrong: [
        [
          "Yes, because it establishes that glass is an amorphous solid rather than a crystal.",
          "That distinction refutes the belief; it does not identify what the belief got right.",
        ],
        [
          "No, because the essay concludes that the common belief is entirely mistaken.",
          "The essay says the observation is correct and only the explanation is wrong.",
        ],
        [
          "No, because the essay concerns glassmaking technique rather than the belief itself.",
          "The technique is how the essay explains the observation the belief was built on.",
        ],
      ],
      why:
        "The observation is sound: old panes really are thicker at one edge. What fails is the reason, " +
        "and the essay replaces it with the crown method and a glazier's habit.",
      steps: [
        "Separate what the belief observes from what it claims causes the observation.",
        "Keep the reason that credits the first and rejects the second.",
      ],
      hint: "The essay's last three sentences perform exactly this separation.",
      trap: "One wrong choice reads the essay as a flat debunking, which is the half it is not.",
    },
  ],
};
