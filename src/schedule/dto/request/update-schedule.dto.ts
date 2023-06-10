import { PartialType } from '@nestjs/swagger';
import { CreateScheduleRequestDTO } from './create-schedule.dto';

export class UpdateScheduleRequestDTO extends PartialType(
  CreateScheduleRequestDTO
) {}
