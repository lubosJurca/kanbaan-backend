import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ColumnService {
  constructor(private databaseService: DatabaseService) {}

  async create(createColumnDto: CreateColumnDto, id_user: number) {
    const board = await this.databaseService.board.findFirst({
      where: {
        id: createColumnDto.id_board,
        id_user,
      },
    });

    if (!board) {
      throw new NotFoundException('Board not found');
    }

    const maxColumn = await this.databaseService.column.findFirst({
      where: { id_board: createColumnDto.id_board },
      orderBy: { order: 'desc' },
    });

    const newOrder = (maxColumn?.order ?? -1) + 1;

    return this.databaseService.column.create({
      data: {
        title: createColumnDto.title,
        id_board: createColumnDto.id_board,
        order: newOrder,
      },
    });
  }

  async findAll(id_user: number) {
    return await this.databaseService.column.findMany({
      where: {
        board: {
          id_user,
        },
      },
    });
  }

  async findOne(id: number, id_user: number) {
    const column = await this.databaseService.column.findFirst({
      where: {
        id,
        board: {
          id_user,
        },
      },
    });

    if (!column) {
      throw new NotFoundException('Column not found');
    }
    return column;
  }

  async update(id: number, updateColumnDto: UpdateColumnDto, id_user: number) {
    return await this.databaseService.column.update({
      where: {
        id,
        board: {
          id_user,
        },
      },
      data: updateColumnDto,
    });
  }

  async remove(id: number, id_user: number) {
    return await this.databaseService.column.delete({
      where: {
        id,
        board: {
          id_user,
        },
      },
    });
  }
}
