import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuardGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException();
    }

    const token = authorization.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const secret = this.configService.get<string>('JWT_SECRET');
      const tokenPayload = await this.jwtService.verifyAsync(token, { secret });
      request.user = {
        id_user: tokenPayload.sub,
      };

      return true;
    } catch (error) {
      console.log('JWT Error:', error.message);
      throw new UnauthorizedException();
    }
  }
}
