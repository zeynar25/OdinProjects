import Gameboard from "./Gameboard.js";

export default class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard();
  }
}
