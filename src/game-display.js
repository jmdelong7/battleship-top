export class GameDisplay {
  constructor() {
    this.humanBoard = document.querySelector('.game__board--human');
    this.computerBoard = document.querySelector('.game__board--computer');
    this.initGameboardDisplay(this.humanBoard);
    this.initGameboardDisplay(this.computerBoard);

    this.randomBtn = document.getElementById('random');
    this.newGameBtn = document.getElementById('new-game');
  }

  initGameboardDisplay(board) {
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

  getDisplayBoardCell(board, coord) {
    const [col, row] = [coord[0], 9 - coord[1]];
    const boardRow = [...board.children][row];
    const boardCell = [...boardRow.children][col];
    return boardCell;
  }

  clearDisplayBoards() {
    for (let row = 0; row <= 9; row++) {
      for (let col = 0; col <= 9; col++) {
        const h = this.getDisplayBoardCell(this.humanBoard, [row, col]);
        h.setAttribute('data-state', 'empty');
        h.textContent = '';

        const c = this.getDisplayBoardCell(this.computerBoard, [row, col]);
        c.setAttribute('data-state', 'empty');
        c.textContent = '';
      }
    }
  }
}
