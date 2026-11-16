export default class GameBoard {
  constructor() {
    this.board = Array(10)
      .fill(null)
      .map(() => Array(10).fill(null));

    this.attackedShots = [];
    this.hitShots = [];
    this.missedShots = [];
    this.ships = 0;
  }

  placeShip(ship, coordinate, direction) {
    const [x, y] = coordinate;

    if (!this.isValidPlacement(ship, coordinate, direction)) {
      throw new Error("Invalid ship placement");
    }

    for (let i = 0; i < ship.length; i++) {
      if (direction === "horizontal") {
        this.board[x + i][y] = ship;
      } else {
        this.board[x][y + i] = ship;
      }
    }

    this.ships += 1;
  }

  receiveAttack(coordinates) {
    const [x, y] = coordinates;

    const alreadyAttacked = this.attackedShots.some(
      ([shotX, shotY]) => shotX === x && shotY === y,
    );

    if (alreadyAttacked) {
      return { alreadyAttacked: true };
    }

    this.attackedShots.push(coordinates);

    const ship = this.board[x][y];

    if (ship) {
      const wasSunk = ship.isSunk();

      ship.hit();
      this.hitShots.push(coordinates);

      if (!wasSunk && ship.isSunk()) {
        this.ships -= 1;
      }

      return { hit: true, sunk: ship.isSunk() };
    }

    this.missedShots.push(coordinates);

    return { hit: false };
  }

  report() {
    if (this.ships === 0) {
      return "All ships have been sunk!";
    }
    return "Ships remaining: " + this.ships;
  }

  isValidPlacement(ship, coordinate, direction) {
    const [x, y] = coordinate;
    if (direction === "horizontal") {
      if (x + ship.length > 10) return false;
    } else {
      if (y + ship.length > 10) return false;
    }

    for (let i = 0; i < ship.length; i++) {
      if (direction === "horizontal") {
        if (this.board[x + i][y] !== null) return false;
      } else {
        if (this.board[x][y + i] !== null) return false;
      }
    }

    return true;
  }
}
