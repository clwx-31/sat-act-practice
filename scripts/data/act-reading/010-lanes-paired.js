"use strict";

module.exports = {
  id: "act-reading-p010",
  type: "social-science",
  title: "Room to Move",
  intro: "Passage A is adapted from an article on urban highway expansion. Passage B is adapted from a transport economist's response to that article.",
  content: `PASSAGE A

The intuition is almost impossible to argue with. A road is congested because too
many cars are trying to use too little pavement; widen the pavement and the cars
will have room. Every expansion of an urban motorway in the past seventy years has
been sold on that sentence, and it is wrong in a way that took economists thirty
years to state precisely.

In 2011 Gilles Duranton and Matthew Turner assembled data on interstate highways
across American metropolitan areas and compared the growth in lane-kilometres with
the growth in vehicle-kilometres travelled. The two rose together, very nearly
one for one. Add ten per cent to a city's highway capacity and, within about a
decade, that city's residents drive about ten per cent further. Congestion returns
to roughly where it began. The authors called the relationship the fundamental law
of road congestion, and the name has stuck because nobody has yet found a large
city that escapes it.

The mechanism is not mysterious, and it is not that new roads make people restless.
It is that a congested road suppresses trips which people would otherwise take. Some
of that suppressed travel is a driver who takes an earlier train because the motorway
at eight o'clock is intolerable. Some is a driver who currently goes at six in the
morning to beat the queue. Some is a delivery firm routing round the city instead of
through it, and some is a household that would move further out if the commute were
bearable. Widening the road releases all four at once. Within a few years the new
lanes carry traffic that did not exist, and the old lanes carry what they always did.

Houston's Katy Freeway is the case everyone cites. It was rebuilt between 2008 and
2011 into a corridor twenty-six lanes wide at its broadest. By 2014 the morning
commute along it took longer than it had before construction began. The pavement
had grown; the queue had grown to fit.

PASSAGE B

The fundamental law is a real finding and it is routinely misused. Duranton and
Turner measured whole metropolitan areas over decades, and what they established is
that capacity added at that scale is eventually absorbed at that scale. That is a
statement about a city over twenty years. It is not a statement about a particular
bridge in a particular corridor over the next five, and treating it as one is
statistics used as an oracle.

Notice also what the phrase *induced demand* runs together. Some of the new traffic
on a widened road was not on any road before; some of it was on a parallel road and
has moved. Rerouting is not induction, and it is not obvious that it is bad: taking
lorries off residential streets and putting them on a motorway is an outcome many of
the same critics campaign for. The one-for-one figure counts both, because from the
motorway's own counters they look alike.

The deepest confusion is treating the extra travel as a cost. If a road opens and
somebody who was previously shut out of a job across the city now takes it, the
model records that as congestion returning. A person is going somewhere they could
not previously go. That is the benefit, arriving in the form of traffic. Congestion
is a poor measure of a transport system precisely because it is indifferent to
whether the vehicles in the queue are carrying anybody anywhere useful.

None of this rescues the Katy Freeway, which was a bad project. But the argument that
defeats it is not that expansion always fails. It is that road space is given away
free, and anything given away free will be consumed until it is worthless. Charge for
the scarce hours and the queue clears at any width. Refuse to charge, and no width
is sufficient — which is a case against free roads, not against pavement.`,
  questions: [
    {
      subskill: "main idea",
      family: "central-claim",
      difficulty: "Medium",
      stem: "The main point of Passage A is that widening a congested motorway:",
      key: "releases trips the congestion had been holding back.",
      wrong: [
        ["encourages nearby residents to buy additional cars.", "Car ownership is never mentioned; the trips described come from existing travellers."],
        ["shifts congestion onto the smaller roads that feed it.", "Passage A describes traffic returning to the motorway itself, not moving off it."],
        ["fails because construction takes longer than planned.", "The Katy Freeway timeline is given, but delay is not offered as the explanation."],
      ],
      why: "Passage A says the mechanism \"is that a congested road suppresses trips which people would otherwise take,\" and that widening \"releases all four at once,\" so the new lanes carry \"traffic that did not exist.\"",
      steps: [
        "Find the paragraph that states the mechanism rather than the finding.",
        "Check that the option describes where the new traffic comes from.",
      ],
      hint: "One paragraph begins by saying the mechanism is not mysterious.",
    },
    {
      subskill: "locate detail",
      family: "stated-detail",
      difficulty: "Easy",
      stem: "According to Passage A, Duranton and Turner compared growth in lane-kilometres with growth in:",
      key: "vehicle-kilometres travelled in the same areas.",
      wrong: [
        ["average commuting times along each corridor.", "Commute time appears only in the Houston example, not in the study described."],
        ["the number of households owning a vehicle.", "Ownership is not among the quantities the passage says were compared."],
        ["public transport ridership in the same cities.", "Rail is mentioned once as a suppressed alternative, not as a measured quantity."],
      ],
      why: "Passage A says the authors \"compared the growth in lane-kilometres with the growth in vehicle-kilometres travelled\" across American metropolitan areas.",
      steps: [
        "Locate the sentence naming the 2011 study.",
        "Take the second quantity in the comparison it describes.",
      ],
      hint: "The sentence names both quantities in the same clause.",
    },
    {
      subskill: "cause and effect",
      family: "cause-of-an-outcome",
      difficulty: "Easy",
      stem: "Passage B holds that road space is consumed until it is worthless because it:",
      key: "is handed to drivers at no charge.",
      wrong: [
        ["is built more slowly than cities grow.", "Passage B never argues that construction lags behind population growth."],
        ["is planned by engineers, not economists.", "No claim about who designs roads appears anywhere in either passage."],
        ["is measured by the wrong set of counters.", "Miscounting is a complaint about the evidence, not about why space fills up."],
      ],
      why: "Passage B's final paragraph says \"road space is given away free, and anything given away free will be consumed until it is worthless,\" and concludes that the real case is \"against free roads, not against pavement.\"",
      steps: [
        "Read the last paragraph of Passage B.",
        "Separate its diagnosis from the policy it recommends.",
      ],
      hint: "The word the paragraph keeps returning to is *free*.",
    },
    {
      subskill: "meaning in context",
      family: "vocabulary-in-context",
      difficulty: "Easy",
      stem: "As it is used in Passage B, the phrase \"statistics used as an oracle\" most nearly means:",
      key: "a broad finding applied to a case it cannot cover.",
      wrong: [
        ["a result reported without the data behind it.", "Passage B accepts the finding and describes what was measured; disclosure is not the issue."],
        ["a prediction made before any evidence exists.", "The complaint concerns evidence that exists but is being stretched."],
        ["a number invented to support a chosen policy.", "Passage B calls the fundamental law \"a real finding,\" not a fabricated one."],
      ],
      why: "The sentence before it says the law \"is not a statement about a particular bridge in a particular corridor over the next five [years], and treating it as one\" is the error the phrase names.",
      steps: [
        "Read the sentence that leads up to the phrase.",
        "Identify the mismatch it describes between what was measured and what is being claimed.",
      ],
      hint: "The scale of the study and the scale of the question are not the same.",
    },
    {
      subskill: "logical inference",
      family: "supported-inference",
      difficulty: "Medium",
      stem: "Passage B implies that the one-for-one figure would look smaller if researchers could:",
      key: "count rerouted trips separately from newly created ones.",
      wrong: [
        ["extend the study over a longer span of years.", "A longer window is what Passage B says produced the figure in the first place."],
        ["include cities outside the United States as well.", "Geography is never raised as a limit on the study by either passage."],
        ["measure lorries and cars with different counters.", "Lorries appear only as an example of traffic worth rerouting, not as a counting problem."],
      ],
      why: "Passage B says \"some of it was on a parallel road and has moved. Rerouting is not induction,\" and that \"the one-for-one figure counts both, because from the motorway's own counters they look alike.\"",
      steps: [
        "Find what Passage B says the figure lumps together.",
        "Ask what the figure would be if one of those parts were excluded.",
      ],
      hint: "The objection is that two different things are being added up.",
    },
    {
      subskill: "author's purpose",
      family: "purpose-of-a-passage",
      difficulty: "Medium",
      stem: "The author of Passage B mentions the Katy Freeway mainly to:",
      key: "concede a case while rejecting the general rule drawn from it.",
      wrong: [
        ["dispute the commute figures reported in Passage A.", "Passage B calls it \"a bad project\" and challenges no measurement of it."],
        ["show that a corridor can be widened without absorption.", "Houston is offered as a failure, which is the opposite of that claim."],
        ["blame the outcome on the engineers who designed it.", "No designer is named or faulted anywhere in the response."],
      ],
      why: "Passage B says \"none of this rescues the Katy Freeway, which was a bad project,\" then continues that \"the argument that defeats it is not that expansion always fails.\" The example is granted in order to redirect the conclusion.",
      steps: [
        "Note what Passage B grants about Houston.",
        "Read the sentence immediately after the concession.",
      ],
      hint: "A concession is usually followed by the word *but*.",
    },
    {
      subskill: "summary",
      family: "summary-of-a-section",
      difficulty: "Medium",
      stem: "Which of the following best summarises the four examples of suppressed travel in Passage A?",
      key: "Trips already wanted but deterred by the present queue.",
      wrong: [
        ["Trips created by new housing built along the corridor.", "Housing appears as one possible response, not as the source of all four examples."],
        ["Trips made by drivers unfamiliar with alternative routes.", "One example is a firm deliberately routing around the city, which requires knowing routes."],
        ["Trips taken by people who prefer driving to any transit.", "One example is a commuter currently choosing the train, so preference is not fixed."],
      ],
      why: "The paragraph lists a train commuter, a driver leaving at six, a firm routing around the city, and a household that \"would move further out if the commute were bearable\" — in each case the trip is wanted and the congestion is what prevents it.",
      steps: [
        "List what each of the four people is doing now.",
        "Identify the single thing that is stopping each from driving the corridor.",
      ],
      hint: "Ask what all four have in common, not how they differ.",
    },
    {
      subskill: "compare perspectives",
      family: "comparing-two-texts",
      difficulty: "Hard",
      stem: "The two passages disagree most sharply about whether:",
      key: "the additional travel should be counted as a loss.",
      wrong: [
        ["the fundamental law was competently measured at all.", "Passage B calls it \"a real finding\" and disputes its application, not its measurement."],
        ["the Katy Freeway project should have been undertaken.", "Both treat Houston as a failure, so no disagreement arises there."],
        ["congestion returns to a widened road within a decade.", "Passage B does not deny absorption; it questions what absorption means."],
      ],
      why: "Passage A treats returning traffic as the proof that widening fails. Passage B says \"the deepest confusion is treating the extra travel as a cost\" and that a person reaching a job they could not reach before is \"the benefit, arriving in the form of traffic.\"",
      steps: [
        "State what each passage says the return of congestion shows.",
        "Find the point at which the two accounts of the same fact diverge.",
        "Reject options where the passages actually agree.",
      ],
      hint: "Both agree the traffic comes back; ask what each says that means.",
      trap: "Mistaking a dispute about interpretation for a dispute about the data.",
    },
    {
      subskill: "synthesize information",
      family: "combining-two-texts",
      difficulty: "Hard",
      stem: "Both passages would accept which statement about a widened urban motorway?",
      key: "Its new capacity is likely to fill within several years.",
      wrong: [
        ["Its construction leaves surrounding neighbourhoods better off.", "Passage A raises no neighbourhood effects, and Passage B mentions them only for lorries."],
        ["Its benefits are best measured by the time drivers save.", "Passage B argues directly that congestion and travel time are poor measures."],
        ["Its cost is rarely justified by the traffic it will carry.", "Passage B holds that the traffic may itself be the benefit, so it rejects this."],
      ],
      why: "Passage A reports capacity absorbed \"within about a decade\"; Passage B accepts that \"capacity added at that scale is eventually absorbed\" and argues only about what absorption signifies.",
      steps: [
        "List the claims Passage B explicitly grants.",
        "Match those against what Passage A asserts.",
        "Discard options that either passage would contest.",
      ],
      hint: "Look for what Passage B concedes before it objects.",
      trap: "Assuming that two passages in conflict must disagree about everything.",
    },
    {
      subskill: "claims and evidence",
      family: "claim-and-support",
      difficulty: "Hard",
      stem: "Which evidence in Passage A most directly supports its claim that congestion returns to where it began?",
      key: "The Katy Freeway commute grew longer after rebuilding.",
      wrong: [
        ["Highway expansion has been sold the same way for decades.", "This describes how projects are argued for, not what happened after one was built."],
        ["A delivery firm may route around a city rather than through it.", "This illustrates suppressed travel; it does not show that congestion came back."],
        ["Economists took some thirty years to state the point precisely.", "The history of the idea says nothing about whether the idea is correct."],
      ],
      why: "Passage A reports that after the corridor was rebuilt to twenty-six lanes, \"by 2014 the morning commute along it took longer than it had before construction began.\" That is an observed return of congestion rather than a mechanism for it.",
      steps: [
        "Distinguish the claim about outcomes from the account of causes.",
        "Look for a measured result rather than an explanation.",
        "Check that the option involves a road that was actually widened.",
      ],
      hint: "Evidence for a return of congestion has to be about a road after widening.",
      trap: "Selecting the mechanism that explains the claim instead of the observation that supports it.",
    },
  ],
};
