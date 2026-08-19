"use strict";

module.exports = {
  id: "act-reading-p021",
  type: "natural-science",
  title: "Bringing Back the Pigeon",
  intro: "Passage A is adapted from an argument for de-extinction by a molecular biologist. Passage B is adapted from a reply by a conservation ecologist.",
  content: `PASSAGE A

The passenger pigeon was the most abundant bird in North America and possibly on Earth.
Flocks took days to pass overhead. The last one died in a zoo in 1914, and the loss was not
only of a species but of a process: a bird that moved in billions disturbed forests on a
scale nothing has replaced. Nesting flocks broke branches, felled trees, and dropped
nutrients in quantities that reset patches of eastern woodland to an earlier stage.
Ecologists studying those forests today are studying a system with a component missing.

What is now possible is not resurrection and nobody serious claims it is. There is no
intact passenger pigeon genome and cloning requires a living cell. What there is, in
museum skins, is degraded DNA that can be sequenced and compared with the band-tailed
pigeon, the species' closest living relative. The differences can be located. Some of them
can be edited into band-tailed pigeon cells, and birds carrying those edits can be bred.
The result would be a band-tailed pigeon with passenger pigeon traits — flocking behaviour,
tail shape, breeding density — and the honest name for it is a functional analogue.

The objection that this is not really the extinct species is correct and beside the point.
Conservation has never restored species to a prior state; it restores populations that do
a job. The American chestnut being planted now carries a wheat gene. The peregrine falcons
over New York descend from a mixture of seven subspecies assembled by breeders in the
1970s, and nobody proposes removing them on grounds of authenticity. What matters is
whether an ecological function returns, and in the passenger pigeon's case the function
was disturbance at a scale no existing bird supplies.

PASSAGE B

I want to answer the strongest version of this argument, which is the ecological one, and
not the easy version about playing God.

Begin with the timescale. Editing the traits is the fast part; the slow part is everything
after. A functional analogue would have to be bred to a population large enough to flock,
and the flocking is the whole point, because a hundred birds do not break branches. The
passenger pigeon's own biology suggests it needed enormous numbers to breed at all, which
is why it collapsed so abruptly. Getting from a laboratory to a self-sustaining flock in
the millions is a programme measured in decades and hundreds of millions of dollars, and
it releases those birds into an eastern forest that is now fragmented, differently composed,
and surrounded by agriculture that a billion-bird flock would flatten.

Then the accounting. Every conservation dollar is drawn from the same pool. The species now
declining have known causes and known remedies: habitat loss, invasive predators, and
disease. We do not lack methods for them; we lack funding and attention. A predator fence around a
New Zealand island is unglamorous, costs a fraction of a laboratory year, and has never
once failed to work where it has been properly maintained. A programme that
consumes both, over decades, to restore one function to one biome, has to be compared with
what the same money does elsewhere, and the comparison is not close.

The deepest cost is not financial. De-extinction changes what extinction means to people
who are not biologists. If a species can be brought back, then losing one becomes a
setback rather than an ending, and the argument for the expensive, unglamorous work of
keeping a species alive gets quietly weaker. My colleagues call this the moral hazard
objection and some of them dismiss it as speculative. It is speculative. It is also the
only one of my objections that cannot be fixed by better technology, and it will arrive
long before the birds do.`,
  questions: [
    {
      subskill: "main idea",
      family: "central-claim",
      difficulty: "Medium",
      stem: "The main point of Passage A is that the case for de-extinction rests on:",
      key: "restoring a function that no living species performs.",
      wrong: [
        ["recovering a species that was lost through human action.", "Passage A says outright that resurrection of the species is not possible."],
        ["proving that gene editing can now copy an extinct genome.", "Passage A states there is no intact genome and rejects the resurrection framing."],
        ["correcting a historical wrong done to eastern woodlands.", "No claim about redress or historical wrong is made in Passage A."],
      ],
      why: "Passage A says the loss was \"not only of a species but of a process,\" and closes by saying \"what matters is whether an ecological function returns,\" naming disturbance at a scale no existing bird supplies.",
      steps: [
        "Find the sentence that says what was lost besides the bird.",
        "Read the last sentence of the passage, which restates the criterion.",
      ],
      hint: "The passage names its own standard twice.",
    },
    {
      subskill: "locate detail",
      family: "stated-detail",
      difficulty: "Easy",
      stem: "According to Passage A, the DNA available from museum specimens is:",
      key: "degraded but able to be sequenced.",
      wrong: [
        ["intact enough to permit cloning.", "Passage A says cloning requires a living cell, which no specimen provides."],
        ["identical to band-tailed pigeon DNA.", "The comparison is made precisely in order to locate differences."],
        ["too damaged to be read at all.", "The passage says it can be sequenced and compared with a living relative."],
      ],
      why: "Passage A says that what museum skins hold is \"degraded DNA that can be sequenced and compared with the band-tailed pigeon.\"",
      steps: [
        "Find the sentence about museum skins.",
        "Take both halves of the description it gives.",
      ],
      hint: "One clause gives a limitation and a capability together.",
    },
    {
      subskill: "cause and effect",
      family: "cause-of-a-collapse",
      difficulty: "Easy",
      stem: "Passage B suggests that the passenger pigeon disappeared so abruptly because the species:",
      key: "may have needed vast numbers in order to breed.",
      wrong: [
        ["lost the eastern forests it depended on for nesting.", "Fragmentation is raised as a present-day obstacle, not as the cause of collapse."],
        ["was replaced in its range by the band-tailed pigeon.", "The band-tailed pigeon appears only as a genetic relative in Passage A."],
        ["carried a disease that spread quickly through flocks.", "Disease is listed among threats to other species, not to this one."],
      ],
      why: "Passage B says \"the passenger pigeon's own biology suggests it needed enormous numbers to breed at all, which is why it collapsed so abruptly.\"",
      steps: [
        "Locate the sentence about the bird's breeding biology.",
        "Read the clause introduced by *which is why*.",
      ],
      hint: "The sentence supplies the cause and the effect in that order.",
    },
    {
      subskill: "meaning in context",
      family: "vocabulary-in-context",
      difficulty: "Easy",
      stem: "As it is used in Passage A, the phrase \"functional analogue\" refers to a bird that:",
      key: "does the job without being the species.",
      wrong: [
        ["carries the complete genome of the extinct bird.", "Passage A denies that any complete genome exists to be carried."],
        ["resembles the extinct bird in appearance only.", "The traits named include behaviour and breeding density, not just looks."],
        ["breeds with the extinct species' living relatives.", "Interbreeding is not part of what the phrase describes in the passage."],
      ],
      why: "Passage A says the result would be \"a band-tailed pigeon with passenger pigeon traits — flocking behaviour, tail shape, breeding density — and the honest name for it is a functional analogue.\"",
      steps: [
        "Read the description that precedes the phrase.",
        "Note that the passage calls the naming *honest* because it concedes something.",
      ],
      hint: "The word *analogue* concedes that it is not the original.",
    },
    {
      subskill: "logical inference",
      family: "supported-inference",
      difficulty: "Medium",
      stem: "Passage B implies that producing a small population of edited birds would:",
      key: "leave the ecological aim entirely unmet.",
      wrong: [
        ["satisfy most of the objections it raises.", "Passage B's objections concern scale, cost, and moral hazard, none of them met."],
        ["be impossible with current editing methods.", "Passage B calls the editing \"the fast part,\" so it is not the obstacle."],
        ["endanger the band-tailed pigeon population.", "No risk to the living relative is mentioned anywhere in the passage."],
      ],
      why: "Passage B says the birds \"would have to be bred to a population large enough to flock, and the flocking is the whole point, because a hundred birds do not break branches.\"",
      steps: [
        "Identify what Passage A says the restored function actually is.",
        "Apply Passage B's remark about a hundred birds to that function.",
      ],
      hint: "The disturbance depends on numbers, not on the individual bird.",
    },
    {
      subskill: "function",
      family: "function-of-an-example",
      difficulty: "Medium",
      stem: "The examples of the American chestnut and the New York peregrines serve in Passage A to:",
      key: "answer an objection about authenticity with precedent.",
      wrong: [
        ["show that gene editing has already restored two species.", "The peregrines were assembled by breeders, not by editing."],
        ["establish that eastern forests recover without any help.", "Both examples are cases of deliberate human intervention."],
        ["prove that the passenger pigeon can be revived as well.", "The examples address what counts as restoration, not what is possible."],
      ],
      why: "Passage A grants that a functional analogue \"is not really the extinct species\" and calls the point \"beside the point,\" then offers cases where conservation already accepts altered or mixed populations.",
      steps: [
        "Note the concession the paragraph opens with.",
        "Ask what work the two examples do for the sentence that follows it.",
      ],
      hint: "The paragraph is answering a criticism it has just stated.",
    },
    {
      subskill: "compare perspectives",
      family: "comparing-two-texts",
      difficulty: "Hard",
      stem: "Passage B differs from Passage A chiefly in that Passage B:",
      key: "weighs the project against its alternative uses.",
      wrong: [
        ["denies that the extinct bird had any ecological role.", "Passage B never disputes Passage A's account of forest disturbance."],
        ["argues that editing the traits cannot in fact be done.", "Passage B calls the editing the fast part of the programme."],
        ["holds that altered populations are not real restorations.", "Passage B says it wants to answer the ecological case, not the authenticity one."],
      ],
      why: "Passage B accepts the ecological framing and then introduces \"the accounting\": every dollar \"is drawn from the same pool,\" and the programme \"has to be compared with what the same money does elsewhere.\"",
      steps: [
        "Note which of Passage A's claims Passage B concedes.",
        "Identify the consideration Passage B adds that Passage A never raises.",
        "Reject options describing disagreements the passages do not have.",
      ],
      hint: "Passage B opens by choosing which version of the argument to answer.",
      trap: "Assuming the reply must deny the first passage's science.",
    },
    {
      subskill: "synthesize information",
      family: "combining-two-texts",
      difficulty: "Hard",
      stem: "Both passages accept which claim about the proposed birds?",
      key: "They would not be passenger pigeons in the full sense.",
      wrong: [
        ["They could be produced within the next several years.", "Passage B describes a programme measured in decades, which Passage A does not contest."],
        ["They would restore eastern forests to their earlier state.", "Passage B disputes this, citing fragmentation and surrounding agriculture."],
        ["They would be more valuable than protecting living species.", "That is precisely the comparison Passage B says is not close."],
      ],
      why: "Passage A says \"the objection that this is not really the extinct species is correct\" and names the result a functional analogue; Passage B refers throughout to \"a functional analogue\" rather than to the bird itself.",
      steps: [
        "Find where Passage A concedes what the birds would not be.",
        "Check whether Passage B disputes that concession anywhere.",
        "Discard claims that one passage argues against.",
      ],
      hint: "Look for a concession the first passage makes before the reply begins.",
      trap: "Assuming that opposed passages share no claims at all.",
    },
    {
      subskill: "claims and evidence",
      family: "claim-and-support",
      difficulty: "Medium",
      stem: "Which detail in Passage A best supports its claim that the extinct bird shaped its forests?",
      key: "Nesting flocks broke branches and felled whole trees.",
      wrong: [
        ["Flocks were large enough to take days to pass overhead.", "Flock size shows abundance, not any effect on the forest itself."],
        ["The last surviving individual died in a zoo in 1914.", "The date of extinction says nothing about the bird's ecological role."],
        ["Ecologists still study the forests the bird once used.", "Continuing study describes research activity, not the bird's effect."],
      ],
      why: "Passage A says nesting flocks \"broke branches, felled trees, and dropped nutrients in quantities that reset patches of eastern woodland to an earlier stage.\"",
      steps: [
        "Separate facts about the bird's numbers from facts about its effects.",
        "Choose the detail that describes something happening to the forest.",
      ],
      hint: "The claim is about the forest, so the evidence must be too.",
    },
    {
      subskill: "reasoning",
      family: "evaluating-an-objection",
      difficulty: "Hard",
      stem: "Passage B singles out the moral hazard objection as distinctive because it:",
      key: "cannot be removed by improving the technology.",
      wrong: [
        ["rests on evidence stronger than the other objections do.", "Passage B concedes the objection is speculative, unlike its cost estimates."],
        ["is the objection its own colleagues most readily accept.", "Passage B says some colleagues dismiss it as speculative."],
        ["applies to conservation programmes of every kind.", "The concern described is specific to the prospect of reversing extinction."],
      ],
      why: "Passage B grants \"it is speculative\" and then says \"it is also the only one of my objections that cannot be fixed by better technology, and it will arrive long before the birds do.\"",
      steps: [
        "Note the concession Passage B makes about this objection.",
        "Read the sentence that says why it is raised despite the concession.",
        "Reject options that claim more for it than the passage does.",
      ],
      hint: "The passage weakens the objection before explaining why it still matters.",
      trap: "Taking the concession as the passage's final verdict on the objection.",
    },
  ],
};
