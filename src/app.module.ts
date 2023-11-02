import { Module } from '@nestjs/common';
import { CardGameModule } from './card-game/card-game.module';

@Module({
  imports: [CardGameModule],
})
export class AppModule {}
