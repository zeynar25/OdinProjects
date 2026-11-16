import "./styles.css";
import Player from "./Player.js";
import Gameboard from "./Gameboard.js";
import Ship from "./Ship.js";

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
