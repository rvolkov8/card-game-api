import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Game } from './interfaces/game.interface';
import { v4 as uuidv4 } from 'uuid';
import { Deck } from 'src/classes/deck.class';

@Injectable()
export class CardGameService {
  private games: Game[] = [];

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
    const gameIndex = this.games.findIndex((game) => (game.id = id));

    if (gameIndex === -1) {
      throw new NotFoundException(`Game with ID of ${id} does not exist.`);
    }
    if (this.games[gameIndex].deck.count() === 0) {
      throw new BadRequestException(
        'The deck is empty and cannot be shuffled.',
      );
    }

    this.games[gameIndex].deck.shuffle();
  }
}
