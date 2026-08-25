"use strict";

module.exports = {
  id: "act-english-p016",
  type: "process-narrative",
  title: "The Only Step Done Blind",
  content: `[1] The first part of developing black-and-white film happens in total
{1 darkness, and has} to be done by touch. A strip of exposed film is wound onto
a spiral reel, and anyone who can see well enough to watch the winding
{2 have} already ruined the film.

[2] {3} The loaded reel {4 goes} into a light-tight tank. Once the lid is on,
the rest of the work can be carried out in a lit {5 room, that is why the tank
exists:} it is the only step that has to be done {6 blind and without any light
at all}.

[3] Then comes the developer, which converts the exposed silver halide crystals
into metallic silver at a rate that depends on temperature. {7 Timed for
sixty-eight degrees Fahrenheit, a difference of two degrees changes the
development time by a noticeable fraction.} The tank is agitated for the first
thirty seconds and then for ten seconds out of every minute, because developer
left to sit exhausts itself against the film and leaves streaks.

[4] {8 Meanwhile,} the developer is poured off. An acid stop bath {9 deals with
development} in a few seconds. The fixer follows, and {10 it} dissolves the
silver halide that was never exposed, which is what makes the image permanent
and the film safe to carry out into daylight.

[5] The wash takes longer than every other step {11 combined; fixer left in the
emulsion will stain the negatives brown over the following decades.} It is the
one failure nobody discovers until the negatives are old.

[6] Sixty-eight degrees. Thirty seconds, then ten seconds a minute. The numbers
look fussy written down, and each one is the difference between a negative and a
strip of grey plastic.`,
  questions: [
    {
      number: 1,
      subskill: "commas",
      family: "comma-with-compound-predicate",
      difficulty: "Easy",
      keep: false,
      key: "darkness and has",
      noChange: "A comma before 'and' needs a second subject after it, and none appears.",
      wrong: [
        ["darkness; and has", "A semicolon must join independent clauses, and 'has to be done' is not one."],
        ["darkness, and it has", "Adding a subject fixes the comma but repeats a subject the sentence already has."],
      ],
      why:
        "'Happens' and 'has' share the subject 'The first part,' so they form a compound predicate, " +
        "which takes no comma before its conjunction.",
      steps: [
        "Look for a subject after 'and.' There is none.",
        "Remove the comma.",
      ],
      hint: "Ask whether the words after 'and' could stand alone as a sentence.",
      trap: "The subject is long, so the sentence pauses naturally right where the comma sits.",
    },
    {
      number: 2,
      subskill: "subject-verb agreement",
      family: "indefinite-pronoun-agreement",
      difficulty: "Medium",
      keep: false,
      key: "has",
      noChange: "'Anyone' is singular and cannot take a plural verb.",
      wrong: [
        ["have had", "The verb is still plural and the perfect form adds a span the sentence does not need."],
        ["are having", "The plural progressive misses both the number and the completed action."],
      ],
      why:
        "The subject is 'anyone,' which is always singular. The clause 'who can see well enough to " +
        "watch the winding' describes it and cannot supply the verb's number.",
      steps: [
        "Strip the relative clause and read 'anyone … has already ruined the film.'",
        "Match the verb to the singular subject.",
      ],
      hint: "Indefinite pronouns ending in -one and -body are singular.",
      trap: "The clause between the subject and the verb is long enough to lose the subject in.",
    },
    {
      number: 3,
      subskill: "introductions",
      family: "paragraph-opening",
      difficulty: "Medium",
      stem: "Which choice, if added here, provides the most effective opening for this paragraph?",
      key: "The darkness lasts only as long as it takes to get the film into something light cannot enter.",
      wrong: [
        [
          "Developing tanks are usually made of stainless steel or moulded plastic.",
          "The material of the tank is never taken up again anywhere in the essay.",
        ],
        [
          "Black-and-white photography remained the standard for newspapers well into the 1980s.",
          "The history of newspaper photography has nothing to do with the process described here.",
        ],
        [
          "There are a few pieces of equipment a darkroom needs before any film can be developed.",
          "The vague promise of a list does not set up the single step this paragraph explains.",
        ],
      ],
      why:
        "Paragraph 1 leaves the reader working blind. This paragraph explains how the darkness ends, " +
        "so its opening should mark that the blindness is temporary.",
      steps: [
        "Note what paragraph 1 establishes: total darkness and work done by touch.",
        "Choose the opening that begins ending that condition.",
      ],
      hint: "The paragraph's job is to explain why the tank exists; the opening should point at it.",
      trap: "Every choice is true about darkrooms, so accuracy does not narrow the field.",
    },
    {
      number: 4,
      subskill: "verb forms",
      family: "simple-present-for-a-standard-procedure",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["went", "The past tense reports one occasion instead of what happens every time."],
        ["is going", "The progressive describes a single moment rather than standard practice."],
        ["has gone", "The present perfect points at completed instances rather than a rule."],
      ],
      why:
        "The essay describes what happens whenever film is developed, and every verb around it is in " +
        "the simple present. That tense states a standing procedure.",
      steps: [
        "Check the tense of the neighbouring verbs: 'is,' 'can be carried out,' 'has.'",
        "Keep the underlined verb in that tense.",
      ],
      hint: "A process narrative describes every performance at once.",
      trap: "The paragraph tells a sequence, and sequence makes the past tense feel natural.",
    },
    {
      number: 5,
      subskill: "clause relationships",
      family: "comma-splice",
      difficulty: "Medium",
      keep: false,
      key: "room, which is why the tank exists:",
      noChange: "'That is' opens a new independent clause, leaving two clauses joined by a comma.",
      wrong: [
        [
          "room, this is why the tank exists:",
          "The demonstrative still begins an independent clause, so the splice is unchanged.",
        ],
        [
          "room and that is why the tank exists:",
          "Without a comma before 'and' the two clauses run together unpunctuated.",
        ],
      ],
      why:
        "Replacing the demonstrative with the relative pronoun 'which' makes the second half depend " +
        "on the first, which is what the sentence means it to do.",
      steps: [
        "Test each side of the comma as a sentence. Both stand, so it is a splice.",
        "Subordinate the second half rather than leaving it independent.",
      ],
      hint: "The second half explains the first, so make it grammatically dependent.",
      trap: "'That is why' is so idiomatic that it does not register as a new sentence.",
    },
    {
      number: 6,
      subskill: "conciseness",
      family: "stacked-redundancy",
      difficulty: "Easy",
      keep: false,
      key: "blind",
      noChange: "'Without any light at all' repeats exactly what 'blind' already means here.",
      wrong: [
        ["blind and without light", "Shortening the second phrase leaves it repeating the first."],
        ["without any light at all", "The longer phrase replaces one word with five that mean the same."],
      ],
      why:
        "The paragraph has already established that the first step happens in total darkness. One " +
        "word is enough to point back at it.",
      steps: [
        "Note that the sentence is referring back to something already described.",
        "Keep the single word that does the referring.",
      ],
      hint: "The information is already on the page; this sentence only has to name it.",
      trap: "The doubled phrasing sounds emphatic, and emphasis reads as precision.",
    },
    {
      number: 7,
      subskill: "modifiers",
      family: "dangling-participle",
      difficulty: "Hard",
      keep: false,
      key: "Because most developers are timed for sixty-eight degrees Fahrenheit, a difference of two degrees changes the development time by a noticeable fraction.",
      noChange: "The opening phrase describes the developer, but the noun after the comma is 'a difference.'",
      wrong: [
        [
          "Timed for sixty-eight degrees Fahrenheit, the development time changes by a noticeable fraction with a difference of two degrees.",
          "The phrase now describes the development time, which is what changes rather than what is timed.",
        ],
        [
          "Timing for sixty-eight degrees Fahrenheit, a difference of two degrees changes the development time by a noticeable fraction.",
          "Changing the participle leaves it attached to the same wrong noun.",
        ],
      ],
      why:
        "A participial phrase at the head of a sentence attaches to the first noun after the comma. " +
        "Developers are timed for a temperature; a difference is not. Turning it into a clause names " +
        "the developers outright.",
      steps: [
        "Ask what is timed for sixty-eight degrees. The developer is.",
        "Rewrite the opening as a clause that names it.",
      ],
      hint: "When no rearrangement puts the right noun after the comma, make the phrase a clause.",
      trap: "The sentence states a true fact about temperature, so nothing reads as an error.",
    },
    {
      number: 8,
      subskill: "transitions",
      family: "sequence-transition",
      difficulty: "Medium",
      keep: false,
      key: "When the time is up,",
      noChange: "'Meanwhile' says this happens during development, but it can only happen at its end.",
      wrong: [
        ["Similarly,", "Pouring off the developer is not like the agitation described before it."],
        ["Even so,", "Nothing in the previous paragraph is being conceded or contradicted."],
      ],
      why:
        "The developer's timing is the subject of the previous paragraph. This paragraph begins the " +
        "moment that timing ends, so the transition has to mark the end of it.",
      steps: [
        "Ask whether this step happens during the last one or after it.",
        "Choose the transition that marks the moment it ends.",
      ],
      hint: "The previous paragraph is entirely about a clock; this one starts when it runs out.",
      trap: "'Meanwhile' is a natural process-narrative word and asserts exactly the wrong order.",
    },
    {
      number: 9,
      subskill: "precision",
      family: "imprecise-verb-phrase",
      difficulty: "Medium",
      keep: false,
      key: "halts development",
      noChange: "'Deals with development' names no action in a sentence about a chemical step.",
      wrong: [
        ["takes care of development", "The phrase is just as unspecific as the original it replaces."],
        ["addresses the development stage", "The wording is vaguer and adds a noun the sentence does not need."],
      ],
      why:
        "A stop bath does one thing: it ends the developer's action. The verb should say so, since " +
        "the paragraph is a sequence of chemical steps each with a distinct job.",
      steps: [
        "Ask what an acid stop bath actually does.",
        "Use the verb that names it.",
      ],
      hint: "The name of the bath tells you the verb.",
      trap: "'Deals with' is idiomatic and fluent, so the sentence does not sound wrong.",
    },
    {
      number: 10,
      subskill: "pronouns",
      family: "pronoun-with-a-clear-antecedent",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["they", "The plural pronoun does not agree with the singular noun 'The fixer.'"],
        ["this", "The bare demonstrative points at the clause rather than at a noun."],
        ["that one", "The phrase is vaguer than the pronoun and names nothing specific."],
      ],
      why:
        "The pronoun refers to 'The fixer,' the singular subject of the clause just before it, and " +
        "nothing else in the sentence competes for it.",
      steps: [
        "Find the noun the pronoun stands for: the fixer.",
        "Confirm it is singular and keep the matching pronoun.",
      ],
      hint: "The subject of the first clause is the antecedent.",
      trap: "'Crystals' and 'negatives' appear nearby in the plural and colour the ear.",
    },
    {
      number: 11,
      subskill: "semicolons and colons",
      family: "semicolon-between-balanced-clauses",
      difficulty: "Hard",
      keep: true,
      wrong: [
        [
          "combined, fixer left in the emulsion will stain the negatives brown over the following decades.",
          "A comma alone between two independent clauses is a splice.",
        ],
        [
          "combined: fixer left in the emulsion will stain the negatives brown over the following decades.",
          "A colon introduces an explanation, but the second clause states the consequence of skimping.",
        ],
        [
          "combined and fixer left in the emulsion will stain the negatives brown over the following decades.",
          "Without a comma before 'and' the two clauses run together unpunctuated.",
        ],
      ],
      why:
        "Both clauses are complete and equally weighted — how long the wash takes, and what happens " +
        "when it is cut short. A semicolon joins equals without subordinating either.",
      steps: [
        "Confirm both sides stand alone as sentences. They do.",
        "Ask whether the second explains the first or balances it. It balances.",
      ],
      hint: "Two full sentences of similar weight are what a semicolon is for.",
      trap: "The second clause supplies a reason, which points the eye toward a colon.",
    },
    {
      number: 12,
      subskill: "conclusions",
      family: "closing-paragraph-function",
      difficulty: "Medium",
      stem:
        "The writer is considering deleting the final paragraph. Should the paragraph be kept or " +
        "deleted?",
      key: "Kept, because it gathers the essay's scattered numbers and says what they are for.",
      wrong: [
        [
          "Kept, because it introduces the temperature at which black-and-white developers are timed.",
          "The temperature was already given in paragraph 3, so nothing is being introduced.",
        ],
        [
          "Deleted, because it repeats figures the essay has already supplied to the reader.",
          "Repeating them together is what turns three separate numbers into one point.",
        ],
        [
          "Deleted, because it shifts from describing the process to evaluating the reader's care.",
          "The paragraph evaluates the numbers, not the reader, and offers no instruction.",
        ],
      ],
      why:
        "Three numbers appear scattered through the essay as separate requirements. The closing puts " +
        "them side by side and states what obeying them buys, which no earlier paragraph does.",
      steps: [
        "Ask what the paragraph contains that is not already stated elsewhere.",
        "Keep the reason that names the assembling rather than the repetition.",
      ],
      hint: "Repetition can be the point when scattered facts are being collected.",
      trap: "The paragraph genuinely does repeat, which is the usual reason to cut a closing.",
    },
    {
      number: 13,
      subskill: "purpose",
      family: "goal-assessment",
      difficulty: "Hard",
      stem:
        "Suppose the writer's goal had been to describe a process in which the most consequential " +
        "mistakes are the ones that are hardest to notice. Would this essay accomplish that goal?",
      key: "Yes, because a short wash and a wrong temperature both produce damage that appears only later or not at all.",
      wrong: [
        [
          "Yes, because the first step of the process must be carried out in complete darkness.",
          "Working blind is the most obvious constraint in the essay, not a hidden mistake.",
        ],
        [
          "No, because the essay states that fixer makes the film safe to carry into daylight.",
          "That is the process working correctly, not an argument about undetected error.",
        ],
        [
          "No, because every step described has a clearly specified time and temperature.",
          "Having a specification is what makes departing from it easy to miss.",
        ],
      ],
      why:
        "Two degrees of temperature changes the development invisibly, and a short wash produces " +
        "staining nobody discovers for decades. Both are errors with no signal at the time.",
      steps: [
        "Find the failures the essay names and ask when each becomes visible.",
        "Keep the reason that covers more than one of them.",
      ],
      hint: "The essay names two failures with delayed consequences; count them before choosing.",
      trap: "The darkness is the most memorable constraint and is the opposite of hard to notice.",
    },
  ],
};
