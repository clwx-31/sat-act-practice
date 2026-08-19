"use strict";

module.exports = {
  id: "act-reading-p036",
  type: "social-science",
  title: "Small Loans",
  intro: "Passage A is adapted from an account of microcredit written by a development practitioner. Passage B is adapted from a review of the evidence by an economist.",
  content: `PASSAGE A

The formal banking system was built to lend against collateral, and a woman who owns a
sewing machine, a stall, and no land has none that a bank recognises. For most of the
twentieth century this was treated as a fact about her rather than about the bank. The
consequence was that credit at reasonable rates stopped at a particular income and below it
the only lender was a local moneylender charging by the day.

Microcredit began from the observation that the missing thing was not creditworthiness but
a mechanism. Grameen Bank's method, refined through the 1980s, replaced collateral with a
group: five borrowers who receive loans in sequence, and whose access to the next loan
depends on the repayments of the others. The group screens its own members, because nobody
wants to be tied to somebody who will not repay, and monitors them afterwards, because
everybody's interest depends on it. The information a bank could not obtain about a borrower
is already held by the four people who live on her street.

The repayment rates that followed were the finding that changed the field. They ran above
ninety-five per cent, sustained over years, in populations that formal lenders had written
off as untouchable. That number is not in dispute and it did something no argument could
have done: it demonstrated that the poor were not a bad credit risk, and that the problem
had been in the instrument. By 2010 well over a hundred million households held such a loan.

PASSAGE B

Everything in the account above is true, and the conclusion usually drawn from it is not.

The repayment rates are real. What they measure is whether a loan is repaid, which is a
question about the lending mechanism, not about what the loan did for the borrower. Those
are different questions and for twenty years the first was allowed to answer the second.

The second question was finally addressed properly by randomised trials, run in six
countries and published together in 2015. Access to microcredit was expanded in randomly
chosen areas and not in others, and households were followed. The results were remarkably
consistent. Businesses were started, and business investment rose. Household income did not
rise detectably. Consumption did not rise. Children's schooling did not improve, women's
decision-making within the household did not shift measurably, and none of the effects grew
over the following three years.

The trials also found no evidence for the harms the strongest critics had alleged. Borrowers
were not driven into spirals of debt at any scale that showed up in the data. What the
studies describe is neither a transformation nor a catastrophe. It is a financial product
that works as a financial product: it lets a household move money across time, which is
genuinely useful, and which is not the same thing as lifting anybody out of poverty.

The reason this matters is that the transformative claim crowded out the modest one. Two
decades of attention and capital went to credit rather than to the interventions with larger
measured effects on the same outcomes — cash transfers, deworming, asset grants to the very
poorest — partly because those look like charity and credit looked like enterprise. If the
field had said from the beginning that it was building useful financial infrastructure for
people the banks would not serve, it would have been telling the truth and it would have
been a considerable achievement. It said something larger, and the correction has cost the
smaller claim some of the credit it deserves.`,
  questions: [
    {
      subskill: "main idea",
      family: "central-claim",
      difficulty: "Medium",
      stem: "The main point of Passage A is that microcredit succeeded by:",
      key: "replacing collateral with a group's own knowledge.",
      wrong: [
        ["lending at rates below those of local moneylenders.", "Rates are mentioned only to describe what came before microcredit."],
        ["proving that poor households could repay large loans.", "The loans are described as small; the point concerns the mechanism."],
        ["persuading formal banks to change their lending rules.", "Passage A does not claim that established banks altered their practice."],
      ],
      why: "Passage A says the method \"replaced collateral with a group\" whose members screen and monitor one another, since \"the information a bank could not obtain about a borrower is already held by the four people who live on her street.\"",
      steps: [
        "Find the description of the Grameen method.",
        "Note what the group is said to supply in place of collateral.",
      ],
      hint: "The second paragraph explains what the group does that a bank could not.",
    },
    {
      subskill: "locate detail",
      family: "stated-detail",
      difficulty: "Easy",
      stem: "According to Passage A, a borrower's access to her next loan depends on:",
      key: "whether the others in her group have repaid.",
      wrong: [
        ["the value of the equipment she already owns.", "Owning a sewing machine is given as collateral a bank will not accept."],
        ["how long she has held an account at the bank.", "No account history requirement is described in the passage."],
        ["the income her business has produced that year.", "Business income is discussed in Passage B, not as a lending condition."],
      ],
      why: "Passage A says the group consists of \"five borrowers who receive loans in sequence, and whose access to the next loan depends on the repayments of the others.\"",
      steps: [
        "Find the sentence describing the group of five.",
        "Take the condition it attaches to the next loan.",
      ],
      hint: "The condition involves other people.",
    },
    {
      subskill: "cause and effect",
      family: "cause-of-a-practice",
      difficulty: "Easy",
      stem: "Passage A says a group screens its own members because each member:",
      key: "does not want to be tied to a defaulter.",
      wrong: [
        ["is paid a fee by the bank for doing so.", "No payment for screening is mentioned in the passage."],
        ["must guarantee the loans in writing.", "The mechanism described is sequencing, not written guarantees."],
        ["was chosen by the bank's local officer.", "The passage says the group screens itself, not that a bank selects it."],
      ],
      why: "Passage A says the group screens itself \"because nobody wants to be tied to somebody who will not repay,\" and monitors afterwards \"because everybody's interest depends on it.\"",
      steps: [
        "Locate the sentence about screening.",
        "Read the clause introduced by *because*.",
      ],
      hint: "The reason is a shared exposure to risk.",
    },
    {
      subskill: "meaning in context",
      family: "vocabulary-in-context",
      difficulty: "Easy",
      stem: "As it is used in Passage B, the phrase \"move money across time\" describes a household's ability to:",
      key: "spend now and repay from later income.",
      wrong: [
        ["send funds to relatives in another region.", "Transfers between places are not what the phrase describes."],
        ["convert business assets into cash quickly.", "Selling assets is not among the uses the passage names."],
        ["protect savings from losing value to inflation.", "Inflation is not mentioned anywhere in either passage."],
      ],
      why: "Passage B calls microcredit \"a financial product that works as a financial product: it lets a household move money across time, which is genuinely useful,\" while denying that it raises income.",
      steps: [
        "Read the sentence in which the phrase appears.",
        "Note what a loan does for a household that has no income change.",
      ],
      hint: "The phrase describes what borrowing is, stated plainly.",
    },
    {
      subskill: "comparison",
      family: "contrast-of-questions",
      difficulty: "Medium",
      stem: "Passage B distinguishes two questions that it says were run together, namely whether a loan:",
      key: "is repaid and whether it helps the borrower.",
      wrong: [
        ["is large enough and whether it is affordable.", "Loan size and interest are not the distinction Passage B draws."],
        ["reaches women and whether it reaches the poorest.", "Targeting is not among the questions Passage B separates."],
        ["is offered by a bank or by a moneylender.", "The identity of the lender belongs to Passage A's background."],
      ],
      why: "Passage B says repayment rates measure \"whether a loan is repaid, which is a question about the lending mechanism, not about what the loan did for the borrower,\" and that the first was allowed to answer the second.",
      steps: [
        "Find the sentence naming what repayment rates measure.",
        "Take the second question it says they do not answer.",
      ],
      hint: "One question is about the lender and one about the household.",
    },
    {
      subskill: "function",
      family: "function-of-a-concession",
      difficulty: "Medium",
      stem: "Passage B's report that the trials found no evidence of debt spirals serves mainly to:",
      key: "reject the opposing exaggeration as well.",
      wrong: [
        ["show that borrowers repaid at very high rates.", "Repayment rates come from Passage A and are already granted."],
        ["explain why the trials were run in six countries.", "The number of countries concerns the design, not this finding."],
        ["argue that microcredit should be expanded further.", "Passage B argues that attention went to credit at other things' expense."],
      ],
      why: "Passage B says the trials \"found no evidence for the harms the strongest critics had alleged\" and concludes that what the studies describe is \"neither a transformation nor a catastrophe.\"",
      steps: [
        "Note whose claim this finding contradicts.",
        "Read the sentence that follows, which places the result between two positions.",
      ],
      hint: "The paragraph is aimed at critics, not at Passage A.",
    },
    {
      subskill: "compare perspectives",
      family: "comparing-two-texts",
      difficulty: "Hard",
      stem: "Passage B's disagreement with Passage A is best described as a claim that Passage A:",
      key: "draws a conclusion its own evidence cannot reach.",
      wrong: [
        ["reports repayment figures that were never verified.", "Passage B says the repayment rates are real."],
        ["understates the harm that lending has caused borrowers.", "Passage B reports no evidence of such harm at scale."],
        ["misdescribes how the group lending mechanism works.", "Passage B says everything in the account above is true."],
      ],
      why: "Passage B opens \"everything in the account above is true, and the conclusion usually drawn from it is not,\" then shows that repayment measures the mechanism rather than the borrower's outcome.",
      steps: [
        "Read Passage B's first sentence.",
        "Identify which part of Passage A it accepts and which it refuses.",
        "Reject options attributing a factual error to Passage A.",
      ],
      hint: "The objection concerns an inference, not a fact.",
      trap: "Assuming a rebuttal must dispute the first passage's data.",
    },
    {
      subskill: "synthesize information",
      family: "combining-two-texts",
      difficulty: "Hard",
      stem: "Both passages would agree that microcredit:",
      key: "reached households the formal system had excluded.",
      wrong: [
        ["raised the incomes of the households that borrowed.", "Passage B reports no detectable rise in household income."],
        ["deserved the share of attention that it received.", "Passage B argues the attention crowded out better interventions."],
        ["works only where borrowers are organised in groups.", "Passage B does not tie its assessment to the group mechanism."],
      ],
      why: "Passage A describes credit reaching people banks had \"written off as untouchable,\" and Passage B calls the honest version of the claim \"building useful financial infrastructure for people the banks would not serve.\"",
      steps: [
        "Find what Passage B says the field could have claimed truthfully.",
        "Match that against Passage A's account of who was reached.",
        "Discard claims one passage explicitly denies.",
      ],
      hint: "Passage B's concession is stated in its final paragraph.",
      trap: "Assuming the sceptical passage grants nothing.",
    },
    {
      subskill: "claims and evidence",
      family: "claim-and-support",
      difficulty: "Hard",
      stem: "Which feature of the 2015 trials makes them evidence about effects rather than about repayment?",
      key: "Areas were chosen at random and households followed.",
      wrong: [
        ["The trials were carried out in six different countries.", "Breadth shows generality, not that outcomes rather than repayment were measured."],
        ["The results were published together in a single year.", "Joint publication concerns dissemination rather than design."],
        ["Business investment was found to have risen.", "That is one of the findings, not the feature that licenses them."],
      ],
      why: "Passage B says access \"was expanded in randomly chosen areas and not in others, and households were followed,\" which compares households with and without access rather than tracking loans.",
      steps: [
        "Ask what a repayment rate is computed from.",
        "Identify the design feature that creates a comparison group instead.",
        "Reject options describing findings or publication.",
      ],
      hint: "The relevant feature is what the study varied and whom it tracked.",
      trap: "Choosing a result of the trials rather than the property that makes results interpretable.",
    },
    {
      subskill: "strengthen or weaken",
      family: "weakening-a-position",
      difficulty: "Medium",
      stem: "Which finding, if true, would most weaken Passage B's conclusion?",
      key: "Borrowing households showed higher incomes after ten years.",
      wrong: [
        ["Repayment rates stayed above ninety-five per cent throughout.", "Passage B already accepts this and denies that it settles the question."],
        ["More businesses were started in the areas given access.", "Passage B reports exactly this and treats it as compatible with its view."],
        ["Critics of microcredit had overstated the risk of debt.", "Passage B itself reports that the alleged harms did not appear."],
      ],
      why: "Passage B rests on trials showing no effect on income \"over the following three years.\" A measured income gain over a longer horizon would show the null result was a matter of timing.",
      steps: [
        "Note the outcome and the time window Passage B's case rests on.",
        "Look for evidence that contradicts it on that outcome.",
        "Reject findings the passage already reports.",
      ],
      hint: "Passage B specifies how long the households were followed.",
    },
    {
      subskill: "author's purpose",
      family: "purpose-of-a-passage",
      difficulty: "Medium",
      stem: "Passage B closes by saying the correction has cost the smaller claim some credit in order to:",
      key: "defend a modest achievement it thinks was real.",
      wrong: [
        ["blame researchers for publishing the trial results.", "The trials are the evidence Passage B relies on throughout."],
        ["argue that the field should return to its earlier claims.", "The earlier claim is exactly what Passage B calls untrue."],
        ["show that cash transfers have been overvalued too.", "Cash transfers are cited as having larger measured effects."],
      ],
      why: "Passage B says that had the field claimed only to be building financial infrastructure for the unbanked, \"it would have been telling the truth and it would have been a considerable achievement.\"",
      steps: [
        "Identify the two claims the paragraph contrasts.",
        "Note which of them the author says deserved credit.",
      ],
      hint: "The sentence names a claim that would have been both true and impressive.",
    },
  ],
};
