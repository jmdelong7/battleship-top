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
    this.board = Array(10).fill(Array(10).fill(null));
  }

  placeShip(ship, direction) {}
}
