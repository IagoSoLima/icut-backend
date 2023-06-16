import { ApiProperty } from '@nestjs/swagger';
import { Addresses } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import { snakeKeys } from '~/common/utils';

export class AddressDto {
  @ApiProperty({
    name: 'id_address',
    example: 1,
    required: true,
    type: Number
  })
  @Expose({ name: 'id_address' })
  @Type(() => Number)
  idAddress: number;

  @ApiProperty({
    name: 'address',
    example: 'Rua OleOlé, 360',
    required: true,
    type: String
  })
  @Expose({ name: 'address' })
  @Type(() => String)
  address: string;

  @ApiProperty({
    name: 'city',
    example: 'Iago Lima',
    required: true,
    type: String
  })
  @Expose({ name: 'city' })
  @Type(() => String)
  city: string;

  @ApiProperty({
    name: 'state',
    example: 'São Paulo',
    required: true,
    type: String
  })
  @Expose({ name: 'state' })
  @Type(() => String)
  state: string;

  @ApiProperty({
    name: 'cep',
    example: 'estabelecimento@estabelecimento.com',
    required: true,
    type: String
  })
  @Expose({ name: 'cep' })
  @Type(() => String)
  cep: string;

  static factory(data: Addresses) {
    var formateddata = {
      idAddress: data.id_address,
      address: data.ds_address,
      city: data.ds_city,
      state: data.ds_state,
      cep: data.nr_cep
    };
    return snakeKeys(formateddata);
  }
}
