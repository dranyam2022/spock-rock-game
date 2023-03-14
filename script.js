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
const winSound = document.querySelector(".win");
const loseSound = document.querySelector(".lose");
const playerContainer = document.querySelector(".player");
const computerContainer = document.querySelector(".computer");
const limitOptions = document.querySelectorAll(".limit-option");
let pScore = 0;
let cScore = 0;
let scoreLimit = 3;

/* playerPick function */
function playerPick(evt) {
  const player = evt.target.getAttribute("title");

  winSound.load();
  loseSound.load();
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
    winSound.play();
    return "You Won!";
  } else if (choices[c].defeats.includes(p)) {
    cScore++;
    loseSound.play();
    return "You Lost!";
  } else {
    return "Its a tie, try again!";
  }
}

/* gameStart function is triggered as soon as player picks an option */
function gameStart(evt) {
  const player = `${playerPick(evt)}`;
  const computer = `${computerPick()}`;
  /* Check Winner and update score*/
  const message = checkWinner(player, computer);

  resultText.textContent = message;
  playerScore.textContent = `${pScore}pts. `;
  computerScore.textContent = `${cScore}pts. `;

  /* condition for maximum score */
  if (pScore < scoreLimit && cScore < scoreLimit) {
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
  } else {
    if (pScore === scoreLimit) {
      playerContainer.style.opacity = "0.3";
      playerContainer.disabled = true;
      playerContainer.style.pointerEvents = "none";
      computerContainer.disabled = true;
      computerContainer.style.opacity = "0.3";
      resultText.textContent = "Congratulations! Reset to play again!";
    } else {
      playerContainer.style.opacity = "0.3";
      playerContainer.disabled = true;
      playerContainer.style.pointerEvents = "none";
      computerContainer.disabled = true;
      computerContainer.disabled = true;
      computerContainer.style.opacity = "0.3";
      resultText.textContent = "You Lost! Reset and try again!";
    }
  }
}

/* click event listener to playerOptions */
playerOptions.forEach((option) => {
  option.addEventListener("click", gameStart);
});

/* score limit handler function */
function scoreLimitHandler(event) {
  limitOptions.forEach((option) => {
    option.classList.remove("limit-option--selected");
  });
  scoreLimit = parseInt(event.target.nextElementSibling.value);
  event.target.classList.add("limit-option--selected");
}

/* score limit option listener */
limitOptions.forEach((option) => {
  option.addEventListener("click", scoreLimitHandler);
});

/* resetHandler function */
function resetHandler() {
  pScore = 0;
  cScore = 0;
}
/* reset button listener */
reset.addEventListener("click", resetHandler);
