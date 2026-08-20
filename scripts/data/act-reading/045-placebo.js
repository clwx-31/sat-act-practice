"use strict";

module.exports = {
  id: "act-reading-p045",
  type: "natural-science",
  title: "The Other Arm",
  intro: "This passage is adapted from an article on placebo controls in medical research.",
  content: `A trial of a new drug gives one group the drug and another group a tablet with no
active ingredient, and compares them. Everyone knows this. What is less widely understood is
what the second group is for, and the usual explanation — that it measures the placebo
effect — is not right, or at least is not the reason the group exists.

Suppose a hundred people with back pain are given a new tablet and eighty report
improvement after six weeks. That number cannot be interpreted, because several things
produce improvement in six weeks regardless of what anyone takes. Back pain fluctuates, and
people seek treatment at their worst, so the next measurement will usually be better; this
is regression to the mean and it is the largest of the effects involved. People report more
favourably to a doctor who is interested in them. Some conditions simply resolve. A patient
who has entered a trial may also change what they do — sleeping differently, moving more,
paying attention.

The control group is subject to all of those and not to the drug. Subtracting one from the
other leaves the drug's effect. What the placebo group measures is therefore not a
mysterious power of belief but the sum of everything that happens to a person in a trial
who is not receiving the treatment. It is a bookkeeping device, and calling it the placebo
effect has caused a great deal of confusion, including among people who ought to know
better.

That said, something real does sit inside that bundle. It is smaller than popular accounts
suggest and it is not evenly distributed. Trials that measure something a patient reports —
pain, nausea, fatigue, mood — find substantial differences between an inert tablet and no
treatment at all. Trials that measure something an instrument records — tumour size,
cholesterol, bone density, viral load — find almost nothing. A placebo can change how much
a person's knee hurts. It does not change what an X-ray of the knee shows. Any account of
the effect has to explain that asymmetry, and accounts that treat it as a general power of
mind over body do not.

The most surprising recent work involves telling patients the truth. In open-label placebo
trials, participants are informed that they are receiving an inert tablet, are told plainly
that it contains no medicine, and are asked to take it anyway. Improvement in reported
symptoms persists. The effect is smaller than in blinded trials and it is repeatedly
measurable, in irritable bowel syndrome, chronic low back pain, and cancer-related fatigue.
Whatever is happening does not require the patient to be deceived, which removes the main
ethical objection to using it and removes, at the same time, the simplest explanation for
how it works.

Two accounts remain in contention and neither has won. One is expectation: the ritual of
taking something, at a set time, in a defined form, generates a prediction that the body
partly fulfils, and predictions can be generated without belief in the way a person can
flinch at a film. The other is conditioning: a tablet is a stimulus that has been paired with
relief thousands of times over a lifetime, and conditioned responses do not consult
propositions. Both predict the open-label result. They differ in what they say about a
patient taking a first tablet of any kind, and that is where the next experiments are.

The practical upshot is narrower than it sounds. Nobody proposes prescribing sugar pills
instead of medicine. What the work supports is attention to the parts of care that were
treated as decoration — how long an appointment is, whether the clinician sits down, whether
the reason for a treatment is explained. Those are not the placebo effect either. They are
the conditions under which it appears, and they are, unlike most findings in medicine, free.`,
  questions: [
    {
      subskill: "main idea",
      family: "central-claim",
      difficulty: "Medium",
      stem: "The passage is chiefly concerned with:",
      key: "what a control group measures and what it does not.",
      wrong: [
        ["how placebos could replace drugs for some conditions.", "The passage says nobody proposes prescribing sugar pills instead of medicine."],
        ["why patients with back pain improve without treatment.", "Back pain is one example used to explain the general point."],
        ["how open-label trials disproved earlier placebo research.", "Open-label results extend the earlier work rather than overturning it."],
      ],
      why: "The passage opens by asking what the second group is for, calls it \"a bookkeeping device,\" and then examines the real effect inside the bundle and the accounts of it.",
      steps: [
        "Note the question posed in the first paragraph.",
        "Check that the option covers both the correction and the real effect.",
      ],
      hint: "The first paragraph says the usual explanation is not right.",
    },
    {
      subskill: "locate detail",
      family: "stated-detail",
      difficulty: "Easy",
      stem: "According to the passage, the largest of the effects producing improvement without treatment is:",
      key: "regression towards the average value.",
      wrong: [
        ["reporting well to an interested doctor.", "This is listed among the effects but is not identified as the largest."],
        ["conditioning built up over a lifetime.", "Conditioning is one explanation of the placebo effect, not a trial artefact."],
        ["changes in how much a patient moves.", "Behaviour change is listed last among the effects, without any ranking."],
      ],
      why: "The passage says people seek treatment at their worst so the next measurement is usually better, and \"this is regression to the mean and it is the largest of the effects involved.\"",
      steps: [
        "Find the list of things that produce improvement anyway.",
        "Take the one the passage singles out by size.",
      ],
      hint: "One item is explicitly ranked.",
    },
    {
      subskill: "cause and effect",
      family: "cause-of-a-pattern",
      difficulty: "Easy",
      stem: "The passage says placebos produce substantial differences chiefly in trials that measure:",
      key: "symptoms the patient reports.",
      wrong: [
        ["quantities recorded by an instrument.", "The passage says such trials find almost nothing."],
        ["conditions that resolve on their own.", "Spontaneous resolution is a separate trial artefact."],
        ["outcomes assessed after several years.", "No effect of follow-up length is described."],
      ],
      why: "The passage says trials measuring \"pain, nausea, fatigue, mood\" find substantial differences, while those measuring \"tumour size, cholesterol, bone density, viral load\" find almost nothing.",
      steps: [
        "Find the two lists of outcome types.",
        "Match each list with the result reported for it.",
      ],
      hint: "The paragraph contrasts what a person says with what a machine shows.",
    },
    {
      subskill: "meaning in context",
      family: "vocabulary-in-context",
      difficulty: "Easy",
      stem: "The passage calls the control group a \"bookkeeping device\" in order to indicate that it:",
      key: "exists to be subtracted from the other group.",
      wrong: [
        ["records how many patients drop out of a trial.", "Attrition is not discussed anywhere in the passage."],
        ["measures the strength of a patient's belief.", "The passage denies that this is what the group measures."],
        ["keeps the cost of a trial within its budget.", "No financial consideration is raised."],
      ],
      why: "The passage says the control group is subject to everything except the drug, and \"subtracting one from the other leaves the drug's effect.\"",
      steps: [
        "Read the sentences immediately before the phrase.",
        "Note the arithmetic operation they describe.",
      ],
      hint: "The paragraph describes a subtraction.",
    },
    {
      subskill: "logical inference",
      family: "supported-inference",
      difficulty: "Medium",
      stem: "The passage implies that reporting eighty improvements out of a hundred, with no control group, would:",
      key: "leave the drug's contribution unknown.",
      wrong: [
        ["prove that the drug had worked for most patients.", "The passage says the number cannot be interpreted."],
        ["show that the placebo effect is unusually strong.", "Without a comparison, nothing about the placebo can be inferred either."],
        ["indicate that the patients were poorly selected.", "Selection is not raised as a problem in the example."],
      ],
      why: "The passage says the figure \"cannot be interpreted, because several things produce improvement in six weeks regardless of what anyone takes.\"",
      steps: [
        "Note what the passage says about the uncontrolled number.",
        "Ask what would be missing without a comparison group.",
      ],
      hint: "The improvement has several possible sources.",
    },
    {
      subskill: "function",
      family: "function-of-a-contrast",
      difficulty: "Medium",
      stem: "The contrast between a hurting knee and an X-ray of a knee serves mainly to:",
      key: "state the asymmetry an explanation must account for.",
      wrong: [
        ["show that patients often misreport their own pain.", "The passage treats reported pain as a genuine outcome."],
        ["argue that imaging is more reliable than questioning.", "Reliability of methods is not the point being made."],
        ["explain why open-label trials use symptom measures.", "The choice of measures in those trials is not accounted for here."],
      ],
      why: "The passage says \"any account of the effect has to explain that asymmetry, and accounts that treat it as a general power of mind over body do not.\"",
      steps: [
        "Read the sentence that follows the contrast.",
        "Note the requirement it imposes on explanations.",
      ],
      hint: "The contrast is set up as a test.",
    },
    {
      subskill: "claims and evidence",
      family: "claim-and-support",
      difficulty: "Hard",
      stem: "Which finding best supports the claim that the effect does not depend on deception?",
      key: "Symptoms improve when patients are told the tablet is inert.",
      wrong: [
        ["The effect is smaller in open-label than in blinded trials.", "A reduced effect shows blinding matters, not that deception is unnecessary."],
        ["Instrument-measured outcomes show almost no placebo effect.", "The asymmetry concerns which outcomes respond, not whether deception is needed."],
        ["Patients report more favourably to an interested doctor.", "This is one of the trial artefacts, separate from the placebo effect itself."],
      ],
      why: "The passage says open-label participants \"are told plainly that it contains no medicine, and are asked to take it anyway,\" and that improvement persists, so \"whatever is happening does not require the patient to be deceived.\"",
      steps: [
        "State the claim: the effect survives without deception.",
        "Find the design in which deception is absent.",
        "Reject findings about magnitude or about other outcomes.",
      ],
      hint: "The relevant evidence comes from trials where patients know.",
      trap: "Choosing the fact about smaller effects, which concerns size rather than dependence.",
    },
    {
      subskill: "comparison",
      family: "contrast-of-explanations",
      difficulty: "Hard",
      stem: "The two competing accounts described in the passage differ chiefly in whether the response depends on:",
      key: "a prediction formed or a habit built up.",
      wrong: [
        ["a doctor's manner or the tablet's appearance.", "Neither account is framed in terms of the clinician's behaviour."],
        ["the severity of a condition or its duration.", "Severity and duration are not part of either explanation."],
        ["a patient's belief or the truth of what they were told.", "Both accounts are said to survive the open-label result."],
      ],
      why: "The passage sets expectation — a ritual generating \"a prediction that the body partly fulfils\" — against conditioning, in which a tablet \"has been paired with relief thousands of times\" and \"conditioned responses do not consult propositions.\"",
      steps: [
        "Reduce each account to its central mechanism.",
        "Note that both are said to predict the open-label finding.",
        "Choose the option naming the two mechanisms.",
      ],
      hint: "One account is about anticipation and the other about repetition.",
      trap: "Choosing belief, which the passage says neither account requires.",
    },
    {
      subskill: "reasoning",
      family: "evaluating-explanations",
      difficulty: "Hard",
      stem: "The passage indicates that the two accounts could be distinguished by studying patients who:",
      key: "are taking a tablet for the very first time.",
      wrong: [
        ["report symptoms rather than undergo imaging.", "Both accounts apply to reported symptoms alike."],
        ["have been told the tablet contains no medicine.", "Both accounts predict the open-label result."],
        ["improve without receiving any treatment at all.", "That group measures trial artefacts, not either mechanism."],
      ],
      why: "The passage says the accounts \"differ in what they say about a patient taking a first tablet of any kind, and that is where the next experiments are.\"",
      steps: [
        "Find the sentence naming where the accounts diverge.",
        "Note that conditioning requires a history the first tablet lacks.",
        "Reject cases where the passage says both accounts agree.",
      ],
      hint: "One mechanism needs a lifetime of pairing behind it.",
      trap: "Choosing the open-label case, which the passage says both accounts explain.",
    },
    {
      subskill: "author's purpose",
      family: "purpose-of-a-paragraph",
      difficulty: "Medium",
      stem: "The author's purpose in the final paragraph is to:",
      key: "limit the practical conclusions drawn from the research.",
      wrong: [
        ["propose that inert tablets be prescribed more often.", "The paragraph opens by ruling that out."],
        ["argue that appointment length should be regulated.", "No rule about consultations is proposed."],
        ["show that the placebo effect is stronger than believed.", "The passage says it is smaller than popular accounts suggest."],
      ],
      why: "The paragraph says \"the practical upshot is narrower than it sounds,\" rules out prescribing sugar pills, and says the elements of care it supports \"are not the placebo effect either.\"",
      steps: [
        "Read the paragraph's first sentence.",
        "Note the two things it denies before naming what the work supports.",
      ],
      hint: "The paragraph is mostly about what does not follow.",
    },
    {
      subskill: "interpret detail",
      family: "detail-interpretation",
      difficulty: "Easy",
      stem: "The comparison with flinching at a film is offered to show that a prediction can be:",
      key: "produced without being believed.",
      wrong: [
        ["formed only after repeated exposure.", "Repetition belongs to the conditioning account, not this comparison."],
        ["stronger than the sensation it anticipates.", "No comparison of magnitudes is being made."],
        ["measured by an instrument rather than reported.", "The comparison concerns belief, not measurement."],
      ],
      why: "The passage says \"predictions can be generated without belief in the way a person can flinch at a film,\" where the viewer knows there is no danger.",
      steps: [
        "Read the clause the comparison is attached to.",
        "Note what a person watching a film knows and still does.",
      ],
      hint: "Nobody at a film thinks they are in danger.",
    },
  ],
};
