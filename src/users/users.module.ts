import { Module } from '@nestjs/common';
import { PrismaService } from '~/common/prisma';
import { ValidatorService } from '~/common/validators';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { AppLogger } from '~/app.logger';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    ValidatorService,
    PrismaService,
    UsersRepository,
    AppLogger
  ]
})
export class UsersModule {}
