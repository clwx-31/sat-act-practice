"use strict";

module.exports = {
  id: "act-english-p035",
  type: "historical-account",
  title: "A Rule Nobody Wrote",
  content: `[1] The quiet car began as a complaint. In 1999 a group of commuters
on a Philadelphia line asked whether one car might be set aside for people who
did not want to hear anyone's telephone. The railroad agreed to try {1 it on one
train nobody} expected it to last.

[2] {2 Similarly,} the experiment had no enforcement behind it. There {3 was}
only a sign, and beyond the {4 railroad's} sign there was nothing but whatever
the passengers were willing to do.

[3] What happened next is the part worth recording. Passengers enforced it
themselves, through gestures nobody had agreed on in advance: a look, a tap on a
seatback, a finger raised to the {5 lips, the gestures were remarkably
consistent} from car to car. Within a few years riders who had never met were
policing {6 a standard that was unwritten and not written down}.

[4] {7 Consequently,} the railroad expanded the programme and other systems
copied it. {8 Some of them writing rules.} The written versions worked less
well, because a passenger enforcing a norm acts on behalf of everyone in the
car, while a passenger citing a regulation is {9 doing something else entirely}.

[5] {10} The quiet car is now standard on several American railroads and on
services in Europe and Japan. {11 Copied from line to line without central
direction, the same three gestures turn up wherever the car exists.} Nobody
{12 designed} them.`,
  questions: [
    {
      number: 1,
      subskill: "commas",
      family: "run-on-sentence",
      difficulty: "Easy",
      keep: false,
      key: "it on one train. Nobody",
      noChange: "Two complete sentences run together with no punctuation between them.",
      wrong: [
        ["it on one train, nobody", "Adding a comma turns the run-on into a comma splice."],
        ["it on one train nobody,", "The comma now falls after the new subject and before its verb."],
      ],
      why:
        "'The railroad agreed to try it on one train' and 'Nobody expected it to last' are both " +
        "complete sentences, and nothing joins them.",
      steps: [
        "Find where the first complete thought ends: after 'train.'",
        "Separate the two sentences with a full stop.",
      ],
      hint: "Read to the end of the first idea and check whether a new subject follows.",
      trap: "The two halves are closely related, which makes them feel like one sentence.",
    },
    {
      number: 2,
      subskill: "transitions",
      family: "comparison-versus-emphasis-transition",
      difficulty: "Medium",
      keep: false,
      key: "Notably,",
      noChange: "'Similarly' claims a likeness to the first paragraph, which described a request.",
      wrong: [
        ["Consequently,", "The absence of enforcement did not follow from the railroad agreeing to try."],
        ["Nevertheless,", "Nothing in the first paragraph is being conceded or contradicted."],
      ],
      why:
        "Paragraph 1 sets up an experiment. This paragraph points out the surprising thing about it — " +
        "that nothing stood behind it — so the transition should mark that emphasis.",
      steps: [
        "Ask what this paragraph does: it singles out an unexpected feature.",
        "Choose the transition that marks emphasis rather than resemblance.",
      ],
      hint: "The paragraph's content is a surprise, and the transition should signal one.",
      trap: "'Similarly' is doing nothing at all, and words doing nothing are easy to read past.",
    },
    {
      number: 3,
      subskill: "subject-verb agreement",
      family: "expletive-there-agreement",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["were", "The plural verb does not agree with the singular subject 'a sign.'"],
        ["are", "The verb is plural and the present tense breaks the historical narration."],
        ["have been", "The plural present perfect misses both the number and the time frame."],
      ],
      why:
        "In a sentence beginning 'There,' the real subject follows the verb. Here it is 'a sign,' " +
        "which is singular.",
      steps: [
        "Look past the verb for the real subject: 'a sign.'",
        "Keep the singular verb that matches it.",
      ],
      hint: "'There' is never the subject; find the noun after the verb.",
      trap: "The clauses that follow are long enough to make the subject feel plural by the end.",
    },
    {
      number: 4,
      subskill: "apostrophes",
      family: "singular-possessive",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["railroads", "The bare plural shows no possession, so the sign belongs to nothing."],
        ["railroads'", "The plural possessive contradicts the single railroad the essay describes."],
        ["railroad", "The singular is right in number but marks no possessive relationship."],
      ],
      why:
        "One railroad owns the sign, so the noun takes the singular possessive: apostrophe, then s.",
      steps: [
        "Ask how many railroads the paragraph names. One.",
        "Keep the singular possessive.",
      ],
      hint: "Count the owners before you place the apostrophe.",
      trap: "The plural and the possessive sound identical, so the ear gives no signal.",
    },
    {
      number: 5,
      subskill: "semicolons and colons",
      family: "semicolon-between-balanced-clauses",
      difficulty: "Hard",
      keep: false,
      key: "lips; the gestures were remarkably consistent",
      noChange: "A comma alone cannot join two independent clauses, and this one follows a list of commas.",
      wrong: [
        [
          "lips: the gestures were remarkably consistent",
          "A colon introduces an explanation, but the second clause reports a separate observation.",
        ],
        [
          "lips, and the gestures were remarkably consistent",
          "The conjunction repairs the splice but buries the clause among the list's own commas.",
        ],
      ],
      why:
        "The sentence has already run a three-item list separated by commas. A semicolon raises the " +
        "separation a level so the new clause is not read as a fourth gesture.",
      steps: [
        "Count the commas already in the sentence.",
        "Separate the independent clause with the next mark up.",
      ],
      hint: "When a sentence is already full of commas, a clause boundary needs something stronger.",
      trap: "Adding 'and' is grammatical and makes the clause read as one more item in the list.",
    },
    {
      number: 6,
      subskill: "conciseness",
      family: "redundant-modifier",
      difficulty: "Easy",
      keep: false,
      key: "a standard none of them could have quoted",
      noChange: "'Unwritten' and 'not written down' say the same thing, and the paragraph has said it already.",
      wrong: [
        ["a standard that was unwritten", "The adjective restates what the whole paragraph has established."],
        ["a standard not written down anywhere at all", "The phrase is longer and adds only emphasis."],
      ],
      why:
        "The paragraph has already established that nothing was written. The clause earns its place " +
        "by saying something new — that the riders could not have stated the rule themselves.",
      steps: [
        "Ask what the reader already knows by this point in the paragraph.",
        "Keep the version that adds a fact rather than repeating one.",
      ],
      hint: "The strongest version of this clause is about the riders, not the rule.",
      trap: "Repeating 'unwritten' feels like reinforcing the essay's theme.",
    },
    {
      number: 7,
      subskill: "transitions",
      family: "consequence-versus-sequence-transition",
      difficulty: "Medium",
      keep: false,
      key: "In time,",
      noChange: "'Consequently' claims the expansion followed directly from the gestures.",
      wrong: [
        ["In contrast,", "The paragraph continues the account rather than opposing it."],
        ["For example,", "Expanding the programme is not an instance of passengers policing it."],
      ],
      why:
        "Paragraph 3 describes riders enforcing a norm. This paragraph moves the account forward by " +
        "years, so the transition should mark elapsed time rather than assert a cause.",
      steps: [
        "Ask whether the expansion followed immediately or over a period.",
        "Choose the transition that marks the passage of time.",
      ],
      hint: "The essay is a history, so its transitions are mostly about when.",
      trap: "The two paragraphs really are connected, which makes a causal word feel earned.",
    },
    {
      number: 8,
      subskill: "clause relationships",
      family: "sentence-fragment",
      difficulty: "Medium",
      keep: false,
      key: "Some of them wrote rules.",
      noChange: "The group of words has no main verb and cannot stand as a sentence.",
      wrong: [
        ["Some of them, writing rules.", "Adding a comma isolates the phrase further without supplying a verb."],
        ["Which some of them wrote rules.", "The relative pronoun makes the whole group subordinate."],
      ],
      why:
        "'Writing rules' is a participle, not a main verb. Changing it to 'wrote' gives the subject " +
        "something to do and completes the sentence.",
      steps: [
        "Locate the subject: 'Some of them.'",
        "Check whether it has a main verb. It does not, so supply one.",
      ],
      hint: "Look for the main verb, not the length.",
      trap: "The short sentence reads as a deliberate clipped aside.",
    },
    {
      number: 9,
      subskill: "precision",
      family: "vague-phrase",
      difficulty: "Medium",
      keep: false,
      key: "informing on a neighbour",
      noChange: "'Doing something else entirely' names nothing in the sentence that explains the difference.",
      wrong: [
        ["in a different position", "The phrase restates that there is a difference without naming it."],
        ["engaged in another sort of act", "The wording is longer and just as unspecific as the original."],
      ],
      why:
        "The sentence contrasts two roles, and the first is named exactly — acting on behalf of " +
        "everyone in the car. The second has to be named as precisely for the contrast to work.",
      steps: [
        "Read the first half and note how specifically it describes the role.",
        "Name the second role with the same precision.",
      ],
      hint: "The sentence explains why written rules worked worse; say what they turned people into.",
      trap: "The vague phrase gestures at an idea the reader can supply, which feels like restraint.",
    },
    {
      number: 10,
      subskill: "support",
      family: "supporting-detail",
      difficulty: "Medium",
      stem:
        "Given that all the choices are true, which one, if added here, best supports the essay's " +
        "point about how the practice spread?",
      key: "No railroad ever published the gestures, and no passenger was ever taught them.",
      wrong: [
        [
          "Several European operators use a symbol rather than a written sign on the door.",
          "How the car is labelled is a design choice, not evidence about how enforcement spread.",
        ],
        [
          "Quiet cars are usually placed at one end of a train rather than in the middle.",
          "Where the car sits in the train has no bearing on the behaviour inside it.",
        ],
        [
          "Ridership on the Philadelphia line grew steadily through the following decade.",
          "Passenger numbers say nothing about whether the norm travelled with them.",
        ],
      ],
      why:
        "The essay's claim is that a standard spread without being written down or taught. The " +
        "support has to state that absence directly.",
      steps: [
        "Name the claim: the practice travelled with no central direction.",
        "Keep the choice that says nobody published or taught it.",
      ],
      hint: "The support should describe what did not happen.",
      trap: "Every choice is a plausible fact about quiet cars on real railways.",
    },
    {
      number: 11,
      subskill: "modifiers",
      family: "participle-tense-mismatch",
      difficulty: "Hard",
      keep: false,
      key: "Copied from line to line without central direction, the same three gestures have turned up wherever the car exists.",
      noChange: "The opening phrase covers a continuing process, but the main clause reports a single present fact.",
      wrong: [
        [
          "Copying from line to line without central direction, the same three gestures turn up wherever the car exists.",
          "The active form makes the gestures do the copying themselves.",
        ],
        [
          "Copied from line to line without central direction, wherever the car exists the same three gestures turn up.",
          "The phrase now sits next to a subordinate clause rather than the noun it describes.",
        ],
      ],
      why:
        "The participle describes something that has gone on happening, so the main clause needs the " +
        "present perfect for the two halves to cover the same stretch of time.",
      steps: [
        "Ask what was copied from line to line. The gestures were.",
        "Match the main verb's tense to the span the participle covers.",
      ],
      hint: "The opening phrase and the main clause have to be talking about the same period.",
      trap: "The modifier is attached correctly, so the mismatch reads as merely stylistic.",
    },
    {
      number: 12,
      subskill: "verb forms",
      family: "simple-past-in-a-historical-account",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["designs", "The present tense contradicts the account of how the gestures arose."],
        ["had designed", "The past perfect places the designing before an earlier past that is never named."],
        ["was designing", "The progressive suggests an unfinished attempt rather than an absence of design."],
      ],
      why:
        "The sentence reports that no act of design ever occurred, and the simple past is what states " +
        "a completed absence in a historical account.",
      steps: [
        "Ask what the sentence claims: that the designing never happened.",
        "Keep the simple past that reports it.",
      ],
      hint: "The sentence is two words long; read it as a flat statement of fact.",
      trap: "The gestures still exist, which invites a present tense for the verb about their origin.",
    },
    {
      number: 13,
      subskill: "purpose",
      family: "goal-assessment",
      difficulty: "Hard",
      stem:
        "Suppose the writer's goal had been to write an essay about a rule that worked better for " +
        "never having been written. Would this essay accomplish that goal?",
      key: "Yes, because it reports that the written versions worked less well and explains what writing them changed.",
      wrong: [
        [
          "Yes, because the quiet car is now standard on railroads in three parts of the world.",
          "Its spread shows the idea travelled, not that being unwritten is what made it work.",
        ],
        [
          "No, because the railroad did eventually expand the programme across its network.",
          "Expansion is not the same as codification, and the essay distinguishes the two.",
        ],
        [
          "No, because a sign was posted in the car from the very first experiment.",
          "A sign naming the car is not a rule with enforcement behind it.",
        ],
      ],
      why:
        "The essay states that systems which wrote rules did worse, and explains why: enforcing a " +
        "norm is acting for everyone in the car, while citing a regulation is informing on a neighbour.",
      steps: [
        "Find the sentence comparing written and unwritten versions.",
        "Keep the reason that names both the outcome and the cause.",
      ],
      hint: "The fourth paragraph makes the comparison explicitly.",
      trap: "One wrong choice cites the essay's most impressive fact, which is about reach rather than mechanism.",
    },
  ],
};
