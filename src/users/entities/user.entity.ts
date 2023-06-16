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

  id_user: number;
  ds_username: string;
  ds_password: string;
  ds_email: string;
  ds_user_name: string;
  ds_user_lastname: string;
  nr_cpf: string;
  fk_id_type_user: number;
}
