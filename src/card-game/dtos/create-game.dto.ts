import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty()
  @IsString()
  firstPlayer: string;

  @IsNotEmpty()
  @IsString()
  secondPlayer: string;
}
