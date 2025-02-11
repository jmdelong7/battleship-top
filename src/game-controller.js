import { Gameboard } from './gameboard';
import { GameDisplay } from './game-display';

export class GameController {
  constructor() {
    this.human = new Gameboard();
    this.computer = new Gameboard();

    this.display = new GameDisplay();
    this.humanDisplay = this.display.humanBoard;
    this.computerDisplay = this.display.computerBoard;
  }

  getDisplayBoard(player) {
    return player === this.human ? this.humanDisplay : this.computerDisplay;
  }

  updateCellDataState(player, coord) {
    let board = this.getDisplayBoard(player);
    const cell = this.display.getDisplayBoardCell(board, coord);
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

  placeShipsRandomly(player) {
    player.placeShipsRandomly();
    this.updatePlayerGameboard(player);
  }

  attackPlayer(player, coord) {
    const result = player.receiveAttack(coord);
    this.updateCellDataState(player, coord);
    if (result.result === 'hit') {
      const board = this.getDisplayBoard(player);
      this.display.getDisplayBoardCell(board, coord).textContent = 'X';
    }
  }
}
