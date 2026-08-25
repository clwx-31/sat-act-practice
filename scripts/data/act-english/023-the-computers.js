"use strict";

module.exports = {
  id: "act-english-p023",
  type: "historical-account",
  title: "Paid by the Hour to Look",
  content: `[1] The Harvard College Observatory employed women to do arithmetic.
They were called {1 computers which} at the time was a job title rather than a
machine, and between the 1880s and the 1920s several dozen of them {2 worked}
through hundreds of thousands of photographic glass plates.

[2] {3 Similarly,} the work was measurement. A plate {4 held} the spectrum of a
star as a band of light crossed by dark lines, and a computer's job was to
record the positions of those lines, compare them against other plates, and file
the {5 result, the pay was twenty-five to fifty cents} an hour, well below what a
man doing the same {6 work would have been paid for doing it}.

[3] Williamina Fleming catalogued more than ten thousand stars. Annie Jump
Cannon built the classification system astronomy still uses. {7 Sorted by the
pattern of their lines, Cannon produced a sequence that turned out to track
temperature.} She is said to have classified some three hundred thousand stars
by hand.

[4] {8 Nevertheless,} Henrietta Swan Leavitt was assigned the variable stars,
the ones whose brightness rises and falls on a cycle. In the Small Magellanic
Cloud she found more than a thousand of {9 them}, and she noticed something in
the numbers: the brighter the star, the longer its cycle {10 took, the relation
was tight enough} to be a {11 thing you could count on}.

[5] {12} A rule like that is a measuring stick. If the cycle tells you the true
brightness of a star, and the apparent brightness tells you how dim it looks
from here, the gap between them tells you how far away it is. Within twenty
years the relation had been used to show that other galaxies exist and that the
universe is far larger than anyone had argued.

[6] The plates are still in Cambridge. So are the notebooks, in the handwriting
of women who were paid by the hour to look at them.`,
  questions: [
    {
      number: 1,
      subskill: "commas",
      family: "nonrestrictive-clause",
      difficulty: "Easy",
      keep: false,
      key: "computers, which",
      noChange: "A nonrestrictive clause beginning with 'which' needs a comma before it.",
      wrong: [
        ["computers that", "'That' introduces a restrictive clause, implying some computers were machines."],
        ["computers, that", "A comma cannot precede 'that,' which introduces only restrictive clauses."],
      ],
      why:
        "The clause explains what the word meant rather than picking out which computers, so it is " +
        "nonrestrictive and takes a comma.",
      steps: [
        "Ask whether the clause identifies a subset or comments on the term. It comments.",
        "Use 'which' with a comma in front of it.",
      ],
      hint: "If removing the clause loses no identification, it needs a comma.",
      trap: "The sentence reads smoothly without the comma, so nothing sounds missing.",
    },
    {
      number: 2,
      subskill: "subject-verb agreement",
      family: "subject-across-a-prepositional-phrase",
      difficulty: "Medium",
      keep: true,
      wrong: [
        ["works", "The singular present matches neither the plural subject nor the past-tense account."],
        ["was working", "The singular progressive misses the number and narrows a forty-year span."],
        ["has worked", "The present perfect carries the work into the present, which the essay does not."],
      ],
      why:
        "The subject is 'several dozen,' which is plural, and the paragraph reports a period that " +
        "ended in the 1920s.",
      steps: [
        "Cross out 'of them' and read 'several dozen … worked.'",
        "Keep the plural past-tense verb.",
      ],
      hint: "'Several dozen' counts people, however singular 'dozen' sounds.",
      trap: "'Dozen' reads as a single unit, which pulls the ear toward a singular verb.",
    },
    {
      number: 3,
      subskill: "transitions",
      family: "comparison-versus-specification-transition",
      difficulty: "Medium",
      keep: false,
      key: "In practice,",
      noChange: "'Similarly' claims a likeness to the previous paragraph, which introduced the job.",
      wrong: [
        ["Consequently,", "The nature of the work is not caused by the women having been hired."],
        ["Nevertheless,", "Nothing in the first paragraph is being conceded or contradicted."],
      ],
      why:
        "Paragraph 1 names the job. This paragraph says what the job actually consisted of, so the " +
        "transition should mark a move from the label to the substance.",
      steps: [
        "Ask what this paragraph does with the previous one: it specifies it.",
        "Choose the transition that marks specification rather than resemblance.",
      ],
      hint: "Name the relationship in your own words before reading the choices.",
      trap: "'Similarly' is doing nothing at all, and words doing nothing are easy to read past.",
    },
    {
      number: 4,
      subskill: "verb forms",
      family: "simple-past-in-a-historical-account",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["holds", "The present tense contradicts the period the essay places in the past."],
        ["had held", "The past perfect places the plate before an earlier past that is never named."],
        ["was holding", "The progressive suggests a temporary state rather than what a plate is."],
      ],
      why:
        "The paragraph describes the work as it was done, in the simple past, and the verbs around " +
        "this one are in that tense.",
      steps: [
        "Check the tense of the surrounding verbs: 'was,' 'worked.'",
        "Keep the simple past that matches them.",
      ],
      hint: "Match the tense the account is already using.",
      trap: "The plates still exist, which makes the present tense feel more accurate.",
    },
    {
      number: 5,
      subskill: "clause relationships",
      family: "comma-splice",
      difficulty: "Medium",
      keep: false,
      key: "result. The pay was twenty-five to fifty cents",
      noChange: "Two independent clauses are joined by a comma with no conjunction.",
      wrong: [
        [
          "result, and the pay was twenty-five to fifty cents",
          "'And' repairs the splice but attaches the wage to the list of duties as one thought.",
        ],
        [
          "result, the pay being twenty-five to fifty cents",
          "The participle leaves the second half without a main verb of its own.",
        ],
      ],
      why:
        "The sentence has already run a three-item series describing the work. Starting a new " +
        "sentence lets the wage land as its own statement instead of trailing the list.",
      steps: [
        "Test each side of the comma as a sentence. Both stand.",
        "Choose the punctuation that gives the second one its own weight.",
      ],
      hint: "The first half is already long; ask whether the second belongs inside it.",
      trap: "'And' fixes the grammar and buries the sentence's most pointed fact.",
    },
    {
      number: 6,
      subskill: "conciseness",
      family: "redundant-tail",
      difficulty: "Easy",
      keep: false,
      key: "work would have been paid",
      noChange: "'For doing it' repeats the work the sentence has already named twice.",
      wrong: [
        ["work would have been paid for it", "The shortened tail still points back at a noun already stated."],
        ["work would have received payment for doing", "The phrasing is longer and less direct than the passive verb."],
      ],
      why:
        "'Doing the same work' has already established what the payment is for. The trailing phrase " +
        "adds no information the sentence lacks.",
      steps: [
        "Read the sentence without the trailing phrase and check nothing is lost.",
        "Cut it.",
      ],
      hint: "If a phrase only repeats the sentence's own subject, delete it.",
      trap: "The tail gives the sentence a rhythmic close, which makes it feel intended.",
    },
    {
      number: 7,
      subskill: "modifiers",
      family: "dangling-participle",
      difficulty: "Hard",
      keep: false,
      key: "Sorted by the pattern of their lines, the stars fell into a sequence that turned out to track temperature.",
      noChange: "The opening phrase describes the stars, but the noun after the comma is Cannon.",
      wrong: [
        [
          "Sorting by the pattern of their lines, a sequence emerged that turned out to track temperature.",
          "The phrase now describes 'a sequence,' which is not what does the sorting.",
        ],
        [
          "Sorted by the pattern of their lines, a sequence was produced by Cannon that tracked temperature.",
          "The modifier attaches to 'a sequence,' which is the result rather than the thing sorted.",
        ],
      ],
      why:
        "A participial phrase at the head of a sentence attaches to the first noun after the comma. " +
        "The stars are what get sorted, so the stars have to be that noun.",
      steps: [
        "Ask what is sorted by the pattern of their lines. The stars are.",
        "Rewrite so 'the stars' follows the comma.",
      ],
      hint: "Read the opening phrase, then the first noun after the comma, and see if they match.",
      trap: "Cannon really did the sorting, which makes the original read as accurate.",
    },
    {
      number: 8,
      subskill: "transitions",
      family: "concession-versus-sequence-transition",
      difficulty: "Medium",
      keep: false,
      key: "Then,",
      noChange: "'Nevertheless' concedes something, but this paragraph continues a list of women.",
      wrong: [
        ["Similarly,", "Leavitt's assignment differs from Cannon's work rather than resembling it."],
        ["Consequently,", "Leavitt's assignment was not caused by Cannon's classification system."],
      ],
      why:
        "Paragraphs 3 and 4 move through the computers one at a time. The transition should mark the " +
        "next in that sequence.",
      steps: [
        "Ask what this paragraph does: it introduces the next person in a series.",
        "Choose the transition that marks sequence.",
      ],
      hint: "Look at how the previous paragraph moved from Fleming to Cannon.",
      trap: "'Nevertheless' sounds considered and concedes something that was never claimed.",
    },
    {
      number: 9,
      subskill: "pronouns",
      family: "plural-antecedent",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["it", "The singular pronoun cannot stand for the plural 'the variable stars.'"],
        ["those ones", "The phrase is nonstandard and adds nothing the pronoun does not carry."],
        ["which", "A relative pronoun cannot be the object of 'of' in this construction."],
      ],
      why:
        "The pronoun refers to 'the variable stars,' the plural noun phrase in the sentence before, " +
        "so the plural object pronoun is correct.",
      steps: [
        "Find what she found more than a thousand of: variable stars.",
        "Match the pronoun to that noun in number.",
      ],
      hint: "'More than a thousand of' requires a plural to draw from.",
      trap: "'The Small Magellanic Cloud' is singular and sits closer to the pronoun.",
    },
    {
      number: 10,
      subskill: "semicolons and colons",
      family: "semicolon-between-balanced-clauses",
      difficulty: "Hard",
      keep: false,
      key: "took; the relation was tight enough",
      noChange: "A comma alone cannot join two independent clauses of equal weight.",
      wrong: [
        [
          "took: the relation was tight enough",
          "A colon introduces an explanation, but the second clause assesses the first rather than explaining it.",
        ],
        [
          "took and the relation was tight enough",
          "Without a comma before 'and' the two clauses run together unpunctuated.",
        ],
      ],
      why:
        "The first clause states the pattern and the second judges it. Both are complete, and a " +
        "semicolon joins equals without subordinating either.",
      steps: [
        "Confirm both sides stand alone as sentences. They do.",
        "Ask whether the second explains the first or evaluates it. It evaluates.",
      ],
      hint: "The observation and the verdict on it are two separate statements.",
      trap: "The sentence already uses a colon earlier, which makes a second one look consistent.",
    },
    {
      number: 11,
      subskill: "precision",
      family: "vague-noun",
      difficulty: "Medium",
      keep: false,
      key: "rule",
      noChange: "'A thing you could count on' is vague and turns to address the reader as 'you.'",
      wrong: [
        ["dependable sort of pattern", "The phrase hedges where the sentence needs a definite claim."],
        ["thing that could be relied upon", "The passive rewording is longer and no more exact."],
      ],
      why:
        "The next paragraph opens 'A rule like that,' so this sentence has to supply that noun. It is " +
        "also the word that makes the discovery matter: not a tendency but a law.",
      steps: [
        "Read the first words of the next paragraph.",
        "Use the noun it refers back to.",
      ],
      hint: "The paragraph after this one names the word for you.",
      trap: "The vaguer phrasing sounds appropriately cautious for a scientific claim.",
    },
    {
      number: 12,
      subskill: "support",
      family: "supporting-detail",
      difficulty: "Medium",
      stem:
        "Given that all the choices are true, which one, if added here, best prepares the reader " +
        "for the explanation that follows?",
      key: "Until then astronomers could say which of two stars was brighter, but not which was nearer.",
      wrong: [
        [
          "Leavitt published her result in a short paper issued by the observatory in 1912.",
          "The publication date does not establish what problem the relation solved.",
        ],
        [
          "The Small Magellanic Cloud is visible only from the southern hemisphere.",
          "Where the cloud can be seen has no bearing on the measuring stick that follows.",
        ],
        [
          "Variable stars of this kind are now called Cepheids after an earlier example.",
          "The name of the star type is a label rather than the problem it answered.",
        ],
      ],
      why:
        "The paragraph explains how the relation yields distance. It only lands if the reader knows " +
        "distance was the thing astronomers could not measure.",
      steps: [
        "Read the explanation that follows and name what it produces: distance.",
        "Keep the choice establishing that distance was previously out of reach.",
      ],
      hint: "A setup sentence should make the payoff feel like an answer.",
      trap: "The publication detail is the most historical choice and sets up nothing.",
    },
    {
      number: 13,
      subskill: "purpose",
      family: "goal-assessment",
      difficulty: "Hard",
      stem:
        "Suppose the writer's goal had been to write an essay about work classed as routine that " +
        "turned out not to be. Would this essay accomplish that goal?",
      key: "Yes, because the job was defined as recording and filing, and one of the recorders found the relation that measured the universe.",
      wrong: [
        [
          "Yes, because the women were paid twenty-five to fifty cents an hour for their work.",
          "The wage shows how the work was valued, not that its nature was misjudged.",
        ],
        [
          "No, because Cannon and Leavitt are both described as making major contributions.",
          "That they made them while employed as computers is exactly the essay's point.",
        ],
        [
          "No, because the essay concerns the history of astronomy rather than the nature of work.",
          "The astronomy is the evidence; the essay's frame is the job and what it was thought to be.",
        ],
      ],
      why:
        "The job was described as recording line positions, comparing plates, and filing. Out of that " +
        "came a classification system still in use and a method for measuring cosmic distance.",
      steps: [
        "Name how the essay defines the job in paragraph 2.",
        "Set that against what paragraphs 3 to 5 say came out of it.",
      ],
      hint: "Compare the job description with the results.",
      trap: "One wrong choice restates the essay's own evidence and calls it a contradiction.",
    },
  ],
};
