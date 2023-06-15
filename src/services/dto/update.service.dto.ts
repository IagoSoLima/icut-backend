import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class UpdateServiceDto {
  @ApiProperty({
    name: 'description_service',
    example: 'Corte de cabelo completo',
    required: true,
    type: String
  })
  @Expose({ name: 'description_service' })
  @Type(() => String)
  descriptionService?: string;

  @ApiProperty({
    name: 'valor',
    example: '50',
    required: true,
    type: Number
  })
  @Expose({ name: 'valor' })
  @Type(() => Number)
  valor?: number;

  @ApiProperty({
    name: 'time_duration',
    example: '00:30:00',
    required: true,
    type: String
  })
  @Expose({ name: 'time_duration' })
  @Type(() => String)
  timeDuration?: string;

  @ApiProperty({
    name: 'type_service',
    example: 1,
    required: true,
    type: Number
  })
  @Expose({ name: 'type_service' })
  @Type(() => Number)
  @IsNotEmpty({
    message: 'Por favor forneça o o tipo de serviço'
  })
  typeService?: number;
}
