import { Card } from './card.class';

export class Deck {
  cards: Card[] = [];
  constructor() {
    this.initializeDeck();
  }

  private initializeDeck(): void {
    const suits = ['hearts', 'diamonds', 'spades', 'clubs'];
    for (const suit of suits) {
      for (let rank = 1; rank <= 13; rank++) {
        this.cards.push(new Card(suit, rank));
      }
    }
  }

  count(): number {
    return this.cards.length;
  }

  shuffle(): Card[] {
    return this.cards.sort(() => Math.random() - 0.5);
  }

  draw(num: number): Card[] {
    const drawnCards = this.cards.splice(-num);
    return drawnCards;
  }
}
