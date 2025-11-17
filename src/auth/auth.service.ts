import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(inputData: CreateUserDto) {
    const user = await this.usersService.findUserByEmail(inputData.email);

    if (user) {
      throw new ConflictException('Email already exists');
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(inputData.password, salt);

    const newUser = { ...inputData, password: hashPassword };
    const createdUser = await this.usersService.create(newUser);

    const payload = { sub: createdUser.id };
    const accessToken = this.jwtService.sign(payload);

    const { password, ...userWithoutPassword } = createdUser;

    return {
      accessToken,
      username: userWithoutPassword.username,
      id_user: userWithoutPassword.id,
    };
  }

  async signIn(email: string, inputPassword: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordMatch = await bcrypt.compare(inputPassword, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    const { password, ...userWithoutPassword } = user;

    return {
      accessToken,
      username: userWithoutPassword.username,
      id_user: userWithoutPassword.id,
    };
  }
}
