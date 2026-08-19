"use strict";

module.exports = {
  id: "act-reading-p017",
  type: "social-science",
  title: "The Question Behind the Answer",
  intro: "This passage is adapted from an article on the design of opinion surveys.",
  content: `In 1940 the American researcher Hadley Cantril ran a demonstration that has been
repeated in some form ever since. He put two versions of the same question to two matched
samples. One asked whether the United States should *forbid* public speeches against
democracy. The other asked whether the United States should *allow* such speeches. If the
two words are opposites, the answers should mirror each other: whatever share says forbid
should match the share that says do not allow. They did not. About fifty-four per cent
refused to forbid, but only twenty-five per cent were willing to allow. Roughly a fifth of
the sample took what looks like both positions at once, depending on which verb they were
handed.

Nothing was wrong with the sample. The gap is a property of the words. *Forbid* carries a
weight that *allow* does not; a respondent who is uneasy about the speeches may still balk
at forbidding them, because forbidding is an act with a history and allowing feels like
merely standing aside. The effect has been reproduced across languages and decades, on
subjects from firearms to advertising, and it is one of the most reliable findings in the
field.

It is also only one of several such effects, and the others are less dramatic and harder to
avoid. Respondents asked to agree or disagree with a statement agree more often than they
disagree, whatever the statement says; put the same proposition negatively and a portion of
the same people will agree with that too. Questions asked earlier in an interview change the
answers to questions asked later, because the first question tells the respondent what the
survey is about and what sort of person is being described. Offering an explicit "no
opinion" option can move the reported split by twenty points, since a respondent with a weak
view will take the exit if one is provided and will otherwise pick a side.

The natural response is to conclude that surveys measure nothing, and that response is
wrong, though it takes some care to say why. What the wording effects demonstrate is that
many people do not carry a fixed, retrievable answer to the question being asked. They carry
considerations — things they know, things they feel, things they have recently heard — and
the question assembles an answer out of whichever considerations it makes available. The
answer is real. It is also constructed at the moment of asking, which is why a different
question produces a different one.

That model has a practical consequence, and good survey organisations act on it. If an
answer is assembled from what a question makes available, then no single question is
authoritative and the remedy is to ask several. A well-designed instrument approaches the
same underlying attitude from different directions — an agree-disagree item, a forced
choice, a rating, a question about a concrete case — and reports the pattern across them
rather than a headline from any one. Where the versions converge, something stable is being
measured. Where they diverge, the divergence is the finding, and it usually points at a
population that has not made up its mind rather than at an instrument that has failed.

The habit that survives all this is the practice of reporting a single percentage to one
decimal place, with a margin of error attached that describes only sampling. That margin is
honest as far as it goes. It quantifies the risk that this sample differs from the
population. It says nothing whatever about the risk that a different verb would have moved
the figure twenty times as far, and on most contested topics that is the larger of the two
risks by a wide margin.`,
  questions: [
    {
      subskill: "main idea",
      family: "central-claim",
      difficulty: "Medium",
      stem: "The passage is chiefly concerned with:",
      key: "why the wording of a question shapes the answer it gets.",
      wrong: [
        ["how survey samples are drawn from a large population.", "Sampling appears only at the end, and the passage says nothing was wrong with the sample."],
        ["why the public holds inconsistent views about free speech.", "The speech question is an example; the passage never analyses that opinion itself."],
        ["how researchers first learned to conduct interviews by telephone.", "No history of interviewing methods or technology appears in the passage."],
      ],
      why: "The passage opens with the forbid-and-allow demonstration, adds three further wording effects, and explains them by saying an answer \"is constructed at the moment of asking.\"",
      steps: [
        "Note what the opening experiment is used to establish.",
        "Check that the option covers the model offered in the fourth paragraph.",
      ],
      hint: "The examples all vary one thing and hold the sample constant.",
    },
    {
      subskill: "locate detail",
      family: "stated-detail",
      difficulty: "Easy",
      stem: "According to the passage, in Cantril's demonstration the share of respondents willing to allow the speeches was about:",
      key: "twenty-five per cent.",
      wrong: [
        ["fifty-four per cent.", "That is the share who refused to forbid the speeches, which is the other version."],
        ["twenty per cent.", "A fifth is the size of the gap between the two versions, not a reported share."],
        ["forty-six per cent.", "This figure appears nowhere; it would be the complement of the refusing share."],
      ],
      why: "The first paragraph says \"about fifty-four per cent refused to forbid, but only twenty-five per cent were willing to allow.\"",
      steps: [
        "Find the sentence giving both percentages.",
        "Match each number to the verb it belongs with.",
      ],
      hint: "Two numbers appear in one sentence; take the one after *allow*.",
    },
    {
      subskill: "cause and effect",
      family: "cause-of-an-effect",
      difficulty: "Easy",
      stem: "The passage explains that an explicit \"no opinion\" option changes results because respondents who:",
      key: "hold a weak view will take the exit offered.",
      wrong: [
        ["dislike the interviewer will end the conversation.", "No effect of the interviewer on responses is discussed in the passage."],
        ["have strong views will restate them more forcefully.", "The effect is attributed to weak views, not to strengthening firm ones."],
        ["misunderstand the question will ask for a repetition.", "Comprehension problems are never raised as a source of the shift."],
      ],
      why: "The third paragraph says the option \"can move the reported split by twenty points, since a respondent with a weak view will take the exit if one is provided and will otherwise pick a side.\"",
      steps: [
        "Locate the sentence about the no-opinion option.",
        "Read the clause introduced by *since*.",
      ],
      hint: "The sentence gives the reason after a comma.",
    },
    {
      subskill: "interpret detail",
      family: "detail-interpretation",
      difficulty: "Easy",
      stem: "The observation that a fifth of the sample \"took what looks like both positions at once\" indicates that those respondents:",
      key: "answered differently depending on the verb used.",
      wrong: [
        ["gave contradictory answers within a single interview.", "Each respondent saw only one version; the two versions went to matched samples."],
        ["refused to answer either version of the question.", "The share described gave answers; refusal is not what the passage reports."],
        ["changed their minds over the course of the study.", "No respondent is described as being asked twice or as revising a view."],
      ],
      why: "The paragraph says the two versions went to \"two matched samples,\" and that the share of the sample in question shifted \"depending on which verb they were handed.\"",
      steps: [
        "Check how many versions of the question each respondent received.",
        "Interpret the phrase in light of that design.",
      ],
      hint: "The design compares two groups, not two answers from one person.",
    },
    {
      subskill: "meaning in context",
      family: "vocabulary-in-context",
      difficulty: "Medium",
      stem: "As it is used in the fourth paragraph, the word *considerations* refers to:",
      key: "the material from which an answer gets assembled.",
      wrong: [
        ["the courtesies respondents extend to an interviewer.", "The paragraph is about mental content, not about manners during an interview."],
        ["the factors researchers weigh when choosing a sample.", "The word describes what respondents carry, not what researchers decide."],
        ["the reasons a person gives for refusing to take part.", "Non-response is not discussed anywhere in the passage."],
      ],
      why: "The paragraph says people \"carry considerations — things they know, things they feel, things they have recently heard — and the question assembles an answer out of whichever considerations it makes available.\"",
      steps: [
        "Read the material set off by dashes, which defines the word.",
        "Note what the rest of the sentence says is done with them.",
      ],
      hint: "The sentence defines the word and then gives it a job.",
    },
    {
      subskill: "logical inference",
      family: "supported-inference",
      difficulty: "Medium",
      stem: "The passage implies that two differently worded questions on one topic will diverge most when respondents:",
      key: "have not settled the matter for themselves already.",
      wrong: [
        ["are interviewed by telephone rather than in person.", "The mode of interview is never mentioned as a factor in the passage."],
        ["are asked the questions in the same sitting.", "Order effects are described within an interview, not as a cause of divergence."],
        ["belong to samples drawn from different populations.", "The passage stresses that the samples were matched and the effect remains."],
      ],
      why: "The fourth paragraph says the effects show that \"many people do not carry a fixed, retrievable answer,\" and that the answer is instead assembled from what the question makes available.",
      steps: [
        "Identify the condition the passage says produces constructed answers.",
        "Ask what would happen for a respondent who already held a firm view.",
      ],
      hint: "The model predicts stability where a fixed answer exists.",
    },
    {
      subskill: "function",
      family: "function-of-a-concession",
      difficulty: "Medium",
      stem: "The sentence granting that the margin of error \"is honest as far as it goes\" serves mainly to:",
      key: "limit a criticism to what the figure leaves out.",
      wrong: [
        ["defend the practice of reporting a decimal place.", "The decimal place is named as part of the habit the paragraph is criticising."],
        ["concede that wording effects are usually very small.", "The paragraph says wording could move a figure twenty times as far."],
        ["show that sampling risk is the larger of two risks.", "The passage says the opposite on most contested topics."],
      ],
      why: "The paragraph says the margin \"quantifies the risk that this sample differs from the population\" and then that it \"says nothing whatever\" about wording. The concession fixes what the complaint is about.",
      steps: [
        "Identify what the sentence grants and what the next sentence withholds.",
        "Ask why an author would grant something before objecting.",
      ],
      hint: "The concession narrows the target rather than softening it.",
    },
    {
      subskill: "organization",
      family: "passage-structure",
      difficulty: "Medium",
      stem: "The passage is organised by moving from:",
      key: "a striking effect, to more of them, to an explanation and its use.",
      wrong: [
        ["a historical experiment, to its critics, to its eventual retraction.", "The Cantril finding is described as reproduced for decades, not retracted."],
        ["a practical problem, to two rival theories, to a judgement between them.", "Only one model of answering is offered, and no rival theory is stated."],
        ["a general principle, to its exceptions, to a revised version of it.", "The passage begins with a case, not a principle, and states no exceptions."],
      ],
      why: "The passage opens with the forbid-allow result, adds acquiescence, order, and no-opinion effects, then explains them with the considerations model, and finally draws a practical rule for designing instruments.",
      steps: [
        "Label each paragraph with the job it does.",
        "Check the option's sequence against those labels in order.",
      ],
      hint: "The fifth paragraph turns from explanation to practice.",
    },
    {
      subskill: "reasoning",
      family: "evaluating-an-objection",
      difficulty: "Medium",
      stem: "The passage rejects the conclusion that surveys measure nothing on the ground that:",
      key: "a constructed answer is still a real one.",
      wrong: [
        ["the wording effects are too small to matter in practice.", "The passage calls one of them capable of moving a split by twenty points."],
        ["only inexperienced organisations word their questions badly.", "The passage attributes the effects to how answering works, not to incompetence."],
        ["respondents can be trained to answer more consistently.", "No proposal to train or instruct respondents appears in the passage."],
      ],
      why: "The fourth paragraph says people carry considerations rather than fixed answers, and then insists: \"the answer is real. It is also constructed at the moment of asking, which is why a different question produces a different one.\"",
      steps: [
        "Find the sentence that concedes the phenomenon.",
        "Find the sentence that denies the sceptical conclusion.",
        "Choose the option that states the distinction between the two.",
      ],
      hint: "Two short sentences in a row say *real* and *constructed*.",
    },
    {
      subskill: "claims and evidence",
      family: "claim-and-support",
      difficulty: "Hard",
      stem: "The recommendation to ask several differently framed questions is supported in the passage by the claim that:",
      key: "an answer depends on what a question makes available.",
      wrong: [
        ["large samples reduce the risk of a misleading result.", "Sample size addresses sampling error, which the passage says is the smaller risk."],
        ["respondents agree with statements more often than they disagree.", "This is one effect to be guarded against, not the reason many questions help."],
        ["the effects have been reproduced across languages and decades.", "Reproducibility establishes that the effects are real, not what to do about them."],
      ],
      why: "The fifth paragraph begins \"if an answer is assembled from what a question makes available, then no single question is authoritative and the remedy is to ask several,\" making the model the premise for the recommendation.",
      steps: [
        "Find the sentence that states the recommendation.",
        "Read the conditional clause that introduces it.",
        "Reject facts that establish the problem but do not license the remedy.",
      ],
      hint: "The recommendation is stated as the consequent of an *if*.",
      trap: "Choosing evidence that the effects exist instead of the premise the remedy follows from.",
    },
  ],
};
