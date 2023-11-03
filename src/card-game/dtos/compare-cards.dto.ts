import { IsArray, IsEnum, ArrayMinSize } from 'class-validator';
import { CardValuesEnum } from '../enums/card-values.enum';

export class CompareCardsDto {
  @IsArray()
  @ArrayMinSize(2, {
    message: 'At least two cards are required for comparison',
  })
  @IsEnum(CardValuesEnum, { each: true })
  cards: CardValuesEnum[];
}
