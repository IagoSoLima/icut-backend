import { ApiProperty } from '@nestjs/swagger';
import { Services } from '@prisma/client';
import { snakeKeys } from '~/common/utils';

export class ServicesDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  descriptionService?: string;

  @ApiProperty()
  valor?: number;

  @ApiProperty()
  timeDuration?: Date;

  @ApiProperty()
  idEstablishment?: number;

  @ApiProperty()
  typeService?: number;

  @ApiProperty()
  active?: boolean;

  static factory(data: Services) {
    const formatedData = {
      id: data.id_service,
      descriptionService: data.ds_service,
      valor: data.nr_valor,
      timeDuration: data.time_duration,
      idEstablishment: data.fk_id_establishment,
      typeService: data.fk_id_type_service,
      active: data.active
    };
    return snakeKeys(formatedData);
  }
}
