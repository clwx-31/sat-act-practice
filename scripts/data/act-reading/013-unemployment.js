"use strict";

module.exports = {
  id: "act-reading-p013",
  type: "social-science",
  title: "Counting the Out of Work",
  intro: "This passage is adapted from an article on how governments measure unemployment.",
  content: `The unemployment rate is quoted as though it were a fact about the world, like
rainfall. It is not a measurement in that sense. It is the output of a definition, and the
definition was chosen, by identifiable people, for reasons that can be argued with.

The standard now used in most countries dates from a 1982 conference of labour
statisticians. To be counted as unemployed, a person must satisfy three conditions at once:
be without work, be available to start work, and have actively looked for work in a recent
window, usually the past four weeks. All three are required. Fail any one and the person is
not unemployed; they are outside the labour force, which is a different category and does
not appear in the headline rate at all.

The three conditions were not arbitrary. A count of everyone without a job would include
students, retirees, and people caring for children full time, and would tell you nothing
about the state of the labour market. The searching condition is what makes the number
mean something: it identifies people whose absence from work is a mismatch rather than a
choice. Statisticians defend it on exactly that ground, and the defence is a good one.

Its cost appears in a recession. When work is genuinely scarce, some people stop looking,
because looking has produced nothing for a year and costs bus fares and self-respect.
Under the definition, the moment they stop, they leave the labour force, and the
unemployment rate falls. The rate can therefore improve in a month when the number of
people with jobs has not risen at all, and this is not a flaw in the data collection. It
is the definition doing what it was designed to do, in a situation its designers were not
principally thinking about.

Statistical agencies are perfectly aware of this and publish more than one measure. The
headline figure in the United States is called U-3. A broader measure, U-6, adds two
groups: people who want work and have looked in the past year but not the past four weeks,
and people working part time who would take full-time hours if they could get them. In
ordinary conditions U-6 runs a few points above U-3 and the two move together. In a
downturn the gap widens, and the widening is itself a piece of information — it says that
what is happening to the labour market is not being captured by the headline.

The awkward question is which number a government should announce. The case for U-3 is
consistency: it is defined the same way across countries and across decades, so a change in
it means something. The case for U-6 is that in the months when the public most needs an
accurate picture, U-3 is at its least informative. Neither case is silly, and no country
has found a way to have both, because a headline figure is a single number by definition
and any pair of numbers reported together will be reduced to one by whoever repeats them.

What is not defensible is the way the choice is usually discussed. A government that
prefers U-3 is accused of hiding something, and a critic who cites U-6 is accused of
inventing a worse statistic. Both accusations assume the existence of a true unemployment
rate that one of the measures is failing to report. There is no such quantity. There are
people in a range of situations, and there are definitions that sort those situations into
two bins, and every such definition puts somebody on a side of the line they do not
obviously belong on.`,
  questions: [
    {
      subskill: "main idea",
      family: "central-claim",
      difficulty: "Medium",
      stem: "The passage argues chiefly that the unemployment rate:",
      key: "reflects a chosen definition rather than a plain fact.",
      wrong: [
        ["understates hardship and should be replaced by U-6.", "The passage says neither case is silly and declines to endorse either measure."],
        ["is collected too infrequently to be useful in a downturn.", "Frequency of collection is never raised as a problem anywhere."],
        ["has been distorted by governments for political reasons.", "The passage calls the accusation of hiding something indefensible."],
      ],
      why: "The opening states that the rate \"is not a measurement in that sense. It is the output of a definition,\" and the closing paragraph denies that any \"true unemployment rate\" exists behind the measures.",
      steps: [
        "Read the first paragraph and the last, which make the same claim twice.",
        "Check that the option does not commit the passage to a preferred measure.",
      ],
      hint: "The first and last paragraphs agree with each other.",
    },
    {
      subskill: "locate detail",
      family: "stated-detail",
      difficulty: "Easy",
      stem: "According to the passage, a person counted as unemployed must be without work, be available to start, and have:",
      key: "looked for work within a recent window.",
      wrong: [
        ["held a job at some point that year.", "Prior employment is not among the three conditions the passage lists."],
        ["registered with a government office.", "No requirement to register with any agency is mentioned in the passage."],
        ["refused an offer of part-time hours.", "Part-time workers appear only in the description of the broader U-6 measure."],
      ],
      why: "The second paragraph says a person must \"be without work, be available to start work, and have actively looked for work in a recent window, usually the past four weeks.\"",
      steps: [
        "Find the sentence listing the three conditions.",
        "Take the third item in that list.",
      ],
      hint: "The passage numbers the conditions in a single sentence.",
    },
    {
      subskill: "cause and effect",
      family: "cause-of-an-outcome",
      difficulty: "Easy",
      stem: "The passage explains that the unemployment rate can fall during a recession because people who:",
      key: "stop searching leave the labour force entirely.",
      wrong: [
        ["accept part-time work are recorded as employed.", "Part-time workers are counted in U-6 but are not the cause of the fall described."],
        ["move to another region are dropped from the survey.", "No effect of migration on the count is described in the passage."],
        ["retire early are reclassified as available for work.", "Retirees are given as people the count deliberately excludes."],
      ],
      why: "The fourth paragraph says that when people stop looking, \"the moment they stop, they leave the labour force, and the unemployment rate falls,\" even though employment has not risen.",
      steps: [
        "Locate the paragraph about what happens in a recession.",
        "Follow what the definition does to a person who gives up looking.",
      ],
      hint: "One of the three conditions is the one that fails.",
    },
    {
      subskill: "comparison",
      family: "contrast-of-measures",
      difficulty: "Medium",
      stem: "U-6 differs from U-3 in that U-6 also counts people who:",
      key: "want more work than they have been able to find.",
      wrong: [
        ["have been without any job for more than one year.", "Duration alone does not determine either measure as the passage describes them."],
        ["are studying or caring for children at home full time.", "Those groups are named as people any sensible count leaves out."],
        ["work full time in jobs below their qualifications.", "Skill mismatch is never among the categories the passage lists."],
      ],
      why: "The fifth paragraph says U-6 adds people who \"want work and have looked in the past year but not the past four weeks\" and people \"working part time who would take full-time hours if they could get them.\"",
      steps: [
        "Find the two groups the passage says U-6 adds.",
        "Identify what those two groups have in common.",
      ],
      hint: "Both added groups are short of the work they would take.",
    },
    {
      subskill: "logical inference",
      family: "supported-inference",
      difficulty: "Medium",
      stem: "The passage suggests that a widening gap between U-3 and U-6 should be read as:",
      key: "a sign the headline is missing part of the picture.",
      wrong: [
        ["evidence that one of the two measures is miscalculated.", "The passage treats both as correctly computed from their own definitions."],
        ["a temporary effect of seasonal changes in hiring.", "Seasonality is never discussed as a source of movement in either figure."],
        ["proof that part-time employment is rising sharply.", "Part-timers are one of two added groups, so the gap cannot isolate them."],
      ],
      why: "The passage says that in a downturn the gap widens and \"the widening is itself a piece of information — it says that what is happening to the labour market is not being captured by the headline.\"",
      steps: [
        "Find the sentence about what the widening gap indicates.",
        "Distinguish a signal about coverage from a claim about error.",
      ],
      hint: "The passage says the gap carries information of its own.",
    },
    {
      subskill: "author's purpose",
      family: "purpose-of-a-paragraph",
      difficulty: "Medium",
      stem: "The author's purpose in the third paragraph is to:",
      key: "show that the searching condition has a real justification.",
      wrong: [
        ["argue that the 1982 standard should now be revised.", "No revision is proposed; the passage says the conditions were not arbitrary."],
        ["list the groups a labour force survey must interview.", "The groups named are ones the definition sets aside, not ones surveyed."],
        ["explain how statisticians collect answers from households.", "Collection methods are not described anywhere in the passage."],
      ],
      why: "The paragraph says the conditions \"were not arbitrary,\" that the searching condition \"is what makes the number mean something,\" and that the statisticians' defence of it \"is a good one.\"",
      steps: [
        "Note where the paragraph sits: after the definition, before the objection.",
        "Read its last sentence, which states the author's verdict on the defence.",
      ],
      hint: "The paragraph is on the statisticians' side.",
    },
    {
      subskill: "meaning in context",
      family: "vocabulary-in-context",
      difficulty: "Easy",
      stem: "As it is used in the third paragraph, the word *mismatch* refers to a situation in which a person is:",
      key: "seeking work the labour market has not supplied.",
      wrong: [
        ["holding a job that does not use their training.", "Underemployment of that kind is never among the passage's categories."],
        ["counted in one measure but omitted from another.", "The two measures are introduced later and are not what the word describes."],
        ["available for work but unwilling to relocate.", "Willingness to move is not one of the three conditions the passage lists."],
      ],
      why: "The sentence says the searching condition \"identifies people whose absence from work is a mismatch rather than a choice,\" separating those who want work from students, retirees, and full-time carers.",
      steps: [
        "Read the contrast the sentence draws between mismatch and choice.",
        "Match that to the groups named in the sentence before it.",
      ],
      hint: "The word is defined by what it is set against.",
    },
    {
      subskill: "claims and evidence",
      family: "claim-and-support",
      difficulty: "Hard",
      stem: "Which detail best supports the claim that a falling rate need not mean a recovering labour market?",
      key: "The rate can drop in a month when employment has not risen.",
      wrong: [
        ["The definition of unemployment dates from a 1982 conference.", "The origin of the standard says nothing about how the rate behaves."],
        ["Students and retirees are excluded from the count entirely.", "Those exclusions are described as sensible and are unaffected by a downturn."],
        ["U-6 typically runs a few points above U-3 in normal times.", "A stable gap in ordinary conditions is not evidence about a falling rate."],
      ],
      why: "The fourth paragraph states that \"the rate can therefore improve in a month when the number of people with jobs has not risen at all,\" and attributes this to the searching condition rather than to bad data.",
      steps: [
        "Identify the claim about what a falling rate does not establish.",
        "Look for the sentence that reports the two quantities moving apart.",
        "Reject background facts that do not concern the rate's behaviour.",
      ],
      hint: "The evidence has to mention both the rate and the number employed.",
      trap: "Selecting a fact about the definition's history rather than about its effect.",
    },
    {
      subskill: "reasoning",
      family: "evaluating-a-dispute",
      difficulty: "Hard",
      stem: "According to the final paragraph, the standard argument about which measure to publish is flawed because both sides:",
      key: "assume a true rate that some measure fails to report.",
      wrong: [
        ["ignore the international comparisons that U-3 makes possible.", "Comparability is the case for U-3, which the passage presents rather than ignores."],
        ["treat part-time workers as though they were fully employed.", "That treatment belongs to U-3's definition, not to an error shared by both sides."],
        ["overlook the way statistical agencies publish several measures.", "The passage says agencies do publish several and that everyone knows it."],
      ],
      why: "The last paragraph says both accusations \"assume the existence of a true unemployment rate that one of the measures is failing to report,\" and answers: \"there is no such quantity.\"",
      steps: [
        "State the accusation each side makes.",
        "Find the sentence naming what both accusations take for granted.",
        "Choose the option that names the shared assumption, not one side's position.",
      ],
      hint: "The paragraph faults both sides for the same thing.",
      trap: "Picking a weakness of one side when the question asks what both share.",
    },
    {
      subskill: "synthesize information",
      family: "combining-sections",
      difficulty: "Hard",
      stem: "Taken together, the paragraphs on the searching condition and on U-6 indicate that:",
      key: "each measure buys clarity somewhere by losing it elsewhere.",
      wrong: [
        ["U-6 corrects the defect that the searching condition creates.", "U-6 relaxes the window to a year but still requires searching within it."],
        ["the searching condition was abandoned when U-6 was introduced.", "U-6 keeps a search requirement and adds part-time workers alongside it."],
        ["both measures were designed with recessions principally in mind.", "The passage says the designers were not principally thinking about that case."],
      ],
      why: "The searching condition \"is what makes the number mean something\" yet drops people in a downturn; U-6 catches more of them but sacrifices the consistency that makes a change in U-3 meaningful.",
      steps: [
        "Name the advantage and the cost of the searching condition.",
        "Name the advantage and the cost of the broader measure.",
        "Choose the option that holds both trade-offs at once.",
      ],
      hint: "Each measure is defended on a ground the other cannot claim.",
      trap: "Treating the broader measure as a straightforward improvement on the narrower one.",
    },
  ],
};
