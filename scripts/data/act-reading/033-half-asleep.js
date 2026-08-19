"use strict";

module.exports = {
  id: "act-reading-p033",
  type: "natural-science",
  title: "Half Asleep",
  intro: "This passage is adapted from an article on sleep in animals.",
  content: `A mallard sleeping at the edge of a row of mallards keeps one eye open. This is not a
figure of speech and not a matter of dozing lightly. The eye is open, it is pointed away from
the group, and an electrode on the skull shows that the hemisphere connected to it is
producing the fast, low-voltage activity of waking, while the other hemisphere produces the
slow waves of deep sleep. Move the bird to the middle of the row and within a few nights it
stops doing this and sleeps with both hemispheres at once. Move it back to the end and the
open eye returns, on the outward-facing side.

Unihemispheric slow-wave sleep was first described in dolphins in the 1960s and has since
been found in every cetacean examined, in eared seals while they are in water but not on
land, and in many birds. It is not a curiosity at the margin of sleep research. It is the
strongest available evidence about what sleep is for, because it shows what an animal will
give up when circumstances make sleeping expensive, and what it will not.

What gets given up is half the brain's rest at a time, and the cost is real: a hemisphere
that has slept unihemispherically shows a rebound afterwards, sleeping more deeply when the
animal is next in a position to sleep with both. The system is not free. What is never given
up, in any species examined, is sleep itself. A dolphin swimming continuously for weeks after
giving birth does not stop sleeping; it sleeps in halves. This is the fact that has closed
off a whole family of theories. If sleep were merely a way of keeping an animal still and out
of trouble during hours when it cannot forage — the immobilisation hypothesis, which was
serious and had good arguments — then an animal that must keep swimming would simply stop
sleeping. None of them do. They pay a large price to keep something, which means the
something is doing work.

The nature of that work is where the agreement ends. One family of explanations is about
maintenance: clearing metabolic products that accumulate during waking, restoring cellular
supplies, repairing what use damages. A second is about information: consolidating what was
learned during the day, and, in one influential version, weakening the synapses that grew
during waking so that the brain begins the next day with capacity available. The two are not
exclusive and most researchers hold some combination. Unihemispheric sleep bears on both,
because in a bird sleeping half at a time you can compare the two hemispheres of one animal,
with everything else held constant.

Those comparisons have been done and they support the information side more cleanly than the
maintenance side. A pigeon trained on a task using one eye shows more slow-wave activity, on
the following night, in the hemisphere that did the learning. That is difficult to explain by
any account in which sleep is a housekeeping process running on a fixed schedule.

There is a further observation whose implications are not settled. Birds at the end of a row
face outwards, and which end a bird occupies is not random: subordinate birds get the ends.
The sleep architecture of a flock is therefore a map of its social structure, and a bird's
sleep quality depends on its position in a hierarchy it did not choose. Whether that has
consequences over a season — for immune function, for learning, for survival — has been
asked and not yet answered, mostly because following individual wild birds through a winter
is difficult in ways that have nothing to do with sleep.`,
  questions: [
    {
      subskill: "main idea",
      family: "central-claim",
      difficulty: "Medium",
      stem: "The passage presents unihemispheric sleep chiefly as:",
      key: "evidence bearing on what sleep accomplishes.",
      wrong: [
        ["an adaptation unique to marine mammals and birds.", "The passage uses it to argue about sleep generally, not to catalogue species."],
        ["proof that sleep can be dispensed with when necessary.", "The passage says no species examined gives up sleep itself."],
        ["a defect that arises when animals are kept in groups.", "It is described as a functioning adaptation, not as a disorder."],
      ],
      why: "The passage calls it \"the strongest available evidence about what sleep is for, because it shows what an animal will give up when circumstances make sleeping expensive, and what it will not.\"",
      steps: [
        "Find the sentence that states why the phenomenon matters.",
        "Check that the option matches the use made of it in later paragraphs.",
      ],
      hint: "The second paragraph says what the phenomenon is good for.",
    },
    {
      subskill: "locate detail",
      family: "stated-detail",
      difficulty: "Easy",
      stem: "According to the passage, a mallard at the end of a row keeps open the eye that faces:",
      key: "away from the rest of the group.",
      wrong: [
        ["towards the centre of the row.", "The open eye is on the outward-facing side, not the inward one."],
        ["in the direction of the wind.", "Wind direction is not mentioned anywhere in the passage."],
        ["upward, towards the open sky.", "The passage describes a horizontal orientation relative to the group."],
      ],
      why: "The first paragraph says the eye \"is pointed away from the group,\" and that when a bird is returned to the end \"the open eye returns, on the outward-facing side.\"",
      steps: [
        "Find the description of the sleeping mallard.",
        "Note the direction the open eye faces.",
      ],
      hint: "The detail is stated twice in the first paragraph.",
    },
    {
      subskill: "cause and effect",
      family: "cause-of-a-behaviour",
      difficulty: "Easy",
      stem: "The passage says a mallard stops sleeping with one eye open when it is:",
      key: "moved to the middle of the row.",
      wrong: [
        ["kept awake for several nights running.", "Sleep deprivation is not described as changing the behaviour."],
        ["fitted with an electrode on its skull.", "The electrode records the behaviour; it does not alter it."],
        ["placed in water rather than on land.", "That distinction is described for eared seals, not for mallards."],
      ],
      why: "The passage says that moved to the middle, \"within a few nights it stops doing this and sleeps with both hemispheres at once.\"",
      steps: [
        "Locate the two moves described in the first paragraph.",
        "Match each move with the behaviour that follows it.",
      ],
      hint: "The behaviour is reversible in both directions.",
    },
    {
      subskill: "meaning in context",
      family: "vocabulary-in-context",
      difficulty: "Easy",
      stem: "As it is used in the third paragraph, the word *rebound* refers to:",
      key: "deeper sleep taken afterwards to compensate.",
      wrong: [
        ["a return to swimming after a period of rest.", "The term describes sleep depth, not locomotion."],
        ["the recovery of an animal after giving birth.", "Birth is mentioned as a circumstance, not as what rebounds."],
        ["a rise in alertness in the waking hemisphere.", "The waking hemisphere's state is described without any rebound."],
      ],
      why: "The passage says a hemisphere that has slept unihemispherically \"shows a rebound afterwards, sleeping more deeply when the animal is next in a position to sleep with both.\"",
      steps: [
        "Read the clause that follows the word.",
        "Note that it describes the same hemisphere at a later time.",
      ],
      hint: "The sentence explains the term as it introduces it.",
    },
    {
      subskill: "logical inference",
      family: "supported-inference",
      difficulty: "Medium",
      stem: "The passage implies that if the immobilisation hypothesis were correct, a continuously swimming dolphin would:",
      key: "have no reason to sleep at all.",
      wrong: [
        ["sleep with both hemispheres while moving.", "The hypothesis concerns why sleep exists, not how it is divided."],
        ["show a stronger rebound than other animals.", "Rebound is evidence about cost, not about the hypothesis's prediction."],
        ["forage more often than a resting dolphin.", "Foraging rates are not discussed in the passage."],
      ],
      why: "The passage says that under that hypothesis \"an animal that must keep swimming would simply stop sleeping. None of them do.\"",
      steps: [
        "State what the hypothesis says sleep is for.",
        "Ask what it predicts for an animal that cannot stay still.",
      ],
      hint: "The passage spells the prediction out before rejecting it.",
    },
    {
      subskill: "comparison",
      family: "contrast-of-explanations",
      difficulty: "Medium",
      stem: "The passage distinguishes two families of explanation for sleep according to whether sleep principally:",
      key: "repairs the brain or reorganises what it holds.",
      wrong: [
        ["occurs at night or is distributed across the day.", "Timing is not the basis on which the families are divided."],
        ["evolved once or arose separately in each group.", "Evolutionary history is not part of the distinction drawn."],
        ["requires stillness or can occur during movement.", "That question belongs to the hypothesis the passage rejects."],
      ],
      why: "The passage sets a maintenance family — \"clearing metabolic products ... restoring cellular supplies\" — against an information family concerned with \"consolidating what was learned\" and adjusting synapses.",
      steps: [
        "Read the two descriptions in the fourth paragraph.",
        "Reduce each to a single verb.",
      ],
      hint: "One family is about substances and the other about content.",
    },
    {
      subskill: "claims and evidence",
      family: "claim-and-support",
      difficulty: "Hard",
      stem: "The pigeon experiment is offered as evidence chiefly because it shows that sleep depth:",
      key: "follows which hemisphere was used in learning.",
      wrong: [
        ["increases after any period of prolonged waking.", "A general effect of waking would not distinguish the two accounts."],
        ["differs between birds at the ends of a row.", "Position effects are discussed separately, in the final paragraph."],
        ["is reduced when only one eye is available.", "The passage reports more slow-wave activity, not less."],
      ],
      why: "The passage says a pigeon trained using one eye \"shows more slow-wave activity, on the following night, in the hemisphere that did the learning,\" which \"is difficult to explain by any account in which sleep is a housekeeping process running on a fixed schedule.\"",
      steps: [
        "Identify what the two hemispheres differ in before the sleep.",
        "Note what differs between them during it.",
        "Reject options that describe effects the design does not isolate.",
      ],
      hint: "The design holds the animal constant and varies the hemisphere.",
      trap: "Choosing a general fact about sleep rather than the within-animal comparison.",
    },
    {
      subskill: "reasoning",
      family: "evaluating-an-inference",
      difficulty: "Hard",
      stem: "The passage's argument that sleep must be doing work depends on the observation that animals:",
      key: "pay a measurable cost rather than forgo it.",
      wrong: [
        ["sleep for a similar number of hours across species.", "No comparison of sleep duration between species is offered."],
        ["can be shown to sleep in every environment tested.", "Universality alone would not show that sleep is costly to keep."],
        ["recover normal sleep once conditions allow it.", "Recovery is evidence of cost, but the argument turns on the trade itself."],
      ],
      why: "The passage says the system \"is not free,\" that hemispheres rebound afterwards, and that animals under pressure \"pay a large price to keep something, which means the something is doing work.\"",
      steps: [
        "Find the sentence that draws the conclusion about work.",
        "Identify the premise stated in the same sentence.",
        "Reject options that report facts without a cost attached.",
      ],
      hint: "The inference runs from willingness to pay to value.",
      trap: "Taking universality as the premise when the argument rests on cost.",
    },
    {
      subskill: "function",
      family: "function-of-a-detail",
      difficulty: "Medium",
      stem: "The observation that subordinate birds occupy the ends of a row serves mainly to:",
      key: "connect sleep quality to social rank.",
      wrong: [
        ["explain why flocks arrange themselves in rows.", "The passage does not account for why rows form at all."],
        ["show that dominant birds sleep less than others.", "Dominant birds occupy the middle, where full sleep is possible."],
        ["establish that the behaviour is learned rather than innate.", "Nothing in the passage addresses whether the behaviour is learned."],
      ],
      why: "The passage says \"the sleep architecture of a flock is therefore a map of its social structure, and a bird's sleep quality depends on its position in a hierarchy it did not choose.\"",
      steps: [
        "Note who ends up at the ends and what happens there.",
        "Read the sentence the passage draws from that pairing.",
      ],
      hint: "The ends are where one hemisphere stays awake.",
    },
    {
      subskill: "author's purpose",
      family: "purpose-of-a-paragraph",
      difficulty: "Medium",
      stem: "The author closes by describing an unanswered question in order to:",
      key: "mark a consequence that has not yet been tested.",
      wrong: [
        ["suggest that the earlier findings are unreliable.", "The earlier findings are reported without qualification."],
        ["argue that wild birds should be studied less often.", "The difficulty of the work is noted, not used as an argument against it."],
        ["show that social rank explains all sleep differences.", "The paragraph raises the question of consequences without settling it."],
      ],
      why: "The passage says whether unequal sleep has consequences \"over a season — for immune function, for learning, for survival — has been asked and not yet answered.\"",
      steps: [
        "Note that the paragraph names a question rather than a finding.",
        "Read the reason the passage gives for the gap.",
      ],
      hint: "The obstacle is practical, not theoretical.",
    },
    {
      subskill: "interpret detail",
      family: "detail-interpretation",
      difficulty: "Easy",
      stem: "The passage's remark that eared seals sleep unihemispherically in water but not on land indicates that the behaviour is:",
      key: "used only where conditions require it.",
      wrong: [
        ["restricted to animals that never come ashore.", "Eared seals do come ashore, and there they sleep with both hemispheres."],
        ["a permanent feature of the species' brain.", "The seals switch between the two modes according to setting."],
        ["most common during the breeding season.", "No seasonal pattern is described for the seals."],
      ],
      why: "The passage lists \"eared seals while they are in water but not on land\" among the species showing the pattern, matching the mallard that stops when moved to the middle of a row.",
      steps: [
        "Note the condition attached to the seals in the list.",
        "Compare it with the mallard's switching behaviour.",
      ],
      hint: "The same on-and-off pattern appears in two species.",
    },
  ],
};
