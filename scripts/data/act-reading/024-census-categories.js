"use strict";

module.exports = {
  id: "act-reading-p024",
  type: "social-science",
  title: "The Boxes on the Form",
  intro: "This passage is adapted from an article on the design of national censuses.",
  content: `A census category is a strange object. It is a description of the population and an
instrument that acts on it, and the two roles are not separable. Once a box exists on a
form, money is allocated by it, districts are drawn with it, discrimination is measured
against it, and people begin to describe themselves in its terms — including people who
would not have used those terms before the box appeared.

The United States census has asked about race in every enumeration since 1790, and the
categories have changed in almost every one. In 1890 enumerators were instructed to record
degrees of ancestry that the Census Bureau later abandoned as unworkable. In 1930 Mexican
was briefly a race; it was removed after the Mexican government and American diplomats
objected, and people so recorded were reassigned. Until 1960 the enumerator decided a
household's race by observation. From 1960 onward the household decided, which sounds like
a small procedural change and is not one: it moved the category from something imposed to
something claimed. In 2000, for the first time, a person could mark more than one box.

Each of these changes was defensible on its own terms and each one broke the series.
Comparing the number of people in a category in 1950 with the number in 2010 is not
comparing two measurements of one thing. It is comparing the output of two different
questions, asked by different people, of a population that had in the meantime changed how
it answered.

Statisticians have a name for this — a break in comparability — and a set of methods for
bridging it, which involve estimating how people who answered one way under the old scheme
would have answered under the new. The bridges are honest and they are also fragile,
because the estimate is built from the small number of years when both questions were
asked, and it assumes that the relationship observed in those years held in the decades
when only one question was asked. Nobody who builds them claims otherwise. The bureau publishes the uncertainty alongside the
bridged figure, in a table that runs to several pages and that almost nobody reads.

There is a second difficulty that no method reaches. A question about race asked by a
government is answered by people who know it is a government asking. When the consequences
attached to an answer change — when a category starts to determine eligibility for a
programme, or stops determining where a family may live — the answers change with them,
and no amount of statistical bridging can distinguish a shift in who people are from a
shift in what they are willing to tell an enumerator on a doorstep.

The awkwardness runs deeper for the multiple-response change. Before 2000, a person of
mixed ancestry had to select one category, and which one they selected was influenced by
how they expected to be treated. After 2000 they could select several. The count in every
single-race category consequently fell, in a year when no one had changed ancestry. Any
comparison across that boundary has to choose between two definitions — counting people who
selected a category alone, or counting all who selected it at all — and the two produce
different answers to questions like whether a group grew.

None of this argues for keeping categories fixed. A category that no longer matches how
people describe themselves produces bad data, and a series that is comparable with 1950 but
describes nobody in 2020 is comparable with nothing that matters. The argument is against a
particular way of talking. When a figure moves across a boundary of this kind, the movement
is not evidence about the population until somebody has established how much of it belongs
to the question.

That work is unglamorous, it is done well by the agencies themselves, and it is almost
never the version that reaches print. The published sentence is that a group grew by eleven
per cent. The footnote is that the question changed.`,
  questions: [
    {
      subskill: "main idea",
      family: "central-claim",
      difficulty: "Medium",
      stem: "The passage argues chiefly that changes in census categories:",
      key: "make figures across the change hard to compare.",
      wrong: [
        ["should be avoided so that long series stay intact.", "The passage says a fixed category that describes nobody is comparable with nothing."],
        ["have consistently been made for political reasons.", "Each change is described as defensible on its own terms."],
        ["show that race cannot be measured by a census at all.", "The passage treats the data as useful once breaks are accounted for."],
      ],
      why: "The passage says each change \"was defensible on its own terms and each one broke the series,\" and that comparing counts across a change means \"comparing the output of two different questions.\"",
      steps: [
        "Find the sentence that gives a verdict on the changes.",
        "Check that the option matches the sixth paragraph, which refuses to argue for fixed categories.",
      ],
      hint: "The passage grants that the changes were justified.",
    },
    {
      subskill: "locate detail",
      family: "stated-detail",
      difficulty: "Easy",
      stem: "According to the passage, before 1960 a household's race on the census was determined by:",
      key: "the enumerator's own observation.",
      wrong: [
        ["the head of the household's report.", "Household self-report is the practice the passage says began in 1960."],
        ["a set of ancestry rules from 1890.", "The 1890 instructions were abandoned as unworkable, not carried forward."],
        ["records held by local authorities.", "No use of outside records is described anywhere in the passage."],
      ],
      why: "The second paragraph says \"until 1960 the enumerator decided a household's race by observation,\" and that from 1960 the household decided.",
      steps: [
        "Find the sentence naming 1960.",
        "Take the practice it says applied before that year.",
      ],
      hint: "The change of year marks a change of who decides.",
    },
    {
      subskill: "cause and effect",
      family: "cause-of-an-outcome",
      difficulty: "Easy",
      stem: "The passage says counts in single-race categories fell in 2000 because respondents:",
      key: "could now select more than one box.",
      wrong: [
        ["were undercounted by a shortage of enumerators.", "Enumeration effort is not offered as a cause of the change."],
        ["had begun describing their ancestry differently.", "The passage says no one had changed ancestry that year."],
        ["were assigned to categories by the Census Bureau.", "Reassignment by the Bureau is described for 1930, not for 2000."],
      ],
      why: "The fifth paragraph says that after 2000 a person \"could select several,\" and \"the count in every single-race category consequently fell, in a year when no one had changed ancestry.\"",
      steps: [
        "Locate the paragraph about the multiple-response change.",
        "Read the sentence beginning with the consequence.",
      ],
      hint: "The sentence itself uses the word *consequently*.",
    },
    {
      subskill: "meaning in context",
      family: "vocabulary-in-context",
      difficulty: "Easy",
      stem: "As it is used in the fourth paragraph, the word *bridging* refers to:",
      key: "estimating what earlier answers would now be.",
      wrong: [
        ["collecting the same question in two languages.", "Language of the questionnaire is not discussed in the passage."],
        ["combining two agencies' surveys into one file.", "Only one agency's census is under discussion throughout."],
        ["adding a category that had been left out before.", "Bridging addresses comparison across schemes, not new categories."],
      ],
      why: "The paragraph says the methods \"involve estimating how people who answered one way under the old scheme would have answered under the new.\"",
      steps: [
        "Read the clause that follows the term.",
        "Note that the estimate concerns answers, not people.",
      ],
      hint: "The sentence defines the method as it names it.",
    },
    {
      subskill: "logical inference",
      family: "supported-inference",
      difficulty: "Medium",
      stem: "The passage implies that a bridge estimate is least trustworthy when the years in which both questions were asked are:",
      key: "few and distant from the period being compared.",
      wrong: [
        ["ones in which the population was growing quickly.", "Population growth is not named as a source of weakness in the method."],
        ["years when enumerators rather than households answered.", "Who answers matters for the categories, not for the bridge's construction."],
        ["drawn from a country other than the one being studied.", "No use of foreign data in building bridges is described."],
      ],
      why: "The paragraph says the estimate \"is built from the small number of years when both questions were asked, and it assumes that the relationship observed in those years held in the decades when only one question was asked.\"",
      steps: [
        "Identify the two things the bridge depends on.",
        "Ask what would make each of those weaker.",
      ],
      hint: "The method rests on overlap and on an assumption of stability.",
    },
    {
      subskill: "function",
      family: "function-of-an-example",
      difficulty: "Medium",
      stem: "The 1930 example of a category that was added and then removed serves mainly to:",
      key: "show that categories respond to pressure from outside.",
      wrong: [
        ["prove that the Census Bureau made frequent clerical errors.", "The change is described as a response to objections, not as an error."],
        ["explain why enumerators stopped deciding race by observation.", "That change came in 1960 and is attributed to no particular episode."],
        ["illustrate how bridging methods repair a broken series.", "Bridging is introduced two paragraphs later and not applied to 1930."],
      ],
      why: "The passage says the category \"was removed after the Mexican government and American diplomats objected, and people so recorded were reassigned.\"",
      steps: [
        "Note who is said to have caused the reversal.",
        "Connect that to the opening claim that a category is also an instrument.",
      ],
      hint: "The sentence names the parties who objected.",
    },
    {
      subskill: "claims and evidence",
      family: "claim-and-support",
      difficulty: "Medium",
      stem: "Which detail best supports the claim that a category acts on the population it describes?",
      key: "People adopt the terms of a box once it exists.",
      wrong: [
        ["Counts in single-race categories fell after 2000.", "That is an effect on the numbers, not on how people see themselves."],
        ["Ancestry rules used in 1890 proved unworkable.", "The abandonment concerns administration rather than public self-description."],
        ["Bridging methods rely on years of overlapping data.", "This describes a statistical repair, not an effect on the population."],
      ],
      why: "The first paragraph says that once a box exists \"people begin to describe themselves in its terms — including people who would not have used those terms before the box appeared.\"",
      steps: [
        "Find the claim about description and instrument in the opening.",
        "Look for the consequence the paragraph lists that involves people rather than budgets.",
      ],
      hint: "The support has to be about self-description.",
    },
    {
      subskill: "reasoning",
      family: "evaluating-a-position",
      difficulty: "Hard",
      stem: "The passage's argument in the sixth paragraph depends on treating comparability as:",
      key: "worth less than describing the present accurately.",
      wrong: [
        ["the only standard by which a census should be judged.", "The paragraph explicitly refuses to make comparability decisive."],
        ["something bridging methods can always restore in full.", "The methods are called honest and fragile in the previous paragraph."],
        ["a goal that conflicts with allocating money by category.", "Funding is mentioned in the opening but not set against comparability."],
      ],
      why: "The paragraph says a category that no longer matches self-description \"produces bad data,\" and that \"a series that is comparable with 1950 but describes nobody in 2020 is comparable with nothing that matters.\"",
      steps: [
        "State what the paragraph concedes to the case for stable categories.",
        "Identify the value it places above that case.",
        "Reject options that reverse the ranking the paragraph gives.",
      ],
      hint: "The paragraph ranks two goods against each other.",
      trap: "Assuming an article about broken series must want the series preserved.",
    },
    {
      subskill: "synthesize information",
      family: "combining-sections",
      difficulty: "Hard",
      stem: "Taken together, the paragraphs on bridging and on multiple responses suggest that a reported change over time:",
      key: "depends on choices the reader is rarely shown.",
      wrong: [
        ["is usually smaller than the published figure states.", "The passage gives no general direction of bias in reported changes."],
        ["can be recovered exactly once a bridge is applied.", "Bridges are described as fragile estimates rather than exact repairs."],
        ["should be reported only within a single census scheme.", "The passage does not recommend abandoning cross-scheme comparison."],
      ],
      why: "Bridging rests on an assumption \"nobody who builds them claims otherwise\" about, the multiple-response boundary forces a choice between two definitions, and the closing lines contrast the published sentence with the footnote.",
      steps: [
        "Name the choice each of the two paragraphs describes.",
        "Ask what the final paragraph says happens to those choices in print.",
        "Choose the option that combines the analysis with its reporting.",
      ],
      hint: "The last two sentences of the passage are the join.",
      trap: "Reading a warning about method as a claim about the direction of the error.",
    },
    {
      subskill: "author's purpose",
      family: "purpose-of-a-passage",
      difficulty: "Hard",
      stem: "The author's chief purpose in the closing two sentences is to:",
      key: "contrast what is known with what is communicated.",
      wrong: [
        ["accuse statistical agencies of concealing their methods.", "The passage says the agencies do the work well and openly."],
        ["argue that percentage changes should never be published.", "No such prohibition is proposed anywhere in the passage."],
        ["show that journalists lack the training to read a census.", "Training is not mentioned; the point concerns which sentence travels."],
      ],
      why: "The passage says the careful work \"is done well by the agencies themselves, and it is almost never the version that reaches print,\" then sets \"the published sentence\" against \"the footnote.\"",
      steps: [
        "Note who the passage credits with doing the work properly.",
        "Identify what the last two sentences place side by side.",
        "Reject options that assign blame the passage withholds.",
      ],
      hint: "The complaint is about transmission, not about competence.",
      trap: "Reading a contrast as an accusation.",
    },
  ],
};
