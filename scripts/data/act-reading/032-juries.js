"use strict";

module.exports = {
  id: "act-reading-p032",
  type: "social-science",
  title: "What Twelve People Do",
  intro: "This passage is adapted from an article on research into jury deliberation.",
  content: `Almost everything known about how juries decide has been learned indirectly, because
in most jurisdictions it is unlawful to record a real deliberation and improper to ask a
juror afterwards what was said. Researchers therefore work with three imperfect sources:
mock juries assembled from the public and given a filmed trial, post-verdict interviews
conducted where they are permitted, and the small number of jurisdictions that have allowed
cameras into the room under strict conditions. Each source has an obvious weakness, and the
findings that matter are the ones that survive in all three.

The most robust of those findings concerns the first vote. In the great majority of cases,
the verdict a jury eventually returns is the one favoured by a majority of jurors on the
first ballot. The figure varies with the study; it is rarely below eighty per cent and
sometimes above ninety. This is often reported as proof that deliberation changes nothing,
and the inference is too quick, but the result itself is not in dispute.

What juries do with the first vote turns out to matter more than the vote. Researchers
distinguish two styles. A verdict-driven jury takes a ballot early, sorts itself into camps,
and then argues; the discussion consists largely of each camp assembling support for a
position already held. An evidence-driven jury postpones any vote, works through the
testimony in order, and arrives at a ballot late, often only once the disagreement has
narrowed on its own. The two styles reach the same verdict most of the time. They differ in
what happens the rest of the time, and in something harder to measure: evidence-driven
juries recall more of the trial afterwards, and their discussions cover a larger share of
the testimony presented.

That is why the eighty per cent figure does not license the conclusion drawn from it. In
roughly one case in six, deliberation moves a jury away from its initial majority, and those
are not a random sixth. They are disproportionately cases in which the evidence was
complicated, in which one or two jurors had noticed something the others had missed, or in
which an early majority rested on a misunderstanding of the judge's instruction. The
procedure is not designed for the easy cases. It is designed for the cases where a first
impression is wrong, and it is in exactly those cases that it does its work.

Two further findings have proved uncomfortable. The first is that jurors understand judicial
instructions poorly. Comprehension of standard instructions on the burden of proof, tested
after deliberation, is routinely below sixty per cent, and rewriting the instructions in
plain language raises it substantially — which means the deficit is in the drafting rather
than in the jurors. The second is that a jury's discussion is not evenly distributed.
Speaking time correlates with seat position, occupation, and gender, and the foreperson,
who is very often the first person to speak, is chosen in a matter of seconds by processes
nobody in the room could describe afterwards.

None of this has produced a serious case for replacing juries, including among the
researchers who report it. The comparison that matters is not between a jury and an ideal
decision-maker but between a jury and the available alternative, which is one judge, who is
also subject to first impressions, is not obliged to explain themselves to eleven other
people, and hears cases of this kind several times a week rather than once in a lifetime.
The strongest defence of the institution is not that juries reason well. It is that twelve
people who must reach agreement out loud are hard to move quietly, and that a system's worst
outcomes matter more than its average ones.

The practical recommendations from the literature are correspondingly modest and nearly
unanimous: rewrite the instructions, give them to jurors in writing, allow note-taking, and
discourage an early formal ballot. All four are cheap. Three of them are still resisted in
most courts, on grounds that are institutional rather than empirical.`,
  questions: [
    {
      subskill: "main idea",
      family: "central-claim",
      difficulty: "Medium",
      stem: "The passage is chiefly concerned with:",
      key: "what research shows juries do and what follows from it.",
      wrong: [
        ["why jury deliberations cannot lawfully be recorded.", "The legal restriction is background explaining the research methods."],
        ["how forepersons come to be selected by their juries.", "Foreperson selection is one finding among several in the passage."],
        ["why judges decide cases more reliably than juries do.", "The passage argues the comparison favours juries in the worst cases."],
      ],
      why: "The passage surveys the first-vote finding, deliberation styles, instruction comprehension, and unequal participation, then draws conclusions about the institution and about reform.",
      steps: [
        "Note how many distinct findings the passage reports.",
        "Check that the option covers the last two paragraphs as well.",
      ],
      hint: "The passage moves from findings to what they license.",
    },
    {
      subskill: "locate detail",
      family: "stated-detail",
      difficulty: "Easy",
      stem: "According to the passage, comprehension of standard instructions on the burden of proof is routinely:",
      key: "below sixty per cent after deliberation.",
      wrong: [
        ["above eighty per cent after deliberation.", "Eighty per cent is the lower bound for first-ballot agreement, a different measure."],
        ["unchanged by rewriting them in plain language.", "The passage says plain language raises comprehension substantially."],
        ["higher among jurors who serve as foreperson.", "No comprehension difference by role is reported in the passage."],
      ],
      why: "The passage says comprehension of such instructions, \"tested after deliberation, is routinely below sixty per cent.\"",
      steps: [
        "Find the sentence about instruction comprehension.",
        "Take the figure and the point at which it is measured.",
      ],
      hint: "The measurement is taken after the discussion, not before.",
    },
    {
      subskill: "comparison",
      family: "contrast-of-methods",
      difficulty: "Easy",
      stem: "The passage says an evidence-driven jury differs from a verdict-driven jury chiefly in that it:",
      key: "delays taking a ballot until late.",
      wrong: [
        ["reaches a different verdict in most cases.", "The passage says the two styles reach the same verdict most of the time."],
        ["chooses its foreperson by a formal vote.", "Foreperson selection is described as rapid and unexplained in both."],
        ["requires more jurors to reach agreement.", "The number needed for agreement is not said to vary by style."],
      ],
      why: "The passage says an evidence-driven jury \"postpones any vote, works through the testimony in order, and arrives at a ballot late,\" while the verdict-driven jury \"takes a ballot early.\"",
      steps: [
        "Find the two definitions given in the third paragraph.",
        "Identify the single procedural difference between them.",
      ],
      hint: "The difference is about when a vote is taken.",
    },
    {
      subskill: "cause and effect",
      family: "cause-of-an-effect",
      difficulty: "Medium",
      stem: "The passage treats the effect of rewriting instructions as evidence that poor comprehension results from:",
      key: "how the instructions are written.",
      wrong: [
        ["the limited education of many jurors.", "The passage locates the deficit in the drafting rather than in the jurors."],
        ["the length of a typical deliberation.", "Deliberation length is not connected to comprehension in the passage."],
        ["the pressure of reaching a unanimous verdict.", "Unanimity is discussed later and not linked to understanding instructions."],
      ],
      why: "The passage says plain-language rewriting \"raises it substantially — which means the deficit is in the drafting rather than in the jurors.\"",
      steps: [
        "Locate the sentence about rewriting.",
        "Read the clause the author draws from the result.",
      ],
      hint: "If a change to the text fixes it, the text was the problem.",
    },
    {
      subskill: "meaning in context",
      family: "vocabulary-in-context",
      difficulty: "Easy",
      stem: "As it is used in the fourth paragraph, the phrase \"not a random sixth\" indicates that the cases in question:",
      key: "share features that make deliberation matter.",
      wrong: [
        ["occur less frequently than the studies suggest.", "The proportion is accepted; the point concerns which cases they are."],
        ["were selected deliberately by the researchers.", "No selection by researchers is described in the passage."],
        ["involve juries that ignored the judge's directions.", "Misunderstood instructions are one feature, not disobedience."],
      ],
      why: "The paragraph says they are \"disproportionately cases in which the evidence was complicated,\" or in which a juror noticed something missed, or an early majority \"rested on a misunderstanding.\"",
      steps: [
        "Read the list that follows the phrase.",
        "Ask what those cases have in common.",
      ],
      hint: "The next sentence enumerates the shared features.",
    },
    {
      subskill: "function",
      family: "function-of-a-qualification",
      difficulty: "Medium",
      stem: "The author's remark that the inference from the first-vote figure is \"too quick\" serves mainly to:",
      key: "accept a finding while rejecting its usual reading.",
      wrong: [
        ["dispute the accuracy of the reported percentages.", "The passage says the result itself is not in dispute."],
        ["show that mock juries behave unlike real ones.", "The finding is described as surviving across all three sources."],
        ["introduce the distinction between the two styles.", "The styles are introduced in the following paragraph on other grounds."],
      ],
      why: "The paragraph says the figure \"is often reported as proof that deliberation changes nothing, and the inference is too quick, but the result itself is not in dispute.\"",
      steps: [
        "Separate the statistic from the conclusion drawn from it.",
        "Note which of the two the author challenges.",
      ],
      hint: "The sentence concedes and objects in the same breath.",
    },
    {
      subskill: "logical inference",
      family: "supported-inference",
      difficulty: "Medium",
      stem: "The passage implies that discouraging an early formal ballot would tend to:",
      key: "push juries towards the evidence-driven style.",
      wrong: [
        ["increase the proportion of hung juries.", "No effect on failure to agree is suggested anywhere."],
        ["shorten the time a deliberation takes.", "Working through testimony in order is not described as faster."],
        ["reduce the influence of the foreperson.", "The foreperson's role is discussed separately from balloting."],
      ],
      why: "The passage defines a verdict-driven jury as one that \"takes a ballot early,\" and lists discouraging an early formal ballot among the recommendations drawn from the literature.",
      steps: [
        "Recall which style is defined by an early vote.",
        "Ask what removing that feature would produce.",
      ],
      hint: "The recommendation targets the defining feature of one style.",
    },
    {
      subskill: "claims and evidence",
      family: "claim-and-support",
      difficulty: "Hard",
      stem: "Which finding best supports the claim that deliberation does work the first vote cannot?",
      key: "The cases that change are the complicated ones.",
      wrong: [
        ["Most verdicts match the first ballot's majority.", "That figure is what the claim has to be reconciled with, not evidence for it."],
        ["Evidence-driven juries recall more of the trial.", "Better recall shows a difference between styles, not that outcomes change."],
        ["Speaking time varies with a juror's occupation.", "Unequal participation is a separate and unfavourable finding."],
      ],
      why: "The passage says the sixth of cases that move \"are disproportionately cases in which the evidence was complicated,\" or in which something had been missed or misunderstood — precisely where a first impression would be unreliable.",
      steps: [
        "State the claim: deliberation matters where first impressions fail.",
        "Look for the finding about which cases change.",
        "Reject findings that describe the process without bearing on outcomes.",
      ],
      hint: "The support has to identify which cases move, not how many.",
      trap: "Choosing the headline statistic, which the claim is arguing against.",
    },
    {
      subskill: "reasoning",
      family: "evaluating-a-comparison",
      difficulty: "Hard",
      stem: "The passage's defence of the jury rests on the claim that the right comparison is with:",
      key: "the alternative actually available.",
      wrong: [
        ["a jury that has been properly instructed.", "Better instruction is a reform, not the comparison the defence uses."],
        ["the accuracy of verdicts in earlier centuries.", "No historical comparison appears anywhere in the passage."],
        ["a panel of experts drawn from the profession.", "Only a single judge is offered as the alternative."],
      ],
      why: "The passage says \"the comparison that matters is not between a jury and an ideal decision-maker but between a jury and the available alternative, which is one judge.\"",
      steps: [
        "Find the sentence that names the wrong comparison and the right one.",
        "Note what the passage says the alternative actually is.",
        "Reject options describing improvements rather than alternatives.",
      ],
      hint: "The argument turns on what a jury is being measured against.",
      trap: "Comparing the institution with an idealised version of itself.",
    },
    {
      subskill: "strengthen or weaken",
      family: "weakening-a-position",
      difficulty: "Hard",
      stem: "Which finding, if true, would most weaken the passage's defence of the jury?",
      key: "Single judges reverse their own first impressions more often.",
      wrong: [
        ["Mock juries deliberate for less time than real ones.", "A methodological limit does not bear on the comparison with judges."],
        ["Forepersons are chosen within seconds of sitting down.", "The passage already reports this and defends the jury anyway."],
        ["Plain-language instructions have been adopted slowly.", "Slow reform concerns courts' behaviour, not the institution's merits."],
      ],
      why: "The defence claims a judge \"is also subject to first impressions\" and \"is not obliged to explain themselves to eleven other people.\" Evidence that judges revise more readily would remove the advantage the argument claims for the jury.",
      steps: [
        "State the property the passage says juries have and judges lack.",
        "Look for the finding that would give judges that property.",
        "Reject findings that the passage already grants.",
      ],
      hint: "The defence rests on resistance to a first impression.",
      trap: "Choosing an unflattering fact about juries that the passage has already conceded.",
    },
    {
      subskill: "author's purpose",
      family: "purpose-of-a-paragraph",
      difficulty: "Medium",
      stem: "The author's purpose in the final paragraph is to:",
      key: "contrast easy remedies with slow adoption.",
      wrong: [
        ["propose a reform the literature has not considered.", "The recommendations are described as coming from the literature."],
        ["show that researchers disagree about what to do.", "The recommendations are called nearly unanimous."],
        ["explain why note-taking would be expensive to allow.", "All four measures are described as cheap."],
      ],
      why: "The paragraph lists four recommendations, says \"all four are cheap,\" and adds that three \"are still resisted in most courts, on grounds that are institutional rather than empirical.\"",
      steps: [
        "Note what the paragraph says about the cost of the reforms.",
        "Read the final sentence about their reception.",
      ],
      hint: "The last sentence names the kind of resistance involved.",
    },
  ],
};
