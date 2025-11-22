import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsInt()
  @IsPositive()
  id_board: number;
}
