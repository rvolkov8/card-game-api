import { Deck } from 'src/classes/deck.class';

export interface Game {
  id: string;
  deck: Deck;
  firstPlayer: string;
  secondPlayer: string;
}
