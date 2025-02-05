import { Player } from './player';

export class GameController {
  constructor() {
    this.player = new Player();
    this.computer = new Player();
  }
}
