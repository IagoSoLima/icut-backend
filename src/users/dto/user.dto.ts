import { ApiProperty } from '@nestjs/swagger';
import { Users } from '@prisma/client';

export class UserDto {
  constructor(data: Users) {
    this.id = data.id_user;
    (this.firstName = data.ds_user_name),
      (this.lastName = data.ds_user_lastname),
      (this.email = data.ds_email),
      (this.username = data.ds_username),
      (this.password = data.ds_password),
      (this.typeUser = data.fk_id_type_user),
      (this.cpf = data.nr_cpf);
  }

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
}
