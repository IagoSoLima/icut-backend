import { Module } from '@nestjs/common';
import { PrismaService } from '~/common/prisma';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  imports: []
})
export class UsersModule {}
