import { Gameboard } from './gameboard';

export class GameController {
  constructor() {
    this.human = new Gameboard();
    this.computer = new Gameboard();
  }
}
