// No.	Class of ship	  Size
// 1	    Carrier	        5
// 2	    Battleship	    4
// 3	    Cruiser	        3
// 4	    Submarine	      3
// 5	    Destroyer	      2
export class Ship {
  constructor(name) {
    const lengthOfShips = {
      carrier: 5,
      battleship: 4,
      cruiser: 3,
      submarine: 3,
      destroyer: 2,
    };
    this.name = name.toLowerCase();
    this.length = lengthOfShips[this.name] || 0;
    this.timesHit = 0;
  }

  hit() {
    this.timesHit += 1;
  }

  isSunk() {
    return this.timesHit === this.length;
  }
}
