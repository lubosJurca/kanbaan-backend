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
import { ColumnService } from './column.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { AuthGuardGuard } from 'src/auth/auth-guard/auth-guard.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('column')
@UseGuards(AuthGuardGuard)
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Post()
  create(
    @Body() createColumnDto: CreateColumnDto,
    @GetUser('id_user') id_user: number,
  ) {
    return this.columnService.create(createColumnDto, id_user);
  }

  @Get()
  findAll(@GetUser('id_user') id_user: number) {
    return this.columnService.findAll(id_user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser('id_user') id_user: number) {
    return this.columnService.findOne(+id, id_user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateColumnDto: UpdateColumnDto,
    @GetUser('id_user') id_user: number,
  ) {
    return this.columnService.update(+id, updateColumnDto, id_user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser('id_user') id_user: number) {
    return this.columnService.remove(+id, id_user);
  }
}
