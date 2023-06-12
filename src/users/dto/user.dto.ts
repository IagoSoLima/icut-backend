import { ApiProperty } from '@nestjs/swagger';
import { Telephones, Users } from '@prisma/client';
import { snakeKeys } from '~/common/utils';
import { UserTelephoneDto } from './user.telephone.dto';

export class UserDto {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  username?: string;

  @ApiProperty()
  password?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  firstName?: string;

  @ApiProperty()
  lastName?: string;

  @ApiProperty()
  cpf?: string;

  @ApiProperty()
  typeUser?: number;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  listTelephones?: Array<UserTelephoneDto>;

  static factoryUserTelephone(data: Users & { telephone: Telephones[] }) {
    const formatedData = {
      id: data.id_user,
      username: data.ds_username,
      email: data.ds_email,
      firstName: data.ds_user_name,
      lastName: data.ds_user_lastname,
      active: data.active,
      listTelephones: data.telephone.map(telefone => {
        return UserTelephoneDto.factory(telefone);
      })
    };

    return snakeKeys(formatedData);
  }

  static factoryUser(data: Users & { telephone: Telephones[] }) {
    const formatedData = {
      id: data.id_user,
      username: data.ds_username,
      email: data.ds_email,
      firstName: data.ds_user_name,
      lastName: data.ds_user_lastname,
      cpf: data.nr_cpf,
      typeUser: data.fk_id_type_user,
      active: data.active,
      listTelephones: data.telephone.map(telefone => {
        return UserTelephoneDto.factory(telefone);
      })
    };

    return snakeKeys(formatedData);
  }
}
