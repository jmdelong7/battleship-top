import { GameController } from './game-controller';

export class Display {
  constructor() {
    this.playerBoard = document.querySelector('.gameboard--player');
    this.computerBoard = document.querySelector('gameboard--computer');
    this.controller = new GameController();
  }

  displayGameboard(board) {}
}
