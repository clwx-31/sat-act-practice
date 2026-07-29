/*
 * QUESTION BANK
 * =============
 * This is the ONLY file you need to edit to add or change questions.
 *
 * Each question is an object with these fields:
 *   test        "SAT" or "ACT"
 *   section     e.g. "Math", "Reading & Writing", "English", "Science"
 *   topic       a short label, e.g. "Algebra", "Geometry"
 *   difficulty  "Easy", "Medium", or "Hard"
 *   question    the question text (a string)
 *   choices     an array of answer options
 *   answer      the index (0-based) of the correct choice:
 *                 0 = first choice, 1 = second, 2 = third, 3 = fourth
 *   explanation why the answer is correct (shown after you answer)
 *
 * To add a question: copy an existing { ... } block, paste it, edit the
 * fields, and make sure there is a comma after the closing }.
 * Everything is ORIGINAL so it is safe to publish and share.
 */

const QUESTIONS = [
  {
    test: "SAT",
    section: "Math",
    topic: "Algebra",
    difficulty: "Easy",
    question: "If 5(x − 2) = 3x + 4, what is the value of x?",
    choices: ["3", "5", "7", "9"],
    answer: 2,
    explanation:
      "Distribute: 5x − 10 = 3x + 4. Subtract 3x from both sides: 2x − 10 = 4. Add 10: 2x = 14. Divide by 2: x = 7.",
  },
  {
    test: "SAT",
    section: "Math",
    topic: "Linear Equations",
    difficulty: "Easy",
    question:
      "A gym charges a $30 one-time sign-up fee plus $20 per month. Which equation gives the total cost y, in dollars, after m months?",
    choices: ["y = 30m + 20", "y = 20m + 30", "y = 50m", "y = 20 + 30m"],
    answer: 1,
    explanation:
      "The $20 monthly charge depends on the number of months, so it is 20m. The $30 fee is paid only once, so it is a constant. Total: y = 20m + 30.",
  },
  {
    test: "SAT",
    section: "Math",
    topic: "Percentages",
    difficulty: "Easy",
    question: "A shirt originally priced at $40 is discounted by 25%. What is the sale price?",
    choices: ["$10", "$15", "$25", "$30"],
    answer: 3,
    explanation:
      "25% of $40 is 0.25 × 40 = $10. Subtract the discount from the original price: 40 − 10 = $30.",
  },
  {
    test: "SAT",
    section: "Math",
    topic: "Ratios & Proportions",
    difficulty: "Easy",
    question: "If 4 pencils cost $1.20, how much do 10 pencils cost at the same rate?",
    choices: ["$2.40", "$3.00", "$3.60", "$4.80"],
    answer: 1,
    explanation:
      "Find the cost per pencil: $1.20 ÷ 4 = $0.30. Then multiply by 10: 0.30 × 10 = $3.00.",
  },
  {
    test: "SAT",
    section: "Math",
    topic: "Systems of Equations",
    difficulty: "Medium",
    question: "If x + y = 10 and x − y = 4, what is the value of y?",
    choices: ["3", "4", "6", "7"],
    answer: 0,
    explanation:
      "Add the two equations: (x + y) + (x − y) = 10 + 4, so 2x = 14 and x = 7. Substitute into x + y = 10: 7 + y = 10, so y = 3.",
  },
  {
    test: "SAT",
    section: "Math",
    topic: "Slope",
    difficulty: "Medium",
    question: "A line passes through the points (0, 3) and (2, 7). What is the slope of the line?",
    choices: ["1", "2", "3", "4"],
    answer: 1,
    explanation:
      "Slope = (change in y) ÷ (change in x) = (7 − 3) ÷ (2 − 0) = 4 ÷ 2 = 2.",
  },
  {
    test: "SAT",
    section: "Math",
    topic: "Quadratics",
    difficulty: "Medium",
    question: "What are the solutions to x² − 5x + 6 = 0?",
    choices: ["x = 1 and x = 6", "x = 2 and x = 3", "x = −2 and x = −3", "x = 5 and x = 6"],
    answer: 1,
    explanation:
      "Factor into (x − 2)(x − 3) = 0. Each factor can be zero, so x = 2 or x = 3. (Check: 2 + 3 = 5 and 2 × 3 = 6.)",
  },
  {
    test: "SAT",
    section: "Math",
    topic: "Exponents",
    difficulty: "Medium",
    question: "Which expression is equivalent to (2x³)(3x²)?",
    choices: ["5x⁵", "6x⁵", "6x⁶", "5x⁶"],
    answer: 1,
    explanation:
      "Multiply the coefficients: 2 × 3 = 6. Add the exponents when multiplying like bases: x³ · x² = x^(3+2) = x⁵. Result: 6x⁵.",
  },
  {
    test: "SAT",
    section: "Math",
    topic: "Statistics",
    difficulty: "Medium",
    question:
      "The mean (average) of five numbers is 12. Four of the numbers are 10, 14, 8, and 16. What is the fifth number?",
    choices: ["10", "12", "14", "16"],
    answer: 1,
    explanation:
      "If the mean of five numbers is 12, their total is 5 × 12 = 60. The four known numbers add to 10 + 14 + 8 + 16 = 48. The fifth number is 60 − 48 = 12.",
  },
  {
    test: "SAT",
    section: "Math",
    topic: "Probability",
    difficulty: "Easy",
    question:
      "A bag contains 3 red, 5 blue, and 2 green marbles. If one marble is drawn at random, what is the probability it is red?",
    choices: ["1/10", "3/10", "3/7", "1/3"],
    answer: 1,
    explanation:
      "There are 3 + 5 + 2 = 10 marbles total, and 3 are red. Probability = favorable ÷ total = 3/10.",
  },
  {
    test: "SAT",
    section: "Math",
    topic: "Geometry",
    difficulty: "Easy",
    question: "A circle has a radius of 5. What is its area?",
    choices: ["10π", "25π", "50π", "100π"],
    answer: 1,
    explanation:
      "Area of a circle = πr². With r = 5, that is π × 5² = 25π.",
  },
  {
    test: "SAT",
    section: "Math",
    topic: "Geometry",
    difficulty: "Medium",
    question:
      "A right triangle has legs of length 6 and 8. What is the length of the hypotenuse?",
    choices: ["10", "12", "14", "48"],
    answer: 0,
    explanation:
      "Use the Pythagorean theorem: a² + b² = c². So 6² + 8² = 36 + 64 = 100, and c = √100 = 10.",
  },
  {
    test: "SAT",
    section: "Math",
    topic: "Functions",
    difficulty: "Medium",
    question: "If f(x) = 2x² − 3, what is the value of f(3)?",
    choices: ["9", "15", "27", "33"],
    answer: 1,
    explanation:
      "Substitute x = 3: f(3) = 2 × (3²) − 3 = 2 × 9 − 3 = 18 − 3 = 15. (Square before multiplying.)",
  },
  {
    test: "SAT",
    section: "Math",
    topic: "Percentages",
    difficulty: "Medium",
    question: "A value increases from 50 to 65. What is the percent increase?",
    choices: ["15%", "23%", "30%", "65%"],
    answer: 2,
    explanation:
      "Percent increase = (increase ÷ original) × 100. The increase is 65 − 50 = 15, so (15 ÷ 50) × 100 = 30%.",
  },
  {
    test: "SAT",
    section: "Math",
    topic: "Inequalities",
    difficulty: "Medium",
    question: "If 2x + 3 > 11, which of the following must be true?",
    choices: ["x > 4", "x < 4", "x > 7", "x > 14"],
    answer: 0,
    explanation:
      "Subtract 3 from both sides: 2x > 8. Divide by 2: x > 4. (The inequality sign only flips when you divide by a negative number, which we did not do here.)",
  },
  {
    test: "SAT",
    section: "Reading & Writing",
    topic: "Central Ideas",
    difficulty: "Easy",
    question:
      "For years, residents of Bellwether Island bought most of their vegetables from mainland farms. After volunteers converted an unused soccer field into community garden plots, islanders began growing tomatoes, beans, and greens locally. The garden now supplies produce to dozens of households and hosts weekly lessons for new gardeners.\n\nWhich choice best states the main idea of the text?",
    choices: [
      "Mainland farms grow a wider range of vegetables than Bellwether Island does.",
      "A community garden has helped island residents produce food and learn gardening skills.",
      "Most island residents would prefer to restore the unused soccer field.",
      "Gardening lessons are available only to households that buy mainland produce.",
    ],
    answer: 1,
    explanation:
      "The text focuses on two results of the community garden: it supplies local produce and offers gardening lessons. The other choices add claims that the text does not make.",
  },
  {
    test: "SAT",
    section: "Reading & Writing",
    topic: "Words in Context",
    difficulty: "Easy",
    question:
      "The first prototype of the water filter was bulky, but the engineers eventually devised a compact version that could fit inside a backpack.\n\nAs used in the text, “devised” most nearly means",
    choices: ["invented", "noticed", "measured", "requested"],
    answer: 0,
    explanation:
      "The engineers created a new, compact version of the filter, so “invented” best matches the meaning of “devised” in this context.",
  },
  {
    test: "SAT",
    section: "Reading & Writing",
    topic: "Textual Evidence",
    difficulty: "Medium",
    question:
      "A student claims that city trees can reduce the amount of energy nearby buildings use for cooling.\n\nWhich finding, if true, would most directly support the student's claim?",
    choices: [
      "Residents of tree-lined streets report seeing more birds than residents of other streets.",
      "Several tree species grow faster in cities than they do in rural forests.",
      "Buildings shaded by mature trees use less electricity during summer afternoons than comparable unshaded buildings.",
      "City crews spend more time pruning mature trees than planting young ones.",
    ],
    answer: 2,
    explanation:
      "Lower summer electricity use in otherwise comparable shaded buildings directly connects trees with reduced cooling energy. The other findings do not address building energy use.",
  },
  {
    test: "SAT",
    section: "Reading & Writing",
    topic: "Inferences",
    difficulty: "Medium",
    question:
      "Biologist Lena Ortiz expected the desert beetles to remain hidden during the hottest hours. Yet cameras recorded several beetles crossing open sand at noon after rare morning rainstorms. Ortiz noted that the beetles moved only when shallow pools had formed between the dunes.\n\nWhich conclusion is best supported by the text?",
    choices: [
      "The beetles cannot survive unless it rains every morning.",
      "The presence of temporary water may affect when the beetles become active.",
      "The cameras caused the beetles to leave their hiding places.",
      "The beetles are more active at noon than at any other time.",
    ],
    answer: 1,
    explanation:
      "The unusual noon activity occurred only when rain had created shallow pools, supporting the inference that temporary water may influence the beetles' activity. The text does not establish the stronger claims in the other choices.",
  },
  {
    test: "SAT",
    section: "Reading & Writing",
    topic: "Transitions",
    difficulty: "Easy",
    question:
      "The town library extended its weekend hours last spring. ______, the number of Saturday visitors increased by nearly 40 percent over the following three months.\n\nWhich choice completes the text with the most logical transition?",
    choices: ["As a result", "For example", "In contrast", "Meanwhile"],
    answer: 0,
    explanation:
      "The increase in visitors is presented as an outcome of the extended hours, so the cause-and-effect transition “As a result” is most logical.",
  },
  {
    test: "SAT",
    section: "Reading & Writing",
    topic: "Sentence Boundaries",
    difficulty: "Medium",
    question:
      "The museum's new exhibit features instruments made from recycled materials ______ visitors can play several of the instruments during scheduled demonstrations.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [", visitors", "; visitors", " visitors", ": and visitors"],
    answer: 1,
    explanation:
      "The clauses before and after the blank are both independent clauses. A semicolon correctly joins them without a coordinating conjunction.",
  },
  {
    test: "SAT",
    section: "Reading & Writing",
    topic: "Verb Agreement",
    difficulty: "Easy",
    question:
      "A collection of handwritten recipes from the 1920s ______ in the town archive.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["is preserved", "are preserved", "preserve", "have preserved"],
    answer: 0,
    explanation:
      "The subject is the singular noun “collection,” not the plural noun “recipes” in the modifying phrase. Therefore, the singular verb phrase “is preserved” is correct.",
  },
  {
    test: "SAT",
    section: "Reading & Writing",
    topic: "Rhetorical Synthesis",
    difficulty: "Medium",
    question:
      "A student wants to emphasize a similarity between two sculptures. The student has taken these notes:\n\n• Mira Chen completed River Arch in 2018.\n• River Arch is made of bent steel strips.\n• Tomas Vela completed Wind Frame in 2021.\n• Wind Frame is also made of bent steel strips.\n\nWhich choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      "Mira Chen completed River Arch three years before Tomas Vela completed Wind Frame.",
      "Completed in 2021, Tomas Vela's Wind Frame is a sculpture.",
      "Both Chen's River Arch and Vela's Wind Frame are constructed from bent steel strips.",
      "River Arch was completed in 2018 and is the work of Mira Chen.",
    ],
    answer: 2,
    explanation:
      "The correct choice directly emphasizes the requested similarity: both sculptures use bent steel strips. The other choices discuss dates or only one work.",
  },
  {
    test: "SAT",
    section: "Reading & Writing",
    topic: "Punctuation",
    difficulty: "Medium",
    question:
      "Dr. Nia Harper studies three nocturnal animals ______ bats, moths, and owls.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [",", ";", ":", "— and"],
    answer: 2,
    explanation:
      "The complete clause before the blank introduces a list of the three animals, so a colon is appropriate.",
  },
  {
    test: "SAT",
    section: "Reading & Writing",
    topic: "Data Interpretation",
    difficulty: "Hard",
    question:
      "A researcher recorded the average time that four materials took to decompose in a controlled compost bin: paper towel, 5 weeks; cardboard, 8 weeks; cotton cloth, 14 weeks; orange peel, 6 weeks.\n\nWhich statement accurately describes the data?",
    choices: [
      "Cardboard took twice as long to decompose as an orange peel.",
      "Cotton cloth took the longest to decompose.",
      "Paper towel and orange peel took the same amount of time to decompose.",
      "Orange peel took longer to decompose than cardboard.",
    ],
    answer: 1,
    explanation:
      "At 14 weeks, cotton cloth had the greatest recorded decomposition time. Each other statement conflicts with the given values.",
  },
  {
    test: "ACT",
    section: "English",
    topic: "Sentence Structure",
    difficulty: "Easy",
    question:
      "The neighborhood orchestra rehearsed every Thursday, the musicians were preparing for an outdoor concert.\n\nWhich revision best corrects the underlined portion represented by the comma?",
    choices: [
      "Thursday, the",
      "Thursday; the",
      "Thursday the",
      "Thursday, and because the",
    ],
    answer: 1,
    explanation:
      "The original joins two independent clauses with only a comma. A semicolon correctly separates the closely related complete thoughts.",
  },
  {
    test: "ACT",
    section: "English",
    topic: "Conciseness",
    difficulty: "Easy",
    question:
      "Because the trail was muddy in condition, the hikers moved slowly.\n\nWhich choice most effectively revises the underlined phrase “muddy in condition”?",
    choices: ["muddy", "in a muddy state", "characterized by mud", "muddy in its condition"],
    answer: 0,
    explanation:
      "“Muddy” expresses the full idea clearly and concisely. The other choices repeat the meaning without adding useful information.",
  },
  {
    test: "ACT",
    section: "English",
    topic: "Pronoun Agreement",
    difficulty: "Medium",
    question:
      "Neither Elena nor Priya had brought ______ camera to the bird sanctuary.\n\nWhich choice completes the sentence using standard pronoun agreement?",
    choices: ["their", "her", "our", "its"],
    answer: 1,
    explanation:
      "Both Elena and Priya are singular, and “neither...nor” treats them individually. The singular pronoun “her” agrees with the subject.",
  },
  {
    test: "ACT",
    section: "English",
    topic: "Organization",
    difficulty: "Medium",
    question:
      "A paragraph explains how to care for a new houseplant in this order: choosing a bright location, checking the soil's moisture, watering when the top layer is dry, and emptying excess water from the saucer. Which opening sentence would best introduce the paragraph?",
    choices: [
      "Houseplants have appeared in art for hundreds of years.",
      "Following a simple routine can help a new houseplant thrive.",
      "Some ceramic plant pots are painted by hand.",
      "Many people disagree about which flower has the best scent.",
    ],
    answer: 1,
    explanation:
      "The paragraph presents a sequence of basic plant-care steps, so the sentence about following a simple routine best introduces its focus.",
  },
  {
    test: "ACT",
    section: "English",
    topic: "Transitions",
    difficulty: "Medium",
    question:
      "The first batch of bread had a dense texture. ______, the baker increased the dough's rising time before preparing the second batch.\n\nWhich choice provides the most logical transition?",
    choices: ["Consequently", "Similarly", "For instance", "Nevertheless"],
    answer: 0,
    explanation:
      "The baker's change is a response to the first batch's dense texture, so “Consequently” clearly signals cause and effect.",
  },
  {
    test: "ACT",
    section: "Math",
    topic: "Algebra",
    difficulty: "Easy",
    question: "What is the value of 3a + 2 when a = 4?",
    choices: ["9", "12", "14", "20"],
    answer: 2,
    explanation:
      "Substitute 4 for a: 3(4) + 2 = 12 + 2 = 14.",
  },
  {
    test: "ACT",
    section: "Math",
    topic: "Geometry",
    difficulty: "Easy",
    question:
      "A rectangular garden is 12 feet long and 7 feet wide. What is its perimeter, in feet?",
    choices: ["19", "38", "84", "168"],
    answer: 1,
    explanation:
      "The perimeter of a rectangle is 2(length + width). Here, 2(12 + 7) = 2(19) = 38 feet.",
  },
  {
    test: "ACT",
    section: "Math",
    topic: "Functions",
    difficulty: "Medium",
    question:
      "For all x ≠ 1, which expression is equivalent to (x² − 1)/(x − 1)?",
    choices: ["x − 1", "x + 1", "x² + 1", "1"],
    answer: 1,
    explanation:
      "Factor the numerator: x² − 1 = (x − 1)(x + 1). Since x ≠ 1, cancel x − 1 to get x + 1.",
  },
  {
    test: "ACT",
    section: "Math",
    topic: "Coordinate Geometry",
    difficulty: "Medium",
    question:
      "What is the midpoint of the line segment with endpoints (−2, 5) and (6, 1)?",
    choices: ["(2, 3)", "(4, 6)", "(2, 2)", "(−4, 4)"],
    answer: 0,
    explanation:
      "Average the x-coordinates and the y-coordinates: ((−2 + 6)/2, (5 + 1)/2) = (2, 3).",
  },
  {
    test: "ACT",
    section: "Math",
    topic: "Probability",
    difficulty: "Hard",
    question:
      "A fair six-sided number cube is rolled twice. What is the probability that both rolls show an even number?",
    choices: ["1/6", "1/4", "1/3", "1/2"],
    answer: 1,
    explanation:
      "Each roll has 3 even outcomes out of 6, so the probability of an even number is 1/2. The rolls are independent, so (1/2)(1/2) = 1/4.",
  },
  {
    test: "ACT",
    section: "Reading",
    topic: "Main Idea",
    difficulty: "Easy",
    question:
      "When I first volunteered at the repair café, I expected to spend the morning sorting tools. Instead, Mara showed me how to replace the frayed cord on an old lamp. By noon, the lamp glowed again, and its owner was telling us where it had stood in her childhood home. I began to understand that the café restored more than broken objects.\n\nThe passage mainly emphasizes the narrator's realization that the repair café",
    choices: [
      "needs a better system for sorting tools",
      "preserves objects that carry personal meaning",
      "repairs only lamps and other electrical items",
      "asks volunteers to bring objects from home",
    ],
    answer: 1,
    explanation:
      "The restored lamp matters because of its connection to the owner's childhood, leading the narrator to see that the café preserves memories as well as objects.",
  },
  {
    test: "ACT",
    section: "Reading",
    topic: "Detail",
    difficulty: "Easy",
    question:
      "The footpath followed the river for a mile before turning uphill into a grove of cedar trees. At the top of the hill, hikers reached a wooden platform overlooking the valley.\n\nAccording to the passage, what did hikers reach after walking uphill?",
    choices: ["A river crossing", "A cedar cabin", "A wooden platform", "A second footpath"],
    answer: 2,
    explanation:
      "The passage directly states that hikers reached a wooden platform at the top of the hill.",
  },
  {
    test: "ACT",
    section: "Reading",
    topic: "Vocabulary in Context",
    difficulty: "Medium",
    question:
      "Although the committee's early meetings were marked by disagreement, the members eventually reached a common position on the park proposal.\n\nAs used in the passage, “position” most nearly means",
    choices: ["location", "job", "opinion", "posture"],
    answer: 2,
    explanation:
      "In the context of reaching agreement on a proposal, “position” means a viewpoint or opinion.",
  },
  {
    test: "ACT",
    section: "Reading",
    topic: "Inference",
    difficulty: "Medium",
    question:
      "Jules arrived at the theater carrying a small sewing kit. Before the rehearsal began, he examined the actors' costumes, reinforced two loose buttons, and repaired a torn hem.\n\nIt can reasonably be inferred that Jules",
    choices: [
      "is responsible for helping maintain the costumes",
      "plans to perform the lead role",
      "has never attended a rehearsal before",
      "designed the theater building",
    ],
    answer: 0,
    explanation:
      "Jules brings sewing supplies and repairs several costumes, strongly suggesting that maintaining them is part of his role.",
  },
  {
    test: "ACT",
    section: "Reading",
    topic: "Author's Purpose",
    difficulty: "Hard",
    question:
      "A passage opens with a description of crowded city sidewalks, then explains how one neighborhood converted several parking spaces into small public seating areas. It concludes with survey results showing that most nearby shop owners favor keeping the seating areas.\n\nThe author's primary purpose is to",
    choices: [
      "argue that all city parking spaces should be removed",
      "describe a neighborhood project and present evidence of its reception",
      "compare the profits of several neighborhood shops",
      "explain how to conduct an opinion survey",
    ],
    answer: 1,
    explanation:
      "The passage describes the seating project and then reports survey evidence about how local shop owners received it. The other choices are broader or address details not mentioned.",
  },
  {
    test: "ACT",
    section: "Science",
    topic: "Data Interpretation",
    difficulty: "Easy",
    question:
      "Four identical cups of water were placed under lamps for 30 minutes. The lamps were 10, 20, 30, and 40 centimeters from the cups. The final water temperatures were 34°C, 30°C, 27°C, and 25°C, respectively.\n\nWhich lamp distance produced the highest final water temperature?",
    choices: ["10 cm", "20 cm", "30 cm", "40 cm"],
    answer: 0,
    explanation:
      "The highest recorded temperature was 34°C, which corresponded to the lamp placed 10 centimeters from the cup.",
  },
  {
    test: "ACT",
    section: "Science",
    topic: "Experimental Design",
    difficulty: "Medium",
    question:
      "A student tests whether fertilizer affects bean plant height. She gives 5 grams of fertilizer to ten plants and no fertilizer to ten other plants. All plants receive the same soil, light, and water.\n\nWhat is the primary purpose of the plants that receive no fertilizer?",
    choices: [
      "They serve as a control group for comparison.",
      "They increase the amount of fertilizer tested.",
      "They ensure that every plant grows to the same height.",
      "They measure the amount of light in the experiment.",
    ],
    answer: 0,
    explanation:
      "The unfertilized plants provide a baseline. Comparing them with the fertilized plants helps isolate the effect of fertilizer on height.",
  },
  {
    test: "ACT",
    section: "Science",
    topic: "Trends",
    difficulty: "Medium",
    question:
      "A culture contained 200 bacteria at hour 0, 360 at hour 1, 610 at hour 2, and 940 at hour 3.\n\nWhich statement best describes the bacterial population over the measured period?",
    choices: [
      "It decreased at a constant rate.",
      "It remained unchanged.",
      "It increased, and the amount of increase grew each hour.",
      "It increased by exactly 200 bacteria each hour.",
    ],
    answer: 2,
    explanation:
      "The population rose throughout the experiment. The hourly increases were 160, 250, and 330 bacteria, so the amount of increase also grew each hour.",
  },
  {
    test: "ACT",
    section: "Science",
    topic: "Hypotheses",
    difficulty: "Medium",
    question:
      "A researcher hypothesizes that salt lowers the freezing point of water. Which experiment would best test this hypothesis?",
    choices: [
      "Compare the freezing temperatures of equal volumes of pure water and saltwater.",
      "Compare the boiling times of different volumes of pure water.",
      "Measure how quickly salt dissolves in water at room temperature.",
      "Freeze equal volumes of pure water in containers of different shapes.",
    ],
    answer: 0,
    explanation:
      "The best test changes the presence of salt while holding water volume constant, then measures the outcome named in the hypothesis: freezing temperature.",
  },
  {
    test: "ACT",
    section: "Science",
    topic: "Conflicting Viewpoints",
    difficulty: "Hard",
    question:
      "Scientist 1 argues that a lake's declining fish population is mainly caused by warmer water. Scientist 2 argues that the decline is mainly caused by reduced food availability.\n\nWhich observation would most directly support Scientist 2 over Scientist 1?",
    choices: [
      "The lake's water temperature has risen by 2°C in ten years.",
      "Fish populations declined after insects eaten by the fish became scarce, while water temperature remained stable.",
      "The fish are found in both shallow and deep parts of the lake.",
      "Warm years and cool years have occurred throughout the lake's history.",
    ],
    answer: 1,
    explanation:
      "A decline following reduced food availability while temperature stays stable supports the food-based explanation and weakens the claim that warming is the main cause.",
  },
];
