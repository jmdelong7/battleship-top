import { Ship } from '../ships';

test('ship hit', () => {
  const ship = new Ship(5);
  ship.hit();
  expect(ship.timesHit).toBe(1);
  ship.hit();
  expect(ship.timesHit).toBe(2);
});

test('ship sunk', () => {
  const ship = new Ship(5);
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
  for (let i = 1; i < ship.length; i++) {
    ship.hit();
  }
  console.log('times hit: ', ship.timesHit);
  expect(ship.isSunk()).toBe(true);
});
