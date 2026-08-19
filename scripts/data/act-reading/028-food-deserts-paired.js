"use strict";

module.exports = {
  id: "act-reading-p028",
  type: "social-science",
  title: "The Nearest Shop",
  intro: "Passage A is adapted from a report on food access in low-income neighbourhoods. Passage B is adapted from an economist's assessment of that literature.",
  content: `PASSAGE A

There are neighbourhoods in this country where the nearest full grocery is four kilometres
away and the nearest place to buy food is a filling station. The term for such a place is a
food desert, and about twelve per cent of the population lives in one by the usual federal
definition, which combines low household income with distance to a supermarket.

The mechanism is not complicated. Fresh produce is heavy, perishable, and awkward to carry.
A household without a car buys what fits in two hands on a bus, and buys it more often,
which means each trip costs an hour that a working parent does not have. What is stocked
nearby is what keeps: tinned goods, packaged snacks, sweetened drinks. The corner shop is
not conspiring against anyone. It carries what will not spoil before it sells, and produce
spoils, and the margins on a bunch of chard cannot cover the loss.

The health arithmetic follows. Residents of these areas have measurably worse diets and
higher rates of diabetes and cardiovascular disease than residents of otherwise similar
areas with a nearby supermarket. The association survives the usual statistical controls.
And the remedy is unusually concrete for a public health problem: change what is within
reach. Tax incentives for grocers, grants for corner shops to install refrigeration, and
support for produce markets have all been tried, and several cities have documented
improvements in what is available on the shelf.

The objection that people would not buy produce even if it were there deserves an answer
rather than a shrug. It is not what shoppers say, and it is not what happens at the produce
markets that some cities have opened on vacant lots, where a stall selling nothing but
vegetables two mornings a week runs out of stock by ten. The demand is present. What is
absent is a place to meet it that can survive the economics of spoilage on a street where
the customers walk.

PASSAGE B

I have worked on this literature for a decade and I have come to a conclusion I did not
want. Access matters much less than the access story requires.

The strongest evidence comes from natural experiments. When a supermarket opens in a
neighbourhood that had none, we can watch what households buy before and after, using the
same scanner data that tracks purchases nationally. This has now been done many times. What
happens is that people shop closer to home, which is a real convenience gain worth having.
What barely happens is a change in the nutritional content of what they buy. The effect on
diet quality in the largest study of this kind was close to nothing, and it did not grow
over the following two years.

The reason is visible in the same data. When households move from a low-access to a
high-access neighbourhood, their purchases do not converge on their new neighbours'. They
carry their old basket with them. Differences in what people buy track income and education
far more closely than they track distance to a shop, and they persist when distance is held
constant. The gap between rich and poor households in produce purchasing is about as large
inside a single supermarket as it is between neighbourhoods.

I want to be careful about what this does and does not show. It does not show that the
neighbourhoods are fine; they are not. It does not show that opening a shop is worthless. It
shows that the causal arrow the policy assumed runs the other way round more often than not
— that shops follow demand rather than creating it, and that a programme built on the
assumption that proximity produces diet will keep producing disappointing evaluations, as it
has for fifteen years, while the things that would actually move the number, which are
prices and incomes, go unaddressed because they are expensive and unglamorous.`,
  questions: [
    {
      subskill: "main idea",
      family: "central-claim",
      difficulty: "Medium",
      stem: "The main point of Passage A is that poor diets in some neighbourhoods:",
      key: "follow from what can practically be bought nearby.",
      wrong: [
        ["result from residents' preferences for packaged food.", "Passage A attributes stocking decisions to spoilage, not to what shoppers prefer."],
        ["are caused by corner shops overcharging their customers.", "Passage A says explicitly that the corner shop is not conspiring against anyone."],
        ["have proved impossible for city governments to address.", "Passage A reports documented improvements in what is available on the shelf."],
      ],
      why: "Passage A traces the problem to weight, perishability, transport, and shelf life, and concludes that the remedy is to \"change what is within reach.\"",
      steps: [
        "Find the paragraph that lays out the mechanism.",
        "Check that the option matches the remedy the passage proposes.",
      ],
      hint: "The second paragraph explains what a shop can afford to stock.",
    },
    {
      subskill: "locate detail",
      family: "stated-detail",
      difficulty: "Easy",
      stem: "According to Passage A, the federal definition of a food desert combines distance to a supermarket with:",
      key: "low household income in the area.",
      wrong: [
        ["the rate of car ownership locally.", "Cars appear in the mechanism but not in the definition Passage A gives."],
        ["local rates of diabetes and heart disease.", "Health outcomes are consequences discussed later, not part of the definition."],
        ["the number of corner shops nearby.", "Corner shops are described but are not a criterion in the definition."],
      ],
      why: "Passage A says the usual federal definition \"combines low household income with distance to a supermarket.\"",
      steps: [
        "Find the sentence that gives the definition.",
        "Take the second element it names.",
      ],
      hint: "The definition has exactly two parts.",
    },
    {
      subskill: "cause and effect",
      family: "cause-of-an-outcome",
      difficulty: "Easy",
      stem: "Passage A says corner shops stock little fresh produce mainly because produce:",
      key: "spoils before enough of it is sold.",
      wrong: [
        ["costs more than customers can afford.", "Price is not given as the shop's reason for its stocking decisions."],
        ["takes up more shelf space than tins.", "Space is not among the considerations Passage A describes."],
        ["must be delivered more often by lorry.", "Delivery frequency is not mentioned anywhere in Passage A."],
      ],
      why: "Passage A says the shop \"carries what will not spoil before it sells, and produce spoils, and the margins on a bunch of chard cannot cover the loss.\"",
      steps: [
        "Locate the sentence about what the corner shop carries.",
        "Read the two clauses that follow it.",
      ],
      hint: "The sentence names the loss the shop cannot absorb.",
    },
    {
      subskill: "meaning in context",
      family: "vocabulary-in-context",
      difficulty: "Easy",
      stem: "As it is used in Passage B, the phrase \"natural experiments\" refers to studies that:",
      key: "observe a real change as it happens.",
      wrong: [
        ["assign households to different neighbourhoods.", "Assignment by a researcher is what a natural experiment does not involve."],
        ["compare diets in rural and urban settings.", "No rural comparison is described anywhere in Passage B."],
        ["measure nutrients in food sold at markets.", "The data described track purchases, not the composition of foods."],
      ],
      why: "Passage B explains the design in place: \"when a supermarket opens in a neighbourhood that had none, we can watch what households buy before and after.\"",
      steps: [
        "Read the sentence that follows the phrase.",
        "Note that the change is one the researchers did not create.",
      ],
      hint: "The next sentence describes the design itself.",
    },
    {
      subskill: "logical inference",
      family: "supported-inference",
      difficulty: "Medium",
      stem: "Passage B's finding about households that move implies that diet is shaped mainly by:",
      key: "something the household carries with it.",
      wrong: [
        ["the length of time a family has lived somewhere.", "Duration of residence is not examined in the evidence described."],
        ["the range of goods a new supermarket stocks.", "Stock is Passage A's concern; Passage B finds it makes little difference."],
        ["the cost of transport to the nearest shop.", "Transport is exactly the factor the moving evidence controls away."],
      ],
      why: "Passage B says movers' purchases \"do not converge on their new neighbours'. They carry their old basket with them,\" and that differences track income and education rather than distance.",
      steps: [
        "Note what changes and what does not when a household moves.",
        "Identify which factor travelled with the household.",
      ],
      hint: "The neighbourhood changed and the basket did not.",
    },
    {
      subskill: "compare perspectives",
      family: "comparing-two-texts",
      difficulty: "Hard",
      stem: "The two passages disagree chiefly about whether:",
      key: "proximity to a shop causes what a household eats.",
      wrong: [
        ["low-income neighbourhoods are worse off than others.", "Passage B states directly that the neighbourhoods are not fine."],
        ["households without cars find shopping more difficult.", "Passage B grants that a nearer shop is a real convenience gain."],
        ["diabetes rates are higher in low-access neighbourhoods.", "Passage B disputes the cause of the association, not the association."],
      ],
      why: "Passage A treats reach as the mechanism and proposes changing it; Passage B says \"the causal arrow the policy assumed runs the other way round more often than not — that shops follow demand rather than creating it.\"",
      steps: [
        "State what Passage A says proximity does.",
        "Find the sentence in Passage B that reverses that relation.",
        "Reject options where Passage B agrees with Passage A.",
      ],
      hint: "Both accept the correlation; they differ on what produces it.",
      trap: "Treating a dispute about causation as a dispute about the facts described.",
    },
    {
      subskill: "synthesize information",
      family: "combining-two-texts",
      difficulty: "Hard",
      stem: "Both passages would accept that opening a supermarket in an underserved area:",
      key: "makes shopping easier for people who live there.",
      wrong: [
        ["measurably improves the diets of nearby residents.", "Passage B reports the effect on diet quality as close to nothing."],
        ["is the most effective use of public health funding.", "Passage B ranks prices and incomes above it as levers."],
        ["will fail unless corner shops add refrigeration too.", "Neither passage makes refrigeration a condition of success."],
      ],
      why: "Passage A treats access as the goal; Passage B says \"people shop closer to home, which is a real convenience gain worth having,\" while denying the dietary effect.",
      steps: [
        "List what Passage B concedes about new shops.",
        "Check that Passage A also asserts it.",
        "Discard claims that Passage B's evidence contradicts.",
      ],
      hint: "Passage B separates convenience from nutrition.",
      trap: "Assuming the sceptical passage concedes nothing at all.",
    },
    {
      subskill: "claims and evidence",
      family: "claim-and-support",
      difficulty: "Hard",
      stem: "Which evidence in Passage B most directly supports its claim that distance is not the operative factor?",
      key: "Rich and poor differ as much inside one supermarket as between areas.",
      wrong: [
        ["Households shop closer to home once a supermarket opens.", "This shows the shop is used, which both passages already accept."],
        ["The largest study found no growth in the effect over two years.", "Duration strengthens the null result without isolating distance itself."],
        ["Twelve per cent of the population lives in a food desert.", "The prevalence figure comes from Passage A and bears on scale, not cause."],
      ],
      why: "Passage B says \"the gap between rich and poor households in produce purchasing is about as large inside a single supermarket as it is between neighbourhoods\" — a comparison with distance held constant.",
      steps: [
        "Ask which observation removes distance as a possible explanation.",
        "Look for a comparison made among people with the same access.",
        "Reject findings that describe behaviour after access changes.",
      ],
      hint: "The strongest evidence holds the disputed factor fixed.",
      trap: "Choosing the headline null result rather than the comparison that isolates the cause.",
    },
    {
      subskill: "strengthen or weaken",
      family: "weakening-a-position",
      difficulty: "Medium",
      stem: "Which finding, if true, would most weaken Passage B's conclusion?",
      key: "Diets improved sharply where new shops also cut produce prices.",
      wrong: [
        ["Households in food deserts report wanting more fresh produce.", "Stated preferences do not address what purchases actually do."],
        ["Supermarkets opened in such areas often close within a decade.", "Closures would suggest shops follow demand, which supports Passage B."],
        ["Corner shops with refrigeration sell more chilled drinks.", "Sales of drinks say nothing about the nutritional content of baskets."],
      ],
      why: "Passage B concedes that prices and incomes \"would actually move the number.\" A case where proximity plus lower prices changed diets would show access working when the price barrier is removed, narrowing its claim.",
      steps: [
        "State Passage B's conclusion about what access alone accomplishes.",
        "Look for evidence that access produces the effect it denies.",
        "Reject findings that Passage B would welcome.",
      ],
      hint: "The weakening finding must show a dietary change, not an attitude.",
    },
    {
      subskill: "author's purpose",
      family: "purpose-of-a-passage",
      difficulty: "Easy",
      stem: "The author of Passage B opens by saying the conclusion is one they did not want in order to:",
      key: "signal that evidence rather than preference drove it.",
      wrong: [
        ["apologise for contradicting the earlier report.", "No apology follows; the passage argues its case directly."],
        ["show that the research took a decade to complete.", "The decade establishes experience rather than reluctance."],
        ["indicate that the finding remains unpublished.", "The studies described are said to have been done many times."],
      ],
      why: "Passage B begins \"I have worked on this literature for a decade and I have come to a conclusion I did not want,\" then proceeds entirely by citing evidence.",
      steps: [
        "Note what the opening sentence says about the author's own preference.",
        "Ask what admitting reluctance is meant to establish about the argument.",
      ],
      hint: "The remark is about how the conclusion was reached.",
    },
  ],
};
