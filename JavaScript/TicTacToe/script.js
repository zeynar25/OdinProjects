console.log("Welcome to TicTacToe!");

const gameBoard = (() => {
  let thisBoard;

  const initialize = () => {
    thisBoard = ["", "", "", "", "", "", "", "", ""];

    symbolSelection.style.display = "none";
    restartBtn.style.display = "block";
    restartBtn.textContent = "Restart Game";

    board.innerHTML = "";
    thisBoard.forEach((symbol) => {
      const square = document.createElement("div");
      square.classList.add("square");
      square.textContent = symbol;
      board.appendChild(square);
    });

    attachSquareListeners();
  };

  const updateBoard = (index, symbol) => {
    if (index < 0 || index > 8) {
      console.log(`Invalid index: ${index}. Must be between 0 and 8.`);
      return;
    }

    console.log(`Placing ${symbol} at index ${index}`);

    thisBoard[index] = symbol;

    board.innerHTML = "";
    thisBoard.forEach((symbol) => {
      const square = document.createElement("div");
      square.classList.add("square");
      square.textContent = symbol;
      board.appendChild(square);
    });

    attachSquareListeners();
  };

  const isDraw = () => {
    return thisBoard.every((square) => square !== "");
  };

  const isGameOver = () => {
    if (
      (thisBoard[0] !== "" &&
        thisBoard[0] === thisBoard[1] &&
        thisBoard[1] === thisBoard[2]) ||
      (thisBoard[3] !== "" &&
        thisBoard[3] === thisBoard[4] &&
        thisBoard[4] === thisBoard[5]) ||
      (thisBoard[6] !== "" &&
        thisBoard[6] === thisBoard[7] &&
        thisBoard[7] === thisBoard[8]) ||
      (thisBoard[0] !== "" &&
        thisBoard[0] === thisBoard[3] &&
        thisBoard[3] === thisBoard[6]) ||
      (thisBoard[1] !== "" &&
        thisBoard[1] === thisBoard[4] &&
        thisBoard[4] === thisBoard[7]) ||
      (thisBoard[2] !== "" &&
        thisBoard[2] === thisBoard[5] &&
        thisBoard[5] === thisBoard[8]) ||
      (thisBoard[0] !== "" &&
        thisBoard[0] === thisBoard[4] &&
        thisBoard[4] === thisBoard[8]) ||
      (thisBoard[2] !== "" &&
        thisBoard[2] === thisBoard[4] &&
        thisBoard[4] === thisBoard[6])
    ) {
      return true;
    }
    return false;
  };

  const getGameBoard = () => thisBoard;

  return { initialize, updateBoard, isDraw, isGameOver, getGameBoard };
})();

const game = (() => {
  let player;
  let computer;

  const start = (playerName, symbol) => {
    gameBoard.initialize();
    let moves = 0;
    player = createPlayer(playerName, symbol);
    computer = createPlayer("Computer", symbol === "X" ? "O" : "X");

    if (symbol === "O") {
      handleMove(computer.makeRandomMove(), computer.symbol, false);
    }
  };

  const restart = () => {
    gameBoard.initialize();
    gameMessage.textContent = "";
    restartBtn.textContent = "Restart Game";
  };

  const handleMove = (index, symbol = player.symbol, playerToMove = true) => {
    if (gameBoard.getGameBoard()[index] === "") {
      gameBoard.updateBoard(index, symbol);

      if (gameBoard.isGameOver()) {
        if (symbol === player.symbol) {
          winner = player.name;
        } else {
          winner = computer.name;
        }

        console.log(`${winner} wins!`);
        gameMessage.textContent = `${winner} wins!`;
        restartBtn.textContent = "Play Again";
        return;
      }

      if (gameBoard.isDraw()) {
        console.log("It's a draw!");
        gameMessage.textContent = "It's a draw!";
        restartBtn.textContent = "Play Again";
        return;
      }

      if (playerToMove) {
        handleMove(computer.makeRandomMove(), computer.symbol, false);
      }
    }
  };

  return { start, handleMove, restart };
})();

function createPlayer(name, symbol) {
  const makeRandomMove = () => {
    const freeSquares = [];
    for (let i = 0; i < 9; i++) {
      if (gameBoard.getGameBoard()[i] === "") {
        freeSquares.push(i);
      }
    }

    if (freeSquares.length > 0) {
      const randomIndex = Math.floor(Math.random() * freeSquares.length);
      return freeSquares[randomIndex];
    }

    return -1;
  };

  return { name, symbol, makeRandomMove };
}

function attachSquareListeners() {
  const squares = document.querySelectorAll(".square");
  squares.forEach((square, index) => {
    square.addEventListener("click", () => {
      game.handleMove(index);
    });
  });
}

const symbolSelection = document.getElementById("symbolSelection");
const board = document.getElementById("gameBoard");
const gameMessage = document.getElementById("gameMessage");
const restartBtn = document.getElementById("restartBtn");
restartBtn.addEventListener("click", () => {
  game.restart();
});

const menu = document.getElementById("menu");
const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", () => {
  event.preventDefault();
  menu.style.display = "none";

  const playerName = document.getElementById("playerName").value;

  const selectedSymbol = document.querySelector(
    'input[name="symbol"]:checked',
  ).value;

  game.start(playerName === "" ? "Player" : playerName, selectedSymbol);
});
