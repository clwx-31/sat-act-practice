"use strict";

module.exports = {
  id: "act-reading-p047",
  type: "social-science",
  title: "Every Two Hundred Metres",
  intro: "This passage is adapted from an article on the planning of public transport.",
  content: `The most consequential decision in the design of a bus route is one that almost nobody
outside the industry knows is a decision: how far apart the stops are. In much of North
America the spacing on an ordinary urban route is about two hundred metres, which works out
at five stops a kilometre. In the Netherlands and much of Germany it is nearer four hundred.
The vehicles are the same, the streets are similar, and the difference in the resulting
service is enormous.

The argument for close spacing is obvious and it is not wrong. A stop is where the service
touches a person's life, and every additional stop shortens somebody's walk. For a passenger
with a stick, a pushchair, or a bad hip, three hundred metres is not a detail; it can be the
difference between using a bus and not using one. Removing stops is the single most reliably
unpopular thing a transit agency can propose, and the people who object at the meeting are
typically the people with the strongest claim.

The argument against is arithmetic and it is difficult to make in a room. Each stop costs
the vehicle roughly twenty seconds — decelerating, opening, boarding, closing, pulling back
into traffic — and it costs that whether or not anybody is waiting, because the driver must
approach as though somebody is. Over a twelve-kilometre route, going from five stops per
kilometre to three saves about eight minutes each way. Eight minutes is not a convenience.
On a route where buses run every twelve minutes, eight minutes of round-trip saving on each
of several vehicles is often enough to add a bus to the rotation without buying one, which
takes the headway from twelve minutes to nine.

That is the trade the argument is actually about, and it is systematically misdescribed at
public meetings, where it appears as a choice between a nearer stop and a more distant one.
The real choice is between a nearer stop and a more frequent bus, and the two are not
equally visible. The stop is a physical object outside a specific person's house. The
frequency improvement is distributed across everybody who uses the route, including people
who do not use it yet because it is not frequent enough, and none of them is at the meeting.

Where agencies have made the change and measured it, ridership has risen, including among
the riders whose walk got longer. That is the finding that ought to settle the design
question and does not settle the political one, because a person whose walk is now four
hundred metres does not experience an average. Several agencies have concluded that the
consolidation is worth doing and that doing it without targeted mitigation is a mistake:
keeping close spacing where a route passes a hospital, a clinic, or sheltered housing, and
accepting the seconds that costs.

There is a further complication that the arithmetic hides. Consolidation assumes the
remaining stops are usable, and a stop that is a shelter, a bench, a light, and a real-time
sign is a different object from a pole in the grass. Agencies that removed stops and spent
nothing on the survivors got the ridership gain and a well-earned reputation for having
taken something away. Agencies that rebuilt the remaining stops got the gain and kept the
argument winnable next time.

None of this makes two hundred metres wrong everywhere. It makes it a number that was
inherited rather than chosen, in a great many cities, from streetcar systems that stopped at
every corner because a streetcar could not pull out of traffic and therefore lost nothing by
stopping. The vehicles changed. The spacing did not.`,
  questions: [
    {
      subskill: "main idea",
      family: "central-claim",
      difficulty: "Medium",
      stem: "The passage is chiefly concerned with:",
      key: "a design trade-off that public debate misrepresents.",
      wrong: [
        ["why buses run less frequently than they used to.", "Declining frequency is not described anywhere in the passage."],
        ["how European transit agencies outperform American ones.", "The spacing comparison is an illustration rather than the subject."],
        ["why passengers with limited mobility avoid buses.", "Their needs are one side of the trade-off, not the passage's topic."],
      ],
      why: "The passage says the trade \"is systematically misdescribed at public meetings,\" where it looks like a choice between two stops rather than between a stop and a more frequent bus.",
      steps: [
        "Find the paragraph that names what the argument is actually about.",
        "Check that the option covers both the arithmetic and the meeting.",
      ],
      hint: "The fourth paragraph corrects how the choice is presented.",
    },
    {
      subskill: "locate detail",
      family: "stated-detail",
      difficulty: "Easy",
      stem: "According to the passage, each stop costs a bus roughly:",
      key: "twenty seconds of travel time.",
      wrong: [
        ["eight minutes of travel time.", "Eight minutes is the saving across a whole twelve-kilometre route."],
        ["three minutes of travel time.", "This figure does not appear anywhere in the passage."],
        ["twelve seconds of travel time.", "Twelve is the headway in minutes, not a per-stop cost."],
      ],
      why: "The passage says \"each stop costs the vehicle roughly twenty seconds — decelerating, opening, boarding, closing, pulling back into traffic.\"",
      steps: [
        "Find the sentence giving the per-stop cost.",
        "Distinguish it from the route-level saving given next.",
      ],
      hint: "The figure is followed by a list of what it covers.",
    },
    {
      subskill: "cause and effect",
      family: "cause-of-a-cost",
      difficulty: "Easy",
      stem: "The passage says a stop costs the vehicle time even when nobody is waiting because the driver must:",
      key: "approach as though someone were there.",
      wrong: [
        ["open the doors at every scheduled stop.", "The cost is attributed to the approach, not to a rule about doors."],
        ["wait a fixed interval to stay on schedule.", "Schedule holding is not mentioned in the passage."],
        ["report each stop to a central controller.", "No reporting requirement is described."],
      ],
      why: "The passage says the cost is incurred \"whether or not anybody is waiting, because the driver must approach as though somebody is.\"",
      steps: [
        "Locate the clause beginning with *because*.",
        "Note that it describes how the driver must drive.",
      ],
      hint: "The reason concerns the approach, not the stop itself.",
    },
    {
      subskill: "meaning in context",
      family: "vocabulary-in-context",
      difficulty: "Easy",
      stem: "In saying eight minutes \"is not a convenience,\" the author means that the saving:",
      key: "is large enough to change the service.",
      wrong: [
        ["is too small for passengers to notice.", "The passage treats it as substantial, not negligible."],
        ["comes at the expense of passenger comfort.", "Comfort is not raised in the paragraph."],
        ["applies only to the longest routes.", "The example is a route of twelve kilometres, not an unusual one."],
      ],
      why: "The next sentence says the saving is \"often enough to add a bus to the rotation without buying one,\" taking the headway from twelve minutes to nine.",
      steps: [
        "Read the sentence that follows the remark.",
        "Note what the saving is said to make possible.",
      ],
      hint: "The next sentence converts minutes into a bus.",
    },
    {
      subskill: "comparison",
      family: "contrast-of-effects",
      difficulty: "Medium",
      stem: "The passage contrasts the two sides of the trade-off by noting that a stop is visible to a specific household while frequency is:",
      key: "spread across riders including future ones.",
      wrong: [
        ["measured only over long periods of time.", "The passage does not describe frequency gains as slow to appear."],
        ["controlled by a separate part of the agency.", "No division of responsibility inside the agency is described."],
        ["valued mainly by passengers without cars.", "The passage does not restrict the benefit to any group of riders."],
      ],
      why: "The passage says the frequency improvement \"is distributed across everybody who uses the route, including people who do not use it yet because it is not frequent enough, and none of them is at the meeting.\"",
      steps: [
        "Find the description of who benefits from frequency.",
        "Note the group the passage says is absent from the room.",
      ],
      hint: "One benefit has an address and the other does not.",
    },
    {
      subskill: "logical inference",
      family: "supported-inference",
      difficulty: "Medium",
      stem: "The passage implies that opposition at public meetings is:",
      key: "predictable given who is able to attend.",
      wrong: [
        ["driven by people who rarely use the service.", "The objectors are described as having the strongest claim."],
        ["based on a misunderstanding of the arithmetic.", "The passage says the trade is misdescribed to them, not by them."],
        ["weaker where agencies rebuild the remaining stops.", "Rebuilding is said to keep the argument winnable next time, not to remove objection."],
      ],
      why: "The passage says objectors are \"typically the people with the strongest claim,\" while the beneficiaries of frequency include people who \"do not use it yet\" and are not present.",
      steps: [
        "Note who the passage says objects.",
        "Note who it says is absent.",
      ],
      hint: "One side of the trade has nobody in the room.",
    },
    {
      subskill: "function",
      family: "function-of-a-concession",
      difficulty: "Medium",
      stem: "The recommendation to keep close spacing near clinics and sheltered housing functions in the passage as:",
      key: "a limit agencies place on their own reform.",
      wrong: [
        ["evidence that consolidation reduces ridership.", "The passage reports ridership rising after consolidation."],
        ["an argument for abandoning consolidation entirely.", "The agencies described conclude the change is worth doing."],
        ["a way of shortening the route's total travel time.", "Keeping stops costs time, which the passage explicitly accepts."],
      ],
      why: "The passage says several agencies concluded consolidation is worth doing \"and that doing it without targeted mitigation is a mistake,\" keeping close spacing at certain sites \"and accepting the seconds that costs.\"",
      steps: [
        "Note what the agencies still endorse.",
        "Note the exception they carve out and what it costs.",
      ],
      hint: "The measure is presented as an exception, not a reversal.",
    },
    {
      subskill: "claims and evidence",
      family: "claim-and-support",
      difficulty: "Hard",
      stem: "Which finding best supports the claim that consolidation serves even the riders it inconveniences?",
      key: "Ridership rose among those whose walks got longer.",
      wrong: [
        ["Headway fell from twelve minutes to nine minutes.", "A frequency gain does not show what the affected riders did."],
        ["Objectors at meetings have the strongest claim.", "This describes the politics rather than the outcome."],
        ["Dutch and German routes use wider stop spacing.", "International comparison does not report any rider's response."],
      ],
      why: "The passage says that where agencies measured the change, \"ridership has risen, including among the riders whose walk got longer.\"",
      steps: [
        "Identify the group the claim concerns.",
        "Look for a measurement taken on exactly that group.",
        "Reject facts about service levels or about other countries.",
      ],
      hint: "The support has to be about the people who lost a stop.",
      trap: "Choosing the frequency gain, which is the mechanism rather than the evidence.",
    },
    {
      subskill: "reasoning",
      family: "evaluating-a-position",
      difficulty: "Hard",
      stem: "The passage grants that the ridership finding cannot settle the political question because:",
      key: "no individual experiences an average.",
      wrong: [
        ["the measurements have been taken in too few cities.", "The passage does not question the extent of the evidence."],
        ["agencies cannot afford to rebuild the remaining stops.", "Cost of rebuilding is not raised as an obstacle."],
        ["riders do not believe the figures agencies publish.", "No distrust of the data is described."],
      ],
      why: "The passage says the finding \"ought to settle the design question and does not settle the political one, because a person whose walk is now four hundred metres does not experience an average.\"",
      steps: [
        "Find the sentence separating the design question from the political one.",
        "Read the reason given after *because*.",
        "Reject options that dispute the evidence rather than its reach.",
      ],
      hint: "The reason concerns what an individual actually feels.",
      trap: "Treating a limit on what evidence can settle as doubt about the evidence.",
    },
    {
      subskill: "strengthen or weaken",
      family: "strengthening-a-position",
      difficulty: "Hard",
      stem: "Which finding would most strengthen the passage's advice to rebuild the surviving stops?",
      key: "Consolidations with shelter upgrades faced less opposition later.",
      wrong: [
        ["Shelters reduce the time passengers spend boarding.", "Faster boarding would help the arithmetic, not the argument about trust."],
        ["Most removed stops served fewer than ten riders a day.", "Low usage supports removal generally rather than the rebuilding advice."],
        ["Rebuilt stops are more expensive to maintain over time.", "Higher costs would count against the recommendation."],
      ],
      why: "The passage says agencies that rebuilt the survivors \"got the gain and kept the argument winnable next time,\" so evidence of reduced later opposition would confirm the stated benefit.",
      steps: [
        "State the benefit the passage claims for rebuilding.",
        "Look for evidence bearing on that benefit specifically.",
        "Reject findings about speed or cost rather than about future support.",
      ],
      hint: "The claimed benefit is political, not operational.",
      trap: "Choosing an operational advantage when the claim concerns the next round of consultation.",
    },
    {
      subskill: "author's purpose",
      family: "purpose-of-a-paragraph",
      difficulty: "Medium",
      stem: "The author's purpose in the final paragraph is to:",
      key: "show that the spacing was inherited rather than designed.",
      wrong: [
        ["argue that two hundred metres is always too close.", "The paragraph opens by denying that it is wrong everywhere."],
        ["explain why streetcars were replaced with buses.", "The replacement itself is not accounted for in the passage."],
        ["propose that streetcar routes be restored in cities.", "No restoration of streetcars is suggested."],
      ],
      why: "The paragraph says the spacing is \"a number that was inherited rather than chosen\" from streetcar systems that lost nothing by stopping, and ends: \"the vehicles changed. The spacing did not.\"",
      steps: [
        "Note the concession the paragraph opens with.",
        "Read the closing two sentences.",
      ],
      hint: "The last two sentences state the point in eight words.",
    },
  ],
};
