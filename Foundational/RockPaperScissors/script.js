console.log("Let's play Rock, Paper, Scissors!");

const moves = ["rock", "paper", "scissors"];

function playRound(playerMove, enemyMove) {
  content.textContent = "";

  if (playerMove === enemyMove) {
    console.log("It's a tie!");
    return "It's a tie!";
  } else if (
    (playerMove === "rock" && enemyMove === "scissors") ||
    (playerMove === "paper" && enemyMove === "rock") ||
    (playerMove === "scissors" && enemyMove === "paper")
  ) {
    console.log("You win!");
    return "You win!";
  } else {
    console.log("You lose!");
    return "You lose!";
  }
}

function getPlayerMove(e) {
  const playerMove = e.target.textContent.toLowerCase();
  console.log("Player chooses " + playerMove);

  return playerMove;
}

function getComputerMove(moves) {
  const randomNumber = Math.floor(Math.random() * moves.length);
  const computerMove = moves[randomNumber];

  console.log("Computer chooses " + computerMove);

  return computerMove;
}

function appendMessage(message) {
  content.textContent += message + "\n";
}

function handleMoveClick(e) {
  const playerMove = getPlayerMove(e);
  const enemyMove = getComputerMove(moves);

  let playerMessage = "Player chooses " + playerMove;
  let computerMessage = "Computer chooses " + enemyMove;
  let resultMessage = playRound(playerMove, enemyMove);

  appendMessage(playerMessage);
  appendMessage(computerMessage);
  appendMessage(resultMessage);
}

const buttonMoves = document.querySelectorAll(".move");
const content = document.querySelector("#content");

buttonMoves.forEach((button) => {
  button.addEventListener("click", handleMoveClick);
});
