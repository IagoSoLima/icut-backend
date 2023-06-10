import { Module } from '@nestjs/common';
import { AppLogger } from '~/app.logger';
import { ScheduleController } from './schedule.controller';
import { ScheduleRepository } from './schedule.repository';
import { ScheduleService } from './schedule.service';

const dependencies = [ScheduleService, ScheduleRepository, AppLogger];

@Module({
  controllers: [ScheduleController],
  providers: dependencies,
  exports: dependencies
})
export class ScheduleModule {}
