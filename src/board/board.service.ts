import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class BoardService {
  constructor(private databaseService: DatabaseService) {}

  async create(createBoardDto: CreateBoardDto, id_user: number) {
    return await this.databaseService.board.create({
      data: {
        title: createBoardDto.title,
        order: 0,
        id_user,
      },
    });
  }

  async findAll(id_user: number) {
    //if no data, returns []
    return await this.databaseService.board.findMany({
      where: {
        id_user,
      },
    });
  }

  async findOne(id: number, id_user: number) {
    const data = await this.databaseService.board.findFirst({
      where: {
        id,
        id_user,
      },
    });

    if (!data) {
      throw new NotFoundException('Board not found');
    }
    return data;
  }

  async update(id: number, updateBoardDto: UpdateBoardDto, id_user: number) {
    // No need to check if data exists, Prisma handles it
    return await this.databaseService.board.update({
      where: {
        id,
        id_user,
      },
      data: updateBoardDto,
    });
  }

  async remove(id: number, id_user: number) {
    return await this.databaseService.board.delete({
      where: {
        id,
        id_user,
      },
    });
  }
}
