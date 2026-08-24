"use strict";

module.exports = {
  id: "act-english-p004",
  type: "process-narrative",
  title: "Wrong in the Same Way",
  content: `[1] {1 When a tuner opens the lid of an upright piano they see} about two
hundred and thirty strings, not eighty-eight. Most notes are sounded by three
strings struck together, and the lowest bass notes by one or two. Every one of
them {2 has} to be brought to a pitch that agrees with all the others.

[2] {3 Meanwhile,} the work begins with a single note. The tuner sets one string
of the A above middle C against a fork or an electronic reference, {4 the rest of
the piano is then built outward from that one string.} Nothing later in the
process returns to the fork.

[3] What happens next is stranger than most people expect. A piano tuned so that
every interval is mathematically pure can play in only a few keys, so tuners
deliberately {5 make small compromises and slight adjustments to the intervals}.
They narrow the fifths a little and widen the thirds more than a little. The
result is equal temperament: every key slightly wrong, and all of them wrong in
the same way, so that music can move freely among {6 them}. A tuner {7 only can
hear} this work when two strings are close enough to beat against each other,
and the speed of that beating is the measurement.

[4] With the temperament octave set, the tuner moves outward, {8 doing the rest
of the piano} octave by octave. Each new note {9 is checked} against a note
already tuned, never against the fork. The unisons — the two or three strings
that share a single key — are harder to hear {10 than tuning an octave}, because
two strings a hair apart do not sound like two pitches. They sound like one
pitch that will not sit still.

[5] {11 For example,} the last step is not what a beginner would guess. Real
strings are stiff, so their overtones run slightly sharp of the pure harmonics,
and a piano tuned strictly by the numbers sounds flat in the treble and sharp in
the bass. Tuners answer this by stretching the octaves, tuning the top a little
sharp and the bottom a little flat, until the instrument sounds in tune even
though the arithmetic says it is not.`,
  questions: [
    {
      number: 1,
      subskill: "commas",
      family: "introductory-clause-comma",
      difficulty: "Easy",
      keep: false,
      key: "When a tuner opens the lid of an upright piano, they see",
      noChange: "An introductory subordinate clause needs a comma before the main clause begins.",
      wrong: [
        ["When a tuner opens the lid, of an upright piano they see", "The comma splits the noun from the phrase describing it."],
        ["When a tuner opens, the lid of an upright piano they see", "The comma falls between the verb and its own direct object."],
      ],
      why:
        "'When a tuner opens the lid of an upright piano' cannot stand alone, so it is an " +
        "introductory clause, and a comma marks where it ends and the main clause starts.",
      steps: [
        "Find where the introductory clause stops: after 'piano.'",
        "Place the comma there, and nowhere inside the clause.",
      ],
      hint: "Read until the words could finally stand as a sentence; the comma goes just before that.",
      trap: "Two choices put a comma somewhere, and any comma can feel like the fix.",
    },
    {
      number: 2,
      subskill: "subject-verb agreement",
      family: "every-one-is-singular",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["have", "The verb has been matched to 'them' rather than to the singular subject 'one.'"],
        ["had", "The past tense breaks the present-tense description of how tuning works."],
        ["are having", "The progressive form suits neither the subject's number nor the general claim."],
      ],
      why:
        "'Every one' is singular, and 'of them' is a prepositional phrase. The noun inside a " +
        "prepositional phrase is never the subject of the sentence.",
      steps: [
        "Cross out 'of them' and read what remains: 'Every one … has.'",
        "Keep the singular verb that matches 'one.'",
      ],
      hint: "'Every one' written as two words means each single thing, so it takes a singular verb.",
      trap: "'Them' sits right before the verb and is plural, which pulls the ear toward 'have.'",
    },
    {
      number: 3,
      subskill: "transitions",
      family: "step-transition",
      difficulty: "Medium",
      keep: false,
      key: "First,",
      noChange: "'Meanwhile' claims two things happen at once, but this is the opening step.",
      wrong: [
        ["Instead,", "Nothing has been proposed and rejected, so there is no alternative to offer."],
        ["Even so,", "The concession answers an objection the previous paragraph never raised."],
      ],
      why:
        "The essay is a process told in order, and this sentence begins the sequence. The transition " +
        "has to mark a first step rather than a simultaneous one.",
      steps: [
        "Ask where this sentence falls in the process. It is the beginning.",
        "Choose the transition that marks order rather than simultaneity or contrast.",
      ],
      hint: "In a process narrative, the transitions are usually doing the counting.",
      trap: "'Meanwhile' sounds like it is organizing something, so it reads as a real transition.",
    },
    {
      number: 4,
      subskill: "clause relationships",
      family: "comma-splice",
      difficulty: "Medium",
      keep: false,
      key: "and the rest of the piano is then built outward from that one string.",
      noChange: "A comma alone cannot join two complete clauses, which is what sits on either side.",
      wrong: [
        [
          "the rest of the piano is then built outward from that one string.",
          "Removing the comma fuses the two clauses instead of separating them.",
        ],
        [
          "so the rest of the piano is then built outward from that one string.",
          "'So' claims the reference note causes the outward tuning rather than preceding it.",
        ],
      ],
      why:
        "Both halves are independent clauses. A comma plus a coordinating conjunction joins them, " +
        "and 'and' is the conjunction that simply adds the second step to the first.",
      steps: [
        "Test each side of the comma as its own sentence. Both stand.",
        "Add the conjunction that states the relationship without inventing one.",
      ],
      hint: "Once you know it is a splice, the remaining question is which conjunction is honest.",
      trap: "'So' fixes the punctuation perfectly and still asserts a cause the sentence does not have.",
    },
    {
      number: 5,
      subskill: "conciseness",
      family: "doubled-phrasing",
      difficulty: "Easy",
      keep: false,
      key: "compromise",
      noChange: "'Small compromises' and 'slight adjustments' say one thing twice.",
      wrong: [
        ["make small compromises in the intervals", "The prepositional phrase repeats what the sentence has already established."],
        ["adjust and compromise the intervals slightly", "Two verbs are kept where the sentence needs only one."],
      ],
      why:
        "The sentence has already named what is being compromised. One verb carries the whole idea, " +
        "and 'deliberately' before it supplies the emphasis the extra words were reaching for.",
      steps: [
        "Notice that both halves of the underlined phrase mean the same thing.",
        "Keep the single verb that says it once.",
      ],
      hint: "When two nouns in a phrase are near-synonyms, one of them is padding.",
      trap: "Paired phrasing sounds careful and measured, which is exactly how wordiness hides.",
    },
    {
      number: 6,
      subskill: "pronouns",
      family: "pronoun-agreement-with-a-plural",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["it", "The singular pronoun cannot refer to the plural noun 'keys.'"],
        ["those", "The demonstrative points outward to something the sentence has not named."],
        ["which", "A relative pronoun cannot serve as the object of the preposition here."],
      ],
      why:
        "The pronoun refers to 'every key,' understood across the sentence as the full set of keys, " +
        "so the plural object pronoun is what 'among' requires.",
      steps: [
        "Find what music is moving among: the keys.",
        "Keep the plural object pronoun that matches them.",
      ],
      hint: "'Among' needs more than one thing, which already tells you the number.",
      trap: "'Every key' is grammatically singular a few words earlier, which invites 'it.'",
    },
    {
      number: 7,
      subskill: "modifiers",
      family: "misplaced-limiting-modifier",
      difficulty: "Hard",
      keep: false,
      key: "can hear this work only",
      noChange: "'Only' sits before 'can hear' and so limits the hearing rather than the condition.",
      wrong: [
        ["can only hear this work", "The adverb now limits the verb, implying the tuner can do nothing but hear."],
        ["can hear only this work", "'Only' now limits the object, as though other work were inaudible."],
      ],
      why:
        "'Only' restricts whatever follows it. The sentence means the hearing happens under one " +
        "condition, so 'only' belongs immediately before that condition.",
      steps: [
        "Decide what the sentence is restricting: the circumstance, not the verb or the object.",
        "Move 'only' so that it stands directly before that circumstance.",
      ],
      hint: "Put 'only' next to the words it is meant to limit, and read what each placement claims.",
      trap: "All four placements are things people say aloud, so the ear cannot separate them.",
    },
    {
      number: 8,
      subskill: "precision",
      family: "imprecise-verb",
      difficulty: "Medium",
      keep: false,
      key: "tuning the rest of the piano",
      noChange: "'Doing' names no action in a paragraph explaining a specific one.",
      wrong: [
        ["handling the rest of the piano", "The verb is only slightly less vague and still names no procedure."],
        ["getting through the rest of the piano", "The phrase describes finishing rather than the work being done."],
      ],
      why:
        "The whole essay is about one operation, and this is the sentence that says the tuner is " +
        "performing it on the remaining notes. Naming the operation is more exact than pointing at it.",
      steps: [
        "Ask what the tuner is actually doing to the rest of the piano.",
        "Use the verb that names it.",
      ],
      hint: "The precise verb is the title of the process the essay has been describing.",
      trap: "'Doing' is invisible in speech, so nothing about the sentence sounds wrong.",
    },
    {
      number: 9,
      subskill: "verb forms",
      family: "consistent-present-passive",
      difficulty: "Medium",
      keep: true,
      wrong: [
        ["was checked", "The past tense breaks from the present-tense procedure described throughout."],
        ["has been checked", "The present perfect implies a finished action rather than a repeated step."],
        ["is being checked", "The progressive describes one moment instead of what happens every time."],
      ],
      why:
        "The essay describes what a tuner does every time, in the present. The simple present passive " +
        "keeps the note as the subject while leaving the procedure general.",
      steps: [
        "Check the tense of the surrounding sentences: present throughout.",
        "Keep the present-tense form that states a rule rather than an episode.",
      ],
      hint: "A process narrative stays in the present, because it describes every performance at once.",
      trap: "The paragraph tells a sequence, and sequence makes the past tense feel natural.",
    },
    {
      number: 10,
      subskill: "comparisons",
      family: "illogical-comparison",
      difficulty: "Medium",
      keep: false,
      key: "than the octaves",
      noChange: "The sentence compares unisons to the act of tuning rather than to octaves.",
      wrong: [
        ["than to tune an octave", "The mismatch remains: a thing is still being compared to an action."],
        ["than an octave is", "The added verb makes the comparison read as octaves doing the hearing."],
      ],
      why:
        "The subject is 'the unisons,' a kind of interval. A comparison has to set that against " +
        "another kind of interval, and the octaves are what the paragraph has just described.",
      steps: [
        "Name what sits on the left of the comparison: the unisons.",
        "Make the right side the same kind of thing.",
      ],
      hint: "Both sides of 'than' have to be the same part of speech and the same kind of thing.",
      trap: "The gerund makes the sentence read smoothly, which disguises the category mismatch.",
    },
    {
      number: 11,
      subskill: "transitions",
      family: "concluding-step-transition",
      difficulty: "Medium",
      keep: false,
      key: "Finally,",
      noChange: "'For example' promises an instance, but the sentence introduces the last stage.",
      wrong: [
        ["In contrast,", "The paragraph continues the process rather than opposing what came before."],
        ["Similarly,", "The stretching step is unlike the outward tuning, not parallel to it."],
      ],
      why:
        "This paragraph is the end of the sequence the essay has been counting through. The " +
        "transition should say so.",
      steps: [
        "Locate this paragraph in the process: it is the last stage.",
        "Choose the transition that marks the end of a sequence.",
      ],
      hint: "Check what the other paragraph-opening transitions in the essay are doing.",
      trap: "'For example' is the most common opener of all, so it slides past unexamined.",
    },
    {
      number: 12,
      subskill: "organization",
      family: "paragraph-move",
      difficulty: "Hard",
      stem:
        "The writer is considering moving Paragraph 5 so that it appears immediately after " +
        "Paragraph 2. Should the writer make this change?",
      key: "No, because stretching the octaves is the final step and depends on the outward tuning described in Paragraph 4.",
      wrong: [
        [
          "No, because Paragraph 5 is the only paragraph that mentions the treble and the bass.",
          "Being the only mention of something is not a reason a paragraph belongs where it is.",
        ],
        [
          "Yes, because both Paragraph 2 and Paragraph 5 describe adjustments made to single strings.",
          "Paragraph 5 adjusts whole registers, and the similarity claimed here does not exist.",
        ],
        [
          "Yes, because it would place the essay's most surprising claim nearer the beginning.",
          "Reordering for surprise would break the sequence a process narrative depends on.",
        ],
      ],
      why:
        "The essay counts through a process in order: reference note, temperament, outward octaves, " +
        "stretching. Stretching adjusts octaves that do not exist yet after Paragraph 2.",
      steps: [
        "List what each paragraph does, in order, and note that the order is the process itself.",
        "Ask whether Paragraph 5 depends on anything after Paragraph 2. It depends on Paragraph 4.",
      ],
      hint: "In a process narrative, a paragraph can only move to a place where its inputs already exist.",
      trap: "The surprising-claim argument is a real editing principle applied to the wrong kind of essay.",
    },
    {
      number: 13,
      subskill: "purpose",
      family: "goal-assessment",
      difficulty: "Hard",
      stem:
        "Suppose the writer's goal had been to explain why a correctly tuned piano is never exactly " +
        "in tune. Would this essay accomplish that goal?",
      key: "Yes, because it gives two reasons — the deliberate compromise of equal temperament and the stretching that real strings require.",
      wrong: [
        [
          "Yes, because it establishes that a piano has far more strings than it has keys.",
          "The string count opens the essay but explains nothing about pitch being off.",
        ],
        [
          "No, because the essay describes the tuner's procedure rather than the instrument's design.",
          "The procedure is where both reasons appear, so describing it is how the goal is met.",
        ],
        [
          "No, because the essay states that a piano can be tuned so every interval is pure.",
          "It states that such a tuning is possible and unusable, which supports the goal instead.",
        ],
      ],
      why:
        "Paragraph 3 explains the compromise tuners choose, and Paragraph 5 explains the physical " +
        "fact that forces a second departure. Together they answer the question the goal asks.",
      steps: [
        "Answer yes or no from the essay's actual content before reading any reason.",
        "Keep the reason that points at both explanations rather than one detail.",
      ],
      hint: "The goal asks 'why,' so count how many reasons the essay supplies.",
      trap: "One wrong choice describes the essay accurately and then draws the opposite conclusion.",
    },
  ],
};
