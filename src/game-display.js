import { GameController } from './game-controller';

export class GameDisplay {
  constructor() {
    this.playerBoard = document.querySelector('.game__board--player');
    this.computerBoard = document.querySelector('game__board--computer');
    this.game = new GameController();
  }

  displayGameboard(board) {
    let count = 100;
    while (count > 0) {
      const cell = document.createElement('div');
      cell.classList.add('game__board--cell');
      board.appendChild(cell);
      count--;
    }
  }
}
