"use strict";

module.exports = {
  id: "act-reading-p038",
  type: "humanities",
  title: "Testimony",
  intro: "This passage is adapted from an essay on the practice of oral history.",
  content: `The standard objection to oral history is that memory is unreliable, and the standard
objection is correct. People misdate events by years. They import details from photographs
they saw afterwards and from accounts they have heard since. They compress a sequence of
occasions into one occasion and remember the composite. Under questioning they will
confidently supply weather, clothing, and dialogue for a day they can be shown to have spent
elsewhere. None of this is contested by anyone who conducts interviews for a living; the
literature on it was largely written by oral historians.

What the objection assumes is that an interview is a way of finding out what happened, and
that a document would be better. For a great many questions the document is better, and a
competent oral historian will say so. If the question is when a factory closed, consult the
company records. The interview is not competing with the archive for that job.

The job it does is different, and the clearest way to see it is to notice what a written
record of a strike contains. It contains dates, resolutions, numbers present, and the terms
eventually agreed. It does not contain what it was like to cross a line where your
neighbour was standing, or the fact that the thing people remember about that winter is not
the settlement but a particular van that brought soup. Those are not decorations on the
historical record. They are the content of the event for the people who were in it, and
there is no document anywhere that holds them, because nobody at the time thought to write
down what everyone already knew.

Alessandro Portelli made the sharpest version of this argument out of an error. Workers in
Terni, in Italy, consistently misremembered the date of the death of a man shot by police in
1949, placing it in 1953, during a very large round of layoffs. The mistake is documented
and uniform across many interviews. Portelli's point was that the error is itself the
finding. The community had attached the killing to the layoffs because that is where it
belonged in the meaning of their own history, and no document records that connection,
because it is not a fact about 1949. It is a fact about how a town understood what had been
done to it.

This is a strong argument and it can be pushed too far, which some of its inheritors have
done. If every error is a symbolic truth, nothing an interviewee says can be wrong, and the
practice loses the ability to be corrected by anything. The discipline's answer has been
procedural rather than theoretical. Interviews are checked against documents where documents
exist, and the discrepancies are published rather than smoothed over. Recordings are
archived so that a later researcher can hear the question that produced an answer, which
frequently explains the answer. Interviewers are trained to ask open questions, because a
question containing its own answer will get it back.

The remaining difficulty is one the field has not solved and does not pretend to. An
interview is made by two people. The account a man gives of a strike depends on who is
asking, what they seem to think, and what the speaker takes the recording to be for, and
those are not noise to be filtered out because there is no version of the conversation
without them. What can be done is to record the conditions, name the interviewer, and leave
the tape. What cannot be done is to obtain the account the person would have given to
nobody.`,
  questions: [
    {
      subskill: "main idea",
      family: "central-claim",
      difficulty: "Medium",
      stem: "The passage argues chiefly that oral history:",
      key: "answers questions that documents cannot reach.",
      wrong: [
        ["is more reliable than written records of the past.", "The passage concedes documents are better for many questions."],
        ["should be checked until its errors are eliminated.", "The passage treats some errors as findings to be published."],
        ["has been discredited by research into memory.", "The memory research is cited as work oral historians themselves did."],
      ],
      why: "The passage says the objection assumes an interview is a way of finding out what happened, and that its actual job \"is different\": recording what \"no document anywhere\" holds.",
      steps: [
        "Find where the passage grants the objection and where it redirects it.",
        "Check that the option matches the strike example.",
      ],
      hint: "The third paragraph names the job the interview does.",
    },
    {
      subskill: "locate detail",
      family: "stated-detail",
      difficulty: "Easy",
      stem: "According to the passage, the workers in Terni misdated the killing by placing it in:",
      key: "1953, the year of large layoffs.",
      wrong: [
        ["1949, when the layoffs occurred.", "1949 is the actual year of the killing, not of the layoffs."],
        ["a year that no document records.", "The passage says the mistake is documented and uniform."],
        ["the winter that a van brought soup.", "The soup van belongs to the earlier example about a strike."],
      ],
      why: "The passage says workers placed the death \"in 1953, during a very large round of layoffs,\" though it occurred in 1949.",
      steps: [
        "Find the two years named in the paragraph.",
        "Match each to the event it belongs with.",
      ],
      hint: "One year is correct and one is remembered.",
    },
    {
      subskill: "cause and effect",
      family: "cause-of-an-error",
      difficulty: "Easy",
      stem: "Portelli concluded that the misdating occurred because the community had:",
      key: "linked the killing to the layoffs in meaning.",
      wrong: [
        ["been given inaccurate dates by local newspapers.", "No press account is mentioned as a source of the error."],
        ["forgotten the killing until it was raised in interviews.", "The killing is remembered vividly; only its date moves."],
        ["deliberately altered the date to protect the police.", "No motive of concealment is suggested anywhere."],
      ],
      why: "The passage says the community \"had attached the killing to the layoffs because that is where it belonged in the meaning of their own history.\"",
      steps: [
        "Locate the sentence giving Portelli's explanation.",
        "Note that it concerns meaning rather than information.",
      ],
      hint: "The explanation is about where the event belonged, not when it happened.",
    },
    {
      subskill: "meaning in context",
      family: "vocabulary-in-context",
      difficulty: "Easy",
      stem: "The passage says such remembered details are \"not decorations\" in order to indicate that they are:",
      key: "the substance of the event for participants.",
      wrong: [
        ["easier to verify than dates and resolutions.", "The passage does not claim they are more verifiable."],
        ["added by interviewers rather than by speakers.", "They come from the people interviewed, not from questioners."],
        ["preserved in the written record after all.", "The passage says no document holds them."],
      ],
      why: "The passage says such details \"are the content of the event for the people who were in it, and there is no document anywhere that holds them.\"",
      steps: [
        "Read the sentence immediately after the phrase.",
        "Take the claim it makes about what the details are.",
      ],
      hint: "The next sentence supplies the positive claim.",
    },
    {
      subskill: "comparison",
      family: "contrast-of-sources",
      difficulty: "Medium",
      stem: "The passage contrasts a written record of a strike with an interview by noting that the record holds:",
      key: "dates and terms but not the experience.",
      wrong: [
        ["opinions of participants but not the outcome.", "Opinions are what the record is said to lack."],
        ["a fuller account written closer to the events.", "Timing of composition is not the contrast drawn."],
        ["nothing that an interview cannot also supply.", "The passage says documents are better for many questions."],
      ],
      why: "The passage says the record \"contains dates, resolutions, numbers present, and the terms eventually agreed,\" but not what it was like to cross a line or the van that brought soup.",
      steps: [
        "List what the passage says the document contains.",
        "List what it says the document lacks.",
      ],
      hint: "The paragraph gives both lists in order.",
    },
    {
      subskill: "function",
      family: "function-of-a-concession",
      difficulty: "Medium",
      stem: "The opening concession that memory is unreliable serves mainly to:",
      key: "move the argument off a point already settled.",
      wrong: [
        ["show that oral historians disagree among themselves.", "The passage says the memory literature was written by them."],
        ["establish that interviews should be used sparingly.", "No limit on frequency of use is recommended."],
        ["prove that documents are always the better source.", "The passage says documents are better for many, not all, questions."],
      ],
      why: "The passage says the objection \"is correct\" and that \"none of this is contested by anyone who conducts interviews for a living,\" then turns to what the objection assumes.",
      steps: [
        "Note how completely the first paragraph grants the objection.",
        "Read the sentence that opens the second paragraph.",
      ],
      hint: "The next paragraph begins by identifying an assumption.",
    },
    {
      subskill: "claims and evidence",
      family: "claim-and-support",
      difficulty: "Medium",
      stem: "Which feature of the Terni case makes it useful as evidence for Portelli's argument?",
      key: "The same error appears across many interviews.",
      wrong: [
        ["The killing was carried out by police officers.", "Who was responsible is not what makes the pattern informative."],
        ["The layoffs were larger than any others in Terni.", "Their scale is background, not what licenses the inference."],
        ["The interviews were conducted decades afterwards.", "Elapsed time would tend to weaken rather than support the reading."],
      ],
      why: "The passage says \"the mistake is documented and uniform across many interviews,\" which distinguishes a shared community construction from individual forgetting.",
      steps: [
        "Ask what would separate a collective meaning from a personal lapse.",
        "Find the property of the error the passage emphasises.",
      ],
      hint: "One person's mistake would prove nothing.",
    },
    {
      subskill: "reasoning",
      family: "evaluating-a-position",
      difficulty: "Hard",
      stem: "The passage's warning about pushing Portelli's argument too far rests on the point that:",
      key: "a practice must be able to be shown wrong.",
      wrong: [
        ["symbolic readings are harder to publish than facts.", "Publication difficulty is not raised anywhere in the passage."],
        ["interviewees resent having their accounts corrected.", "No reaction by interviewees to correction is described."],
        ["documents are more numerous than recorded interviews.", "Relative quantity of sources is never discussed."],
      ],
      why: "The passage says that if every error is a symbolic truth, \"nothing an interviewee says can be wrong, and the practice loses the ability to be corrected by anything.\"",
      steps: [
        "State the extreme version of the argument.",
        "Identify what the passage says that version costs.",
        "Reject options concerning practicalities rather than method.",
      ],
      hint: "The objection concerns what the position would make impossible.",
      trap: "Treating a methodological worry as a complaint about interviewees.",
    },
    {
      subskill: "strengthen or weaken",
      family: "strengthening-a-position",
      difficulty: "Hard",
      stem: "Which practice described in the passage most directly answers the worry that oral history cannot be corrected?",
      key: "Publishing discrepancies with documents rather than resolving them.",
      wrong: [
        ["Training interviewers to ask questions that stay open.", "Open questions improve the answer rather than testing it afterwards."],
        ["Archiving recordings so later researchers can hear them.", "Archiving preserves context but does not itself check a claim."],
        ["Naming the interviewer alongside the recorded account.", "Attribution addresses the two-person problem, not correction."],
      ],
      why: "The passage says \"interviews are checked against documents where documents exist, and the discrepancies are published rather than smoothed over,\" which is exactly the corrigibility the worry demanded.",
      steps: [
        "Restate the worry: nothing can show an account to be wrong.",
        "Find the practice that confronts an account with outside evidence.",
        "Reject practices that improve or preserve rather than test.",
      ],
      hint: "Correction requires comparison with something external.",
      trap: "Choosing a good practice that addresses a different problem.",
    },
    {
      subskill: "synthesize information",
      family: "combining-sections",
      difficulty: "Hard",
      stem: "Taken together, the paragraph on procedure and the final paragraph suggest that oral history treats its limitations by:",
      key: "documenting them rather than removing them.",
      wrong: [
        ["eliminating them through better interview training.", "The final paragraph says the last difficulty cannot be solved."],
        ["accepting that its accounts cannot be evaluated.", "The procedural paragraph describes exactly how they are checked."],
        ["restricting interviews to events with no documents.", "The passage recommends checking against documents where they exist."],
      ],
      why: "Discrepancies are \"published rather than smoothed over,\" recordings are archived, and of the interviewer's presence the passage says \"what can be done is to record the conditions, name the interviewer, and leave the tape.\"",
      steps: [
        "Note what each remedy in the two paragraphs actually does.",
        "Ask whether any of them removes the difficulty.",
        "Choose the option that names the common strategy.",
      ],
      hint: "Every remedy listed produces a record of a problem.",
      trap: "Reading a list of safeguards as a claim that the problems are solved.",
    },
    {
      subskill: "author's purpose",
      family: "purpose-of-a-paragraph",
      difficulty: "Medium",
      stem: "The author's purpose in the final paragraph is to:",
      key: "name a limit the discipline openly accepts.",
      wrong: [
        ["argue that interviews should be conducted anonymously.", "The passage recommends naming the interviewer, not hiding them."],
        ["show that interviewers commonly distort their material.", "The effect described is inherent to conversation, not a fault."],
        ["propose a method for removing the interviewer's influence.", "The passage says no version of the conversation exists without it."],
      ],
      why: "The paragraph opens by calling this \"a difficulty the field has not solved and does not pretend to,\" and ends by naming what \"cannot be done.\"",
      steps: [
        "Read the paragraph's first clause and its last sentence.",
        "Note that both concern what is unavailable rather than what is faulty.",
      ],
      hint: "The paragraph is framed as a limit, not an accusation.",
    },
  ],
};
