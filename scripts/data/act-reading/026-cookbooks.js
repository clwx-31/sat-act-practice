"use strict";

module.exports = {
  id: "act-reading-p026",
  type: "humanities",
  title: "What a Recipe Leaves Out",
  intro: "This passage is adapted from an essay on the history of the cookbook.",
  content: `A recipe from 1740 begins: take a good piece of beef. It does not say how much. It
does not say what makes a piece good, or what to do if the piece available is not. The oven
instruction, when there is one, is that the oven should be quick, or slow, or of a moderate
heat, and there is no number anywhere, because there was no thermometer in the kitchen and
no dial on the range. The book assumes a reader who has stood beside somebody doing this.

Under that assumption a recipe is not a set of instructions. It is a memorandum — a note
made by a competent cook for another competent cook, listing what distinguishes this dish
from the dozen adjacent dishes they both already know how to make. Everything shared is
omitted, because writing it down would be an insult and would use up paper.

The modern recipe, with its weights and its temperatures and its numbered steps, is barely
a hundred and thirty years old, and it was produced by a change in who was expected to
read. As service households shrank and middle-class women found themselves cooking food
they had not been taught to cook, the shared apprenticeship the old books depended on
stopped existing. Fannie Farmer's *Boston Cooking-School Cook Book* of 1896 is the usual
marker. Farmer insisted on the level measurement — a cup filled and struck flat, rather
than a cup heaped as the cook judged — and the insistence looks pedantic until you notice
what it does. A level cup can be conveyed in writing to a person you have never met.

Standardisation of this kind is usually told as a story of progress, and something was
plainly gained: a recipe became transmissible. What is less often noticed is what became
unsayable in the same movement. The old instruction to cook a sauce until it looks right
is not vagueness. It names the actual criterion, which is a state of the sauce, and it
trusts the reader to recognise it. Replace it with *simmer for eight minutes* and you have
something a stranger can follow and something that is wrong whenever the pan is wider, the
heat higher, or the cream from a different herd. The number is more transmissible and less
true.

Modern food writing has spent thirty years trying to get the criterion back without giving
up the number, which is why so many recipes now read *simmer for about eight minutes, until
it coats the back of a spoon.* That sentence is doing two things at once: it gives a novice
a place to start and it tells them what they are actually watching for. It is a good
solution and it is a solution to a problem the eighteenth century did not have.

There is a further loss, harder to argue about. A recipe that specifies everything invites
being followed rather than read. A cook working from a memorandum has to supply judgement
at every step, because the document is not sufficient; a cook working from a complete
specification can proceed without ever forming a view about what the dish is for. Both
produce dinner. Only one of them produces a cook who could write the memorandum.

Historians of the subject are wary of pushing this too far, and they are right to be. The
old books were written for a small and privileged group, the transmission they relied on
was unavailable to anyone outside a particular household, and a great deal of what was
handed down that way was handed down badly. A form of knowledge that cannot survive the
death of the person carrying it is not obviously superior to one that can be printed. But
the difference between the two kinds of document is real, and reading an old recipe as a
badly written new one gets almost everything about it wrong.`,
  questions: [
    {
      subskill: "main idea",
      family: "central-claim",
      difficulty: "Medium",
      stem: "The passage is primarily concerned with:",
      key: "what changed when recipes began addressing strangers.",
      wrong: [
        ["how cooking techniques improved after 1896.", "The passage describes a change in documents, not in techniques."],
        ["why old cookbooks contain so many errors.", "The passage argues that old recipes are misread rather than mistaken."],
        ["how thermometers transformed domestic kitchens.", "The absence of a thermometer is background in the opening paragraph."],
      ],
      why: "The passage says the modern recipe \"was produced by a change in who was expected to read,\" and then weighs what that change gained and cost.",
      steps: [
        "Find the sentence naming the cause of the modern form.",
        "Check that the option covers both the gain and the loss the passage describes.",
      ],
      hint: "The turning point is about readers, not about cooking.",
    },
    {
      subskill: "locate detail",
      family: "stated-detail",
      difficulty: "Easy",
      stem: "According to the passage, Fannie Farmer insisted that a cup of an ingredient be:",
      key: "filled and struck flat rather than heaped.",
      wrong: [
        ["weighed on a scale rather than measured.", "Weight is mentioned as a feature of modern recipes generally, not her rule."],
        ["measured before the ingredient is warmed.", "Temperature of ingredients is not part of the practice described."],
        ["adjusted according to the cook's judgement.", "Judgement is exactly what the level measurement was meant to remove."],
      ],
      why: "The third paragraph says Farmer \"insisted on the level measurement — a cup filled and struck flat, rather than a cup heaped as the cook judged.\"",
      steps: [
        "Find the sentence describing her rule.",
        "Take the practice named before the word *rather*.",
      ],
      hint: "The sentence contrasts two ways of filling one cup.",
    },
    {
      subskill: "cause and effect",
      family: "cause-of-a-change",
      difficulty: "Easy",
      stem: "The passage attributes the appearance of the modern recipe to the fact that:",
      key: "many new cooks had never been taught to cook.",
      wrong: [
        ["paper became cheap enough to print longer books.", "Paper is mentioned only as a reason old recipes were terse."],
        ["ovens acquired dials that showed the temperature.", "Equipment is described, but the passage credits the change in readership."],
        ["cooking schools began publishing their own books.", "One school's book is named as a marker, not as the cause."],
      ],
      why: "The third paragraph says that \"as service households shrank and middle-class women found themselves cooking food they had not been taught to cook, the shared apprenticeship the old books depended on stopped existing.\"",
      steps: [
        "Locate the sentence beginning with the social change.",
        "Note what it says stopped existing.",
      ],
      hint: "The cause is about who was in the kitchen.",
    },
    {
      subskill: "meaning in context",
      family: "vocabulary-in-context",
      difficulty: "Easy",
      stem: "As it is used in the second paragraph, the word *memorandum* describes a document that:",
      key: "records only what a skilled reader lacks.",
      wrong: [
        ["is written for the cook's own later use.", "The passage says it is made for another competent cook."],
        ["lists ingredients without giving any method.", "Old recipes are described as giving method in imprecise terms."],
        ["was kept privately rather than published.", "Publication is not what the term is being used to distinguish."],
      ],
      why: "The paragraph says a recipe of that kind lists \"what distinguishes this dish from the dozen adjacent dishes they both already know how to make,\" and that \"everything shared is omitted.\"",
      steps: [
        "Read the definition the paragraph supplies after the dash.",
        "Note what it says is left out and why.",
      ],
      hint: "The paragraph defines the term by what it omits.",
    },
    {
      subskill: "interpret detail",
      family: "detail-interpretation",
      difficulty: "Medium",
      stem: "The passage claims that the instruction to simmer for eight minutes is \"less true\" than the older instruction because it:",
      key: "ignores conditions that change the result.",
      wrong: [
        ["asks for more precision than a cook can supply.", "Eight minutes is easy to measure; the objection is that it may be wrong."],
        ["cannot be understood by an inexperienced reader.", "The passage says the number is what a stranger can follow."],
        ["was invented after the dish itself had changed.", "No change in the dish is described alongside the change in wording."],
      ],
      why: "The passage says the number \"is wrong whenever the pan is wider, the heat higher, or the cream from a different herd,\" while the older instruction \"names the actual criterion, which is a state of the sauce.\"",
      steps: [
        "Find the list of conditions that would break the timing.",
        "Compare that with what the older instruction points at.",
      ],
      hint: "The sentence names three things the clock does not know about.",
    },
    {
      subskill: "function",
      family: "function-of-an-example",
      difficulty: "Medium",
      stem: "The hybrid instruction quoted in the fifth paragraph is offered as an example of:",
      key: "a modern compromise between number and criterion.",
      wrong: [
        ["a return to eighteenth-century habits of writing.", "The passage says it answers a problem the eighteenth century did not have."],
        ["a phrase that novices are still unable to follow.", "The passage says it gives a novice a place to start."],
        ["a case in which the older method proved superior.", "The paragraph presents the hybrid as a good solution, not as a defeat."],
      ],
      why: "The passage says the sentence \"is doing two things at once: it gives a novice a place to start and it tells them what they are actually watching for.\"",
      steps: [
        "Read the sentence that explains what the quoted phrase does.",
        "Note that it names two functions, not one.",
      ],
      hint: "The paragraph says the phrase does two things.",
    },
    {
      subskill: "claims and evidence",
      family: "claim-and-support",
      difficulty: "Medium",
      stem: "Which detail best supports the claim that an old recipe assumed a reader with experience?",
      key: "Oven heat is given as quick, slow, or moderate.",
      wrong: [
        ["A recipe begins by asking for a good piece of beef.", "This shows imprecision about the ingredient, not about a shared skill."],
        ["Old cookbooks were written for a privileged group.", "Who owned the books is a separate point made near the end."],
        ["Paper would have been used up by fuller writing.", "Economy of paper explains brevity without implying a skilled reader."],
      ],
      why: "The opening paragraph says the oven instruction carried \"no number anywhere, because there was no thermometer in the kitchen,\" so only a reader who had \"stood beside somebody doing this\" could act on it.",
      steps: [
        "Look for the instruction that could not be followed without prior experience.",
        "Check that the detail concerns a skill rather than a shortage.",
      ],
      hint: "Ask which detail a novice could not act on at all.",
    },
    {
      subskill: "reasoning",
      family: "evaluating-a-position",
      difficulty: "Hard",
      stem: "The final paragraph qualifies the passage's argument mainly by pointing out that the older form of transmission:",
      key: "reached very few people and often failed.",
      wrong: [
        ["produced dishes that modern readers would dislike.", "No judgement about the taste of the food appears in the passage."],
        ["was already being replaced before Farmer wrote.", "The passage places the change with the shrinking of service households."],
        ["has been recovered by careful modern food writing.", "The hybrid instruction is called a solution to a different problem."],
      ],
      why: "The last paragraph says the old books served \"a small and privileged group,\" that transmission was \"unavailable to anyone outside a particular household,\" and that much handed down that way \"was handed down badly.\"",
      steps: [
        "List the concessions the final paragraph makes.",
        "Ask which of them limits the passage's earlier praise of the memorandum.",
        "Reject options that concede something the passage never claims.",
      ],
      hint: "The concessions are about reach and reliability.",
      trap: "Treating the concession as a retraction of the passage's distinction.",
    },
    {
      subskill: "strengthen or weaken",
      family: "weakening-a-position",
      difficulty: "Hard",
      stem: "Which finding, if true, would most weaken the passage's claim that a complete specification discourages judgement?",
      key: "Cooks following detailed recipes improvise as often as others.",
      wrong: [
        ["Detailed recipes are longer than eighteenth-century ones.", "Length is already granted by the passage and bears on neither side."],
        ["Fannie Farmer's book sold more copies than its rivals.", "Sales establish influence, not what readers do in the kitchen."],
        ["Old recipes were sometimes copied inaccurately by hand.", "Copying errors concern transmission rather than the exercise of judgement."],
      ],
      why: "The passage says a cook working from a complete specification \"can proceed without ever forming a view about what the dish is for.\" Evidence that such cooks improvise as much as anyone would undercut exactly that.",
      steps: [
        "State the claim about what specification does to a cook.",
        "Identify the observation that would contradict it directly.",
        "Reject findings about books rather than about cooks.",
      ],
      hint: "The claim is about behaviour, so the test has to be about behaviour.",
      trap: "Choosing a fact about the books when the claim concerns their readers.",
    },
    {
      subskill: "organization",
      family: "passage-structure",
      difficulty: "Medium",
      stem: "The passage is organised as:",
      key: "an old form, the reason it changed, and what the change cost.",
      wrong: [
        ["a biography of one author and the influence she had.", "Farmer occupies part of one paragraph and is called a marker."],
        ["a comparison of cooking in two different countries.", "No national comparison is drawn anywhere in the passage."],
        ["a defence of modern recipes against their critics.", "The passage raises the criticisms itself rather than answering them."],
      ],
      why: "The passage opens with a 1740 recipe, defines the memorandum, explains the shift in readership, then devotes three paragraphs to what was lost and to the qualification of that claim.",
      steps: [
        "Give each paragraph a short label.",
        "Check the sequence in the option against those labels.",
      ],
      hint: "The paragraph beginning \"standardisation of this kind\" marks the turn.",
    },
  ],
};
