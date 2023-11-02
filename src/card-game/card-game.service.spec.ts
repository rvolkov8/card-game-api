import { Test, TestingModule } from '@nestjs/testing';
import { CardGameService } from './card-game.service';

describe('CardGameService', () => {
  let service: CardGameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardGameService],
    }).compile();

    service = module.get<CardGameService>(CardGameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
