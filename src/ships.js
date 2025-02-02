// No.	Class of ship	  Size
// 1	    Carrier	        5
// 2	    Battleship	    4
// 3	    Cruiser	        3
// 4	    Submarine	      3
// 5	    Destroyer	      2
export class Ship {
  constructor(length) {
    this.length = length;
    this.timesHit = 0;
  }

  hit() {
    this.timesHit += 1;
  }

  isSunk() {
    return this.timesHit === this.length ? true : false;
  }
}
