import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class UpdateScheduleRequestDTO {
  @ApiProperty({
    name: 'Data e horário inicial do agendamento',
    example: '2022-08-20T10:00:00',
    required: true,
    type: Date
  })
  @Expose({ name: 'date_start' })
  @Type(() => Date)
  @IsNotEmpty({
    message: 'START_DATE_IS_REQUIRED'
  })
  dateStart: Date;
}
