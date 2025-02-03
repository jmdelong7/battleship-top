import { Ship } from '../ships';
import { Gameboard } from '../gameboard';

// No.	Class of ship	  Size
// 1	    Carrier	        5
// 2	    Battleship	    4
// 3	    Cruiser	        3
// 4	    Submarine	      3
// 5	    Destroyer	      2

test('place ship, vertical, in range', () => {
  const dummyBoard = Array.from({ length: 10 }, () => Array(10).fill(null));
  dummyBoard[5][3] = 'carrier';
  dummyBoard[4][3] = 'carrier';
  dummyBoard[3][3] = 'carrier';
  dummyBoard[2][3] = 'carrier';
  dummyBoard[1][3] = 'carrier';

  const gameboard = new Gameboard();
  gameboard.placeShip('carrier', [3, 4], 'vertical');
  console.log(gameboard.board);
  expect(gameboard.board).toEqual(dummyBoard);
});

// test('place ship, out of range', () => {
//   const gameboard = new Gameboard();
//   gameboard.placeShip('carrier', [7, 8], 'vertical');
//   expect(gameboard.placeShip('carrier', [7, 8], 'vertical')).toThrow(
//     'out of board range'
//   );
// });
