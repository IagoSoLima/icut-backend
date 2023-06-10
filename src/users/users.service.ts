import { Injectable } from '@nestjs/common';
import { UserType } from '~/common/enum';
import { PrismaService } from '~/common/prisma';
import { ValidatorService } from '~/common/validators';
import { EstablishmentsService } from '~/establishments/establishments.service';
import { CreateAdmUser, CreateCommonUser } from '~/users/dto/params';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserDto } from './dto/user.dto';
import { CpfStrategy, TelephoneStrategy } from './strategies';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private validatorField: ValidatorService,
    private userRepository: UsersRepository,
    private establishmentsService: EstablishmentsService
  ) {}
  private cpfStrategy = new CpfStrategy();
  private telephoneStrategy = new TelephoneStrategy();

  async create(createUserDto: CreateUserDto) {
    const dictionary = new Map<string, string>();
    dictionary
      .set('nr_cpf', createUserDto.cpf.replace(/[\s.-]*/gim, ''))
      .set('ds_email', createUserDto.email)
      .set('ds_username', createUserDto.username);

    let message = await this.validatorField.IsFieldRegistered(
      dictionary,
      'users'
    );

    if (UserType.ADMIN) {
      message = await this.establishmentsService.validateEstablishments(
        createUserDto.establishment,
        message
      );
    }

    message = this.cpfStrategy.validate(createUserDto, message);
    message = this.telephoneStrategy.validate(createUserDto, message);

    if (message.length > 0) return message;

    const userCreate =
      createUserDto.typeUser === UserType.ADMIN
        ? CreateAdmUser.createAdmUserDto(createUserDto)
        : CreateCommonUser.createCommonUserDto(createUserDto);

    const user = await this.userRepository.create(userCreate);
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
}
