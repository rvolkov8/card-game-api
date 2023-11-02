import { Test, TestingModule } from '@nestjs/testing';
import { CardGameController } from './card-game.controller';

describe('CardGameController', () => {
  let controller: CardGameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardGameController],
    }).compile();

    controller = module.get<CardGameController>(CardGameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
