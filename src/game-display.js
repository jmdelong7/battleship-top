import { GameController } from './game-controller';

export class GameDisplay {
  constructor() {
    this.humanBoard = document.querySelector('.game__board--human');
    this.computerBoard = document.querySelector('.game__board--computer');
    this.game = new GameController();
    this.human = this.game.human;
    this.computer = this.game.computer;
    this.initGameboard(this.humanBoard);
    this.initGameboard(this.computerBoard);
  }

  initGameboard(board) {
    const rows = [...board.children];
    rows.forEach((row) => {
      for (let i = 0; i < 10; i++) {
        const cell = document.createElement('div');
        cell.classList.add('game__board__cell');
        cell.setAttribute('data-state', 'empty');
        row.appendChild(cell);
      }
    });
  }

  getBoardCell(board, coord) {
    const [col, row] = [coord[0], 9 - coord[1]];
    const boardRow = [...board.children][row];
    const boardCell = [...boardRow.children][col];
    return boardCell;
  }

  updateCellDataState(player, coord) {
    let displayBoard = null;
    if (player === this.human) displayBoard = this.humanBoard;
    if (player === this.computer) displayBoard = this.computerBoard;

    const cell = this.getBoardCell(displayBoard, coord);
    if (!player.gameboard.getBoardCell(coord)) {
      cell.setAttribute('data-state', 'empty');
    } else {
      cell.setAttribute('data-state', player.gameboard.getBoardCell(coord));
    }
  }

  displayShipsRandomly(player) {
    player.gameboard.displayShipsRandomly();
    player.gameboard.forEach((row) => {});
  }

  placeShip(board, shipName, coord, direction) {}

  placeShipsRandomly(board) {
    const ships = Object.keys(board.gameboard.ships);
    board.placeShip('carrier', [1, 2], 'horizontal');
  }

  cellRecieveAttack(cell) {
    cell.addEventListener('click', () => {});
  }
}
