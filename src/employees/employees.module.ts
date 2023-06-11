import { Module } from '@nestjs/common';
import { PrismaService } from '~/common/prisma';
import { EmployeesRepository } from '~/employees/employees.repository';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService, EmployeesRepository, PrismaService]
})
export class EmployeesModule {}
