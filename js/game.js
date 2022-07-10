const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "What is the name given to this symbol '%' in JavaScript?",
    choice1: "Percentage",
    choice2: "modulus",
    choice3: "Assingment Operator",
    choice4: "And Operator",
    answer: 2,
  },
  {
    question: "What is the name given to this symbol '=' in JavaScript?",
    choice1: "Equals to",
    choice2: "modulus",
    choice3: "Assingment Operator",
    choice4: "And Operator",
    answer: 3,
  },
  {
    question: "What is the name given to this symbol '===' in JavaScript?",
    choice1: "Object",
    choice2: "Euality Operator",
    choice3: "Assingment Operator",
    choice4: "Strict Equality Operator",
    answer: 4,
  },
  {
    question: "Which symbol is used to denote an array in JavaScript?",
    choice1: "<=",
    choice2: "!==",
    choice3: "{}",
    choice4: "[]",
    answer: 4,
  },
  {
    question: "Which of the following is not a JavaScript library?",
    choice1: "React",
    choice2: "Vue",
    choice3: "Django",
    choice4: "Angular",
    answer: 3,
  },
  {
    question: "All the following are programming languages except",
    choice1: "NodeJs",
    choice2: "Dart",
    choice3: "BASIC",
    choice4: "C",
    answer: 1,
  },
  {
    question:
      "Which built in JavaScript method is used to save data into localStorage?",
    choice1: "localStorage.setItem",
    choice2: "localStorage.getItem",
    choice3: "localStorage.strignify.parse",
    choice4: "localStorage.appendItem",
    answer: 1,
  },
  {
    question: "Which browser's JavaScript engine was used to develop NodeJs?",
    choice1: "UC Browser",
    choice2: "Google Chrome",
    choice3: "Opera Mini",
    choice4: "Microsoft Edge",
    answer: 2,
  },
  {
    question:
      "What programming language is best recommended for writting another programmning language?",
    choice1: "C++",
    choice2: "Python",
    choice3: "Assembly Language",
    choice4: "Machine Language",
    answer: 4,
  },
  {
    question: "All the following are programming paradigms except....",
    choice1: "Functional Programming",
    choice2: "Imperative Programming",
    choice3: "Intuitive Programming",
    choice4: "Object Oriented Programming",
    answer: 3,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("../htmls/gameover.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply == "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
