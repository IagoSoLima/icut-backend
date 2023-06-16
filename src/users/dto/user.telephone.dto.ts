import { ApiProperty } from '@nestjs/swagger';
import { Telephones } from '@prisma/client';
import { snakeKeys } from '~/common/utils';

export class UserTelephoneDto {
  @ApiProperty()
  idTelephone: number;

  @ApiProperty()
  telephoneNumber: string;

  @ApiProperty()
  telephoneDescription: string;

  static factory(data: Telephones) {
    const formatedData = {
      idTelephone: data.id_telephone,
      telephoneNumber: data.nr_telephone,
      telephoneDescription: data.ds_telephone
    };
    return snakeKeys(formatedData);
  }
}
