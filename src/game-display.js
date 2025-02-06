import { GameController } from './game-controller';

export class GameDisplay {
  constructor() {
    this.humanBoard = document.querySelector('.game__board--human');
    this.computerBoard = document.querySelector('.game__board--computer');
    this.game = new GameController();
    this.human = this.game.human;
    this.computer = this.game.computer;
    this.displayGameboard(this.humanBoard);
    this.displayGameboard(this.computerBoard);
  }

  displayGameboard(board) {
    const rows = [...board.children];
    rows.forEach((row) => {
      for (let i = 0; i < 10; i++) {
        const cell = document.createElement('div');
        cell.classList.add('game__board__cell');
        row.appendChild(cell);
      }
    });
  }

  getCell(coord) {
    const [col, row] = [coord[0], 9 - coord[1]];
  }

  placeShip(board, shipName, coord, direction) {}

  placeShipsRandomly(board) {
    const ships = Object.keys(board.gameBoard.ships);
    board.placeShip('carrier', [1, 2], 'horizontal');
  }

  cellRecieveAttack(cell) {
    cell.addEventListener('click', () => {});
  }
}
