"use strict";

module.exports = {
  id: "act-reading-p037",
  type: "natural-science",
  title: "The Quiet Slip",
  intro: "This passage is adapted from an article on a form of earthquake discovered in the late 1990s.",
  content: `A seismometer measures ground motion, and for a century that is how earthquakes were
found: something shakes, an instrument records it, and the record is read backwards to a
place and a depth. The method has an obvious blind spot, which nobody had much reason to
worry about. It cannot detect a fault that moves without shaking.

In 1999 Herb Dragert and colleagues at the Geological Survey of Canada were examining
continuous GPS records from stations on Vancouver Island. The stations sit on the North
American plate above the Cascadia subduction zone, where the Juan de Fuca plate is being
pushed underneath. Between earthquakes the two plates are locked together, and the upper
plate is dragged slowly landward, which the GPS records as a steady eastward creep of a few
millimetres a year. In the middle of that record the stations reversed. For about two weeks
they moved west, a few millimetres, and then resumed their normal drift. No seismometer had
recorded anything at all.

The reversal was not an instrument error, because it appeared at many stations at once and
propagated along the margin at about ten kilometres a day. It was a fault slipping. The slip
released as much energy as a magnitude 6.7 earthquake and released it over fourteen days
instead of fourteen seconds, which is slow enough that nothing radiates as a seismic wave.
Nobody on the surface felt anything, and nothing on any seismogram marked the event.

Once the phenomenon had a name, the seismic record turned out not to be entirely empty
after all. Kazushige Obara, working in Japan, had been examining a persistent low-frequency
hum in records from the Nankai subduction zone that had been treated as noise from weather
or ocean waves. It was not noise. It was tremor, generated at the depth where the plates
meet, and it occurs at the same times and places as the slow slip. The two phenomena were
put together within a year, and the combined process is now called episodic tremor and slip.
At Cascadia it recurs, with a regularity that is genuinely surprising for anything
geological, about every fourteen months.

What it means for hazard is the question that has driven the field since, and it is not
settled. Slow slip occurs downdip of the locked zone — deeper than the part of the fault
that produces destructive earthquakes, at the transition where the fault becomes ductile.
Each episode transfers stress from the region that is slipping to the region that is not,
which is the locked patch that will eventually produce a magnitude 9. That much follows from
mechanics and is agreed. What does not follow is a prediction. The stress increment from a
single episode is small compared with what accumulates between great earthquakes, and it is
delivered every fourteen months, and the great earthquakes recur every few hundred years, so
several hundred episodes pass without incident for each one that does not.

The honest statement is a conditional probability that is higher than the background rate and
still very low. Some agencies in the region now issue an advisory during a slip episode
saying exactly that. Whether such an advisory helps anybody is disputed among the people who
issue it: it is accurate, it is unactionable, and repeated warnings that are followed by
nothing have a documented effect on how the next warning is received.

Meanwhile the scientific payoff has been large and has nothing to do with prediction. Slow
slip is a subduction fault behaving in a way that can be watched, repeatedly, on a timescale
of weeks, in a place where the alternative is waiting three hundred years for one
observation.`,
  questions: [
    {
      subskill: "main idea",
      family: "central-claim",
      difficulty: "Medium",
      stem: "The passage is chiefly concerned with:",
      key: "a fault behaviour that instruments had been unable to see.",
      wrong: [
        ["a method for predicting great subduction earthquakes.", "The passage says explicitly that no prediction follows from the finding."],
        ["the discovery that seismometers are poorly calibrated.", "The instruments work correctly; the motion simply produces no waves."],
        ["a comparison of subduction zones in Japan and Canada.", "Both regions appear, but as sites of one phenomenon rather than as a contrast."],
      ],
      why: "The passage opens by naming the blind spot — a method that \"cannot detect a fault that moves without shaking\" — and then describes what filling it revealed.",
      steps: [
        "Read the first paragraph, which states the limitation.",
        "Check that the option covers both the GPS discovery and the tremor.",
      ],
      hint: "The opening paragraph names what the old method could not do.",
    },
    {
      subskill: "locate detail",
      family: "stated-detail",
      difficulty: "Easy",
      stem: "According to the passage, the Vancouver Island GPS stations normally move:",
      key: "eastward by a few millimetres a year.",
      wrong: [
        ["westward by a few millimetres a year.", "Westward motion is what happened during the two-week reversal."],
        ["downward as the plate is dragged under.", "Vertical motion of the stations is not described."],
        ["along the margin at ten kilometres a day.", "That figure is the speed at which the slip propagated, not station drift."],
      ],
      why: "The passage says the upper plate \"is dragged slowly landward, which the GPS records as a steady eastward creep of a few millimetres a year.\"",
      steps: [
        "Find the sentence describing the normal record.",
        "Distinguish it from the reversal described next.",
      ],
      hint: "The normal direction is given before the surprise.",
    },
    {
      subskill: "cause and effect",
      family: "cause-of-an-absence",
      difficulty: "Easy",
      stem: "The passage explains that the 1999 slip produced no seismic record because it:",
      key: "released its energy far too slowly to radiate waves.",
      wrong: [
        ["occurred deeper than seismometers can detect.", "Depth is discussed for hazard, not as the reason nothing was recorded."],
        ["released far less energy than an ordinary earthquake.", "It released as much energy as a magnitude 6.7 event."],
        ["happened offshore, beyond the network of stations.", "The GPS stations that recorded it sit directly above the zone."],
      ],
      why: "The passage says the slip \"released as much energy as a magnitude 6.7 earthquake and released it over fourteen days instead of fourteen seconds, which is slow enough that nothing radiates as a seismic wave.\"",
      steps: [
        "Locate the sentence comparing fourteen days with fourteen seconds.",
        "Read the clause that follows it.",
      ],
      hint: "The same energy over a different duration.",
    },
    {
      subskill: "meaning in context",
      family: "vocabulary-in-context",
      difficulty: "Easy",
      stem: "As it is used in the fourth paragraph, the word *tremor* refers to:",
      key: "a faint signal once dismissed as background noise.",
      wrong: [
        ["the shaking felt by people during a slip episode.", "The passage says nobody on the surface felt anything."],
        ["the westward reversal recorded by the GPS stations.", "That motion is the slip itself, recorded by a different instrument."],
        ["a fault's motion at the point where it becomes ductile.", "That describes slow slip; tremor is the accompanying seismic signal."],
      ],
      why: "The passage says a \"persistent low-frequency hum\" had \"been treated as noise from weather or ocean waves. It was not noise. It was tremor.\"",
      steps: [
        "Find where the term is introduced.",
        "Note what the signal had previously been taken for.",
      ],
      hint: "The paragraph corrects an earlier interpretation.",
    },
    {
      subskill: "logical inference",
      family: "supported-inference",
      difficulty: "Medium",
      stem: "The passage implies that slow slip had probably been occurring long before 1999 but went unnoticed because:",
      key: "no instrument in use could record silent motion.",
      wrong: [
        ["the subduction zones concerned had not been studied.", "Both zones were under study; the phenomenon simply left no trace."],
        ["it occurs only every fourteen months at Cascadia.", "A recurrence of that length would still fall within the record."],
        ["the tremor signal is too weak to be measured.", "The tremor was in the records and had been mistaken for noise."],
      ],
      why: "The first paragraph says the seismometer method \"cannot detect a fault that moves without shaking,\" and the discovery came only once continuous GPS records were examined.",
      steps: [
        "Note what instrument was needed to see the motion.",
        "Ask what would have happened before that instrument was in continuous use.",
      ],
      hint: "The blind spot is named in the opening paragraph.",
    },
    {
      subskill: "function",
      family: "function-of-a-detail",
      difficulty: "Medium",
      stem: "The detail that the reversal appeared at many stations and propagated along the margin serves mainly to:",
      key: "rule out a malfunction at a single station.",
      wrong: [
        ["establish the depth at which the slip occurred.", "Depth is introduced later, in the discussion of hazard."],
        ["show that the event lasted about fourteen days.", "The duration is given separately from the propagation."],
        ["explain why the tremor was mistaken for noise.", "The tremor's misclassification is a separate matter in Japan."],
      ],
      why: "The passage says \"the reversal was not an instrument error, because it appeared at many stations at once and propagated along the margin at about ten kilometres a day.\"",
      steps: [
        "Read the claim the sentence supports.",
        "Note the word *because* joining the detail to that claim.",
      ],
      hint: "The sentence states what the detail rules out.",
    },
    {
      subskill: "claims and evidence",
      family: "claim-and-support",
      difficulty: "Medium",
      stem: "Which fact best supports the claim that slow slip and tremor are aspects of one process?",
      key: "They occur at the same times and in the same places.",
      wrong: [
        ["Both were first identified in the late 1990s.", "Contemporary discovery is a fact about researchers, not about the processes."],
        ["Both occur at subduction zones rather than elsewhere.", "A shared setting is far weaker than a shared timing and location."],
        ["Both were originally attributed to instrument problems.", "Only the tremor was dismissed; the GPS reversal was tested and confirmed."],
      ],
      why: "The passage says the tremor \"occurs at the same times and places as the slow slip,\" which is why \"the two phenomena were put together within a year.\"",
      steps: [
        "Ask what would establish that two signals share a source.",
        "Find the sentence reporting their coincidence.",
      ],
      hint: "Coincidence in time and place is the strongest available link.",
    },
    {
      subskill: "reasoning",
      family: "evaluating-an-inference",
      difficulty: "Hard",
      stem: "The passage argues that no prediction follows from slow slip chiefly because:",
      key: "the added stress is small and delivered very often.",
      wrong: [
        ["the mechanics linking the two regions are disputed.", "The passage says the stress transfer follows from mechanics and is agreed."],
        ["slow slip occurs at depths that cannot be measured.", "Its depth is described, and GPS records it clearly."],
        ["great earthquakes are not caused by stress at all.", "The passage assumes accumulated stress produces them."],
      ],
      why: "The passage says the increment \"is small compared with what accumulates between great earthquakes,\" arrives every fourteen months, and that \"several hundred episodes pass without incident for each one that does not.\"",
      steps: [
        "Separate what the passage says follows from mechanics from what does not.",
        "Find the two quantities the argument compares.",
        "Reject options that deny a premise the passage grants.",
      ],
      hint: "The argument is about the ratio of episodes to great earthquakes.",
      trap: "Assuming a denial of prediction must rest on a gap in the physics.",
    },
    {
      subskill: "comparison",
      family: "contrast-of-conditions",
      difficulty: "Hard",
      stem: "The passage contrasts the slipping region with the locked patch principally by noting that the locked patch:",
      key: "is where a magnitude 9 will eventually originate.",
      wrong: [
        ["moves in episodes about every fourteen months.", "That regularity belongs to the slipping region, not the locked one."],
        ["produces the low-frequency tremor heard in Japan.", "Tremor accompanies the slip, at the deeper transition."],
        ["lies deeper on the fault than the ductile zone.", "The passage places slow slip downdip, deeper than the locked zone."],
      ],
      why: "The passage says slow slip occurs \"downdip of the locked zone — deeper than the part of the fault that produces destructive earthquakes,\" and that each episode transfers stress to \"the locked patch that will eventually produce a magnitude 9.\"",
      steps: [
        "Note where each region sits on the fault.",
        "Note what each region does.",
        "Reject options that assign one region's property to the other.",
      ],
      hint: "One region moves quietly and the other stores what will not.",
      trap: "Reversing which region is deeper on the fault.",
    },
    {
      subskill: "author's purpose",
      family: "purpose-of-a-paragraph",
      difficulty: "Hard",
      stem: "The paragraph about advisories is included chiefly to:",
      key: "show that an accurate warning may still be unhelpful.",
      wrong: [
        ["criticise agencies for issuing misleading statements.", "The passage calls the advisory accurate."],
        ["argue that the public misunderstands probability.", "The difficulty described is that nothing can be done, not that it is misread."],
        ["demonstrate that slow slip is a reliable precursor.", "The passage says the probability remains very low."],
      ],
      why: "The passage says the advisory \"is accurate, it is unactionable, and repeated warnings that are followed by nothing have a documented effect on how the next warning is received.\"",
      steps: [
        "List the three things the passage says about the advisory.",
        "Note that the first is a virtue and the others are costs.",
        "Reject options that dispute the advisory's accuracy or the science.",
      ],
      hint: "The sentence grants one thing and objects to two.",
      trap: "Reading a discussion of communication as a criticism of the science.",
    },
    {
      subskill: "interpret detail",
      family: "detail-interpretation",
      difficulty: "Easy",
      stem: "The closing remark about waiting three hundred years indicates that slow slip is valuable to researchers because it:",
      key: "lets a rare process be observed repeatedly.",
      wrong: [
        ["proves that great earthquakes recur on a schedule.", "The passage gives their interval loosely and draws no schedule from it."],
        ["shortens the interval between great earthquakes.", "Nothing suggests slow slip changes when great earthquakes occur."],
        ["allows seismometers to be tested against GPS.", "No instrument comparison is proposed in the passage."],
      ],
      why: "The passage says slow slip is \"a subduction fault behaving in a way that can be watched, repeatedly, on a timescale of weeks, in a place where the alternative is waiting three hundred years for one observation.\"",
      steps: [
        "Compare the two timescales named in the final sentence.",
        "Note what each one buys a researcher.",
      ],
      hint: "The contrast is between weeks and centuries.",
    },
  ],
};
