import { Module } from '@nestjs/common';
import { AppLogger } from '~/app.logger';
import { PrismaService } from '~/common/prisma';
import { ValidatorService } from '~/common/validators';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
const dependencies = [
  UsersService,
  UsersRepository,
  ValidatorService,
  PrismaService,
  AppLogger
];

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
