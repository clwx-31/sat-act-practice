"use strict";

module.exports = {
  id: "act-reading-p049",
  type: "natural-science",
  title: "Why the Night Is Dark",
  intro: "This passage is adapted from an article on a problem in the history of astronomy.",
  content: `The question sounds like a child's and it defeated the best minds in Europe for two
centuries. Why is the sky dark at night?

The difficulty arises only if you assume two things that seemed obvious for most of that
period: that the universe is infinite in extent, and that stars are distributed through it
more or less evenly and have been there indefinitely. Grant those and the argument runs as
follows. Look in any direction. Sooner or later your line of sight must land on the surface
of a star, in the way that a line of sight in a sufficiently large forest must eventually
land on a trunk. Stars further away are fainter, but there are correspondingly more of them
at greater distance, and the two effects cancel exactly. Every patch of sky should therefore
shine with the surface brightness of a stellar surface. The night sky should not be dark. It
should be about as bright as the Sun, everywhere.

The problem is usually named for Heinrich Olbers, who stated it in 1823, although Kepler had
seen it in 1610 and used it as an argument that the universe must be finite, and Halley and
others had worried at it in between. Several resolutions were proposed and most of them fail
for the same reason.

The commonest proposal was dust: clouds of material between the stars absorbing the light of
distant ones. It does not work, and the reason it does not work is instructive. Dust that
absorbs light heats up, and dust that heats up radiates. In a universe old enough for the
light to have arrived, the dust would long since have come into equilibrium and would be
glowing as brightly as what it was blocking. Absorption can redistribute the light. It
cannot dispose of it.

A second proposal held that stars are not distributed evenly but clumped in a hierarchy —
groups within groups, thinning out at every scale — so that the sum converges rather than
diverging. This is mathematically sound and it was taken seriously, and modern surveys have
simply measured it and found that the clumping stops. Above a few hundred million light
years the distribution is smooth.

The resolution that survived is that one of the original assumptions is false, and not the
one Kepler picked. The universe need not be finite in extent. It is finite in age. Light
travels at a fixed speed, so a line of sight can only be filled by stars within the distance
light has covered since stars existed, and beyond that horizon there is nothing to see
because nothing has had time to arrive. The forest is deep enough to look infinite and you
are standing in it too soon.

Expansion contributes as well, by shifting the light of very distant sources towards longer
wavelengths and reducing the energy that arrives, but the finite age is the dominant term.
Both effects are consequences of the same cosmology, and the confirming observation is
striking: the sky in fact is uniformly bright in every direction, at the surface brightness
of a hot glowing surface, once you look at microwave rather than visible wavelengths. Olbers
was right about what the sky should look like. He was looking at the wrong wavelengths, by
about a factor of a thousand, and about fourteen billion years too late.

The episode is often used to argue that simple questions are worth asking, which is true and
which understates it. The question could be asked in 1610 and could not be answered until
cosmology had a finite age and a measured expansion. What it did in the meantime was tell
astronomers that something in their picture was wrong, for three hundred years, without
telling them what.`,
  questions: [
    {
      subskill: "main idea",
      family: "central-claim",
      difficulty: "Medium",
      stem: "The passage is chiefly concerned with:",
      key: "a question whose answer required a new cosmology.",
      wrong: [
        ["the discovery that interstellar dust absorbs starlight.", "The dust proposal is described only in order to be rejected."],
        ["the measurement of how stars are clumped in space.", "Surveys of clumping settle one failed proposal, not the passage."],
        ["the reasons Kepler believed the universe was finite.", "Kepler's use of the argument is a single clause of history."],
      ],
      why: "The passage traces the problem from 1610, dismisses two proposals, and says the resolution is that the universe \"is finite in age,\" which required a cosmology that did not yet exist.",
      steps: [
        "Note that each proposed resolution is introduced and then rejected.",
        "Read the final paragraph, which says when the question could be answered.",
      ],
      hint: "The last paragraph states what the question could and could not do.",
    },
    {
      subskill: "locate detail",
      family: "stated-detail",
      difficulty: "Easy",
      stem: "According to the passage, the problem is named for Olbers, who stated it in:",
      key: "1823.",
      wrong: [
        ["1610.", "That is when Kepler saw the problem, before Olbers."],
        ["1900.", "No event in the passage is dated to that year."],
        ["1687.", "This date does not appear anywhere in the passage."],
      ],
      why: "The passage says the problem \"is usually named for Heinrich Olbers, who stated it in 1823, although Kepler had seen it in 1610.\"",
      steps: [
        "Find the sentence naming Olbers.",
        "Distinguish his date from Kepler's in the same sentence.",
      ],
      hint: "Two dates appear together; take the later one.",
    },
    {
      subskill: "cause and effect",
      family: "cause-of-a-failure",
      difficulty: "Easy",
      stem: "The passage says the dust proposal fails because dust that absorbs light will eventually:",
      key: "glow as brightly as what it blocked.",
      wrong: [
        ["be blown away by the pressure of starlight.", "No mechanism for removing dust is described."],
        ["collapse into new stars over long periods.", "Star formation from dust is not mentioned in the passage."],
        ["settle into the plane of a galaxy's disc.", "No structural arrangement of the dust is discussed."],
      ],
      why: "The passage says \"dust that absorbs light heats up, and dust that heats up radiates,\" and in equilibrium \"would be glowing as brightly as what it was blocking.\"",
      steps: [
        "Locate the two short clauses about heating and radiating.",
        "Read the conclusion the paragraph draws from them.",
      ],
      hint: "Absorption stores energy; it does not destroy it.",
    },
    {
      subskill: "meaning in context",
      family: "vocabulary-in-context",
      difficulty: "Easy",
      stem: "The forest comparison is used in the passage to convey that a line of sight will:",
      key: "eventually meet a surface in any direction.",
      wrong: [
        ["be blocked by material lying between stars.", "Blocking by material is the dust proposal, introduced later."],
        ["reach further in some directions than others.", "The argument assumes an even distribution in all directions."],
        ["grow fainter the further the observer looks.", "Faintness is offset exactly by the number of distant stars."],
      ],
      why: "The passage says a line of sight \"must land on the surface of a star, in the way that a line of sight in a sufficiently large forest must eventually land on a trunk.\"",
      steps: [
        "Read the sentence in which the comparison appears.",
        "Note what the comparison is asserting about every direction.",
      ],
      hint: "The image is about what you always eventually hit.",
    },
    {
      subskill: "logical inference",
      family: "supported-inference",
      difficulty: "Medium",
      stem: "The passage implies that Kepler's conclusion from the argument was:",
      key: "the right kind of move applied to the wrong assumption.",
      wrong: [
        ["mistaken because he had misunderstood the geometry.", "The passage does not fault his reasoning, only his choice of premise."],
        ["confirmed by the modern resolution of the problem.", "The modern answer denies infinite age, not infinite extent."],
        ["ignored by astronomers until Olbers restated it.", "Halley and others are said to have worried at it in between."],
      ],
      why: "Kepler used the argument to conclude the universe must be finite; the passage says the resolution is \"that one of the original assumptions is false, and not the one Kepler picked,\" since the universe \"is finite in age.\"",
      steps: [
        "Note what Kepler concluded from the paradox.",
        "Compare it with which assumption the passage says actually fails.",
      ],
      hint: "Both he and the modern answer reject an assumption; they differ on which.",
    },
    {
      subskill: "function",
      family: "function-of-an-example",
      difficulty: "Medium",
      stem: "The account of the hierarchical clumping proposal serves mainly to show a resolution that was:",
      key: "internally sound but ruled out by measurement.",
      wrong: [
        ["mathematically flawed from the moment it was proposed.", "The passage calls it mathematically sound."],
        ["never taken seriously by working astronomers.", "The passage says it was taken seriously."],
        ["equivalent to the dust proposal in its reasoning.", "The two fail for different reasons in the passage."],
      ],
      why: "The passage says the proposal \"is mathematically sound and it was taken seriously,\" and that \"modern surveys have simply measured it and found that the clumping stops.\"",
      steps: [
        "Note the passage's judgement on the proposal's logic.",
        "Note what finally decided against it.",
      ],
      hint: "The refutation came from observation, not argument.",
    },
    {
      subskill: "organization",
      family: "passage-structure",
      difficulty: "Medium",
      stem: "The passage is organised as:",
      key: "a paradox, two failed answers, and the one that held.",
      wrong: [
        ["a biography of Olbers followed by later research.", "Olbers appears in a single sentence of attribution."],
        ["a comparison of visible and microwave astronomy.", "Microwaves enter only near the end as a confirming observation."],
        ["a chronological survey of theories of the universe.", "Only the theories bearing on this one problem are covered."],
      ],
      why: "The passage sets out the argument, rejects dust and then hierarchical clumping, and presents finite age with expansion as the surviving resolution.",
      steps: [
        "Label each paragraph with the job it does.",
        "Check that the option accounts for the two rejections.",
      ],
      hint: "Two proposals are raised only to be dismissed.",
    },
    {
      subskill: "claims and evidence",
      family: "claim-and-support",
      difficulty: "Medium",
      stem: "Which observation does the passage present as confirming that Olbers's expectation was essentially correct?",
      key: "The sky is uniformly bright at microwave wavelengths.",
      wrong: [
        ["Distant galaxies are shifted towards longer wavelengths.", "Redshift is described as a contributing effect, not the confirmation."],
        ["Surveys show the clumping of stars stops at large scales.", "That result rules out one proposal rather than confirming Olbers."],
        ["Dust between the stars radiates the energy it absorbs.", "This refutes the dust proposal and says nothing about brightness overall."],
      ],
      why: "The passage says \"the sky in fact is uniformly bright in every direction, at the surface brightness of a hot glowing surface, once you look at microwave rather than visible wavelengths.\"",
      steps: [
        "State what Olbers predicted the sky should look like.",
        "Find the observation the passage says fulfils that prediction.",
        "Reject results that address the failed proposals.",
      ],
      hint: "The confirming evidence is about what the sky actually looks like.",
    },
    {
      subskill: "reasoning",
      family: "evaluating-an-explanation",
      difficulty: "Hard",
      stem: "The passage's rejection of the dust proposal depends on the principle that:",
      key: "energy absorbed must eventually be re-emitted.",
      wrong: [
        ["light cannot travel further than its source is old.", "That is the finite-age resolution, not the objection to dust."],
        ["a distribution of matter must be smooth at large scales.", "Smoothness bears on the clumping proposal instead."],
        ["distant sources appear fainter than nearby ones.", "Faintness is part of the original paradox, already offset by numbers."],
      ],
      why: "The passage says dust in equilibrium \"would be glowing as brightly as what it was blocking,\" concluding: \"absorption can redistribute the light. It cannot dispose of it.\"",
      steps: [
        "Find the two-sentence summary at the end of the dust paragraph.",
        "State the general principle those sentences appeal to.",
        "Reject principles belonging to the other proposals.",
      ],
      hint: "The last two sentences of the paragraph state it directly.",
      trap: "Importing the finite-age answer into an argument made before it.",
    },
    {
      subskill: "strengthen or weaken",
      family: "weakening-a-position",
      difficulty: "Hard",
      stem: "Which finding, if true, would most weaken the resolution the passage endorses?",
      key: "Stars have been shining for far longer than light's reach.",
      wrong: [
        ["Interstellar dust is more abundant than has been assumed.", "The passage shows dust cannot dispose of light at any abundance."],
        ["Galaxies are clumped more strongly at small scales.", "Small-scale clumping is granted; what matters is that it stops."],
        ["Expansion shifts distant light further than estimated.", "A larger shift would support rather than undercut the resolution."],
      ],
      why: "The resolution holds that a line of sight is filled only by stars \"within the distance light has covered since stars existed.\" If stars had existed much longer than that, the horizon would not save the argument.",
      steps: [
        "State the resolution's key premise about time.",
        "Look for the finding that would contradict that premise.",
        "Reject findings bearing on the proposals already dismissed.",
      ],
      hint: "The answer turns on how long there has been anything to see.",
      trap: "Choosing a fact about dust or clumping, which belong to the rejected proposals.",
    },
    {
      subskill: "conclusion",
      family: "drawing-a-conclusion",
      difficulty: "Easy",
      stem: "The final paragraph concludes that, before cosmology could answer it, the question:",
      key: "signalled an error without identifying it.",
      wrong: [
        ["was regarded by astronomers as unimportant.", "The passage describes serious attention across three centuries."],
        ["had already been answered by Kepler in 1610.", "Kepler's answer is said to identify the wrong assumption."],
        ["could not be stated clearly until the 1800s.", "The passage says it could be asked in 1610."],
      ],
      why: "The passage says the question \"told astronomers that something in their picture was wrong, for three hundred years, without telling them what.\"",
      steps: [
        "Read the last sentence of the passage.",
        "Note the two halves of what it says the question did and did not do.",
      ],
      hint: "The sentence ends with what the question withheld.",
    },
  ],
};
