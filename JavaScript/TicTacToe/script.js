console.log("Welcome to TicTacToe!");

const gameBoard = (() => {
  let thisBoard;

  const initialize = () => {
    thisBoard = ["", "", "", "", "", "", "", "", ""];
  };

  const updateBoard = (index, symbol) => {
    if (index < 0 || index > 8) {
      console.log(`Invalid index: ${index}. Must be between 0 and 8.`);
      return;
    }

    console.log(`Placing ${symbol} at index ${index}`);

    thisBoard[index] = symbol;
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

const gameController = (() => {
  let player;
  let computer;
  let winner;

  const start = (playerName, symbol) => {
    winner = null;
    gameBoard.initialize();
    displayController.updateBoard(true);

    let moves = 0;
    player = createPlayer(playerName, symbol);
    computer = createPlayer("Computer", symbol === "X" ? "O" : "X");

    if (symbol === "O") {
      handleMove(computer.makeRandomMove(), computer.symbol, false);
    }
  };

  const restart = () => {
    winner = null;
    gameBoard.initialize();
    displayController.updateBoard(true);
  };

  const handleMove = (index, symbol = player.symbol, playerToMove = true) => {
    if (gameBoard.getGameBoard()[index] === "") {
      gameBoard.updateBoard(index, symbol);
      displayController.updateBoard();

      if (gameBoard.isGameOver()) {
        if (symbol === player.symbol) {
          winner = player.name;
        } else {
          winner = computer.name;
        }

        displayController.declareWinner(winner);
        return;
      }

      if (gameBoard.isDraw()) {
        displayController.declareDraw();
        return;
      }

      if (playerToMove) {
        handleMove(computer.makeRandomMove(), computer.symbol, false);
      }
    }
  };

  return { start, handleMove, restart };
})();

const displayController = (() => {
  const updateBoard = (start = false) => {
    if (start) {
      mainMenuBtn.style.display = "block";
      restartBtn.style.display = "block";
      restartBtn.textContent = "Restart Game";
      gameMessage.textContent = "";
    }

    let board = gameBoard.getGameBoard();
    displayBoard.innerHTML = "";

    board.forEach((symbol) => {
      const square = document.createElement("div");
      square.classList.add("square");
      square.textContent = symbol;
      displayBoard.appendChild(square);
    });

    attachSquareListeners();
  };

  const declareWinner = (winner) => {
    console.log(`${winner} wins!`);
    gameMessage.textContent = `${winner} wins!`;
    restartBtn.textContent = "Play Again";
  };

  const declareDraw = () => {
    console.log("It's a draw!");
    gameMessage.textContent = "It's a draw!";
    restartBtn.textContent = "Play Again";
  };

  function attachSquareListeners() {
    const squares = document.querySelectorAll(".square");
    squares.forEach((square, index) => {
      square.addEventListener("click", () => {
        gameController.handleMove(index);
      });
    });
  }

  return { updateBoard, declareWinner, declareDraw };
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

const menu = document.getElementById("menu");
const displayBoard = document.getElementById("gameBoard");
const gameMessage = document.getElementById("gameMessage");

const restartBtn = document.getElementById("restartBtn");
restartBtn.addEventListener("click", () => {
  gameController.restart();
});

const mainMenuBtn = document.getElementById("mainMenuBtn");
mainMenuBtn.addEventListener("click", () => {
  window.location.reload();
});

const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", () => {
  event.preventDefault();

  const playerName = document.getElementById("playerName").value;

  const selectedSymbol = document.querySelector(
    'input[name="symbol"]:checked',
  )?.value;

  if (selectedSymbol === undefined) {
    alert("Please select a symbol (X or O) to start the game.");
    return;
  }

  menu.style.display = "none";
  gameController.start(
    playerName === "" ? "Player" : playerName,
    selectedSymbol,
  );
});
