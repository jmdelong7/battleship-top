import { Player } from './player';

export class GameController {
  constructor() {
    this.human = new Player();
    this.computer = new Player();
  }
}
