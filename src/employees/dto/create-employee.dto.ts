import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({
    name: 'id_user',
    description: 'Id do funcionario cadastrado',
    example: 1,
    required: true,
    type: Number
  })
  @Expose({ name: 'id_user' })
  @Type(() => Number)
  @IsNotEmpty({
    message: 'Por favor fornecer o ID do usuario funcionario'
  })
  idUser: number;

  @ApiProperty({
    name: 'id_establishment',
    description: 'Id do estabelecimento',
    example: 1,
    required: true,
    type: Number
  })
  @Expose({ name: 'id_establishment' })
  @Type(() => Number)
  @IsNotEmpty({
    message: 'Por favor fornecer o ID do estabelecimento'
  })
  idEstablishment: number;
}
