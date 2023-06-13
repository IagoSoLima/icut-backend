import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({
    name: 'description_service',
    example: 'Corte de cabelo completo',
    required: true,
    type: String
  })
  @Expose({ name: 'description_service' })
  @Type(() => String)
  @IsNotEmpty({
    message: 'Por favor forneça a descrição para o corte de cabelo'
  })
  descriptionService?: string;

  @ApiProperty({
    name: 'valor',
    example: '50',
    required: true,
    type: Number
  })
  @Expose({ name: 'valor' })
  @Type(() => Number)
  @IsNotEmpty({
    message: 'Por favor forneça o valor do serviço'
  })
  valor?: number;

  @ApiProperty({
    name: 'time_duration',
    example: '00:30:00',
    required: true,
    type: String
  })
  @Expose({ name: 'time_duration' })
  @Type(() => String)
  @IsNotEmpty({
    message: 'Por favor forneça o tempo de duração do serviço'
  })
  timeDurantion?: string;

  @ApiProperty({
    name: 'id_establishment',
    example: 1,
    required: true,
    type: Number
  })
  @Expose({ name: 'id_establishment' })
  @Type(() => Number)
  @IsNotEmpty({
    message: 'Por favor forneça o id do estabelecimento que oferecerá o serviço'
  })
  idEstablishment?: number;

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
