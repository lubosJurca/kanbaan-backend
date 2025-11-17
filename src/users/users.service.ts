import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { User } from 'generated/prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService){}


  async create(createUserDto: CreateUserDto) {
    return this.databaseService.user.create({
      data: createUserDto
    });
  }

  async findAll() {
    return this.databaseService.user.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.user.findUnique({
      where: {
        id
      }
    });
  }

  async findUserByEmail(email: string): Promise<User | null>{
    return this.databaseService.user.findFirst({
      where: {
        email
      }
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.databaseService.user.update({
      where: {
        id
      },
      data: updateUserDto
    });
  }

  async remove(id: number) {
    return this.databaseService.user.delete({
      where: {
        id
      }
    });
  }
}
