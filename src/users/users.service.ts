import { Injectable } from '@nestjs/common';
import { UserType } from '~/common/enum';
import { ValidatorService } from '~/common/validators';
import { EmployeesService } from '~/employees/employees.service';
import { EstablishmentsService } from '~/establishments/establishments.service';
import { TelephoneService } from '~/telephones/telephones.service';
import { CreateAdmUser, CreateCommonUser } from '~/users/dto/params';
import { CreateEmployeeUser } from '~/users/dto/params/create-employee-user';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserDto } from './dto/user.dto';
import { CpfStrategy } from './strategies';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private validatorField: ValidatorService,
    private userRepository: UsersRepository,
    private establishmentsService: EstablishmentsService,
    private telephoneService: TelephoneService,
    private employeeService: EmployeesService
  ) {}
  private cpfStrategy = new CpfStrategy();

  async create(createUserDto: CreateUserDto) {
    var message = await this.validadeUser(createUserDto, new Array<string>());

    if (message.length > 0) return message;

    switch (createUserDto.typeUser) {
      case UserType.CLIENT:
        return await this.userRepository.create(
          CreateCommonUser.createCommonUserDto(createUserDto)
        );

      case UserType.ADMIN:
        return await this.userRepository.create(
          CreateAdmUser.createAdmUserDto(createUserDto)
        );

      case UserType.EMPLOYEE:
        const employee = await this.userRepository.create(
          CreateEmployeeUser.createEmployeeUserDto(createUserDto)
        );
        this.employeeService.create({
          idEstablishment: createUserDto.idEstablishment,
          idUser: employee.id_user
        });

      default:
        message.push('Nao houve atribuição de tipo do usuario');
        return message;
    }
  }

  async findAll() {
    const listUser = await this.userRepository.findAll({
      include: { telephone: true }
    });

    const listUserDto = listUser.map(user => UserDto.factory(user));

    return listUserDto;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ id_user: id });

    if (user === null) return null;

    return UserDto.factory(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update({
      where: { id_user: id },
      data: {
        ds_username: updateUserDto.username,
        ds_password: updateUserDto.password,
        ds_email: updateUserDto.email,
        ds_user_name: updateUserDto.firstName,
        ds_user_lastname: updateUserDto.lastName,
        nr_cpf: updateUserDto.cpf.replace(/[\s.-]*/gim, ''),
        fk_id_type_user: updateUserDto.typeUser
      }
    });
  }

  async remove(id: number) {
    return await this.userRepository.deleteByID({ id_user: id });
  }

  async validadeUser(
    data: CreateUserDto,
    message: string[]
  ): Promise<string[]> {
    const dictionary = new Map<string, string>();
    dictionary
      .set('nr_cpf', data.cpf.replace(/[\s.-]*/gim, ''))
      .set('ds_email', data.email)
      .set('ds_username', data.username);

    message = await this.validatorField.IsFieldRegistered(dictionary, 'users');
    message = this.cpfStrategy.validate(data, message);
    message = this.telephoneService.validateTelephone(
      data.listTelephones,
      message
    );

    if (data.typeUser === UserType.ADMIN) {
      message = await this.establishmentsService.validateEstablishments(
        data.establishment,
        message
      );
    }

    return message;
  }
}
