import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Telephones } from '@prisma/client';
import { snakeKeys } from '~/common/utils';

export class TelephoneDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  telephoneNumber: string;

  @ApiProperty()
  telephoneDescription: string;

  static factory(data: Telephones) {
    const formatedData = {
      id: data.id_telephone,
      telephoneDescription: data.ds_telephone,
      telephoneNumber: data.nr_telephone
    };
    return snakeKeys(formatedData);
  }
}
