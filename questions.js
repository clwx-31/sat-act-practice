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
];
