// constants
const play = document.getElementById("play");
const quiz = document.getElementById("quiz");
const map = document.getElementById("map");
const next = document.getElementById("next");
const counter = document.getElementById("score");
const question_loc =
  "https://mrhrobertson.github.io/geoquiz/assets/questions.json";

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
  let mobile = window.visualViewport.width <= 768 ? true : false;
  console.log(mobile);
  next.classList.add("hidden");
  let answers = mobile ? quiz.children[2].children : map.children;
  for (let i = 0; i < answers.length; i++) {
    if (mobile) {
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
    } else {
      if (answers[i].children[0].classList.contains("correct")) {
        answers[i].children[0].classList.remove("correct");
      }
      if (answers[i].children[0].classList.contains("wrong")) {
        answers[i].children[0].classList.remove("wrong");
      }
      if (answers[i].children[0].classList.contains("disabled"))
        answers[i].children[0].classList.remove("disabled");
    }
  }
  document.getElementById("q_id").innerText = parseInt(question) + 1;
  document.getElementById("q_content").innerHTML = content;
}

async function answer_question(answer, e) {
  if (e.target.classList.contains("disabled")) return;
  let questions = await fetch(question_loc).then((res) => res.json());
  let map_input = e.target.classList.contains("continent") ? true : false;
  let loaded = await questions["questions"][question];
  let answers = map_input ? map.children : quiz.children[2].children;
  if (answer == loaded.correct) {
    e.target.classList.add("correct");
    if (!map_input) e.target.children[0].classList.remove("hidden");
    console.log("Correct! :D");
    add_score(1);
    question++;
    window.localStorage.setItem("question", question);
    for (let i = 0; i < answers.length; i++) {
      if (map_input) {
        answers[i].children[0].classList.add("disabled");
        quiz.children[2].children[i].classList.add("disabled");
      } else answers[i].classList.add("disabled");
    }
    if (next.classList.contains("hidden")) {
      next.classList.remove("hidden");
      console.log(
        questions["questions"].length,
        window.localStorage.getItem("score")
      );
      if (
        window.localStorage.getItem("score") >= questions["questions"].length
      ) {
        next.innerText = "You win! Finish Quiz";
        next.onclick = () => end_quiz();
      } else {
        next.innerText = "Next Question";
        next.onclick = () => load_question();
      }
    }
  } else {
    e.target.classList.add("wrong");
    if (!map_input) e.target.children[0].classList.remove("hidden");
    for (let i = 0; i < answers.length; i++) {
      if (map_input) {
        answers[i].children[0].classList.add("disabled");
        quiz.children[2].children[i].classList.add("disabled");
      } else answers[i].classList.add("disabled");
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
