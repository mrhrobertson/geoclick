// constants
const play = document.getElementById("play");
const quiz = document.getElementById("quiz");
const next = document.getElementById("next");
const counter = document.getElementById("score");
const question_loc = "/assets/questions.json";

// initialise score & question number from storage
let score =
  window.localStorage.getItem("score") == null
    ? window.localStorage.setItem("score", 0)
    : window.localStorage.getItem("score");

let question =
  window.localStorage.getItem("question") == null
    ? window.localStorage.setItem("question", 0)
    : window.localStorage.getItem("question");

// load from last access
if (!quiz.classList.contains("hidden") || score > 0 || question > 0) {
  play.classList.add("hidden");
  quiz.classList.remove("hidden");
  load_question();
  counter.innerText = score;
}

// moves from play to quiz scene
function start_quiz() {
  play.classList.add("hidden");
  quiz.classList.remove("hidden");
  window.localStorage.setItem("score", 0);
  window.localStorage.setItem("question", 0);
  score = window.localStorage.getItem("score");
  question = window.localStorage.getItem("question");
  counter.innerText = score;
  load_question();
}

// updates score by adding value
function add_score(num) {
  score = parseInt(score) + num;
  window.localStorage.setItem("score", score);
  counter.innerText = score;
}

// load question
async function load_question() {
  console.log("Loading new question...");
  let questions = await fetch(question_loc).then((res) => res.json());
  let loaded = await questions["questions"][question];
  let content = loaded.question;
  next.classList.add("hidden");
  let answers = quiz.children[2].children;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].classList.contains("correct")) {
      answers[i].classList.remove("correct");
      answers[i].children[0].classList.add("hidden");
    }
    if (answers[i].classList.contains("wrong")) {
      answers[i].classList.remove("wrong");
      answers[i].children[0].classList.add("hidden");
    }
    if (answers[i].classList.contains("disabled"))
      answers[i].classList.remove("disabled");
  }
  document.getElementById("q_id").innerText = parseInt(question) + 1;
  document.getElementById("q_content").innerHTML = content;
}

async function answer_question(answer, e) {
  if (e.target.classList.contains("disabled")) return;
  let questions = await fetch(question_loc).then((res) => res.json());
  let loaded = await questions["questions"][question];
  if (answer == loaded.correct) {
    e.target.classList.add("correct");
    e.target.children[0].classList.remove("hidden");
    console.log("Correct! :D");
    add_score(1);
    question++;
    window.localStorage.setItem("question", question);
    let answers = quiz.children[2].children;
    for (let i = 0; i < answers.length; i++) {
      answers[i].classList.add("disabled");
    }
    if (next.classList.contains("hidden")) {
      next.classList.remove("hidden");
      next.innerText = "Next Question";
      next.onclick = () => load_question();
    }
  } else {
    e.target.classList.add("wrong");
    e.target.children[0].classList.remove("hidden");
    let answers = quiz.children[2].children;
    for (let i = 0; i < answers.length; i++) {
      answers[i].classList.add("disabled");
    }
    if (next.classList.contains("hidden")) {
      next.classList.remove("hidden");
      next.innerText = "Finish Quiz";
      next.onclick = () => end_quiz();
    }
    console.log("Incorrect! D:");
  }
}

function end_quiz() {
  // reset variables
  console.log("Ending quiz...");
  window.localStorage.setItem("question", 0);
  window.localStorage.setItem("score", 0);
  quiz.classList.add("hidden");
  play.classList.remove("hidden");
}
