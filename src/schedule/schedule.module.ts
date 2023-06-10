import { Module } from '@nestjs/common';
import { AppLogger } from '~/app.logger';
import { PrismaService } from '~/common/prisma';
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
  providers: dependencies,
  exports: dependencies
})
export class ScheduleModule {}
