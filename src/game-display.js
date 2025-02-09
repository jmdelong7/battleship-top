export class GameDisplay {
  constructor() {
    this.humanBoard = document.querySelector('.game__board--human');
    this.computerBoard = document.querySelector('.game__board--computer');
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

  clearBoards() {
    for (let row = 0; row <= 9; row++) {
      for (let col = 0; col <= 9; col++) {
        const human = this.getBoardCell(this.human, [row, col]);
        const computer = this.getBoardCell(this.computer, [row, col]);
        human.cell.Attribute('data-state', 'empty');
        computer.cell.Attribute('data-state', 'empty');
      }
    }
  }
}
