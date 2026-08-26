"use strict";

module.exports = {
  id: "act-english-p038",
  type: "informative-essay",
  title: "Already There",
  content: `[1] A maple leaf in October is not changing colour so much as ceasing
to hide {1 one and the} yellows and oranges that appear in autumn {2 was}
present in the leaf all summer. What changes is what is covering them.

[2] {3} Chlorophyll {4 is} the pigment that runs photosynthesis, and it is
green, and a working leaf holds so much of it that nothing else registers.
Underneath sit the carotenoids, the same family of pigments that colours carrots
and egg yolks. They are there in {5 June, nobody can see them}, because
chlorophyll is {6 louder and drowns them out entirely}.

[3] {7 Broken down faster than it is replaced as the nights lengthen, a tree
stops rebuilding chlorophyll and the green retreats.} The carotenoids are simply
uncovered, which is why a stand of birches goes yellow so {8 fast}: nothing has
to be manufactured. The colour was finished and waiting.

[4] {9 Similarly,} the reds are a different story. Anthocyanins are not sitting
under the chlorophyll waiting to be {10 revealed, a tree makes them in autumn},
in the same weeks it is shutting the leaf down, at real metabolic cost. Why a
tree {11 will} spend energy on {12 them} in a leaf it is about to drop is still
argued over.

[5] {13} The practical upshot is that yellow and red answer to different
weather. A dry, bright autumn with cool nights {14 produces stronger reds,
concentrates the sugars, and slows the loss of the leaf}. Yellow arrives on
schedule almost regardless.

[6] {15} It is worth knowing which of the two you are looking at. One is a
curtain going up. The other is a performance nobody has fully explained.`,
  questions: [
    {
      number: 1,
      subskill: "commas",
      family: "run-on-sentence",
      difficulty: "Easy",
      keep: false,
      key: "one. The",
      noChange: "Two complete sentences run together with no punctuation between them.",
      wrong: [
        ["one, the", "Adding a comma turns the run-on into a comma splice."],
        ["one the,", "The comma now falls after the new subject and before its verb."],
      ],
      why:
        "'A maple leaf in October is not changing colour so much as ceasing to hide one' and 'The " +
        "yellows and oranges … were present all summer' are both complete sentences.",
      steps: [
        "Find where the first complete thought ends: after 'one.'",
        "Separate the two sentences with a full stop.",
      ],
      hint: "The second half begins with a new subject and its own verb.",
      trap: "The sentence is long enough that the join passes without a pause.",
    },
    {
      number: 2,
      subskill: "subject-verb agreement",
      family: "compound-subject-with-and",
      difficulty: "Medium",
      keep: false,
      key: "were",
      noChange: "The singular verb does not agree with the compound subject 'yellows and oranges.'",
      wrong: [
        ["is", "The verb is still singular and the present tense contradicts 'all summer.'"],
        ["has been", "The singular present perfect misses the number and the closed time frame."],
      ],
      why:
        "'The yellows and oranges' names two things joined by 'and,' so the verb is plural, and the " +
        "sentence reports a past summer.",
      steps: [
        "Count the nouns in the subject. There are two.",
        "Choose the plural past-tense verb.",
      ],
      hint: "Two nouns joined by 'and' are plural, however singular each one is.",
      trap: "A long relative clause separates the subject from its verb.",
    },
    {
      number: 3,
      subskill: "introductions",
      family: "paragraph-opening",
      difficulty: "Medium",
      stem: "Which choice, if added here, provides the most effective opening for this paragraph?",
      key: "The covering is a single pigment, and it is the most abundant one in the leaf.",
      wrong: [
        [
          "Maples belong to a genus that includes roughly a hundred and thirty species.",
          "The taxonomy of maples is never taken up again anywhere in the essay.",
        ],
        [
          "Photosynthesis converts light, water and carbon dioxide into usable sugars.",
          "A definition of photosynthesis is background the paragraph does not build on.",
        ],
        [
          "There are several pigments at work inside an ordinary green leaf.",
          "The vague plural restates the first paragraph instead of advancing it.",
        ],
      ],
      why:
        "Paragraph 1 ends by saying what changes is the covering. This paragraph names that covering, " +
        "so the opening should make the handoff.",
      steps: [
        "Read the last sentence of paragraph 1 and note what it leaves unnamed.",
        "Choose the opening that names it.",
      ],
      hint: "The previous paragraph ends on a pronoun with no noun; this paragraph supplies it.",
      trap: "Every choice is true about leaves, so accuracy alone cannot decide it.",
    },
    {
      number: 4,
      subskill: "verb forms",
      family: "present-tense-for-a-definition",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["was", "The past tense would confine a definition to some earlier time."],
        ["has been", "The present perfect implies a span that began and might end."],
        ["is being", "The progressive suggests a temporary state rather than what chlorophyll is."],
      ],
      why:
        "The sentence defines a term, and definitions take the simple present, as the clauses around " +
        "it do.",
      steps: [
        "Note that the clause defines what chlorophyll is.",
        "Keep the simple present.",
      ],
      hint: "The rest of the sentence is in the present; match it.",
      trap: "The paragraph goes on to describe a seasonal process, which invites a past tense.",
    },
    {
      number: 5,
      subskill: "clause relationships",
      family: "comma-splice",
      difficulty: "Medium",
      keep: false,
      key: "June, but nobody can see them",
      noChange: "Two independent clauses are joined by a comma with no conjunction.",
      wrong: [
        [
          "June, and nobody can see them",
          "'And' repairs the splice but loses the contrast between being present and being invisible.",
        ],
        [
          "June, nobody seeing them",
          "The participle leaves the second half without a main verb of its own.",
        ],
      ],
      why:
        "The sentence turns on an opposition: the pigments are present and cannot be seen. 'But' " +
        "repairs the splice and keeps that opposition.",
      steps: [
        "Test each side of the comma as a sentence. Both stand.",
        "Choose the conjunction that names the relationship, which here is contrast.",
      ],
      hint: "The whole essay rests on things being present and hidden.",
      trap: "'And' is the reflex repair and flattens the contrast into a list.",
    },
    {
      number: 6,
      subskill: "conciseness",
      family: "mixed-metaphor-padding",
      difficulty: "Easy",
      keep: false,
      key: "simply more abundant",
      noChange: "'Louder' and 'drowns them out' pile a sound metaphor onto a question of quantity.",
      wrong: [
        ["louder than they are", "The metaphor remains and still describes volume rather than amount."],
        ["so much louder that it drowns them out", "The phrasing is longer and doubles the same figure."],
      ],
      why:
        "The paragraph has already said the leaf holds so much chlorophyll that nothing else " +
        "registers. Naming the cause plainly keeps the explanation about quantity.",
      steps: [
        "Ask what actually hides the carotenoids: there is simply more chlorophyll.",
        "State that rather than reaching for a figure of speech.",
      ],
      hint: "The sentence before this one already gave the real reason.",
      trap: "The metaphor is vivid, and vividness reads as good writing.",
    },
    {
      number: 7,
      subskill: "modifiers",
      family: "dangling-participle",
      difficulty: "Hard",
      keep: false,
      key: "Broken down faster than it is replaced as the nights lengthen, the chlorophyll retreats and the green goes with it.",
      noChange: "The opening phrase describes the chlorophyll, but the noun after the comma is 'a tree.'",
      wrong: [
        [
          "Breaking down faster than it is replaced as the nights lengthen, a tree stops rebuilding chlorophyll.",
          "The active form makes the tree the thing breaking down.",
        ],
        [
          "Broken down faster than it is replaced as the nights lengthen, the green retreats from the leaf.",
          "The phrase now describes 'the green,' which is an appearance rather than a compound.",
        ],
      ],
      why:
        "A participial phrase at the head of a sentence attaches to the first noun after the comma. " +
        "Chlorophyll is what breaks down; the tree is what stops replacing it.",
      steps: [
        "Ask what breaks down faster than it is replaced. The chlorophyll does.",
        "Rewrite so 'the chlorophyll' follows the comma.",
      ],
      hint: "Read the opening phrase, then the first noun after the comma, and see if they match.",
      trap: "The sentence states something true about the tree, so nothing sounds wrong.",
    },
    {
      number: 8,
      subskill: "precision",
      family: "vague-comparative",
      difficulty: "Easy",
      keep: false,
      key: "abruptly",
      noChange: "'Fast' describes speed, but the point is that the change needs no preparation.",
      wrong: [
        ["quickly", "The adverb is a synonym for the original and misses the same distinction."],
        ["at a good rate", "The phrase is vaguer than the single word it replaces."],
      ],
      why:
        "The colon that follows explains why: nothing has to be manufactured. The adverb should name " +
        "suddenness rather than mere speed, because suddenness is what an uncovering produces.",
      steps: [
        "Read the clause after the colon and note what it explains.",
        "Choose the adverb that the explanation actually accounts for.",
      ],
      hint: "An uncovering has no build-up; a manufacture does.",
      trap: "'Fast' is perfectly idiomatic and almost right.",
    },
    {
      number: 9,
      subskill: "transitions",
      family: "comparison-versus-contrast-transition",
      difficulty: "Medium",
      keep: false,
      key: "The reds, though,",
      noChange: "'Similarly' claims a likeness, but this paragraph draws the essay's central distinction.",
      wrong: [
        ["Consequently,", "The reds are not caused by the yellows being uncovered."],
        ["For instance,", "Red is not an example of the uncovering but its opposite."],
      ],
      why:
        "Paragraph 3 explains a colour that is revealed. This paragraph explains one that is made, so " +
        "the transition has to mark the opposition.",
      steps: [
        "Ask how the reds differ from the yellows in the essay's account.",
        "Choose the transition that marks that difference.",
      ],
      hint: "The sentence itself says 'a different story.'",
      trap: "The two paragraphs are structurally parallel, which makes 'Similarly' feel apt.",
    },
    {
      number: 10,
      subskill: "semicolons and colons",
      family: "semicolon-between-balanced-clauses",
      difficulty: "Hard",
      keep: false,
      key: "revealed; a tree makes them in autumn",
      noChange: "A comma alone cannot join two independent clauses of equal weight.",
      wrong: [
        [
          "revealed: a tree makes them in autumn",
          "A colon introduces an explanation, but the second clause states the opposing fact.",
        ],
        [
          "revealed and a tree makes them in autumn",
          "Without a comma before 'and' the two clauses run together unpunctuated.",
        ],
      ],
      why:
        "The sentence denies one account and states another. Both halves are complete, and a " +
        "semicolon holds the correction against the denial without subordinating either.",
      steps: [
        "Confirm both sides stand alone as sentences. They do.",
        "Ask whether the second explains the first or replaces it. It replaces it.",
      ],
      hint: "The two clauses are rival accounts, not a statement and its reason.",
      trap: "The second clause does feel explanatory, which points the eye toward a colon.",
    },
    {
      number: 11,
      subskill: "consistency",
      family: "modal-consistency",
      difficulty: "Medium",
      keep: false,
      key: "would",
      noChange: "The simple future asserts a certainty the sentence is explicitly leaving open.",
      wrong: [
        ["did", "The past tense reports a settled event rather than a general question."],
        ["should", "The modal introduces obligation, which the sentence is not discussing."],
      ],
      why:
        "The clause poses a question that is still argued over, and 'would' is the modal that frames " +
        "a general case without asserting it.",
      steps: [
        "Note the sentence ends by saying the matter is unresolved.",
        "Keep the modal that leaves it unresolved.",
      ],
      hint: "The verb has to match the sentence's own admission of uncertainty.",
      trap: "The surrounding paragraph is confident, which makes a flatter verb feel consistent.",
    },
    {
      number: 12,
      subskill: "pronouns",
      family: "plural-antecedent",
      difficulty: "Easy",
      keep: true,
      wrong: [
        ["it", "The singular pronoun cannot stand for the plural noun 'anthocyanins.'"],
        ["these ones", "The phrase is nonstandard and adds nothing the pronoun does not carry."],
        ["the chlorophyll", "Naming chlorophyll reverses the claim, since it is not what the tree makes in autumn."],
      ],
      why:
        "The pronoun refers to 'Anthocyanins,' the plural subject of the clause before the semicolon.",
      steps: [
        "Find what the tree makes in autumn: the anthocyanins.",
        "Match the pronoun to that plural.",
      ],
      hint: "The clause before the semicolon names the antecedent.",
      trap: "'Chlorophyll' is the more familiar noun and appears throughout the essay.",
    },
    {
      number: 13,
      subskill: "relevance",
      family: "irrelevant-detail",
      difficulty: "Medium",
      stem:
        "At this point, the writer is considering adding the following true sentence: “Peak colour " +
        "in the upper Midwest usually falls in the first two weeks of October.” Should the writer " +
        "make this addition?",
      key: "No, because the paragraph is about which weather produces which colour, not about timing.",
      wrong: [
        [
          "Yes, because it tells the reader when to expect the effects the paragraph describes.",
          "The paragraph distinguishes two colours by cause, and a calendar date does not serve that.",
        ],
        [
          "Yes, because the essay opens by placing a maple leaf in October.",
          "An echo of an earlier detail does not make a sentence belong in this paragraph.",
        ],
        [
          "No, because the essay has already stated that yellow arrives on schedule.",
          "That sentence follows the marker, so it is not what makes the addition wrong.",
        ],
      ],
      why:
        "The paragraph's job is to connect weather to pigment. A regional peak date belongs to a " +
        "different kind of essay and interrupts the causal account.",
      steps: [
        "Name what the paragraph is doing: linking conditions to colours.",
        "Test the sentence against that rather than against its usefulness.",
      ],
      hint: "Ask whether the sentence helps explain a colour or merely dates one.",
      trap: "The date is genuinely useful information about autumn leaves.",
    },
    {
      number: 14,
      subskill: "parallelism",
      family: "parallel-verb-series",
      difficulty: "Hard",
      keep: true,
      wrong: [
        [
          "produces stronger reds, concentrating the sugars, and slows the loss of the leaf",
          "The middle item shifts to an -ing form the other two do not use.",
        ],
        [
          "produces stronger reds, the sugars are concentrated, and slows the loss of the leaf",
          "The middle item becomes a clause with a different subject.",
        ],
        [
          "produces stronger reds, concentrates the sugars, and the leaf is slower to fall",
          "The third item becomes a clause with a new subject and a passive verb.",
        ],
      ],
      why:
        "Three present-tense verbs share the subject 'A dry, bright autumn,' and each has to be able " +
        "to follow it directly.",
      steps: [
        "Read 'A dry, bright autumn with cool nights' into each of the three items.",
        "Keep the version in which all three fit that frame.",
      ],
      hint: "Test a series by reading the sentence stem separately into each item.",
      trap: "The three effects are physically different, which makes varying the grammar feel natural.",
    },
    {
      number: 15,
      subskill: "support",
      family: "supporting-detail",
      difficulty: "Medium",
      stem:
        "Given that all the choices are true, which one, if added here, best prepares the reader " +
        "for the essay's closing distinction?",
      key: "One colour is subtraction and the other is construction, and only one of them costs the tree anything.",
      wrong: [
        [
          "Both kinds of pigment are eventually lost when the leaf falls from the tree.",
          "A shared ending does not prepare a distinction between two beginnings.",
        ],
        [
          "Carotenoids also protect the leaf from damage by excess light during summer.",
          "A second function of carotenoids does not bear on the contrast being drawn.",
        ],
        [
          "Some species, such as ash, tend toward purple rather than red or yellow.",
          "A third colour complicates the pair the closing paragraph is built on.",
        ],
      ],
      why:
        "The last paragraph calls one a curtain going up and the other a performance. The setup has " +
        "to state that difference plainly before the figure lands.",
      steps: [
        "Read the closing two sentences and name the contrast they draw.",
        "Keep the choice that states it directly.",
      ],
      hint: "The closing is a metaphor; the support should give it its literal basis.",
      trap: "The choice about a third colour is interesting and undermines the pairing.",
    },
    {
      number: 16,
      subskill: "purpose",
      family: "goal-assessment",
      difficulty: "Hard",
      stem:
        "Suppose the writer's goal had been to show that two things which look like one phenomenon " +
        "are produced in opposite ways. Would this essay accomplish that goal?",
      key: "Yes, because the yellows are uncovered by a pigment breaking down and the reds are manufactured at cost.",
      wrong: [
        [
          "Yes, because it explains that chlorophyll is the most abundant pigment in a working leaf.",
          "Chlorophyll's abundance explains the concealment, not the contrast between the two colours.",
        ],
        [
          "No, because the essay admits that the purpose of the red pigment is still argued over.",
          "The unexplained purpose is separate from the established fact that the tree makes it.",
        ],
        [
          "No, because both colours appear in the same leaves during the same few weeks.",
          "Appearing together is exactly what makes them look like one phenomenon.",
        ],
      ],
      why:
        "Autumn colour looks like a single event. The essay shows yellow is revealed by subtraction " +
        "and red is built at metabolic cost in the weeks the leaf is being shut down.",
      steps: [
        "Name how each colour arrives according to the essay.",
        "Keep the reason that names both mechanisms.",
      ],
      hint: "The goal names two opposite processes, so the reason must name two.",
      trap: "One wrong choice cites the essay's own admission of uncertainty as a failure.",
    },
  ],
};
