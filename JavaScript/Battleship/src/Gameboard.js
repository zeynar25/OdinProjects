export default class GameBoard {
  constructor() {
    this.board = Array(10)
      .fill(null)
      .map(() => Array(10).fill(null));

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
    const ship = this.board[x][y];

    if (ship) {
      ship.hit();

      if (ship.isSunk()) {
        this.ships -= 1;
      }
    } else {
      this.missedShots.push(coordinates);
    }
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
