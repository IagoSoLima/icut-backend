import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../dto/user.dto';

export class UserEntity {
  constructor(data: UserDto) {
    (this.ds_username = data.username),
      (this.ds_password = data.password),
      (this.ds_email = data.email),
      (this.ds_user_name = data.firstName),
      (this.ds_user_lastname = data.lastName),
      (this.nr_cpf = data.cpf),
      (this.fk_id_type_user = data.typeUser);
  }

  @ApiProperty()
  ds_username: string;

  @ApiProperty()
  ds_password: string;

  @ApiProperty()
  ds_email: string;

  @ApiProperty()
  ds_user_name: string;

  @ApiProperty()
  ds_user_lastname: string;

  @ApiProperty()
  nr_cpf: string;

  @ApiProperty()
  fk_id_type_user: number;
}
