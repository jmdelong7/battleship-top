import { Gameboard } from './gameboard';
import { GameDisplay } from './game-display';

export class GameController {
  constructor() {
    this.human = new Gameboard();
    this.computer = new Gameboard();

    this.display = new GameDisplay();
    this.humanDisplay = this.display.humanBoard;
    this.computerDisplay = this.display.computerBoard;
    this.randomBtn = this.display.randomBtn;
    this.newGameBtn = this.display.newGameBtn;
    this.humanData = this.display.humanData;
    this.computerData = this.display.computerData;

    this.openCells = this.possibleCoords();
    this.addListeners();

    this.placeShipsRandomly(this.human);
    this.placeShipsRandomly(this.computer);
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
    const name = player === this.human ? 'human' : 'computer';
    const cell = this.getDisplayCell(player, coord);
    if (!player.getBoardCell(coord)) {
      cell.setAttribute('data-state', 'empty');
    } else {
      cell.setAttribute('data-state', `${name}-${player.getBoardCell(coord)}`);
    }
  }

  updatePlayerGameboard(player) {
    for (let row = 0; row <= 9; row++) {
      for (let col = 0; col <= 9; col++) {
        this.updateCellDataState(player, [row, col]);
      }
    }
  }

  newGame() {
    this.human = new Gameboard();
    this.computer = new Gameboard();
    this.openCells = this.possibleCoords();

    this.display.clearDisplayBoards();
  }

  placeShipsRandomly(player) {
    player.placeShipsRandomly();
    this.updatePlayerGameboard(player);
  }

  updateGameData(player, action) {
    const data = player === this.human ? this.humanData : this.computerData;
    let [sunk, hit, miss] = [...data.children];
    const spans = [sunk, hit, miss].map((ele) => ele.querySelector('span'));

    [sunk, hit, miss] = [...spans];
    if (action === 'hit') hit.textContent = Number(hit.textContent) + 1;
    if (action === 'miss') miss.textContent = Number(miss.textContent) + 1;

    sunk.textContent = player.shipsSunk;
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
    const result = this.attack(this.human, coord);
    this.updateGameData(this.human, result.result);
  }

  addCellAttackListener(cell, coord) {
    function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    cell.addEventListener(
      'click',
      async () => {
        const result = this.attack(this.computer, coord);
        this.updateGameData(this.computer, result.result);
        document.body.style.pointerEvents = 'none';
        await delay(500);
        document.body.style.pointerEvents = 'auto';
        this.computerAttack();
      },
      {
        once: true,
      }
    );
  }

  addAllAttackListeners() {
    for (let row = 0; row <= 9; row++) {
      for (let col = 0; col <= 9; col++) {
        const cell = this.getDisplayCell(this.computer, [row, col]);
        const coord = [row, col];
        this.addCellAttackListener(cell, coord);
      }
    }
  }

  addListeners() {
    this.addAllAttackListeners();
    // this.newGameBtn.addEventListener('click', () => this.newGame());
    this.randomBtn.addEventListener('click', () => {
      this.newGame();
      this.placeShipsRandomly(this.human);
      this.placeShipsRandomly(this.computer);
    });
  }

  gameOver() {
    const hSunk = this.human.shipsSunk;
    const cSunk = this.computer.shipsSunk;
    if (hSunk < 5 && cSunk < 5) return null;
  }
}
