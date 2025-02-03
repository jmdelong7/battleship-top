import { Ship } from './ships';

// No.	Class of ship	  Size
// 1	    Carrier	        5
// 2	    Battleship	    4
// 3	    Cruiser	        3
// 4	    Submarine	      3
// 5	    Destroyer	      2

export class Gameboard {
  constructor() {
    // 10 x 10
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
  }

  placeShip(shipName, coord, direction) {
    const ship = new Ship(shipName);
    const [col, row] = [coord[0], 9 - coord[1]];
    const currBoard = this.board;

    if (direction === 'vertical') {
      if (row - ship.length < 0) {
        throw new Error('ship to big to be placed there');
      }

      for (let i = 0; i < ship.length; i++) {
        currBoard[row - i][col] = shipName;
      }
    }

    if (direction === 'horizontal') {
      if (col + ship.length > 0) {
        throw new Error('ship to big to be placed there');
      }

      for (let i = 0; i < ship.length; i++) {
        currBoard[row][col + i] = shipName;
      }
    }

    this.board = currBoard;
  }
}
