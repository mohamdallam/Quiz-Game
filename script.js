// Store quiz questions in an array
const questions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris",
    timeLimit: 20,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Mercury"],
    correctAnswer: "Mars",
    timeLimit: 15,
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: [
      "William Shakespeare",
      "Charles Dickens",
      "Jane Austen",
      "Mark Twain",
    ],
    correctAnswer: "William Shakespeare",
    timeLimit: 25,
  },

  {
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Giraffe", "Blue Whale", "Kangaroo"],
    correctAnswer: "Blue Whale",
    timeLimit: 30,
  },

  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correctAnswer: "Carbon Dioxide",
    timeLimit: 18,
  },
  // Add more questions here...
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = questions[currentQuestionIndex].timeLimit;
let timer;

function validateLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email.trim() === "" || password.trim() === "") {
    alert("Please enter both email and password.");
  } else {
    // Both fields are filled, proceed to the quiz
    startQuiz();
  }
}

function startQuiz() {
  // Hide login page and show quiz page
  document.getElementById("login-page").style.display = "none";
  document.getElementById("quiz-page").style.display = "block";

  // Start the timer for the first question
  startTimer();
  // Display the first question
  displayQuestion();
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  if (timeLeft === 0) {
    // Time's up for the current question
    checkAnswer(null);
  } else {
    document.getElementById("time-left").textContent = timeLeft;
    timeLeft--;
  }
}

function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  document.getElementById("question").textContent = currentQuestion.question;

  const optionsList = document.getElementById("options");
  optionsList.innerHTML = "";
  currentQuestion.options.forEach((option) => {
    const li = document.createElement("li");
    const radioInput = document.createElement("input");
    radioInput.type = "radio";
    radioInput.name = "answer";
    radioInput.value = option;
    li.appendChild(radioInput);
    li.appendChild(document.createTextNode(option));
    optionsList.appendChild(li);
  });
}

function nextQuestion() {
  const selectedOption = document.querySelector("input[name='answer']:checked");
  if (selectedOption) {
    checkAnswer(selectedOption.value);
  } else {
    // No answer selected, show an alert or handle it as you prefer
    alert("Please select an answer.");
  }
}

function checkAnswer(userAnswer) {
  clearInterval(timer);
  const correctAnswer = questions[currentQuestionIndex].correctAnswer;
  if (userAnswer === correctAnswer) {
    score++;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    // Proceed to the next question
    timeLeft = questions[currentQuestionIndex].timeLimit;
    startTimer();
    displayQuestion();
  } else {
    // Quiz is over, show the result page
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz-page").style.display = "none";
  document.getElementById("result-page").style.display = "block";
  document.getElementById("score").textContent =
    score + " / " + questions.length;
}
