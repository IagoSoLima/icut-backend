import { Module } from '@nestjs/common';
import { PrismaService } from '~/common/prisma';
import { EmployeesRepository } from '~/employees/employees.repository';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';

const dependencies = [EmployeesService, EmployeesRepository, PrismaService];
@Module({
  controllers: [EmployeesController],
  providers: dependencies,
  exports: dependencies
})
export class EmployeesModule {}
