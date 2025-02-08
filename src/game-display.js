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

  clearBoard(player) {
    let displayBoard = null;
    if (player === this.human) displayBoard = this.humanBoard;
    if (player === this.computer) displayBoard = this.computerBoard;

    player.gameboard.clearBoard();
    this.updatePlayerGameboard(player);
  }

  getBoardCell(player, coord) {
    let displayBoard = null;
    if (player === this.human) displayBoard = this.humanBoard;
    if (player === this.computer) displayBoard = this.computerBoard;

    const [col, row] = [coord[0], 9 - coord[1]];
    const boardRow = [...displayBoard.children][row];
    const boardCell = [...boardRow.children][col];
    return boardCell;
  }

  updateCellDataState(player, coord) {
    const cell = this.getBoardCell(player, coord);
    if (!player.gameboard.getBoardCell(coord)) {
      cell.setAttribute('data-state', 'empty');
    } else {
      cell.setAttribute('data-state', player.gameboard.getBoardCell(coord));
    }
  }

  updatePlayerGameboard(player) {
    for (let row = 0; row <= 9; row++) {
      for (let col = 0; col <= 9; col++) {
        this.updateCellDataState(player, [row, col]);
      }
    }
  }

  attack(player, coord) {
    const result = player.gameboard.receiveAttack(coord);
    this.updateCellDataState(player, coord);
    if (result.result === 'hit') {
      this.getBoardCell(player, coord).textContent = 'X';
    }
  }

  placeShipsRandomly(player) {
    player.gameboard.placeShipsRandomly();
    this.updatePlayerGameboard(player);
  }
}
