import { Ship } from './ships';

// No.	Class of ship	  Size
// 1	    Carrier	        5
// 2	    Battleship	    4
// 3	    Cruiser	        3
// 4	    Submarine	      3
// 5	    Destroyer	      2

export class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.ships = {
      carrier: new Ship('carrier'),
      battleship: new Ship('battleship'),
      cruiser: new Ship('cruiser'),
      submarine: new Ship('submarine'),
      destroyer: new Ship('destroyer'),
    };
    this.shipsSunk = 0;
  }

  get allShipsSunk() {
    return this.shipsSunk === 5;
  }

  placeShip(shipName, coord, direction) {
    const ship = this.ships[shipName];
    const [col, row] = [coord[0], 9 - coord[1]];
    if (row < 0 || row > 9 || col < 0 || col > 9) {
      throw new Error('coord out of bounds');
    }

    if (direction === 'vertical') {
      if (row - ship.length < 0) {
        return { success: false, reason: 'ship out of bounds' };
      }

      for (let i = 0; i < ship.length; i++) {
        if (this.board[row - i][col]) {
          return { success: false, reason: 'space occupied' };
        }
        this.board[row - i][col] = shipName;
      }
    }

    if (direction === 'horizontal') {
      if (col + ship.length > 9) {
        return { success: false, reason: 'ship out of bounds' };
      }

      for (let i = 0; i < ship.length; i++) {
        if (this.board[row][col + i]) {
          return { success: false, reason: 'space occupied' };
        }
        this.board[row][col + i] = shipName;
      }
    }
  }

  receiveAttack(coord) {
    const [col, row] = [coord[0], 9 - coord[1]];
    if (row < 0 || row > 9 || col < 0 || col > 9) {
      throw new Error('coord out of bounds');
    }

    let targetCoord = this.board[row][col];
    if (targetCoord === 'miss' || targetCoord.includes('-hit')) {
      return { success: false, reason: 'space already attacked' };
    }

    if (!targetCoord) {
      this.board[row][col] = 'miss';
      return { success: true, result: 'miss' };
    }

    const shipName = targetCoord;
    this.ships[shipName].hit();
    this.board[row][col] = `${shipName}-hit`;
    if (this.ships[shipName].isSunk()) this.shipsSunk++;

    return { success: true, result: 'hit' };
  }
}
