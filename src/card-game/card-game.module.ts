import { Module } from '@nestjs/common';
import { CardGameService } from './card-game.service';
import { CardGameController } from './card-game.controller';

@Module({
  providers: [CardGameService],
  controllers: [CardGameController],
})
export class CardGameModule {}
