// DOM 元素
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("myButton");
const restartButton = document.getElementById("restart-button");

const questionEl = document.getElementById("question");
const currentQuestionEl = document.getElementById("current-question");
const totalQuestionsEl = document.getElementById("total-questions");
const scoreEl = document.getElementById("score");

const answerButtons = [
    document.getElementById("answer1"),
    document.getElementById("answer2"),
    document.getElementById("answer3"),
    document.getElementById("answer4"),
];

const progressEl = document.getElementById("progress");
const correctAnswersEl = document.getElementById("correct-answers");
const totalQuestionsResultEl = document.getElementById("total-questions-result");
const resultMessageEl = document.querySelector(".result-message");

// 题目数据
const questions = [

  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];


let currentQuestionIndex = 0;
let score = 0;

// 显示当前题目
function showQuestion() {
    const q = questions[currentQuestionIndex];

    questionEl.textContent = q.question;
    currentQuestionEl.textContent = currentQuestionIndex + 1;
    totalQuestionsEl.textContent = questions.length;
    scoreEl.textContent = score;

    answerButtons.forEach((btn, i) => {
        btn.textContent = q.answers[i].text;
        btn.disabled = false;
        btn.classList.remove("correct", "wrong");
    });

    updateProgress();
}

// 更新进度条
function updateProgress() {
    const percent = (currentQuestionIndex / questions.length) * 100;
    progressEl.style.width = percent + "%";
}

// 选择答案
function selectAnswer(index) {
    const q = questions[currentQuestionIndex];
    const selected = answerButtons[index];
    const correctIndex = q.answers.findIndex((a) => a.correct);
    const correct = answerButtons[correctIndex];

    if (q.answers[index].correct) {
        selected.classList.add("correct");
        score++;
        scoreEl.textContent = score;
    } else {
        selected.classList.add("wrong");
        correct.classList.add("correct");
    }

    // 锁住所有按钮，防止重复点击
    answerButtons.forEach((btn) => (btn.disabled = true));

    // 短暂停顿后进入下一题
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

// 开始页 -> 题目页
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    startScreen.classList.remove("active");
    resultScreen.classList.remove("active");
    quizScreen.classList.add("active");
    showQuestion();
}

// 题目页 -> 结果页
function showResults() {
    progressEl.style.width = "100%";
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    correctAnswersEl.textContent = score;
    totalQuestionsResultEl.textContent = questions.length;

    const ratio = score / questions.length;
    if (ratio === 1) {
        resultMessageEl.textContent = "Perfect! You're an expert! 🎉";
        resultMessageEl.style.color = "#4caf50";
    } else if (ratio >= 0.6) {
        resultMessageEl.textContent = "Good job!";
        resultMessageEl.style.color = "#4caf50";
    } else if (ratio >= 0.4) {
        resultMessageEl.textContent = "Not bad, keep practicing!";
        resultMessageEl.style.color = "#f39c12";
    } else {
        resultMessageEl.textContent = "Keep studying and try again!";
        resultMessageEl.style.color = "#e74c3c";
    }
}

// 结果页 -> 开始页
function restartQuiz() {
    resultScreen.classList.remove("active");
    startScreen.classList.add("active");
}

// 绑定事件
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

answerButtons.forEach((btn, i) => {
    btn.addEventListener("click", () => selectAnswer(i));
});
