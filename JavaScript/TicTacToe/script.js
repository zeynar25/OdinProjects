console.log("Welcome to TicTacToe!");

const gameBoard = (() => {
  let board;

  const initialize = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  const getGameOverStatus = () => {
    if (
      (board[0] !== "" && board[0] === board[1] && board[1] === board[2]) ||
      (board[3] !== "" && board[3] === board[4] && board[4] === board[5]) ||
      (board[6] !== "" && board[6] === board[7] && board[7] === board[8]) ||
      (board[0] !== "" && board[0] === board[3] && board[3] === board[6]) ||
      (board[1] !== "" && board[1] === board[4] && board[4] === board[7]) ||
      (board[2] !== "" && board[2] === board[5] && board[5] === board[8]) ||
      (board[0] !== "" && board[0] === board[4] && board[4] === board[8]) ||
      (board[2] !== "" && board[2] === board[4] && board[4] === board[6])
    ) {
      return true;
    }
    return false;
  };

  const getGameBoard = () => board;

  return { initialize, getGameOverStatus, getGameBoard };
})();

const game = (() => {
  let winner;

  const start = (symbol) => {
    gameBoard.initialize();
    let moves = 0;
    const player = createPlayer("Player", symbol);
    const computer = createPlayer("Computer", symbol === "X" ? "O" : "X");

    let winner = null;
    let done = false;
    while (moves < 9 && !done) {
      if (moves % 2 === 0) {
        if (player.symbol === "X") {
          const playerMove = player.makeMove();
          player.placeSymbol(playerMove);
        } else {
          const computerMove = computer.makeRandomMove();
          computer.placeSymbol(computerMove);
        }
      } else {
        if (player.symbol === "O") {
          const playerMove = player.makeMove();
          player.placeSymbol(playerMove);
        } else {
          const computerMove = computer.makeRandomMove();
          computer.placeSymbol(computerMove);
        }
      }

      console.log(gameBoard.getGameBoard());

      if (gameBoard.getGameOverStatus()) {
        winner = moves % 2 === 0 ? player.name : computer.name;
        console.log(`Game Over! ${winner} wins!`);
        done = true;
      }

      moves++;
    }
  };

  const getWinner = () => winner;

  return { start, getWinner };
})();

function createPlayer(name, symbol) {
  const makeMove = () => {
    const freeSquares = [];
    for (let i = 0; i < 9; i++) {
      if (gameBoard.getGameBoard()[i] === "") {
        freeSquares.push(i);
      }
    }

    while (freeSquares.length > 0) {
      const position = parseInt(prompt("number 1-9"));
      if (freeSquares.includes(position - 1)) {
        return position - 1;
      }
    }

    return -1;
  };

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

  const placeSymbol = (index) => {
    const freeSquares = [];
    for (let i = 0; i < 9; i++) {
      if (gameBoard.getGameBoard()[i] === "") {
        freeSquares.push(i);
      }
    }

    if (freeSquares.includes(index)) {
      console.log(`Placing ${symbol} at index ${index}`);
      gameBoard.getGameBoard()[index] = symbol;
    } else {
      console.log("Invalid move. Please choose a free square.");
    }
  };

  return { name, symbol, makeMove, makeRandomMove, placeSymbol };
}

let symbol = "X";
game.start(symbol);
