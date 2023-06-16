import { Module } from '@nestjs/common';
import { AppLogger } from '~/app.logger';
import { PrismaService } from '~/common/prisma';
import { EmployeesModule } from '~/employees/employees.module';
import { EstablishmentsModule } from '~/establishments/establishments.module';
import { ServicesModule } from '~/services/services.module';
import { ScheduleController } from './schedule.controller';
import { ScheduleRepository } from './schedule.repository';
import { ScheduleService } from './schedule.service';

const dependencies = [
  ScheduleService,
  ScheduleRepository,
  AppLogger,
  PrismaService
];

@Module({
  controllers: [ScheduleController],
  imports: [ServicesModule, EmployeesModule, EstablishmentsModule],
  providers: dependencies,
  exports: dependencies
})
export class ScheduleModule {}
