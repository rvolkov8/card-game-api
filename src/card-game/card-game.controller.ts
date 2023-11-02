import { Body, Controller, Post } from '@nestjs/common';
import { CardGameService } from './card-game.service';
import { CreateGameDto } from './dtos/create-game.dto';
import { Game } from './interfaces/game.interface';

@Controller('game')
export class CardGameController {
  constructor(private cardGameService: CardGameService) {}

  @Post()
  createGame(@Body() body: CreateGameDto): Game {
    const { firstPlayer, secondPlayer } = body;
    return this.cardGameService.createGame(firstPlayer, secondPlayer);
  }
}
