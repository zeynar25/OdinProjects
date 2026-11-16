import GameBoard from "../Gameboard";
import Ship from "../Ship";

describe("GameBoard class", () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new GameBoard();
  });

  test("creates a 10x10 board", () => {
    expect(gameboard.board.length).toBe(10);

    gameboard.board.forEach((row) => {
      expect(row.length).toBe(10);
    });
  });

  test("places a ship horizontally", () => {
    const ship = new Ship("Destroyer", 3);

    gameboard.placeShip(ship, [1, 2], "horizontal");

    expect(gameboard.board[1][2]).toBe(ship);
    expect(gameboard.board[2][2]).toBe(ship);
    expect(gameboard.board[3][2]).toBe(ship);
  });

  test("places a ship vertically", () => {
    const ship = new Ship("Destroyer", 3);

    gameboard.placeShip(ship, [1, 2], "vertical");

    expect(gameboard.board[1][2]).toBe(ship);
    expect(gameboard.board[1][3]).toBe(ship);
    expect(gameboard.board[1][4]).toBe(ship);
  });

  test("increments ship counter after placement", () => {
    const ship = new Ship("Destroyer", 3);

    gameboard.placeShip(ship, [1, 2], "horizontal");

    expect(gameboard.ships).toBe(1);
  });

  test("rejects a ship that extends beyond the board", () => {
    const ship = new Ship("Destroyer", 3);

    expect(() => {
      gameboard.placeShip(ship, [8, 2], "horizontal");
    }).toThrow("Invalid ship placement");
  });

  test("rejects a ship that overlaps with an existing ship", () => {
    const ship1 = new Ship("Destroyer", 3);
    const ship2 = new Ship("Destroyer", 3);

    gameboard.placeShip(ship1, [1, 2], "horizontal");

    expect(() => {
      gameboard.placeShip(ship2, [1, 2], "horizontal");
    }).toThrow("Invalid ship placement");
  });

  test("rejects a ship that partially overlaps with an existing ship", () => {
    const ship1 = new Ship("Destroyer", 3);
    const ship2 = new Ship("Destroyer", 3);

    gameboard.placeShip(ship1, [1, 2], "horizontal");

    expect(() => {
      gameboard.placeShip(ship2, [2, 2], "vertical");
    }).toThrow("Invalid ship placement");
  });

  test("hits a ship when attacked", () => {
    const ship = new Ship("Destroyer", 3);

    gameboard.placeShip(ship, [1, 2], "horizontal");

    gameboard.receiveAttack([1, 2]);

    expect(ship.hits).toBe(1);
  });

  test("records missed attacks", () => {
    gameboard.receiveAttack([5, 5]);

    expect(gameboard.missedShots).toContainEqual([5, 5]);
  });

  test("decreases ship counter when a ship sinks", () => {
    const ship = new Ship("Destroyer", 3);

    gameboard.placeShip(ship, [1, 2], "horizontal");

    gameboard.receiveAttack([1, 2]);
    gameboard.receiveAttack([2, 2]);
    gameboard.receiveAttack([3, 2]);

    expect(gameboard.ships).toBe(0);
  });

  test("reports remaining ships", () => {
    const ship = new Ship("Destroyer", 3);

    gameboard.placeShip(ship, [1, 2], "horizontal");

    expect(gameboard.report()).toBe("Ships remaining: 1");
  });

  test("reports when all ships have been sunk", () => {
    expect(gameboard.report()).toBe("All ships have been sunk!");
  });
});
