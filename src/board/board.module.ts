import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuardGuard } from 'src/auth/auth-guard/auth-guard.guard';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [JwtModule, ConfigModule, DatabaseModule],
  controllers: [BoardController],
  providers: [BoardService, AuthGuardGuard],
})
export class BoardModule {}
