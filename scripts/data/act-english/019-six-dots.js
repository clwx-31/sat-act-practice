"use strict";

module.exports = {
  id: "act-english-p019",
  type: "historical-account",
  title: "Told to Stop Using It",
  content: `[1] Charles {1 Barbier, an artillery officer} wanted his men to read
orders in the dark without striking a light. The system he {2 devised} in the
1810s used twelve raised dots and stood for sounds rather than letters. His
soldiers found it too slow to be useful. He took it to a school for blind
children in Paris instead.

[2] {3} Louis Braille was eleven when he first handled {4 it, he had been blind}
since a childhood accident in his {5 father's} workshop. He understood at once
what was wrong with it: twelve dots were too many for a fingertip to take in
without travelling, and a phonetic system could not spell a name.

[3] He cut it to six. A cell of six dots, two across and three down, fits under
one fingertip {6 without moving it or shifting it at all}, and sixty-three
combinations {7 is} enough for an alphabet, punctuation, and numbers.
{8 Finished at fifteen and published at twenty, he had done the essential work.}

[4] {9 Consequently,} the school did not adopt it. Sighted instructors had been
teaching from embossed Roman letters, which a blind student could read slowly
and could not write at all, and which a sighted teacher could {10 handle
easily}. A later director banned the six-dot code outright and burned the books
printed in {11 it, students kept using it anyway} and taught it to one another
at night.

[5] {12} Braille died of tuberculosis in 1852, at forty-three. The school
adopted his system officially two years later, and the institution that had
burned his books {13 printed them, taught from them, and put his name on the
code}. It is now the standard in nearly every written language on earth.`,
  questions: [
    {
      number: 1,
      subskill: "commas",
      family: "appositive-comma-pair",
      difficulty: "Easy",
      keep: false,
      key: "Barbier, an artillery officer,",
      noChange: "The appositive is opened with a comma and never closed with one.",
      wrong: [
        ["Barbier an artillery officer", "With no commas at all the phrase reads as part of the name itself."],
        ["Barbier; an artillery officer,", "A semicolon cannot open a phrase that a comma then closes."],
      ],
      why:
        "'An artillery officer' renames Charles Barbier and can be lifted out of the sentence, so it " +
        "takes a comma on each side.",
      steps: [
        "Remove the phrase and check the sentence still works. It does.",
        "Enclose it in a matched pair of commas.",
      ],
      hint: "A phrase that renames the subject needs a comma before and after it.",
      trap: "The opening comma is already there, which makes the punctuation look handled.",
    },
    {
      number: 2,
      subskill: "verb forms",
      family: "simple-past-in-a-historical-account",
      difficulty: "Medium",
      keep: true,
      wrong: [
        ["had devised", "The past perfect places the invention before an earlier past that is never named."],
        ["devises", "The present tense contradicts the 1810s the sentence itself supplies."],
        ["was devising", "The progressive suggests an unfinished process rather than a completed system."],
      ],
      why:
        "The sentence names a decade and reports a finished invention, and the paragraph around it is " +
        "in the simple past.",
      steps: [
        "Locate the time marker: 'in the 1810s.'",
        "Match the verb to that completed past.",
      ],
      hint: "Let the date in the sentence choose the tense.",
      trap: "'Had devised' sounds more formal, and formality reads as correctness in a history.",
    },
    {
      number: 3,
      subskill: "introductions",
      family: "paragraph-opening",
      difficulty: "Medium",
      stem: "Which choice, if added here, provides the most effective opening for this paragraph?",
      key: "At the school it found the reader Barbier had not been looking for.",
      wrong: [
        [
          "The Royal Institute for Blind Youth had been founded in Paris some decades earlier.",
          "The school's founding date is never taken up again anywhere in the essay.",
        ],
        [
          "Blindness in nineteenth-century France was frequently the result of untreated infection.",
          "The general medical context does not connect Barbier's code to the boy who fixed it.",
        ],
        [
          "There were several attempts at tactile writing systems during this period.",
          "The vague plural promises a survey the paragraph does not deliver.",
        ],
      ],
      why:
        "Paragraph 1 ends with a rejected military code arriving at a school. This paragraph is about " +
        "who picked it up there, so the opening should make that handoff.",
      steps: [
        "Note where the previous paragraph leaves the code: at a school, unwanted by soldiers.",
        "Choose the opening that turns that arrival into this paragraph's subject.",
      ],
      hint: "The best opening turns the previous paragraph's last move into this one's premise.",
      trap: "The founding date is the most factual choice and connects to nothing that follows.",
    },
    {
      number: 4,
      subskill: "clause relationships",
      family: "comma-splice",
      difficulty: "Medium",
      keep: false,
      key: "it. He had been blind",
      noChange: "Two independent clauses are joined by a comma with no conjunction.",
      wrong: [
        [
          "it, and he had been blind",
          "The conjunction repairs the splice but ties his age to his blindness as one thought.",
        ],
        [
          "it, having been blind",
          "The participle leaves the second half without a main verb of its own.",
        ],
      ],
      why:
        "The two facts are separate — how old he was, and how long he had been blind. Making them two " +
        "sentences keeps each one its own statement.",
      steps: [
        "Test each side of the comma as a sentence. Both stand.",
        "Choose the punctuation that lets each fact land on its own.",
      ],
      hint: "Once you see the splice, ask whether the halves belong in one sentence at all.",
      trap: "'And' fixes the grammar and quietly merges two unrelated facts.",
    },
    {
      number: 5,
      subskill: "apostrophes",
      family: "singular-possessive",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["fathers", "The bare plural shows no possession and implies more than one father."],
        ["fathers'", "The plural possessive contradicts the singular 'his' in front of it."],
        ["father", "The singular is right in number but marks no possessive relationship."],
      ],
      why:
        "One father owns the workshop, so the noun takes the singular possessive: apostrophe, then s.",
      steps: [
        "Note the singular possessive pronoun in front: 'his.'",
        "Keep the singular possessive that agrees with it.",
      ],
      hint: "The pronoun before the noun tells you how many owners there are.",
      trap: "The plural and the possessive sound identical, so the ear gives no signal.",
    },
    {
      number: 6,
      subskill: "conciseness",
      family: "doubled-phrasing",
      difficulty: "Easy",
      keep: false,
      key: "without moving",
      noChange: "'Moving it' and 'shifting it' name the same action twice, and 'at all' adds nothing.",
      wrong: [
        ["without moving it at all", "'At all' repeats emphasis the sentence already carries."],
        ["without shifting or moving it", "Two verbs remain where one says the whole thing."],
      ],
      why:
        "The point is that the fingertip stays put. One verb states it, and the sentence has already " +
        "made the cell's size the reason.",
      steps: [
        "Notice the two verbs mean the same thing.",
        "Keep one and drop the intensifier.",
      ],
      hint: "Paired verbs joined by 'or' are often one verb and its echo.",
      trap: "The doubled phrasing sounds thorough, which is how wordiness survives.",
    },
    {
      number: 7,
      subskill: "subject-verb agreement",
      family: "simple-plural-subject",
      difficulty: "Easy",
      keep: false,
      key: "are",
      noChange: "The subject 'sixty-three combinations' is plural and cannot take a singular verb.",
      wrong: [
        ["was", "The verb is still singular and the past tense breaks the present-tense claim."],
        ["has been", "The singular present perfect misses the number and reports a finished span."],
      ],
      why: "'Sixty-three combinations' names many things, so the verb is plural.",
      steps: [
        "Identify the subject: 'sixty-three combinations.'",
        "Choose the plural verb.",
      ],
      hint: "A number in front of a noun does not make it singular.",
      trap: "'Enough' following the verb reads as a singular quantity and colours the ear.",
    },
    {
      number: 8,
      subskill: "modifiers",
      family: "dangling-participle",
      difficulty: "Hard",
      keep: false,
      key: "He finished the essential work at fifteen and published it at twenty.",
      noChange: "The opening phrase describes the work, but the noun after the comma is 'he.'",
      wrong: [
        [
          "Finishing at fifteen and publishing at twenty, the essential work was his.",
          "The phrase now describes the work as doing the finishing and publishing.",
        ],
        [
          "Finished at fifteen and published at twenty, the essential work had been done by him.",
          "The modifier attaches correctly but the passive buries who did it.",
        ],
      ],
      why:
        "A participial phrase at the head of a sentence attaches to the first noun after the comma. " +
        "The work was finished and published; Braille was not. Recasting it as a plain clause names " +
        "him as the actor.",
      steps: [
        "Ask what was finished and published. The work was.",
        "Rewrite so the sentence says who did it, without the stranded phrase.",
      ],
      hint: "When no rearrangement puts the right noun after the comma, drop the phrase entirely.",
      trap: "The sentence states his ages accurately, so nothing sounds factually wrong.",
    },
    {
      number: 9,
      subskill: "transitions",
      family: "consequence-versus-concession-transition",
      difficulty: "Medium",
      keep: false,
      key: "Even so,",
      noChange: "'Consequently' says the school's refusal followed from the system being good.",
      wrong: [
        ["Similarly,", "The school's refusal is not like the invention described before it."],
        ["Meanwhile,", "The refusal did not run alongside the invention; it answered it."],
      ],
      why:
        "Paragraph 3 shows a system that works. Paragraph 4 reports that it was rejected anyway, so " +
        "the transition marks a concession rather than a result.",
      steps: [
        "Ask whether this paragraph follows from the last or pushes against it.",
        "Choose the transition that concedes.",
      ],
      hint: "A good invention being refused is a reversal, not a consequence.",
      trap: "'Consequently' sounds analytical and asserts the opposite of what happened.",
    },
    {
      number: 10,
      subskill: "precision",
      family: "vague-verb-phrase",
      difficulty: "Medium",
      keep: false,
      key: "read at a glance",
      noChange: "'Handle easily' names no advantage specific to a sighted teacher.",
      wrong: [
        ["deal with without difficulty", "The phrase is longer and just as unspecific as the original."],
        ["make use of more readily", "The wording gestures at convenience without naming it."],
      ],
      why:
        "The sentence is listing what embossed letters cost a blind student and what they gave a " +
        "sighted teacher. The gift was speed of reading, and naming it explains the whole refusal.",
      steps: [
        "Ask what a sighted person can do with Roman letters that a blind reader cannot.",
        "Use the phrase that names it exactly.",
      ],
      hint: "The precise phrase is what makes the school's motive legible.",
      trap: "'Handle easily' is fluent and hides the self-interest the sentence is exposing.",
    },
    {
      number: 11,
      subskill: "semicolons and colons",
      family: "semicolon-between-balanced-clauses",
      difficulty: "Hard",
      keep: false,
      key: "it; students kept using it anyway",
      noChange: "A comma alone cannot join two independent clauses of equal weight.",
      wrong: [
        [
          "it: students kept using it anyway",
          "A colon introduces an explanation, but the second clause opposes the first.",
        ],
        [
          "it and students kept using it anyway",
          "Without a comma before 'and' the two clauses run together unpunctuated.",
        ],
      ],
      why:
        "The sentence sets an official ban against what students did in spite of it. Both clauses are " +
        "complete, and a semicolon holds them against each other as equals.",
      steps: [
        "Confirm both sides stand alone as sentences. They do.",
        "Ask whether the second explains the first or defies it. It defies it.",
      ],
      hint: "The word 'anyway' tells you the two clauses are opposed.",
      trap: "The clause is long enough that the splice sits far from where the eye stops.",
    },
    {
      number: 12,
      subskill: "relevance",
      family: "irrelevant-detail",
      difficulty: "Medium",
      stem:
        "At this point, the writer is considering adding the following true sentence: “Tuberculosis " +
        "was the leading cause of death in Europe during the nineteenth century.” Should the writer " +
        "make this addition?",
      key: "No, because the paragraph is about what happened to the code, not about how he died.",
      wrong: [
        [
          "Yes, because it explains why Braille died at such a comparatively young age.",
          "The essay names the disease already, and its prevalence is not the paragraph's subject.",
        ],
        [
          "Yes, because it establishes the medical conditions the school's students lived under.",
          "The school's conditions are never discussed, so nothing here needs establishing.",
        ],
        [
          "No, because the essay has already given the year in which Braille died.",
          "Giving the year is not what makes the added sentence out of place.",
        ],
      ],
      why:
        "The final paragraph turns on an institution reversing itself two years too late. A statistic " +
        "about European mortality moves the reader away from that reversal.",
      steps: [
        "Name what the paragraph is doing: reporting the reversal and its timing.",
        "Test the sentence against that, not against its accuracy.",
      ],
      hint: "The paragraph is about the school, not about the illness.",
      trap: "The fact is true, relevant to the sentence beside it, and wrong for the paragraph.",
    },
    {
      number: 13,
      subskill: "parallelism",
      family: "parallel-verb-series",
      difficulty: "Medium",
      keep: true,
      wrong: [
        [
          "printed them, teaching from them, and put his name on the code",
          "The middle item shifts to an -ing form the other two do not use.",
        ],
        [
          "printed them, taught from them, and his name went on the code",
          "The third item becomes a clause with a different subject entirely.",
        ],
        [
          "printing them, taught from them, and put his name on the code",
          "The first item breaks the pattern the other two establish.",
        ],
      ],
      why:
        "Three past-tense verbs share the subject 'the institution,' and the sentence's force comes " +
        "from the same institution performing all three after burning the books.",
      steps: [
        "Read 'the institution that had burned his books' into each item in turn.",
        "Keep the version in which all three are simple past.",
      ],
      hint: "In a series, compare the first word of each item before anything else.",
      trap: "The third item is the longest, which makes recasting it feel like an improvement.",
    },
    {
      number: 14,
      subskill: "purpose",
      family: "goal-assessment",
      difficulty: "Hard",
      stem:
        "Suppose the writer's goal had been to write an essay about an institution resisting a " +
        "solution because of what the solution cost the institution. Would this essay accomplish " +
        "that goal?",
      key: "Yes, because embossed letters were the ones a sighted teacher could read, and the six-dot code was not.",
      wrong: [
        [
          "Yes, because a later director banned the six-dot code and burned the books printed in it.",
          "The ban is the resistance itself; the goal asks the essay to explain its motive.",
        ],
        [
          "No, because the essay attributes the school's refusal to simple unfamiliarity with the code.",
          "The essay never says the school was unfamiliar with it; the students were using it.",
        ],
        [
          "No, because the essay is chiefly a biography of Louis Braille rather than of the school.",
          "Braille occupies two paragraphs and the school's refusal and reversal occupy two more.",
        ],
      ],
      why:
        "Roman letters were slow for a blind student and impossible to write, but a sighted " +
        "instructor could read them at a glance. The system that served the students best was the " +
        "one that served the teachers worst.",
      steps: [
        "Find the sentence that says what each system gave a sighted teacher.",
        "Keep the reason that names that trade rather than the ban itself.",
      ],
      hint: "Ask who benefited from the old system before asking why the new one was refused.",
      trap: "One wrong choice cites the essay's most dramatic fact and mistakes it for the motive.",
    },
  ],
};
