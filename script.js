import { startConfetti, stopConfetti, removeConfetti } from "./confetti.js";

const choices = {
  rock: { name: "Rock", defeats: ["scissors", "lizard"] },
  paper: { name: "Paper", defeats: ["rock", "spock"] },
  scissors: { name: "Scissors", defeats: ["paper", "lizard"] },
  lizard: { name: "Lizard", defeats: ["paper", "spock"] },
  spock: { name: "Spock", defeats: ["scissors", "rock"] },
};

const playerOptions = document.querySelectorAll(".player i");
const playerChoice = document.querySelector(".playerChoice");
const computerChoice = document.querySelector(".computerChoice");
const computerOptions = document.querySelectorAll(".computer i");
const resultText = document.querySelector(".resultText");
const playerScore = document.querySelector(".playerScore");
const computerScore = document.querySelector(".computerScore");
const reset = document.querySelector(".resetIcon");
let pScore = 0;
let cScore = 0;

/* playerPick function */
function playerPick(evt) {
  const player = evt.target.getAttribute("title");
  removeConfetti();
  stopConfetti();
  return player;
}

/* computerPick funtion */
function computerPick() {
  const options = ["Rock", "Paper", "Scissors", "Lizard", "Spock"];
  const computer = options[Math.floor(Math.random() * 5)];
  return computer;
}

/* check winner function and add score */
function checkWinner(player, computer) {
  const p = player.toLowerCase();
  const c = computer.toLowerCase();

  if (choices[p].defeats.includes(c)) {
    pScore++;
    startConfetti();
    return "You Won!";
  } else if (choices[c].defeats.includes(p)) {
    cScore++;
    return "You Lost!";
  } else {
    return "Its a tie, try again!";
  }
}

/* gameStart function is triggered as soon as player picks an option */
function gameStart(evt) {
  const player = `${playerPick(evt)}`;
  const computer = `${computerPick()}`;

  /* Player DOM manipulation */
  const pSelected = evt.target;

  playerOptions.forEach((option) => {
    option.classList.remove("selected");
  });

  pSelected.classList.add("selected");
  playerChoice.textContent = player.toUpperCase();

  /* Computer DOM manipulation */
  const cSelected = document.querySelector(`.computer${computer}`);

  computerOptions.forEach((option) => {
    option.classList.remove("selected");
  });
  cSelected.classList.add("selected");
  computerChoice.textContent = computer.toUpperCase();

  /* Check Winner and update score*/
  const message = checkWinner(player, computer);

  resultText.textContent = message;
  playerScore.textContent = `${pScore}pts. `;
  computerScore.textContent = `${cScore}pts. `;
}
/* click event listener to playerOptions */
playerOptions.forEach((option) => {
  option.addEventListener("click", gameStart);
});

/* resetHandler function */
function resetHandler() {
  location.reload();
}
/* reset button listener */
reset.addEventListener("click", resetHandler);
