import "./styles.css";
import Player from "./Player.js";
import Gameboard from "./Gameboard.js";
import Ship from "./Ship.js";

function createFleet() {
  return [
    new Ship("Battleship", 4),
    new Ship("Cruiser", 3),
    new Ship("Submarine", 3),
    new Ship("Destroyer", 2),
    new Ship("Destroyer", 2),
    new Ship("Destroyer", 2),
    new Ship("Patrol Boat", 1),
    new Ship("Patrol Boat", 1),
    new Ship("Patrol Boat", 1),
    new Ship("Patrol Boat", 1),
  ];
}

function populateBoard(ships, gameboard) {
  for (const ship of ships) {
    let placed = false;
    let attempts = 0;

    while (!placed && attempts < 1000) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);

      const coordinate = [x, y];

      const direction = Math.random() < 0.5 ? "horizontal" : "vertical";

      if (gameboard.isValidPlacement(ship, coordinate, direction)) {
        gameboard.placeShip(ship, coordinate, direction);
        placed = true;
      }

      attempts++;
    }

    if (!placed) {
      throw new Error(`Could not place ${ship.name} on the board`);
    }
  }
}

function renderBoard(boardElement, board, enemy = false) {
  boardElement.innerHTML = "";

  board.forEach((row, x) => {
    row.forEach((cell, y) => {
      const cellElement = document.createElement("div");

      cellElement.classList.add("cell");

      if (cell && !enemy) {
        cellElement.classList.add("ship");
      }

      // Store coordinates for future click events
      cellElement.dataset.x = x;
      cellElement.dataset.y = y;

      boardElement.appendChild(cellElement);
    });
  });
}

// function

let playerName = "Player 1";

// document.addEventListener("submit", (event) => {
//   event.preventDefault();

//   let playerNameInput = document.getElementById("player1");
//   playerName = playerNameInput.value;
// });

const player1 = new Player(playerName);
const player2 = new Player("Computer");

console.log(
  `Hello! Player ${player1.name}. You are playing against ${player2.name}.`,
);

const fleet1 = createFleet();
const fleet2 = createFleet();

populateBoard(fleet1, player1.gameboard);
populateBoard(fleet2, player2.gameboard);

const yourBoard = document.getElementById("player-board");
const enemyBoard = document.getElementById("enemy-board");
const messageElement = document.getElementById("message");

renderBoard(yourBoard, player1.gameboard.board);
renderBoard(enemyBoard, player2.gameboard.board, true);

let gameOver = false;

function playerTurn() {
  if (gameOver) return;

  messageElement.textContent = `${player1.name}'s turn. Click on the enemy board to attack.`;

  enemyBoard.addEventListener("click", handlePlayerAttack);
}

function computerTurn() {
  if (gameOver) return;

  messageElement.textContent = "Enemy's turn";

  setTimeout(() => {
    let x;
    let y;

    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (
      player1.gameboard.attackedShots.some(
        ([shotX, shotY]) => shotX === x && shotY === y,
      )
    );

    const result = player1.gameboard.receiveAttack([x, y]);

    const attackedCell = yourBoard.querySelector(
      `[data-x="${x}"][data-y="${y}"]`,
    );

    if (result.hit) {
      attackedCell.classList.add("hit");
      computerTurn();
    } else {
      attackedCell.classList.add("miss");
    }

    if (player1.gameboard.ships === 0) {
      messageElement.textContent = "You lose!";
      gameOver = true;
      return;
    }

    if (result.hit) {
      computerTurn();
    } else {
      playerTurn();
    }
  }, 1000);
}

function handlePlayerAttack(event) {
  const cell = event.target.closest(".cell");

  if (!cell || !enemyBoard.contains(cell)) return;

  const x = Number(cell.dataset.x);
  const y = Number(cell.dataset.y);

  const result = player2.gameboard.receiveAttack([x, y]);

  if (result.alreadyAttacked) return;

  if (result.hit) {
    cell.classList.add("hit");
  } else {
    cell.classList.add("miss");
  }

  if (player2.gameboard.ships === 0) {
    messageElement.textContent = "You win!";
    gameOver = true;
    enemyBoard.removeEventListener("click", handlePlayerAttack);
    return;
  }

  enemyBoard.removeEventListener("click", handlePlayerAttack);

  if (result.hit) {
    playerTurn();
  } else {
    computerTurn();
  }
}

playerTurn();
