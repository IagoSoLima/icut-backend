import { Module } from '@nestjs/common';
import { PrismaService } from '~/common/prisma';
import { ValidatorService } from '~/common/validators';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ValidatorService, PrismaService]
})
export class UsersModule {}
