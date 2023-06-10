import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { snakeKeys } from '~/common/utils';

export class ScheduleResponseDTO {
  @ApiProperty({
    type: Number,
    name: 'id',
    description: 'Id do Agendamento',
    example: 1
  })
  @Type(() => Number)
  id: number;

  @ApiProperty({
    type: String,
    name: 'client',
    description: 'Nome do Cliente',
    example: 'John Doe'
  })
  client: string;

  service: string;
  startDate: Date;
  endDate: Date;
  paymentMethod: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;

  static factory(data: any) {
    return snakeKeys(data);
  }
}
