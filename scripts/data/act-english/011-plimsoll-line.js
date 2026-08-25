"use strict";

module.exports = {
  id: "act-english-p011",
  type: "historical-account",
  title: "Fourteen Years of a Good Law",
  content: `[1] In the {1 1860s a British sailor} who refused to board a ship he
believed unseaworthy could be jailed for it. The ship sailed anyway, loaded past
any sensible limit, and if it went down the owner collected on the policy.

[2] {2 Meanwhile,} the practice already had a name in the newspapers: coffin
ships. The arithmetic behind it was simple and ugly. A vessel insured for more
than its worth {3 were} more valuable at the bottom of the sea than in port, and
no law fixed how deep a loaded {4 ship's} hull was allowed to sit.

[3] Samuel Plimsoll was a coal merchant who became a member of Parliament for
Derby. In 1873 he published a book called “Our Seamen,” {5 full of names,
tonnages, and drowned crews that the book listed}. It was {6 intemperate, partly
inaccurate, and enormously effective}. Plimsoll was sued for libel, censured in
the House, and read everywhere.

[4] {7 Passed in 1876, every British ship had to carry a mark on its hull.} The
mark sat on the {8 hull, it showed the maximum depth} to which the ship could
legally be loaded, and it became known almost at once as the Plimsoll line.

[5] {9 Consequently,} the law had a hole in it. For fourteen years the owner,
not the Board of Trade, decided where on the hull the mark was painted. Some
owners painted it on the {10 deck}. Not until 1890 did the Board fix the
position by {11 rule, only then did the line mean what the public had believed
all along it meant.} {12}

[6] Plimsoll's name survives on the side of every merchant vessel afloat. The
fourteen years do not.`,
  questions: [
    {
      number: 1,
      subskill: "commas",
      family: "introductory-phrase-comma",
      difficulty: "Easy",
      keep: false,
      key: "1860s, a British sailor",
      noChange: "The introductory phrase runs straight into the subject with no comma between them.",
      wrong: [
        ["1860s, a British sailor,", "The second comma cuts the subject off from its own verb."],
        ["1860s; a British sailor", "A semicolon must join independent clauses, and 'In the 1860s' is not one."],
      ],
      why:
        "'In the 1860s' opens the sentence and is not its subject. One comma marks where the " +
        "introductory phrase ends and the main clause begins.",
      steps: [
        "Find where the opening phrase stops: after '1860s.'",
        "Place a single comma there.",
      ],
      hint: "A date phrase at the head of a sentence takes one comma, not two.",
      trap: "A second comma looks balanced and quietly severs the subject from the sentence.",
    },
    {
      number: 2,
      subskill: "transitions",
      family: "time-versus-simultaneity-transition",
      difficulty: "Medium",
      keep: false,
      key: "By then,",
      noChange: "'Meanwhile' claims this happened alongside the first paragraph rather than by that point.",
      wrong: [
        ["Therefore,", "The newspapers' name for the practice was not caused by the jailing of sailors."],
        ["In contrast,", "The paragraph continues the first one's account rather than opposing it."],
      ],
      why:
        "Paragraph 1 establishes the situation in the 1860s. This paragraph reports what the practice " +
        "was already being called by that time, so the transition marks accumulated time.",
      steps: [
        "Ask whether this happened during the last paragraph or had already happened by then.",
        "Choose the transition that marks the point reached rather than simultaneity.",
      ],
      hint: "The word 'already' later in the sentence tells you what the transition should say.",
      trap: "'Meanwhile' is a natural-sounding history word and is wrong here for a subtle reason.",
    },
    {
      number: 3,
      subskill: "subject-verb agreement",
      family: "subject-across-a-participial-phrase",
      difficulty: "Medium",
      keep: false,
      key: "was",
      noChange: "The plural verb has been matched to 'more than its worth' rather than to 'A vessel.'",
      wrong: [
        ["are", "The verb is still plural and the present tense breaks the historical narration."],
        ["have been", "The plural present perfect misses both the number and the past time frame."],
      ],
      why:
        "The subject is 'A vessel,' singular. 'Insured for more than its worth' is a participial " +
        "phrase describing it, and a modifier never supplies the verb's number.",
      steps: [
        "Strike the participial phrase and read what remains: 'A vessel … was.'",
        "Match the verb to that singular subject.",
      ],
      hint: "Delete the phrase between the subject and the verb before deciding.",
      trap: "The phrase ends in a plural-sounding comparison, which is where the ear settles.",
    },
    {
      number: 4,
      subskill: "apostrophes",
      family: "singular-possessive",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["ships", "The bare plural shows no possession, so the hull belongs to nothing."],
        ["ships'", "The plural possessive contradicts the singular 'a loaded' in front of it."],
        ["ship", "The singular is right in number but marks no possessive relationship."],
      ],
      why:
        "'A loaded ship' is one vessel, and the hull belongs to it, so the noun takes the singular " +
        "possessive: apostrophe, then s.",
      steps: [
        "Note the singular article 'a' in front of the noun.",
        "Keep the singular possessive that matches it.",
      ],
      hint: "The article before the noun tells you how many owners there are.",
      trap: "'Hull' is such a common pairing that the possessive stops registering as one.",
    },
    {
      number: 5,
      subskill: "conciseness",
      family: "redundant-relative-clause",
      difficulty: "Easy",
      keep: false,
      key: "full of names, tonnages, and drowned crews",
      noChange: "'That the book listed' repeats what 'full of' has already established.",
      wrong: [
        ["full of the names, tonnages, and drowned crews it listed", "The relative clause survives in shorter form and still repeats."],
        ["containing a listing of names, tonnages, and drowned crews", "The noun phrasing is longer and less direct than 'full of.'"],
      ],
      why:
        "'Full of' already says the book contained these things. A clause stating that the book " +
        "listed them adds no information the phrase has not given.",
      steps: [
        "Read the phrase and the clause together and note that they say the same thing.",
        "Cut the clause.",
      ],
      hint: "If a clause only restates the phrase before it, delete the clause.",
      trap: "The clause supplies a verb, and verbs feel like they are carrying meaning.",
    },
    {
      number: 6,
      subskill: "parallelism",
      family: "parallel-adjective-series",
      difficulty: "Hard",
      keep: true,
      wrong: [
        [
          "intemperate, partly inaccurate, and it was enormously effective",
          "The third item becomes a clause where the first two are adjective phrases.",
        ],
        [
          "intemperate, partly inaccurate, and had enormous effect",
          "The third item switches to a verb phrase and breaks the pattern.",
        ],
        [
          "an intemperate book, partly inaccurate, and enormously effective",
          "The first item becomes a noun phrase the other two do not match.",
        ],
      ],
      why:
        "Three adjective phrases follow one linking verb, and the sentence's force comes from the " +
        "third landing in the same shape as the first two.",
      steps: [
        "Read 'It was' into each of the three items in turn.",
        "Keep the version in which all three fit that frame.",
      ],
      hint: "The sentence sets up a surprise in its third item; parallel form is what delivers it.",
      trap: "The third adjective reverses the sentence's direction, which makes recasting it feel natural.",
    },
    {
      number: 7,
      subskill: "modifiers",
      family: "dangling-participle",
      difficulty: "Hard",
      keep: false,
      key: "Passed in 1876, the Merchant Shipping Act required every British ship to carry a mark on its hull.",
      noChange: "The opening phrase describes a law, but the noun after the comma is 'every British ship.'",
      wrong: [
        [
          "Passing in 1876, every British ship had to carry a mark on its hull.",
          "The active form makes the ships do the passing, which reverses the meaning.",
        ],
        [
          "Passed in 1876, a mark had to be carried on the hull of every British ship.",
          "The phrase now describes 'a mark,' which is not what was passed.",
        ],
      ],
      why:
        "A participial phrase at the head of a sentence attaches to the first noun after the comma. " +
        "The Act was passed in 1876, so the Act has to be that noun.",
      steps: [
        "Ask what was passed in 1876. The Act was.",
        "Rewrite so the Act follows the comma.",
      ],
      hint: "Read the opening phrase, then read the first noun after the comma, and see if they match.",
      trap: "The sentence states the law's effect accurately, so nothing about it sounds false.",
    },
    {
      number: 8,
      subskill: "clause relationships",
      family: "comma-splice",
      difficulty: "Medium",
      keep: false,
      key: "hull, and it showed the maximum depth",
      noChange: "Two independent clauses are joined by a comma with no conjunction.",
      wrong: [
        [
          "hull it showed the maximum depth",
          "Removing the comma fuses the two clauses rather than separating them.",
        ],
        [
          "hull, showing the maximum depth",
          "The participle drops the clause's subject and blurs what showed the depth.",
        ],
      ],
      why:
        "'The mark sat on the hull' and 'it showed the maximum depth' are both complete sentences, " +
        "and the sentence goes on to add a third clause with 'and,' so the series needs one here too.",
      steps: [
        "Test each side of the comma as a sentence. Both stand.",
        "Add the conjunction that matches the one joining the clause that follows.",
      ],
      hint: "Look at how the third clause in this sentence is joined, and match it.",
      trap: "The sentence is long enough that the splice sits far from where the eye stops.",
    },
    {
      number: 9,
      subskill: "transitions",
      family: "consequence-versus-concession-transition",
      difficulty: "Medium",
      keep: false,
      key: "Even so,",
      noChange: "'Consequently' says the hole in the law was caused by the law's passage.",
      wrong: [
        ["Similarly,", "A defect in the law is not like the law's requirement described before it."],
        ["For example,", "The hole is not an instance of the marking requirement but a limit on it."],
      ],
      why:
        "Paragraph 4 reports a victory; paragraph 5 concedes that the victory was incomplete. The " +
        "transition marks a concession, not a consequence.",
      steps: [
        "Ask whether this paragraph follows from the last or pushes against it.",
        "Choose the transition that concedes.",
      ],
      hint: "The sentence says the law 'had a hole in it,' which is an objection, not a result.",
      trap: "'Consequently' sounds analytical, and analytical sounds like the mature choice.",
    },
    {
      number: 10,
      subskill: "precision",
      family: "precise-concrete-noun",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["wrong place entirely", "The vague phrase drops the detail that makes the abuse obvious."],
        ["higher position on the vessel", "The wording is less exact and blunts what 'deck' shows at once."],
        ["location of their own choosing", "The phrase restates the previous sentence instead of illustrating it."],
      ],
      why:
        "The previous sentence says owners chose the position. This sentence has to show how far that " +
        "went, and a load line painted on the deck is a mark that can never be submerged.",
      steps: [
        "Ask what the sentence is doing: giving the extreme case, not repeating the rule.",
        "Keep the concrete noun that makes the abuse visible.",
      ],
      hint: "The right answer is the one that would make a reader stop.",
      trap: "The vaguer choices sound more measured, and measured sounds more careful.",
    },
    {
      number: 11,
      subskill: "semicolons and colons",
      family: "semicolon-between-balanced-clauses",
      difficulty: "Hard",
      keep: false,
      key: "rule; only then did the line mean what the public had believed all along it meant.",
      noChange: "A comma alone cannot join two independent clauses of equal weight.",
      wrong: [
        [
          "rule: only then did the line mean what the public had believed all along it meant.",
          "A colon introduces an explanation, but the second clause marks a turning point instead.",
        ],
        [
          "rule and only then did the line mean what the public had believed all along it meant.",
          "Without a comma before 'and' the two clauses run together unpunctuated.",
        ],
      ],
      why:
        "Both clauses are complete and carry equal weight — the Board acted, and only then did the " +
        "mark mean anything. A semicolon joins equals without subordinating either.",
      steps: [
        "Confirm both sides stand alone as sentences. They do.",
        "Ask whether the second explains the first or balances it. It balances.",
      ],
      hint: "Both clauses here open with inverted word order, which is a sign they are matched.",
      trap: "The second clause feels like it is spelling out the first, which points toward a colon.",
    },
    {
      number: 12,
      subskill: "support",
      family: "supporting-detail",
      difficulty: "Medium",
      stem:
        "Given that all the choices are true, which one, if added here, best supports the " +
        "paragraph's point that the 1876 law did not do what people assumed it did?",
      key: "Loss rates among British merchant ships barely moved between 1876 and 1890.",
      wrong: [
        [
          "Plimsoll lost his seat in Parliament in 1880 and never returned to the Commons.",
          "His career after 1876 is a fact about the man rather than about the law's effect.",
        ],
        [
          "Other maritime nations adopted load line requirements over the following decades.",
          "International adoption shows the idea spreading, not that the British law was hollow.",
        ],
        [
          "The load line is now set by international convention and revised periodically.",
          "The modern arrangement postdates the paragraph and says nothing about those years.",
        ],
      ],
      why:
        "The paragraph's claim is that the mark meant nothing while owners placed it themselves. " +
        "Unchanged loss rates are the evidence that the law was not yet working.",
      steps: [
        "Name the claim: the law existed but did not protect anyone for fourteen years.",
        "Keep the choice that measures whether protection actually happened.",
      ],
      hint: "The claim is about effect, so the support has to be about outcomes.",
      trap: "Every choice is a true fact about load lines in roughly the right period.",
    },
    {
      number: 13,
      subskill: "purpose",
      family: "goal-assessment",
      difficulty: "Hard",
      stem:
        "Suppose the writer's goal had been to write an essay about the distance between passing a " +
        "law and enforcing one. Would this essay accomplish that goal?",
      key: "Yes, because the mark was required in 1876 and meaningless until the Board fixed its position in 1890.",
      wrong: [
        [
          "Yes, because Plimsoll was sued for libel and censured in the House of Commons.",
          "The costs to Plimsoll came before the law passed and are not about enforcing it.",
        ],
        [
          "No, because the essay shows that the Merchant Shipping Act was obeyed by shipowners.",
          "Owners obeyed the letter by painting a mark somewhere, which is the essay's point.",
        ],
        [
          "No, because the essay is chiefly a portrait of the campaigner rather than of the statute.",
          "Plimsoll occupies one paragraph; the law and its gap occupy three.",
        ],
      ],
      why:
        "The law was passed, celebrated, and named after the man who won it — and for fourteen years " +
        "a shipowner could satisfy it by painting the line where the water would never reach.",
      steps: [
        "Locate the two dates the essay puts weight on: 1876 and 1890.",
        "Keep the reason that names the gap between them.",
      ],
      hint: "The essay's last two sentences state the answer in miniature.",
      trap: "One wrong choice reads the owners' compliance as obedience, which is exactly the trick.",
    },
  ],
};
