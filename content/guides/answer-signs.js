/**
 * Answer Signs — a study guide of legitimate test-taking "tells."
 *
 * These are probabilistic heuristics drawn from how standardized multiple-choice
 * tests are commonly written. They are study aids, NOT guarantees. Always try to
 * actually solve or reason through a question; use a tell only to break a genuine
 * tie or to sanity-check a choice. On timed sections, a good guess beats a blank.
 *
 * This content is original and self-contained. It is not affiliated with,
 * endorsed by, or sponsored by College Board or ACT, Inc.
 */
(function () {
  "use strict";

  window.PRACTICE_ANSWER_SIGNS = {
    version: "2026.1",
    updated: "2026-07-31",
    disclaimer:
      "These are heuristics, not rules. A well-written question can and will " +
      "punish a student who only pattern-matches. Solve first; use a tell to " +
      "break a tie, check your work, or make an educated guess when you are out " +
      "of time. Never leave a bubble blank — neither the SAT nor the ACT " +
      "penalizes wrong answers.",

    // High-level principles that apply to every section of both tests.
    principles: [
      {
        title: "Elimination beats selection",
        body:
          "You rarely need to prove the right answer. Prove three answers wrong " +
          "and the last one is correct by default. Cross off aggressively; one " +
          "clearly false word inside a choice kills the whole choice.",
      },
      {
        title: "The test rewards the defensible answer, not the clever one",
        body:
          "The correct choice is the one a reasonable person could defend using " +
          "only the passage or the math on the page. If defending a choice " +
          "requires a story, an assumption, or outside knowledge, it is wrong.",
      },
      {
        title: "Extreme language is usually a trap",
        body:
          "Absolute words — always, never, none, every, impossible, cannot, " +
          "proves, all — are easy to disprove with a single exception, so they " +
          "are rarely correct on reading and science. Measured words — often, " +
          "may, suggests, some, tends to — survive scrutiny and are correct more " +
          "often. (Math is the exception: there, precision is required.)",
      },
      {
        title: "Right answers are boring; wrong answers are interesting",
        body:
          "Trap choices are designed to be attractive: they are dramatic, " +
          "surprising, or emotionally satisfying. The credited answer is often " +
          "the flattest, most literal restatement of the text or the cleanest " +
          "number.",
      },
      {
        title: "Two opposite choices often contain the answer",
        body:
          "When two choices are direct opposites, the test writer usually built " +
          "the question around that contrast — the answer is frequently one of " +
          "the two. When two choices say the same thing in different words, both " +
          "are usually wrong (they can't both be right, so they cancel).",
      },
      {
        title: "Match scope, tense, and tone",
        body:
          "The credited answer matches the passage's scope (not broader, not " +
          "narrower), its verb tense, and its tone. A choice that is too sweeping " +
          "for a modest paragraph, or too negative for a neutral author, is out.",
      },
    ],

    groups: [
      /* ---------------------------------------------------------------- */
      /* SAT — Reading & Writing                                           */
      /* ---------------------------------------------------------------- */
      {
        id: "sat-rw",
        test: "SAT",
        category: "Reading & Writing",
        title: "SAT Reading & Writing tells",
        intro:
          "The digital SAT Reading & Writing section is short-passage and " +
          "single-question. Every question is answerable from the text in front " +
          "of you — never from memory or opinion. Predict an answer in your own " +
          "words before you read the choices.",
        tells: [
          {
            name: "Predict before you peek",
            sign:
              "Cover the four choices, answer the question in your own words, " +
              "then find the choice that matches your prediction.",
            why:
              "The choices are engineered to sound tempting. A prediction made " +
              "before you see them immunizes you against the traps and turns the " +
              "question into a simple matching task.",
            example:
              "For a main-idea question, jot a 5-word summary of the passage, " +
              "then pick the choice closest to it.",
            caution:
              "If none of the choices matches your prediction, your prediction " +
              "was off — reread the relevant line, don't force a choice.",
          },
          {
            name: "Command-of-evidence: the answer must do the job",
            sign:
              "When asked which quotation or data point best supports a claim, " +
              "the answer must directly and completely support that exact claim — " +
              "not a nearby or related idea.",
            why:
              "Wrong choices are true statements from the passage that support a " +
              "different claim. Relevance to the specific claim is everything.",
            example:
              "If the claim is 'the material is unusually flexible,' a quote " +
              "about its color is out even if it's accurate.",
            caution:
              "For quantitative evidence (a table or graph), the correct choice " +
              "reads the data correctly AND ties it to the claim. Verify both.",
          },
          {
            name: "Words-in-context: substitute and reread",
            sign:
              "Plug each choice back into the sentence. The correct word keeps " +
              "the sentence's meaning and matches the surrounding tone.",
            why:
              "These questions test the meaning in context, not the dictionary's " +
              "most common definition. The 'obvious' meaning is usually the trap.",
            example:
              "'Novel' can mean 'a book' or 'new.' In 'a novel approach,' only " +
              "'new' fits — the common noun meaning is the distractor.",
            caution:
              "Watch for secondary meanings of easy words (arrest, table, " +
              "check, qualify). The harder the passage, the likelier the " +
              "secondary meaning is correct.",
          },
          {
            name: "Transitions: name the relationship first",
            sign:
              "Before looking at choices, decide the logical relationship between " +
              "the two sentences: same direction (also, moreover), contrast " +
              "(however, but), cause/effect (therefore, because), or example.",
            why:
              "Each choice usually represents a different relationship. Naming the " +
              "relationship first collapses four options to one.",
            example:
              "If sentence 2 reverses sentence 1, only a contrast word " +
              "(however, nevertheless, by contrast) can be right.",
            caution:
              "Don't be seduced by a transition that sounds smart. 'Therefore' " +
              "needs an actual cause before it; 'for example' needs a real " +
              "example after it.",
          },
          {
            name: "Rhetorical synthesis: obey the stated goal",
            sign:
              "The bulleted-notes questions tell you the writer's goal in the " +
              "prompt. The answer is the ONLY choice that accomplishes that exact " +
              "goal using the notes.",
            why:
              "All four choices are usually factually accurate given the notes. " +
              "Accuracy is not the test — fulfilling the stated purpose is.",
            example:
              "If the goal is 'to emphasize a difference between the two studies,' " +
              "pick the choice that states a contrast, not the one that just lists " +
              "a fact.",
            caution:
              "Underline the goal words (emphasize, compare, introduce, " +
              "generalize) and check the choice against them literally.",
          },
          {
            name: "Grammar: the shortest, cleanest choice usually wins",
            sign:
              "On Standard-English-Conventions questions, when meaning is equal, " +
              "the most concise, non-redundant option is generally correct.",
            why:
              "The SAT prizes concision. Wordy, repetitive, or comma-splice-laden " +
              "choices are built to be eliminated.",
            example:
              "'Because of the fact that' loses to 'because'; 'annual event that " +
              "happens each year' is redundant.",
            caution:
              "Concision never beats correctness. A short choice with a grammar " +
              "error still loses to a slightly longer correct one.",
          },
          {
            name: "Punctuation: test the two halves",
            sign:
              "For comma/semicolon/colon questions, check whether each side of " +
              "the mark is an independent clause. Two independent clauses need a " +
              "period, semicolon, or comma+FANBOYS — never a lone comma.",
            why:
              "The SAT recycles a small set of boundary rules. Classifying each " +
              "half as a complete or incomplete sentence resolves most of them " +
              "mechanically.",
            example:
              "A colon must follow a complete sentence and introduce an " +
              "explanation, list, or example.",
            caution:
              "If two answer choices are grammatically identical in effect (e.g., " +
              "a semicolon and a period both work), neither is the answer — the " +
              "test won't give you two correct options.",
          },
        ],
      },

      /* ---------------------------------------------------------------- */
      /* SAT — Math                                                        */
      /* ---------------------------------------------------------------- */
      {
        id: "sat-math",
        test: "SAT",
        category: "Math",
        title: "SAT Math tells",
        intro:
          "Math has real answers, so tells here are about avoiding trap choices " +
          "and using the structure of the answers — not guessing blind. The " +
          "choices themselves often leak information.",
        tells: [
          {
            name: "Plug in the answers (backsolving)",
            sign:
              "When the choices are numbers and the algebra is messy, test the " +
              "choices in the original equation. Start with B or C (the middle " +
              "values) so you can tell which direction to go.",
            why:
              "One of the four choices must be correct, so testing them converts " +
              "hard algebra into arithmetic you can verify.",
            example:
              "For 'x such that 3x - 7 = 2x + 4,' try the middle choice; adjust " +
              "up or down based on the result.",
            caution:
              "Read what the question asks for (x, or 2x, or x+1). Backsolving " +
              "finds a value; make sure it's the value requested.",
          },
          {
            name: "Pick numbers for variables in the answers",
            sign:
              "If the question and all four choices contain variables, substitute " +
              "easy numbers (avoid 0 and 1), compute a target, then see which " +
              "choice hits the target.",
            why:
              "Abstract algebra becomes concrete arithmetic, and the trap choices " +
              "that only 'look' equivalent fall away.",
            example:
              "For 'which expression equals the perimeter,' let the side = 3 and " +
              "test each choice.",
            caution:
              "If two choices give the same target, pick a second set of numbers " +
              "to break the tie. Avoid numbers that appear in the problem.",
          },
          {
            name: "The answer that skips a step is the trap",
            sign:
              "Distractors are the results of stopping one step early, or solving " +
              "for the wrong quantity. If a choice equals an intermediate value " +
              "you computed, be suspicious.",
            why:
              "Test writers seed the exact numbers a rushing student would " +
              "produce. The 'natural mistake' is always an available choice.",
            example:
              "Solve for x = 4, but the question asks for x^2. '4' will be sitting " +
              "right there as a wrong choice; the answer is 16.",
            caution:
              "Re-read the last line of the problem before bubbling. Underline " +
              "'least,' 'greatest,' 'not,' 'except,' and the exact unknown.",
          },
          {
            name: "Estimate and eliminate the impossible",
            sign:
              "Ballpark the answer's size and sign. A negative length, a " +
              "probability above 1, or a percent over 100 in a discount problem " +
              "is immediately out.",
            why:
              "Order-of-magnitude sense eliminates one or two choices for free, " +
              "even when you can't finish the computation.",
            example:
              "A 20% discount on $50 can't be more than $50; cross off any choice " +
              "≥ 50.",
            caution:
              "Estimation narrows the field; it rarely picks the single answer. " +
              "Use it to reduce, then compute among survivors.",
          },
          {
            name: "Grid-in reality check",
            sign:
              "On student-produced-response (grid-in) items there are no choices, " +
              "so verify by plugging your answer back into the original equation " +
              "and confirming units and reasonableness.",
            why:
              "Without choices there's no safety net; a quick back-substitution " +
              "catches sign errors and arithmetic slips.",
            example:
              "If you solved a rate problem and got 0.5 hours, confirm that half " +
              "an hour actually satisfies the given distance and speed.",
            caution:
              "Answers must fit the grid: no negative signs allowed in the SAT " +
              "grid on many items, and fractions/decimals must be entered " +
              "precisely. If your answer can't be gridded, you erred.",
          },
          {
            name: "Geometry figures are usually drawn to scale (SAT)",
            sign:
              "Unless a figure says 'Note: figure not drawn to scale,' you can " +
              "measure or compare visually to estimate angles and lengths.",
            why:
              "A to-scale figure lets you eyeball which answer is plausible and " +
              "eliminate ones that clearly conflict with the picture.",
            example:
              "If an angle clearly looks obtuse, cross off any choice under 90°.",
            caution:
              "'Not drawn to scale' cancels this tell entirely — then trust only " +
              "the given measurements, never the drawing.",
          },
        ],
      },

      /* ---------------------------------------------------------------- */
      /* ACT — English                                                     */
      /* ---------------------------------------------------------------- */
      {
        id: "act-english",
        test: "ACT",
        category: "English",
        title: "ACT English tells",
        intro:
          "ACT English is a fast grammar-and-rhetoric section (about 36 seconds " +
          "per question). It rewards a small set of mechanical rules and a strong " +
          "bias toward concision.",
        tells: [
          {
            name: "Shortest correct answer wins",
            sign:
              "When several choices are grammatically acceptable and mean the " +
              "same thing, choose the shortest. 'OMIT the underlined portion' or " +
              "'DELETE' is correct far more often than chance.",
            why:
              "The ACT explicitly values concise, non-redundant writing. Extra " +
              "words are usually there to be removed.",
            example:
              "Between 'they returned back' and 'they returned,' pick 'returned' " +
              "— 'back' is redundant.",
            caution:
              "Only after meaning and grammar are equal. Never delete words the " +
              "sentence needs to stay complete or clear.",
          },
          {
            name: "Redundancy is the #1 trap",
            sign:
              "Scan for two words that say the same thing: 'end result,' 'each " +
              "and every,' 'past history,' 'combine together,' 'small in size.' " +
              "Eliminate the choice that keeps both.",
            why:
              "Redundancy questions are a huge share of the section, and the " +
              "answer is always the version that cuts the repetition.",
            example:
              "'The reason is because' → 'The reason is' (or 'because').",
            caution:
              "Redundancy can hide across a clause, not just adjacent words. Read " +
              "the full sentence for repeated ideas.",
          },
          {
            name: "Answer changes tell you the tested rule",
            sign:
              "Look at what differs among the four choices. If only punctuation " +
              "changes, it's a punctuation question; if verb endings change, it's " +
              "agreement or tense.",
            why:
              "The variable across choices reveals exactly which rule to apply, " +
              "so you don't waste time checking the wrong thing.",
            example:
              "If choices differ only by its/it's/its'/their, the question is " +
              "about pronoun and apostrophe usage — go straight there.",
            caution:
              "Some questions change more than one thing. Handle the clearest " +
              "error first; it often eliminates two choices at once.",
          },
          {
            name: "Comma test: could a period go here?",
            sign:
              "If both sides of a comma are complete sentences, a plain comma is " +
              "wrong (comma splice). You need a period, semicolon, or " +
              "comma + FANBOYS conjunction.",
            why:
              "Independent-clause boundaries are the most tested punctuation idea " +
              "on the ACT, and this single check resolves most of them.",
            example:
              "'I ran, I was late' is a splice; 'I ran, so I was late' is fine.",
            caution:
              "Semicolons behave like periods — they also require a complete " +
              "sentence on each side.",
          },
          {
            name: "Descriptive/rhetorical questions: read the whole context",
            sign:
              "For 'yes/no' or 'which choice best accomplishes X' questions, the " +
              "answer's reasoning half must be correct, and the choice must serve " +
              "the stated purpose using the surrounding paragraph.",
            why:
              "In yes/no questions, wrong choices often pair the right verdict " +
              "with a false reason. Both halves must hold.",
            example:
              "'Yes, because it introduces the topic' is wrong if the sentence " +
              "actually restates the conclusion.",
            caution:
              "These require reading before and after the underline, unlike pure " +
              "grammar items. Don't answer from the underlined words alone.",
          },
          {
            name: "Keep verb tense and pronouns consistent with the passage",
            sign:
              "The correct verb tense matches the surrounding sentences; the " +
              "correct pronoun matches its antecedent in number and stays " +
              "consistent (don't switch you/one/they).",
            why:
              "Consistency questions are resolved by scanning nearby sentences, " +
              "not by ear.",
            example:
              "If the paragraph is in past tense, a sudden present-tense verb in " +
              "the underline is the error to fix.",
            caution:
              "Match the antecedent, not the nearest noun. 'Each of the players " +
              "lost their...' should be 'his or her' — 'each' is singular.",
          },
        ],
      },

      /* ---------------------------------------------------------------- */
      /* ACT — Reading                                                     */
      /* ---------------------------------------------------------------- */
      {
        id: "act-reading",
        test: "ACT",
        category: "Reading",
        title: "ACT Reading tells",
        intro:
          "ACT Reading is time-pressured (about 52 seconds per question). Answers " +
          "are strictly text-based; the credited choice is provable with a line " +
          "reference, and 'literal and supported' beats 'insightful.'",
        tells: [
          {
            name: "If you can't point to the line, it's wrong",
            sign:
              "The correct answer can be justified by a specific word, phrase, or " +
              "sentence in the passage. If defending a choice requires inference " +
              "beyond the text, drop it.",
            why:
              "ACT Reading is a proof exercise. Every credited answer has textual " +
              "evidence; attractive-but-unsupported choices are the traps.",
            example:
              "For 'the narrator feels ___,' find the sentence that shows the " +
              "feeling, then match the choice to it.",
            caution:
              "'Directly supported' still allows small paraphrase. Match meaning, " +
              "not exact wording — an exact-word-match choice can be a trap.",
          },
          {
            name: "Extreme answers are almost always wrong",
            sign:
              "Cross off choices with absolutes: always, never, all, none, only, " +
              "completely, impossible, everyone, proves.",
            why:
              "One counterexample in the passage disproves an absolute, so test " +
              "writers rarely credit them. Moderate wording survives.",
            example:
              "'The author completely rejects the theory' loses to 'the author " +
              "questions part of the theory.'",
            caution:
              "Occasionally a passage really is absolute (a definition, a law). " +
              "If the text itself is emphatic, an extreme choice can be right — " +
              "verify against the line.",
          },
          {
            name: "Beware the true-but-irrelevant choice",
            sign:
              "A choice can be a true statement about the passage yet not answer " +
              "the question asked. Re-check that the choice responds to THIS " +
              "question.",
            why:
              "The most common ACT Reading trap is a factually accurate detail " +
              "placed under the wrong question.",
            example:
              "The question asks for the main idea, but the choice states a real " +
              "minor detail. True, but wrong scope.",
            caution:
              "Match the choice to the question type: main idea wants the whole " +
              "passage; detail wants a specific line.",
          },
          {
            name: "Answer order follows passage order",
            sign:
              "Detail questions generally appear in the same order the " +
              "information appears in the passage, which helps you locate the " +
              "relevant lines fast.",
            why:
              "Knowing roughly where to look saves the scarce time this section " +
              "gives you.",
            example:
              "If question 3's answer was in paragraph 2, question 4's is likely " +
              "in paragraph 2 or later, not paragraph 1.",
            caution:
              "Main-idea and 'according to the passage' questions can range " +
              "anywhere; this ordering applies mainly to specific-detail items.",
          },
          {
            name: "Opposite pairs flag the battleground",
            sign:
              "When two choices are direct opposites, the question usually hinges " +
              "on that distinction — the answer is often one of the two. Decide " +
              "the passage's direction, then pick.",
            why:
              "Writers build a question around a contrast they want you to get " +
              "right; the opposite is the tempting wrong turn.",
            example:
              "'The tone is admiring' vs. 'the tone is critical' — settle the " +
              "tone from the text, then choose.",
            caution:
              "Not every opposite pair contains the answer; confirm with the " +
              "passage rather than assuming.",
          },
          {
            name: "Dual-passage: keep the sources separate",
            sign:
              "On paired passages, note which author holds which view. Wrong " +
              "choices swap the authors' positions or blend them.",
            why:
              "The classic paired-passage trap attributes Passage A's idea to " +
              "Passage B's author.",
            example:
              "If A is optimistic and B is cautious, a choice claiming B is " +
              "optimistic is out.",
            caution:
              "'Both authors would agree' choices must be supported by BOTH " +
              "texts, not just one.",
          },
        ],
      },

      /* ---------------------------------------------------------------- */
      /* ACT — Science                                                     */
      /* ---------------------------------------------------------------- */
      {
        id: "act-science",
        test: "ACT",
        category: "Science",
        title: "ACT Science tells",
        intro:
          "ACT Science is a data-reading section, not a knowledge test. Most " +
          "answers are found by reading axes, trends, and tables — outside " +
          "science facts are rarely needed. Let the figures, not your memory, " +
          "decide.",
        tells: [
          {
            name: "The answer is in the figure, not your memory",
            sign:
              "For data questions, go straight to the table or graph named in the " +
              "question, read the axis labels and units, and trace the value. " +
              "Ignore the intro paragraph unless a question needs it.",
            why:
              "The section is designed so that careful figure-reading, not prior " +
              "biology or chemistry, produces the answer.",
            example:
              "'As temperature increases, pressure ___' — follow the curve's " +
              "direction on the graph and read the trend.",
            caution:
              "A few 'outside knowledge' questions (usually 2–4 per test) do need " +
              "basic facts. If nothing in the figures answers it, recall a " +
              "fundamental (water freezes at 0°C, pH < 7 is acidic).",
          },
          {
            name: "Match the trend's direction",
            sign:
              "For 'as X increases, Y does what' questions, decide whether the " +
              "relationship is direct (both rise) or inverse (one rises as the " +
              "other falls), then pick the matching wording.",
            why:
              "Two of the four choices are usually 'increase/decrease' opposites; " +
              "reading the slope's sign eliminates half instantly.",
            example:
              "A downward-sloping line means 'as X increases, Y decreases.'",
            caution:
              "Check for a turning point — some curves rise then fall. Read the " +
              "specific interval the question asks about.",
          },
          {
            name: "Interpolate/extrapolate along the pattern",
            sign:
              "When asked for a value between or just beyond the data points, " +
              "continue the existing trend smoothly; the answer sits in the gap " +
              "or one step past the last point.",
            why:
              "The credited value follows the established pattern; wildly larger " +
              "or smaller choices break the trend and are traps.",
            example:
              "If Y is 10 at X=2 and 20 at X=4, a value at X=3 is about 15.",
            caution:
              "Only extrapolate for as far as the trend is stated to hold. Huge " +
              "jumps beyond the data are usually wrong.",
          },
          {
            name: "Conflicting-viewpoints: anchor each scientist's core claim",
            sign:
              "In the viewpoints passage, summarize each scientist/student's main " +
              "claim in a few words. Answers hinge on who believes what and what " +
              "evidence would strengthen or weaken each view.",
            why:
              "The traps swap positions between viewpoints or attach the wrong " +
              "evidence to a scientist.",
            example:
              "'Which finding supports Scientist 2?' — pick the data that fits " +
              "Scientist 2's specific claim, not a true fact that fits " +
              "Scientist 1.",
            caution:
              "'Strengthen' vs. 'weaken' flips the whole question. Underline " +
              "which one is being asked.",
          },
          {
            name: "Read every axis label and unit before answering",
            sign:
              "Note what each axis measures, its units, and its scale (linear vs. " +
              "log, and whether it starts at zero). Many wrong answers come from " +
              "misreading the scale.",
            why:
              "A single mis-scaled read produces a plausible but wrong value that " +
              "is waiting as a distractor.",
            example:
              "If the y-axis goes 0, 10, 100, 1000, it is logarithmic — spacing " +
              "isn't linear.",
            caution:
              "Watch for multiple y-axes (left and right) on one graph, and make " +
              "sure you read the curve tied to the correct axis.",
          },
          {
            name: "Design questions: identify the single changed variable",
            sign:
              "For experiment-design questions, find the one variable that " +
              "changes between trials (the independent variable) and what is held " +
              "constant (the control).",
            why:
              "Answers about 'why did they run Trial 3' or 'what does Trial 2 " +
              "test' turn on which variable moved while others were fixed.",
            example:
              "If only the catalyst amount differs across trials, the experiment " +
              "tests the effect of catalyst amount.",
            caution:
              "The purpose of a control/baseline trial is comparison — it isn't " +
              "testing a new variable, it anchors the others.",
          },
        ],
      },

      /* ---------------------------------------------------------------- */
      /* ACT — Math                                                        */
      /* ---------------------------------------------------------------- */
      {
        id: "act-math",
        test: "ACT",
        category: "Math",
        title: "ACT Math tells",
        intro:
          "ACT Math is five choices (A–E), roughly one minute each, arranged " +
          "easy-to-hard. Like SAT Math, the tells are about using the answer " +
          "choices and avoiding seeded mistakes — not blind guessing.",
        tells: [
          {
            name: "Difficulty rises with question number",
            sign:
              "Early questions (1–20) are usually straightforward; on late " +
              "questions (50–60), the 'obvious' answer is more likely a trap. " +
              "Trust an easy computation early; double-check an easy-looking " +
              "answer late.",
            why:
              "The ordered difficulty means a late question that feels trivial " +
              "probably hides a step you skipped.",
            example:
              "On question 58, if the answer came in one line, re-read for a " +
              "'not,' a unit change, or an extra condition.",
            caution:
              "Ordering is a tendency, not a guarantee. Don't talk yourself out " +
              "of a genuinely correct easy answer just because it's late.",
          },
          {
            name: "Backsolve with the five choices",
            sign:
              "When choices are numbers, test them in the problem. They're " +
              "listed in order, so start with the middle (C) and move up or down.",
            why:
              "One choice must work; checking them is often faster and safer than " +
              "setting up and solving the algebra.",
            example:
              "'For what x is the expression zero?' — plug each choice until the " +
              "expression evaluates to 0.",
            caution:
              "Confirm you're plugging into the right expression and answering " +
              "the exact quantity asked.",
          },
          {
            name: "Pick numbers for variable-answer questions",
            sign:
              "If the answer choices contain variables, substitute simple numbers " +
              "(not 0 or 1) and compute a target to match.",
            why:
              "It converts abstract manipulation into arithmetic and exposes " +
              "choices that only look equivalent.",
            example:
              "'Which is equivalent to 2(x+3)?' — let x=4, target 14, test each " +
              "choice.",
            caution:
              "If two choices tie, retest with different numbers. Avoid values " +
              "already in the problem.",
          },
          {
            name: "The 'trap' choice is your predictable mistake",
            sign:
              "Distractors equal the answer you'd get by forgetting to " +
              "distribute a negative, using diameter for radius, or leaving off a " +
              "unit conversion. Seeing your intermediate number as a choice is a " +
              "warning.",
            why:
              "ACT seeds the classic slip results so a careless solver lands on a " +
              "wrong bubble that feels right.",
            example:
              "Forget to halve the diameter and you'll find that exact wrong area " +
              "sitting among the choices.",
            caution:
              "Slow down on the last step and the units. Re-read what quantity is " +
              "requested.",
          },
          {
            name: "Figures aren't guaranteed to scale — use given numbers",
            sign:
              "Unlike the SAT's default, ACT figures are not promised to be to " +
              "scale. Rely on the labeled measurements and relationships, not the " +
              "drawing's appearance.",
            why:
              "Eyeballing an ACT figure can mislead you because proportions may " +
              "be distorted.",
            example:
              "An angle that looks 90° may not be; only trust it if the figure or " +
              "text marks it as a right angle.",
            caution:
              "You can still use a figure for general layout and which points " +
              "connect — just not for precise measurement.",
          },
          {
            name: "Answer choices reveal the intended method",
            sign:
              "The form of the choices hints at the expected work: fractions " +
              "suggest exact arithmetic, π in the choices signals a circle " +
              "formula, radicals suggest the Pythagorean theorem or special " +
              "triangles.",
            why:
              "Reading the choices first tells you which tool the problem wants, " +
              "saving setup time.",
            example:
              "Choices full of √2 and √3 point to 45-45-90 or 30-60-90 triangle " +
              "ratios.",
            caution:
              "Let the choices guide, not dictate. Confirm the method actually " +
              "fits the given information.",
          },
        ],
      },
    ],
  };
})();
