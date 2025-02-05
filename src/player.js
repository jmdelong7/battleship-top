import { Gameboard } from './gameboard';

export class Player {
  constructor(type) {
    this.gameboard = new Gameboard();
    this.type = type;
  }
}
