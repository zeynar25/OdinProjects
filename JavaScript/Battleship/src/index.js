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

function renderBoard(boardElement, board) {
  boardElement.innerHTML = "";

  board.forEach((row, x) => {
    row.forEach((cell, y) => {
      const cellElement = document.createElement("div");

      cellElement.classList.add("cell");

      if (cell) {
        cellElement.classList.add("ship");
      }

      // Store coordinates for future click events
      cellElement.dataset.x = x;
      cellElement.dataset.y = y;

      boardElement.appendChild(cellElement);
    });
  });
}

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

renderBoard(yourBoard, player1.gameboard.board);
renderBoard(enemyBoard, player2.gameboard.board);
