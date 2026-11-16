import Ship from "../Ship";

describe("Ship class", () => {
  test("creates a ship with the correct properties", () => {
    const ship = new Ship("Destroyer", 3);

    expect(ship.name).toBe("Destroyer");
    expect(ship.length).toBe(3);
    expect(ship.hits).toBe(0);
    expect(ship.sunk).toBe(false);
  });

  test("hit() increases the number of hits", () => {
    const ship = new Ship("Destroyer", 3);

    ship.hit();

    expect(ship.hits).toBe(1);
  });

  test("isSunk() returns false if hits are less than length", () => {
    const ship = new Ship("Destroyer", 3);

    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(false);
  });

  test("isSunk() returns true if hits reach the ship's length", () => {
    const ship = new Ship("Destroyer", 3);

    ship.hit();
    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(true);
  });
});
