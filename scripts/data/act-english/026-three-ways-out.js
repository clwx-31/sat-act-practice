"use strict";

module.exports = {
  id: "act-english-p026",
  type: "informative-essay",
  title: "Three Ways Out",
  content: `[1] Heat moves in three {1 ways and a} vacuum flask is built to block
all three. Nothing about the object is complicated. What is interesting {2 are}
how completely each path has to be closed before the thing works at all.

[2] {3} Conduction {4 is} heat travelling through a material. Convection is heat
carried by a moving fluid. Both need matter, so both stop when the matter is
{5 removed, a flask is two vessels}, one inside the other, joined only at the
neck, with the space between them pumped out.

[3] The vacuum is never perfect and does not {6 need to be perfect or have to
be}. What remains is thin enough that the few molecules left carry almost
nothing across. The joint at the neck is the exception, because it is solid
glass or steel and heat conducts through it steadily. {7 Made long and thin, a
manufacturer is trying to turn a short conductor into a long one.}

[4] {8 Similarly,} radiation needs no matter at all. A hot liquid emits
infrared, and infrared crosses a vacuum without difficulty. This is why the
facing surfaces are {9 silvered, a mirrored surface emits very little} and
{10 does a lot with} most of what strikes it, so the two walls trade almost no
radiation between {11 them}.

[5] {12} The stopper is the last path and the crudest. A {13 flask's} weakest
point is the one part that has to come out: it touches the liquid, the air above
it, and the room, and no vacuum surrounds any of it.

[6] A flask does not keep anything hot. It makes things cool slowly, and it does
that by closing every route out except the one it cannot close.`,
  questions: [
    {
      number: 1,
      subskill: "commas",
      family: "comma-before-a-coordinating-conjunction",
      difficulty: "Easy",
      keep: false,
      key: "ways, and a",
      noChange: "Two independent clauses joined by 'and' need a comma before the conjunction.",
      wrong: [
        ["ways; and a", "A semicolon and a coordinating conjunction do the same job, so both is redundant."],
        ["ways, and, a", "The second comma separates the conjunction from the subject that follows."],
      ],
      why:
        "'Heat moves in three ways' and 'a vacuum flask is built to block all three' are both " +
        "complete clauses, so the 'and' between them takes a comma.",
      steps: [
        "Check whether the words on each side of 'and' could stand alone. They could.",
        "Place a comma immediately before the conjunction.",
      ],
      hint: "A comma goes before 'and' when a full sentence follows it.",
      trap: "The first clause is short, which makes the sentence feel like one thought.",
    },
    {
      number: 2,
      subskill: "subject-verb agreement",
      family: "noun-clause-subject",
      difficulty: "Medium",
      keep: false,
      key: "is",
      noChange: "The plural verb has been matched to 'three ways' rather than to the clause subject.",
      wrong: [
        ["were", "The verb is still plural and the past tense breaks the present-tense explanation."],
        ["have been", "The plural present perfect misses both the number and the standing claim."],
      ],
      why:
        "The subject is the noun clause 'What is interesting,' which is singular however many things " +
        "it turns out to contain.",
      steps: [
        "Identify the subject: the clause beginning 'What.'",
        "Treat a noun clause as singular and choose the singular verb.",
      ],
      hint: "A 'what' clause acting as a subject always takes a singular verb.",
      trap: "The sentence goes on to describe several paths, which colours the ear toward a plural.",
    },
    {
      number: 3,
      subskill: "introductions",
      family: "paragraph-opening",
      difficulty: "Medium",
      stem: "Which choice, if added here, provides the most effective opening for this paragraph?",
      key: "Two of the three paths can be shut the same way, because they share a requirement.",
      wrong: [
        [
          "The vacuum flask was invented by James Dewar in the late nineteenth century.",
          "The invention's history is never taken up again anywhere in the essay.",
        ],
        [
          "Most domestic flasks are made of stainless steel rather than of glass.",
          "The choice of material is not what this paragraph goes on to explain.",
        ],
        [
          "There are several physical principles at work inside a vacuum flask.",
          "The vague plural restates the first paragraph instead of advancing it.",
        ],
      ],
      why:
        "Paragraph 1 promises that all three paths must be closed. This paragraph closes two of them " +
        "at once, so the opening should say why two can be taken together.",
      steps: [
        "Note what paragraph 1 sets up: three paths, all of which must be blocked.",
        "Choose the opening that explains why this paragraph handles two.",
      ],
      hint: "The paragraph covers conduction and convection together; the opening should say why.",
      trap: "Every choice is true about vacuum flasks, so accuracy alone cannot decide it.",
    },
    {
      number: 4,
      subskill: "verb forms",
      family: "present-tense-for-a-definition",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["was", "The past tense would confine a definition to some earlier time."],
        ["is being", "The progressive suggests a temporary state rather than what conduction is."],
        ["has been", "The present perfect implies a span that began and might end."],
      ],
      why:
        "The sentence defines a term, and definitions take the simple present. The parallel sentence " +
        "about convection uses that tense as well.",
      steps: [
        "Read the next sentence and note its verb: 'Convection is.'",
        "Keep the underlined verb in the same tense so the two definitions match.",
      ],
      hint: "The sentence immediately after this one is built the same way.",
      trap: "The paragraph goes on to describe a process, which invites a more active tense.",
    },
    {
      number: 5,
      subskill: "clause relationships",
      family: "comma-splice",
      difficulty: "Medium",
      keep: false,
      key: "removed. A flask is two vessels",
      noChange: "Two independent clauses are joined by a comma with no conjunction.",
      wrong: [
        [
          "removed, and a flask is two vessels",
          "The conjunction repairs the splice but ties the principle to the construction as one thought.",
        ],
        [
          "removed, a flask being two vessels",
          "The participle leaves the second half without a main verb of its own.",
        ],
      ],
      why:
        "The first clause states a principle and the second describes how a flask applies it. " +
        "Separating them lets the description carry its own long series of details.",
      steps: [
        "Test each side of the comma as a sentence. Both stand.",
        "Choose the punctuation that gives the second one room for the list that follows.",
      ],
      hint: "The second clause runs to three more phrases; ask whether it should share a sentence.",
      trap: "'And' fixes the grammar and produces a sentence with five clauses in it.",
    },
    {
      number: 6,
      subskill: "conciseness",
      family: "doubled-phrasing",
      difficulty: "Easy",
      keep: false,
      key: "need to be",
      noChange: "'Perfect' repeats the previous clause and 'or have to be' repeats 'need to be.'",
      wrong: [
        ["need to be perfect", "The adjective repeats the word the first half of the sentence just used."],
        ["have to be or need to be", "Two identical constructions remain where one says everything."],
      ],
      why:
        "The clause before it has already supplied 'perfect,' and the elliptical 'need to be' carries " +
        "it forward without repeating it.",
      steps: [
        "Read the first half of the sentence and note the adjective it establishes.",
        "Leave that adjective implied rather than restating it.",
      ],
      hint: "The sentence can end on 'be' because the reader already has the missing word.",
      trap: "Restating the adjective feels clearer, which is how redundancy survives.",
    },
    {
      number: 7,
      subskill: "modifiers",
      family: "dangling-participle",
      difficulty: "Hard",
      keep: false,
      key: "Made long and thin, the neck becomes a long conductor rather than a short one.",
      noChange: "The opening phrase describes the neck, but the noun after the comma is a manufacturer.",
      wrong: [
        [
          "Making it long and thin, the neck becomes a long conductor rather than a short one.",
          "The active form makes the neck do the shaping to itself.",
        ],
        [
          "Made long and thin, turning a short conductor into a long one is the aim.",
          "The phrase now describes 'turning,' which is not what gets made long and thin.",
        ],
      ],
      why:
        "A participial phrase at the head of a sentence attaches to the first noun after the comma. " +
        "The neck is what is made long and thin, so the neck has to be that noun.",
      steps: [
        "Ask what is made long and thin. The neck is.",
        "Rewrite so 'the neck' follows the comma.",
      ],
      hint: "Read the opening phrase, then the first noun after the comma, and see if they match.",
      trap: "A manufacturer really does the shaping, which makes the original read as accurate.",
    },
    {
      number: 8,
      subskill: "transitions",
      family: "comparison-versus-contrast-transition",
      difficulty: "Medium",
      keep: false,
      key: "By contrast,",
      noChange: "'Similarly' claims a likeness, but radiation differs from the two paths just described.",
      wrong: [
        ["Consequently,", "Radiation's independence from matter is not caused by the vacuum."],
        ["For instance,", "Radiation is not an example of conduction or convection but a third path."],
      ],
      why:
        "Paragraphs 2 and 3 close two paths by removing matter. This paragraph introduces the one " +
        "path removing matter does not touch, so the transition marks opposition.",
      steps: [
        "Ask what makes radiation different from the first two paths.",
        "Choose the transition that marks that difference.",
      ],
      hint: "The sentence says radiation needs no matter, which is the opposite of the last two.",
      trap: "The three paths are parallel in the essay's structure, which makes 'Similarly' feel apt.",
    },
    {
      number: 9,
      subskill: "semicolons and colons",
      family: "colon-before-an-explanation",
      difficulty: "Hard",
      keep: false,
      key: "silvered: a mirrored surface emits very little",
      noChange: "A comma is too weak to introduce the explanation the clause has promised.",
      wrong: [
        [
          "silvered; a mirrored surface emits very little",
          "A semicolon balances two equal clauses, but the second half here explains the first.",
        ],
        [
          "silvered, and a mirrored surface emits very little",
          "'And' adds the clause instead of presenting it as the reason for silvering.",
        ],
      ],
      why:
        "'This is why the facing surfaces are silvered' is complete and promises a reason. A colon is " +
        "the mark that delivers what a complete clause has set up.",
      steps: [
        "Confirm the words before the mark form a complete sentence. They do.",
        "Ask whether what follows explains it or balances it. It explains.",
      ],
      hint: "The clause opens with 'This is why,' which is a promise to explain.",
      trap: "Both halves are full clauses, which makes the semicolon look like the technical answer.",
    },
    {
      number: 10,
      subskill: "precision",
      family: "vague-verb-phrase",
      difficulty: "Medium",
      keep: false,
      key: "reflects",
      noChange: "'Does a lot with' names no action in the sentence explaining the mechanism.",
      wrong: [
        ["handles", "The verb is shorter but still names no specific behaviour."],
        ["deals with in some way", "The phrasing is vaguer than the original it was meant to fix."],
      ],
      why:
        "A mirrored surface does one specific thing to incoming radiation, and it is the opposite of " +
        "emitting. Naming it is what makes the sentence's contrast work.",
      steps: [
        "Ask what a mirror does to radiation striking it.",
        "Use the verb that names it.",
      ],
      hint: "The verb is the pair to 'emits' earlier in the same clause.",
      trap: "'Does a lot with' is idiomatic enough that the sentence does not sound wrong.",
    },
    {
      number: 11,
      subskill: "pronouns",
      family: "plural-antecedent",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["it", "The singular pronoun cannot stand for the plural 'the two walls.'"],
        ["themselves", "A reflexive needs the walls to be both subject and object of the same verb."],
        ["those", "The demonstrative points outward rather than back to a noun in the sentence."],
      ],
      why:
        "The pronoun refers to 'the two walls,' the plural subject of the clause it sits in, so the " +
        "plural object pronoun is correct.",
      steps: [
        "Find what trades radiation: the two walls.",
        "Match the pronoun to that noun in number.",
      ],
      hint: "'Between' requires more than one thing.",
      trap: "'Radiation' is singular and sits immediately before the pronoun.",
    },
    {
      number: 12,
      subskill: "support",
      family: "supporting-detail",
      difficulty: "Medium",
      stem:
        "Given that all the choices are true, which one, if added here, best supports the essay's " +
        "point that the stopper is the path that cannot be closed?",
      key: "A flask that could be sealed permanently would keep its contents hot for days, and would also be useless.",
      wrong: [
        [
          "Modern stoppers are usually moulded from polypropylene or silicone rubber.",
          "The material of the stopper says nothing about why the path stays open.",
        ],
        [
          "Heat lost through the stopper can be reduced by preheating the flask first.",
          "Preheating changes the starting temperature rather than the route out.",
        ],
        [
          "The stopper also prevents the contents from spilling when the flask is carried.",
          "A second function of the stopper does not explain why its path is unavoidable.",
        ],
      ],
      why:
        "The paragraph claims this path is structural rather than an oversight. Only the choice " +
        "showing that closing it would defeat the object explains why it stays open.",
      steps: [
        "Name the claim: this route is not a design failure but a requirement.",
        "Keep the choice that shows the alternative is unusable.",
      ],
      hint: "The support has to explain why nobody has fixed it.",
      trap: "The material choice is the most technical and answers a question the essay is not asking.",
    },
    {
      number: 13,
      subskill: "apostrophes",
      family: "singular-possessive",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["flasks", "The bare plural shows no possession, so the weak point belongs to nothing."],
        ["flasks'", "The plural possessive contradicts the singular 'A' in front of it."],
        ["flask", "The singular is right in number but marks no possessive relationship."],
      ],
      why:
        "One flask owns the weak point, so the noun takes the singular possessive: apostrophe, then s.",
      steps: [
        "Note the singular article in front of the noun.",
        "Keep the singular possessive that agrees with it.",
      ],
      hint: "The article before the noun tells you how many owners there are.",
      trap: "The plural and the possessive sound identical, so the ear gives no signal.",
    },
    {
      number: 14,
      subskill: "purpose",
      family: "goal-assessment",
      difficulty: "Hard",
      stem:
        "Suppose the writer's goal had been to explain a device by naming what it fails to do. " +
        "Would this essay accomplish that goal?",
      key: "Yes, because it closes by saying a flask does not keep anything hot and names the one route it cannot shut.",
      wrong: [
        [
          "Yes, because it explains that the vacuum inside a flask is never perfect.",
          "An imperfect vacuum is described as sufficient, not as a failure of the device.",
        ],
        [
          "No, because the essay describes three separate mechanisms the flask successfully blocks.",
          "Those successes are what make the single unclosed route the essay's point.",
        ],
        [
          "No, because the stopper is presented as a necessary feature rather than a defect.",
          "Being necessary is precisely why the failure is permanent rather than fixable.",
        ],
      ],
      why:
        "The last paragraph states outright that a flask does not keep anything hot, only slows the " +
        "cooling, and that it works by closing every route but one.",
      steps: [
        "Read the final paragraph and note what it denies.",
        "Keep the reason that names both the denial and the unclosed path.",
      ],
      hint: "The essay's last sentence answers the question directly.",
      trap: "Two wrong choices cite real successes and treat them as contradicting the goal.",
    },
  ],
};
