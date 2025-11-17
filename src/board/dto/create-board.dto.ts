import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
