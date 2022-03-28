const play = document.getElementById("play");
const quiz = document.getElementById("quiz");
const questions = fetch("../assets/questions.json").then((res) => res.json());
const continents = fetch("../assets/continents.json").then((res) => res.json());

let score =
  window.localStorage.getItem("score") == null
    ? window.localStorage.setItem("score", 0)
    : window.localStorage.getItem("score");

if (!quiz.classList.contains("hidden")) {
  // TODO: Load question progress
}

function start_quiz() {
  play.classList.add("hidden");
  quiz.classList.remove("hidden");
  window.localStorage.setItem("score", 0);
}
