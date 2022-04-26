const play = document.getElementById("play");
const quiz = document.getElementById("quiz");
const next = document.getElementById("next");
const counter = document.getElementById("score");
const question_loc =
  "https://mrhrobertson.github.io/geoquiz/assets/questions.json";

let score =
  window.localStorage.getItem("score") == null
    ? window.localStorage.setItem("score", 0)
    : window.localStorage.getItem("score");

let question =
  window.localStorage.getItem("question") == null
    ? window.localStorage.setItem("question", 0)
    : window.localStorage.getItem("question");

if (!quiz.classList.contains("hidden") || score > 0 || question > 0) {
  play.classList.add("hidden");
  quiz.classList.remove("hidden");
  load_question();
  counter.innerText = score;
}

function start_quiz() {
  play.classList.add("hidden");
  quiz.classList.remove("hidden");
  window.localStorage.setItem("score", 0);
  score = window.localStorage.getItem("score");
  counter.innerText = score;
  load_question();
}

function add_score(num) {
  score = parseInt(score) + num;
  window.localStorage.setItem("score", score);
  counter.innerText = score;
}

async function load_question() {
  let questions = await fetch(question_loc).then((res) => res.json());
  let loaded = await questions["questions"][question];
  let content = loaded.question;
  next.classList.add("hidden");
  document.getElementById("q_id").innerText = parseInt(question) + 1;
  document.getElementById("q_content").innerHTML = content;
}

async function answer_question(answer, e) {
  let questions = await fetch(question_loc).then((res) => res.json());
  let loaded = await questions["questions"][question];
  if ((loaded.type = "map")) {
    if (answer == loaded.correct) {
      e.target.classList.add("correct");
      console.log("Correct! :D");
      add_score(1);
      question++;
      if (next.classList.contains("hidden")) next.classList.remove("hidden");
    } else {
      console.log("Incorrect! D:");
    }
  }
}
