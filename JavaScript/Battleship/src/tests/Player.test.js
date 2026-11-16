import Player from "../Player";
import Gameboard from "../Gameboard";

describe("Player class", () => {
  let player;

  beforeEach(() => {
    player = new Player("Player 1");
  });

  test("creates a player with the correct name", () => {
    expect(player.name).toBe("Player 1");
  });

  test("creates a Gameboard instance for the player", () => {
    expect(player.gameboard).toBeInstanceOf(Gameboard);
  });

  test("each player has their own Gameboard", () => {
    const player2 = new Player("Player 2");

    expect(player.gameboard).not.toBe(player2.gameboard);
  });

  test("each player starts with an empty gameboard", () => {
    player.gameboard.board.forEach((row) => {
      row.forEach((cell) => {
        expect(cell).toBeNull();
      });
    });
  });
});
