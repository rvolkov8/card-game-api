import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Game } from './interfaces/game.interface';
import { Deck } from '../classes/deck.class';
import { Card } from '../classes/card.class';
import { CompareCardsDto } from './dtos/compare-cards.dto';

@Injectable()
export class CardGameService {
  private games: Game[] = [];

  private findGameIndex(id: string) {
    const gameIndex = this.games.findIndex((game) => game.id === id);
    if (gameIndex === -1) {
      throw new NotFoundException(`Game with ID of ${id} does not exist.`);
    }
    return gameIndex;
  }

  createGame(firstPlayer: string, secondPlayer: string): Partial<Game> {
    const newGame: Game = {
      id: uuidv4(),
      deck: new Deck(),
      firstPlayer,
      secondPlayer,
    };
    newGame.deck.shuffle();
    this.games.push(newGame);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { deck, ...result } = newGame;
    return result;
  }

  shuffleDeck(id: string): void {
    const gameIndex = this.findGameIndex(id);

    if (this.games[gameIndex].deck.count() === 0) {
      throw new BadRequestException(
        'The deck is empty and cannot be shuffled.',
      );
    }

    this.games[gameIndex].deck.shuffle();
  }

  drawCard(id: string): Card {
    const gameIndex = this.findGameIndex(id);

    if (this.games[gameIndex].deck.count() === 0) {
      throw new BadRequestException('The deck is empty.');
    }

    const [drawnCard] = this.games[gameIndex].deck.draw(1);
    return drawnCard;
  }

  compareCards(body: CompareCardsDto): { winningCard: string } {
    const { cards } = body;
    const cardRanks = {
      ace: 14,
      king: 13,
      queen: 12,
      jack: 11,
      '10': 10,
      '9': 9,
      '8': 8,
      '7': 7,
      '6': 6,
      '5': 5,
      '4': 4,
      '3': 3,
      '2': 2,
    };

    const winningCard = cards.reduce((currentWinner, card) =>
      cardRanks[card.split(' ')[0].toLowerCase()] >
      cardRanks[currentWinner.split(' ')[0].toLowerCase()]
        ? card
        : currentWinner,
    );

    return { winningCard };
  }
}
