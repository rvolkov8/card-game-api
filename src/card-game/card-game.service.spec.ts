import { Test, TestingModule } from '@nestjs/testing';
import { CardGameService } from './card-game.service';
import { CardValuesEnum } from './enums/card-values.enum';
import { CompareCardsDto } from './dtos/compare-cards.dto';

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

  it('should create a game and return it', () => {
    const firstPlayer = 'test1';
    const secondPlayer = 'test2';

    const result = service.createGame(firstPlayer, secondPlayer);

    expect(result.id).toBeDefined();
    expect(result.firstPlayer).toEqual(firstPlayer);
    expect(result.secondPlayer).toEqual(secondPlayer);
  });

  it('should shuffle deck by id', () => {
    const { id } = service.createGame('Alice', 'Jim');
    service.shuffleDeck(id);
  });

  it('should throw a NotFoundException for a non-existing game', () => {
    const nonExistingId = 'random-id';

    expect(() => service.shuffleDeck(nonExistingId)).toThrow(
      'Game with ID of random-id does not exist.',
    );
  });

  it('should throw a BadRequestException for an empty deck', () => {
    const { id } = service.createGame('Alice', 'Bob');
    for (let i = 0; i < 52; i++) {
      service.drawCard(id);
    }

    expect(() => service.shuffleDeck(id)).toThrow(
      'The deck is empty and cannot be shuffled.',
    );
  });

  it('should compare two cards and return the winning card', () => {
    const cards: CompareCardsDto = {
      cards: [CardValuesEnum.aceOfSpades, CardValuesEnum.kingOfSpades],
    };

    const result = service.compareCards(cards);

    expect(result.winningCard).toEqual('Ace of Spades');
  });
});
