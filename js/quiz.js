const play = document.getElementById("play");
const quiz = document.getElementById("quiz");
const counter = document.getElementById("score");

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
  counter.innerText = score;
  load_question();
}

async function load_question() {
  let questions = await fetch("../assets/questions.json").then((res) =>
    res.json()
  );
  let loaded = await questions["questions"][question];
  let content = loaded.question;
  document.getElementById("q_id").innerText = parseInt(question) + 1;
  document.getElementById("q_content").innerHTML = content;
}

async function answer_question(answer) {
  let questions = await fetch("../assets/questions.json").then((res) =>
    res.json()
  );
  let loaded = await questions["questions"][question];
  if (answer == loaded.correct) {
    console.log("Correct! :D");
    question++;
    score++;
  } else {
    console.log("Incorrect! D:");
  }
}
