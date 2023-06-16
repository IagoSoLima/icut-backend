import { Employees, Telephones, Users } from '@prisma/client';
import { snakeKeys } from '~/common/utils';
import { UserDto } from '~/users/dto/user.dto';

export class EmployeeDto {
  idEmployee: number;
  idUser: number;
  idEstablishment: number;
  user: UserDto;

  static factory(
    data: Employees & { fk_user: Users & { telephone: Telephones[] } }
  ) {
    const formatedData = {
      idEmployee: data.id_employees,
      idUser: data.fk_id_user,
      idEstablishment: data.fk_id_establishment,
      user: UserDto.factoryUserTelephone(data.fk_user)
    };
    return snakeKeys(formatedData);
  }
}
