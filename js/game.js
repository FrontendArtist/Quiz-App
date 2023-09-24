import formatData from "./helpFormatData.js";

const loader = document.getElementById("loader");
const errorLog = document.getElementById("error");
const container = document.getElementById("container");
const questionText = document.getElementById("question-text");
const answerList = document.querySelectorAll(".answer-text");
const showScore = document.getElementById("score");
const showQuestionNumber = document.getElementById("question-number");
const nextButton = document.getElementById("next-button");
const finishButton = document.getElementById("finish-button");
const difficulty = JSON.parse(localStorage.getItem("difficulty")) || "medium";
const loweCaseDifficulty = difficulty.toLowerCase();
const URL = `https://opentdb.com/api.php?amount=10&difficulty=${loweCaseDifficulty}&type=multiple`;
let formattedData = null;
let questionIndex = 0;
let correctAnswer = null;
let score = 0;

localStorage.setItem("score", JSON.stringify(0));

const fetchData = async () => {
  try {
    const response = await fetch(URL);
    const json = await response.json();
    formattedData = formatData(json.results);
    console.log(json.results);
    start();
  } catch (error) {
    loader.style.display = "none";
    errorLog.style.display = "block";
    console.log("err");
  }
};

const start = () => {
  showQuestion();
  loader.style.display = "none";
  container.style.display = "block";
};
const showQuestion = () => {
  showQuestionNumber.innerText = questionIndex + 1;
  const { question, answers, correctAnswerIndex } =
    formattedData[questionIndex];
  correctAnswer = correctAnswerIndex;
  questionText.innerText = question;
  answerList.forEach((button, index) => {
    button.innerText = answers[index];
  });
};
const checkAnswer = (index) => {
  console.log(index);
  if (index === correctAnswer) {
    answerList.forEach((button) => {
      button.disabled = true;
      button.className = "completed";
      answerList[index].classList.add("correct");
      button.style.cursor = "default";
    });
    score += 10;
    showScore.innerText = score;
    localStorage.setItem("score", JSON.stringify(score));
  } else {
    answerList.forEach((button) => {
      button.disabled = true;
      button.className = "completed";
      button.style.cursor = "default";
    });
    answerList[index].classList.add("incorrect");
    answerList[correctAnswer].classList.add("correct");
  }
};
const nextHandler = () => {
  if (questionIndex < 9) {
    questionIndex++;
    removeClasses();
    showQuestion();
  } else {
    finishHandler();
  }
};
const removeClasses = () => {
  answerList.forEach((button) => {
    button.disabled = false;
    button.className = "answer-text";
    button.style.cursor = "pointer";
  });
};
const finishHandler = () => {
  window.location.assign("/end.html");
};
window.addEventListener("load", fetchData);
showQuestionNumber.innerText;
answerList.forEach((button, index) => {
  button.addEventListener("click", () => checkAnswer(index));
});
nextButton.addEventListener("click", nextHandler);
finishButton.addEventListener("click", finishHandler);
