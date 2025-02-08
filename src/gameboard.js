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

  clearBoard() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
  }

  placeShip(shipName, coord, direction = 'vertical') {
    const ship = this.ships[shipName];
    const [col, row] = [coord[0], 9 - coord[1]];
    if (row < 0 || row > 9 || col < 0 || col > 9) {
      throw new Error('coord out of bounds');
    }

    if (direction === 'vertical') {
      if (row + 1 - ship.length < 0) {
        return { success: false, reason: 'ship out of bounds' };
      }

      let shipPlacementCoords = [];
      for (let i = 0; i < ship.length; i++) {
        if (this.board[row - i][col]) {
          return { success: false, reason: 'space occupied' };
        }
        console.log([row - i, col]);
        shipPlacementCoords.push([row - i, col]);
      }

      shipPlacementCoords.forEach((placementCoord) => {
        this.board[placementCoord[0]][placementCoord[1]] = shipName;
      });
    }

    if (direction === 'horizontal') {
      if (col + ship.length > 9) {
        return { success: false, reason: 'ship out of bounds' };
      }

      let shipPlacementCoords = [];
      for (let i = 0; i < ship.length; i++) {
        if (this.board[row][col + i]) {
          return { success: false, reason: 'space occupied' };
        }
        shipPlacementCoords.push([row, col + 1]);
        // this.board[row][col + i] = shipName;
      }

      shipPlacementCoords.forEach((placementCoord) => {
        this.board[placementCoord[0]][placementCoord[1]] = shipName;
      });
    }

    return { success: true, result: `${shipName} placed` };
  }

  placeShipsRandomly() {
    this.clearBoard();
    Object.keys(this.ships).forEach((shipName) => {
      const direction = Math.random() < 0.5 ? 'vertical' : 'horizontal';
      const shipLength = this.ships[shipName].length;

      let randomCoord = () => {
        if (direction === 'vertical') {
          const row = Math.floor(Math.random() * 10);
          const col = Math.floor(Math.random() * shipLength);
          return [row, col];
        } else if (direction === 'horizontal') {
          const row = Math.floor(Math.random() * shipLength);
          const col = Math.floor(Math.random() * 10);
          return [row, col];
        }
      };

      let shipPlaced = false;
      while (!shipPlaced) {
        const result = this.placeShip(shipName, randomCoord(), direction);
        if (result.success === true) shipPlaced = true;
      }
    });
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

  getBoardCell(coord) {
    const [col, row] = [coord[0], 9 - coord[1]];
    return this.board[row][col];
  }
}
