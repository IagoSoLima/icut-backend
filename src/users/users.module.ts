import { Module } from '@nestjs/common';
import { AppLogger } from '~/app.logger';
import { PrismaService } from '~/common/prisma';
import { ValidatorService } from '~/common/validators';
import { EmployeesRepository } from '~/employees/employees.repository';
import { EmployeesService } from '~/employees/employees.service';
import { EstablishmentsRepository } from '~/establishments/establishments.repository';
import { EstablishmentsService } from '~/establishments/establishments.service';
import { TelephoneRepository } from '~/telephones/telephone.repository';
import { TelephoneService } from '~/telephones/telephones.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
const dependencies = [
  UsersService,
  ValidatorService,
  PrismaService,
  EstablishmentsService,
  EstablishmentsRepository,
  UsersRepository,
  TelephoneService,
  TelephoneRepository,
  EmployeesService,
  EmployeesRepository,
  AppLogger
];

@Module({
  controllers: [UsersController],
  providers: dependencies,
  exports: dependencies
})
export class UsersModule {}
