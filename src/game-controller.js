import { Gameboard } from './gameboard';
import { GameDisplay } from './game-display';

export class GameController {
  constructor() {
    this.human = new Gameboard();
    this.computer = new Gameboard();
    this.display = new GameDisplay();
  }

  clearBoards() {
    this.initGameboard(this.humanBoard);
    this.initGameboard(this.computerBoard);

    let displayBoard = null;
    if (player === this.human) displayBoard = this.humanBoard;
    if (player === this.computer) displayBoard = this.computerBoard;

    player.clearBoard();
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
    if (!player.getBoardCell(coord)) {
      cell.setAttribute('data-state', 'empty');
    } else {
      cell.setAttribute('data-state', player.getBoardCell(coord));
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
    player.placeShipsRandomly();
    this.updatePlayerGameboard(player);
  }
}
