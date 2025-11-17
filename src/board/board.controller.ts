import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { AuthGuardGuard } from 'src/auth/auth-guard/auth-guard.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('board')
@UseGuards(AuthGuardGuard)
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  create(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser('id_user') id_user: number,
  ) {
    return this.boardService.create(createBoardDto, id_user);
  }

  @Get()
  findAll(@GetUser('id_user') id_user: number) {
    return this.boardService.findAll(id_user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser('id_user') id_user: number) {
    return this.boardService.findOne(+id, id_user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
    @GetUser('id_user') id_user: number,
  ) {
    return this.boardService.update(+id, updateBoardDto, id_user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser('id_user') id_user: number) {
    return this.boardService.remove(+id, id_user);
  }
}
