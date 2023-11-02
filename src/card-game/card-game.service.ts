import { Injectable } from '@nestjs/common';
import { Game } from './interfaces/game.interface';
import { v4 as uuidv4 } from 'uuid';
import { Deck } from 'src/classes/deck.class';

@Injectable()
export class CardGameService {
  private games: Game[] = [];

  createGame(firstPlayer: string, secondPlayer: string): Game {
    const newGame: Game = {
      id: uuidv4(),
      deck: new Deck(),
      firstPlayer,
      secondPlayer,
    };
    newGame.deck.shuffle();
    this.games.push(newGame);
    delete newGame.deck;
    return newGame;
  }
}
