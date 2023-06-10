import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateScheduleRequestDTO {
  @ApiProperty({
    name: 'id do serviço escolhido para o agendamento',
    example: 1,
    required: true,
    type: Number
  })
  @Expose({ name: 'service' })
  @Type(() => Number)
  @IsNotEmpty({
    message: 'Por favor fornece o o serviço'
  })
  service: number;

  @ApiProperty({
    name: 'Data e horário inicial do agendamento',
    example: '2022-08-20T10:00:00',
    required: true,
    type: Date
  })
  @Expose({ name: 'date_start' })
  @Type(() => Date)
  @IsNotEmpty({
    message: 'Por favor fornece a data e hora inicial do agendamento'
  })
  dateStart: Date;

  @ApiProperty({
    name: 'Data e horário final do agendamento',
    example: '2022-08-20T11:00:00',
    required: true,
    type: Date
  })
  @Expose({ name: 'payment_method' })
  @IsNotEmpty({
    message: 'Por favor fornece o método de pagamento'
  })
  paymentMethod: number;
}
