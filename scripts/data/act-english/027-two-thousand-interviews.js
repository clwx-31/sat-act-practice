"use strict";

module.exports = {
  id: "act-english-p027",
  type: "historical-account",
  title: "The Only Large Body of Testimony",
  content: `[1] Between 1936 and {1 1938 the} Federal Writers' Project sent
interviewers into seventeen states to record the testimony of people who had
been enslaved. More than two thousand three hundred interviews {2 were}
collected. They remain the largest first-person record of American slavery that
exists.

[2] {3 Similarly,} the project was not designed as history. It was designed as
{4 work, it was a relief programme} created to employ writers during the
Depression, and the interviews {5 were} one assignment among many.

[3] The limits are severe and {6 have to be stated and must be said}. Slavery
had ended seventy years earlier. {7 Interviewed seventy years after
emancipation, nearly everyone's memories were of childhood.} Most of the
interviewers were white and were often local, and an elderly Black person in
Alabama in 1937 had good reason to weigh what could safely be said to them. Some
transcripts were set down in a heavy phonetic spelling no interviewee chose.

[4] {8 Consequently,} none of that makes the record worthless. It makes it a
record that has to be read {9 in a certain way}, which is true of every source
and is only more visible here. Historians read the narratives alongside
plantation ledgers, court records, and the interviews conducted by Black
researchers at Fisk a few years earlier, and they weigh {10 them} against one
another.

[5] The alternative was {11 nothing, almost every other account of American
slavery was written} by someone who had not been enslaved. The Writers' Project,
for reasons that had nothing to do with history, produced the only large body of
testimony from the people it happened to.`,
  questions: [
    {
      number: 1,
      subskill: "commas",
      family: "introductory-phrase-comma",
      difficulty: "Easy",
      keep: false,
      key: "1938, the",
      noChange: "The introductory phrase runs into the subject with no comma between them.",
      wrong: [
        ["1938, the,", "The second comma separates the article from the noun it belongs to."],
        ["1938; the", "A semicolon must join independent clauses, and the opening phrase is not one."],
      ],
      why:
        "'Between 1936 and 1938' opens the sentence and is not its subject. A comma marks where the " +
        "introductory phrase ends and the main clause begins.",
      steps: [
        "Find where the opening phrase stops: after '1938.'",
        "Place a single comma there.",
      ],
      hint: "A date range at the head of a sentence takes one comma after it.",
      trap: "The phrase is short, which makes punctuating it feel unnecessary.",
    },
    {
      number: 2,
      subskill: "verb forms",
      family: "past-passive-for-a-completed-action",
      difficulty: "Medium",
      keep: true,
      wrong: [
        ["was", "The singular verb does not agree with the plural subject 'interviews.'"],
        ["have been", "The present perfect carries the collecting into the present, which ended in 1938."],
        ["are", "The present tense contradicts the dates the paragraph has just supplied."],
      ],
      why:
        "The subject is 'interviews,' plural, and the collecting finished in 1938, so the verb is " +
        "plural and in the simple past.",
      steps: [
        "Identify the subject: 'More than two thousand three hundred interviews.'",
        "Match the verb in number and place it in the completed past.",
      ],
      hint: "Two things have to agree here: the number and the time frame.",
      trap: "The narratives still exist, which makes a present-tense form feel accurate.",
    },
    {
      number: 3,
      subskill: "transitions",
      family: "comparison-versus-emphasis-transition",
      difficulty: "Medium",
      keep: false,
      key: "In fact,",
      noChange: "'Similarly' claims a likeness, but this paragraph corrects an assumption the first invites.",
      wrong: [
        ["Consequently,", "The project's purpose was not caused by the size of the collection."],
        ["Meanwhile,", "The paragraph explains what the project was, not what happened alongside it."],
      ],
      why:
        "Paragraph 1 makes the collection sound like a historical undertaking. This paragraph says it " +
        "was not, so the transition should mark a correction.",
      steps: [
        "Ask what this paragraph does to the impression left by the last one.",
        "Choose the transition that marks a correction rather than a resemblance.",
      ],
      hint: "The sentence says what the project was 'not,' which is the shape of a correction.",
      trap: "'Similarly' is doing nothing at all, and words doing nothing are easy to read past.",
    },
    {
      number: 4,
      subskill: "clause relationships",
      family: "comma-splice",
      difficulty: "Medium",
      keep: false,
      key: "work. It was a relief programme",
      noChange: "Two independent clauses are joined by a comma with no conjunction.",
      wrong: [
        [
          "work, and it was a relief programme",
          "'And' repairs the splice but ties the definition to the sentence that precedes it.",
        ],
        [
          "work, being a relief programme",
          "The participle leaves the second half without a main verb of its own.",
        ],
      ],
      why:
        "'It was designed as work' answers the previous sentence and is complete in itself. The " +
        "explanation of what that meant needs its own sentence, because it runs on for two more clauses.",
      steps: [
        "Test each side of the comma as a sentence. Both stand.",
        "Choose the punctuation that lets the second one carry the clauses that follow.",
      ],
      hint: "Look at how long the second half runs before deciding whether it belongs in one sentence.",
      trap: "The two clauses are closely related, which makes joining them feel natural.",
    },
    {
      number: 5,
      subskill: "subject-verb agreement",
      family: "simple-plural-subject",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["was", "The singular verb does not agree with the plural subject 'the interviews.'"],
        ["is", "The verb is singular and the present tense breaks the historical narration."],
        ["has been", "The singular present perfect misses both the number and the time frame."],
      ],
      why:
        "The subject is 'the interviews,' plural, and the paragraph is describing the project as it " +
        "was, in the past tense.",
      steps: [
        "Identify the subject: 'the interviews.'",
        "Keep the plural past-tense verb.",
      ],
      hint: "'One assignment' follows the verb but is not the subject.",
      trap: "'One assignment among many' is singular and sits immediately after the verb.",
    },
    {
      number: 6,
      subskill: "conciseness",
      family: "doubled-phrasing",
      difficulty: "Easy",
      keep: false,
      key: "have to be stated",
      noChange: "'Must be said' repeats 'have to be stated' in different words.",
      wrong: [
        ["must be said and have to be stated", "Reversing the order keeps both halves of the repetition."],
        ["have to be stated and said", "One verb is replaced by a synonym of the other, changing nothing."],
      ],
      why:
        "Both halves make the same claim with the same force. One says everything the pair says.",
      steps: [
        "Notice the two phrases mean the same thing.",
        "Keep whichever reads more plainly.",
      ],
      hint: "Paired phrases joined by 'and' are often one phrase and its echo.",
      trap: "The doubling sounds insistent, and insistence suits a sentence about facing limits.",
    },
    {
      number: 7,
      subskill: "modifiers",
      family: "dangling-participle",
      difficulty: "Hard",
      keep: false,
      key: "Interviewed seventy years after emancipation, nearly everyone remembered slavery as a child remembers it.",
      noChange: "The opening phrase describes the people interviewed, but the noun after the comma is 'memories.'",
      wrong: [
        [
          "Interviewing seventy years after emancipation, nearly everyone's memories were of childhood.",
          "The active form makes the memories do the interviewing.",
        ],
        [
          "Interviewed seventy years after emancipation, childhood was what nearly everyone remembered.",
          "The phrase now describes 'childhood,' which is not what was interviewed.",
        ],
      ],
      why:
        "A participial phrase at the head of a sentence attaches to the first noun after the comma. " +
        "People were interviewed; memories were not.",
      steps: [
        "Ask who was interviewed seventy years afterward. The people were.",
        "Rewrite so a person, not a possessive, follows the comma.",
      ],
      hint: "A possessive noun after the comma is a common sign of this error.",
      trap: "The sentence states something true about the memories, so nothing sounds wrong.",
    },
    {
      number: 8,
      subskill: "transitions",
      family: "consequence-versus-concession-transition",
      difficulty: "Medium",
      keep: false,
      key: "Even so,",
      noChange: "'Consequently' says the record's value follows from its limits, which reverses the argument.",
      wrong: [
        ["Similarly,", "The record's value is not like the limits listed in the previous paragraph."],
        ["For example,", "This paragraph is not an instance of the limits but a response to them."],
      ],
      why:
        "Paragraph 3 lists everything wrong with the source. Paragraph 4 argues it is valuable " +
        "anyway, so the transition has to concede rather than conclude.",
      steps: [
        "Ask whether this paragraph follows from the last one or pushes against it.",
        "Choose the transition that concedes.",
      ],
      hint: "The sentence begins 'none of that makes,' which is the shape of a rebuttal.",
      trap: "'Consequently' sounds analytical and asserts the opposite of the essay's argument.",
    },
    {
      number: 9,
      subskill: "precision",
      family: "vague-phrase",
      difficulty: "Medium",
      keep: false,
      key: "with its conditions in view",
      noChange: "'In a certain way' names no method in the sentence that answers the objection.",
      wrong: [
        ["carefully", "The adverb is shorter but still does not say what the care consists of."],
        ["in the appropriate manner", "The phrasing is more formal and equally unspecific."],
      ],
      why:
        "The paragraph is answering the limits just listed. This sentence has to name what reading " +
        "the record properly actually requires, which is holding those conditions in mind.",
      steps: [
        "Ask what the previous paragraph established that a reader must remember.",
        "Name that requirement here.",
      ],
      hint: "The rest of the sentence says this is true of every source; the phrase should say what 'this' is.",
      trap: "'In a certain way' sounds appropriately cautious for a difficult subject.",
    },
    {
      number: 10,
      subskill: "pronouns",
      family: "plural-antecedent",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["it", "The singular pronoun cannot stand for the several kinds of source just listed."],
        ["these ones", "The phrase is nonstandard and adds nothing the pronoun does not carry."],
        ["those", "The demonstrative points outward rather than back to the list in the sentence."],
      ],
      why:
        "The pronoun refers to the sources named in the same sentence — narratives, ledgers, court " +
        "records, and earlier interviews — so the plural object pronoun is correct.",
      steps: [
        "Find what historians weigh against one another: the sources listed.",
        "Match the pronoun to that plural.",
      ],
      hint: "'Against one another' requires more than one thing.",
      trap: "'The record' appears in the singular earlier in the paragraph.",
    },
    {
      number: 11,
      subskill: "semicolons and colons",
      family: "semicolon-between-balanced-clauses",
      difficulty: "Hard",
      keep: false,
      key: "nothing; almost every other account of American slavery was written",
      noChange: "A comma alone cannot join two independent clauses of equal weight.",
      wrong: [
        [
          "nothing: almost every other account of American slavery was written",
          "A colon introduces an explanation, but the second clause states the parallel fact.",
        ],
        [
          "nothing and almost every other account of American slavery was written",
          "Without a comma before 'and' the two clauses run together unpunctuated.",
        ],
      ],
      why:
        "The two clauses are complete and set against each other — what the alternative was, and why " +
        "it was that. A semicolon joins equals without subordinating either.",
      steps: [
        "Confirm both sides stand alone as sentences. They do.",
        "Ask whether the second explains the first or balances it. It balances.",
      ],
      hint: "The first clause is three words; the second gives it its weight.",
      trap: "The short first clause reads like a setup, which points the eye toward a colon.",
    },
    {
      number: 12,
      subskill: "organization",
      family: "paragraph-move",
      difficulty: "Hard",
      stem:
        "The writer is considering moving Paragraph 3 so that it appears immediately after " +
        "Paragraph 4. Should the writer make this change?",
      key: "No, because Paragraph 4 answers the limits, and an answer cannot precede what it answers.",
      wrong: [
        [
          "No, because Paragraph 3 is the only paragraph that names a specific state and year.",
          "Paragraph 1 names a date range and a number of states, so the claim is not accurate.",
        ],
        [
          "Yes, because the essay's argument for the record's value would then come first.",
          "Leading with the defence would leave the reader unsure what is being defended against.",
        ],
        [
          "Yes, because both paragraphs assess the reliability of the narratives.",
          "They assess it from opposite directions, and the order is what makes the second a reply.",
        ],
      ],
      why:
        "Paragraph 4 opens 'none of that makes the record worthless.' The phrase 'none of that' has " +
        "no referent unless the limits have already been stated.",
      steps: [
        "Read the first words of Paragraph 4 and ask what they point back to.",
        "Check whether that antecedent would still exist after the move. It would not.",
      ],
      hint: "The opening words of Paragraph 4 depend on Paragraph 3 existing before it.",
      trap: "Both paragraphs really are about reliability, which makes reordering sound harmless.",
    },
    {
      number: 13,
      subskill: "purpose",
      family: "goal-assessment",
      difficulty: "Hard",
      stem:
        "Suppose the writer's goal had been to write an essay about a flawed source that is used " +
        "anyway because of what the alternative would be. Would this essay accomplish that goal?",
      key: "Yes, because it states the flaws at length and then says almost every other account came from someone who had not been enslaved.",
      wrong: [
        [
          "Yes, because it explains that the Federal Writers' Project was created as a relief programme.",
          "The programme's purpose explains why the record exists, not why it is used despite its flaws.",
        ],
        [
          "No, because the essay lists so many limitations that it undermines the record's usefulness.",
          "Listing them is what makes the closing argument a decision rather than an evasion.",
        ],
        [
          "No, because historians are described as reading the narratives alongside other documents.",
          "Reading them alongside other sources is how a flawed source is used, not a reason to reject it.",
        ],
      ],
      why:
        "Paragraph 3 is an unsparing list of what is wrong with the source. The final paragraph says " +
        "the alternative was nothing, because everyone else writing about slavery had not lived it.",
      steps: [
        "Note that the essay spends a full paragraph on the flaws before defending the source.",
        "Keep the reason that names both the flaws and the alternative.",
      ],
      hint: "The goal has two halves, so the correct reason must have two halves.",
      trap: "One wrong choice treats the honesty about limitations as an argument against the source.",
    },
  ],
};
