import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { AuthGuardGuard } from 'src/auth/auth-guard/auth-guard.guard';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [JwtModule, ConfigModule, DatabaseModule],
  controllers: [ColumnController],
  providers: [ColumnService, AuthGuardGuard],
})
export class ColumnModule {}
