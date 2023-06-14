import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({
    name: 'address',
    example: 'Rua OleOlé, 360',
    required: true,
    type: String
  })
  @Expose({ name: 'address' })
  @Type(() => String)
  @IsNotEmpty({
    message: 'Por favor forneça o nome do estabelecimento'
  })
  address: string;

  @ApiProperty({
    name: 'city',
    example: 'Iago Lima',
    required: true,
    type: String
  })
  @Expose({ name: 'city' })
  @Type(() => String)
  @IsNotEmpty({
    message: 'Por favor fornece o nome do representante do estabelecimento'
  })
  city: string;

  @ApiProperty({
    name: 'state',
    example: 'São Paulo',
    required: true,
    type: String
  })
  @Expose({ name: 'state' })
  @Type(() => String)
  @IsNotEmpty({
    message: 'Por favor fornece o cnpj do estabelecimento'
  })
  state: string;

  @ApiProperty({
    name: 'cep',
    example: 'estabelecimento@estabelecimento.com',
    required: true,
    type: String
  })
  @Expose({ name: 'cep' })
  @Type(() => String)
  @IsNotEmpty({
    message: 'Por favor fornece o cnpj do estabelecimento'
  })
  cep: string;

  @ApiProperty({
    name: 'id_establishment',
    example:
      'https://cdn.leroymerlin.com.br/products/kit_6_placas_decorativas_barbearia_barber_shop_salao_mdf_1567590343_992f_600x600.jpg',
    required: true,
    type: Number
  })
  @Expose({ name: 'id_establishment' })
  @Type(() => Number)
  @IsNotEmpty({
    message: 'Por favor insira ologo'
  })
  idEstablishment: number;
}
