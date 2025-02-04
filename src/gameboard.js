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
    this.ships = {
      carrier: new Ship('carrier'),
      battleship: new Ship('battleship'),
      cruiser: new Ship('cruiser'),
      submarine: new Ship('submarine'),
      destroyer: new Ship('destroyer'),
    };
  }

  placeShip(shipName, coord, direction) {
    const ship = this.ships[shipName];
    const currBoard = this.board;
    const [col, row] = [coord[0], 9 - coord[1]];
    if (row < 0 || row > 9 || col < 0 || col > 9) {
      throw new Error('coord out of bounds');
    }

    if (direction === 'vertical') {
      if (row - ship.length < 0) {
        return { success: false, reason: 'ship out of bounds' };
      }

      for (let i = 0; i < ship.length; i++) {
        if (currBoard[row - i][col]) {
          return { success: false, reason: 'space occupied' };
        }
        currBoard[row - i][col] = shipName;
      }
    }

    if (direction === 'horizontal') {
      if (col + ship.length > 9) {
        return { success: false, reason: 'ship out of bounds' };
      }

      for (let i = 0; i < ship.length; i++) {
        if (currBoard[row][col + i]) {
          return { success: false, reason: 'space occupied' };
        }
        currBoard[row][col + i] = shipName;
      }
    }

    this.board = currBoard;
  }

  receiveAttack(coord) {
    const currBoard = this.board;
    const [col, row] = [coord[0], 9 - coord[1]];
    if (row < 0 || row > 9 || col < 0 || col > 9) {
      throw new Error('coord out of bounds');
    }

    const attack = currBoard[row][col];
    if (attack === 'miss' || attack.includes('-hit')) {
      return { success: false, reason: 'space already attacked' };
    }

    if (!attack) {
      attack = 'miss';
      return { success: true, result: 'miss' };
    }

    this.ships[attack].hit();
    attack = attack + '-hit';
    this.board = currBoard;
    return { success: true, result: 'hit' };
  }
}
