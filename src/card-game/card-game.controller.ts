import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CardGameService } from './card-game.service';
import { CreateGameDto } from './dtos/create-game.dto';
import { Game } from './interfaces/game.interface';
import { Card } from 'src/classes/card.class';

@Controller('game')
export class CardGameController {
  constructor(private cardGameService: CardGameService) {}

  @Post()
  createGame(@Body() body: CreateGameDto): Partial<Game> {
    const { firstPlayer, secondPlayer } = body;
    return this.cardGameService.createGame(firstPlayer, secondPlayer);
  }

  @Patch('/:id/shuffle')
  @HttpCode(204)
  shuffleDeck(@Param('id') id: string): void {
    this.cardGameService.shuffleDeck(id);
  }

  @Patch('/:id/draw')
  drawCard(@Param('id') id: string): Partial<Card> {
    return this.cardGameService.drawCard(id);
  }

  @Get('/compare')
  compareCards(@Body() cards: string[]): { winningCard: string } {
    return this.cardGameService.compareCards(cards);
  }
}
