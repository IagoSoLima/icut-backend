import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserType } from '~/common/enum';
import { UnexpectedError } from '~/common/errors';
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
    const hash = bcrypt.hashSync(createUserDto.password, 5);
    createUserDto.password = hash;

    if (message.length > 0) return message;

    switch (createUserDto.typeUser) {
      case UserType.CLIENT:
        return await this.userRepository.create(
          CreateCommonUser.createCommonUserDto(createUserDto)
        );

      case UserType.ADMIN:
        const employee = await this.userRepository.createAdm(
          CreateAdmUser.createAdmUserDto(createUserDto)
        );
        return this.employeeService.create({
          idEstablishment: employee.establishment[0].id_establishment,
          idUser: employee.id_user
        });

      case UserType.EMPLOYEE:
        return await this.userRepository.create(
          CreateEmployeeUser.createEmployeeUserDto(createUserDto)
        );

      default:
        message.push('Nao houve atribuição de tipo do usuario');
        return message;
    }
  }

  async findAll() {
    const listUser = await this.userRepository.findAll({
      include: { telephone: true }
    });

    const listUserDto = listUser.map(user =>
      UserDto.factoryUserTelephone(user)
    );

    return listUserDto;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ id_user: id });

    if (user === null) return null;

    return UserDto.factoryUser(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.userRepository.update({
        where: { id_user: id },
        data: {
          ds_username: updateUserDto.username,
          ds_password: updateUserDto.password,
          ds_email: updateUserDto.email,
          ds_user_name: updateUserDto.firstName,
          ds_user_lastname: updateUserDto.lastName,
          fk_id_type_user: updateUserDto.typeUser
        }
      });
    } catch (err) {
      throw new UnexpectedError(err);
    }
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
