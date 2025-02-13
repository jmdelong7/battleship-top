import { Gameboard } from './gameboard';
import { GameDisplay } from './game-display';

export class GameController {
  constructor() {
    this.human = new Gameboard();
    this.computer = new Gameboard();

    this.display = new GameDisplay();
    this.humanDisplay = this.display.humanBoard;
    this.computerDisplay = this.display.computerBoard;

    this.openCells = this.possibleCoords();
  }

  possibleCoords(arr = []) {
    for (let row = 0; row <= 9; row++) {
      for (let col = 0; col <= 9; col++) {
        arr.push([row, col]);
      }
    }
    return arr;
  }

  getDisplayBoard(player) {
    return player === this.human ? this.humanDisplay : this.computerDisplay;
  }

  getDisplayCell(player, coord) {
    const displayBoard = this.getDisplayBoard(player);
    return this.display.getDisplayBoardCell(displayBoard, coord);
  }

  updateCellDataState(player, coord) {
    const cell = this.getDisplayCell(player, coord);
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

  addCellEventListener(cell, coord) {
    cell.addEventListener('click', () => {
      this.attack(this.computer, coord);
    });
  }

  addAttackListeners() {
    for (let row = 0; row <= 9; row++) {
      for (let col = 0; col <= 9; col++) {
        const cell = this.getDisplayCell(this.computer, [row, col]);
        const coord = [row, col];
        this.addCellEventListener(cell, coord);
      }
    }
  }

  attack(player, coord) {
    const result = player.receiveAttack(coord);
    this.updateCellDataState(player, coord);
    if (result.result === 'hit') {
      const board = this.getDisplayBoard(player);
      this.display.getDisplayBoardCell(board, coord).textContent = 'X';
    }
    return result;
  }

  computerAttack() {
    if (this.openCells.length === 0) return null; // game should be over
    const randIdx = Math.floor(Math.random() * this.openCells.length);
    const lastEle = this.openCells.length - 1;

    const temp = this.openCells[randIdx];
    this.openCells[randIdx] = this.openCells[lastEle];
    this.openCells[lastEle] = temp;

    const coord = this.openCells.pop();
    this.attack(this.human, coord);
  }
}
