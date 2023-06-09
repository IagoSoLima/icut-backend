import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/common/prisma';
import { UsersRepository } from './users.repository';
import { UserDto } from './dto/user.dto';
import { ValidatorService } from '~/common/validators';
import { CreateUserDto } from './dto/create.user.dto';
import { CpfStrategy, TelephoneStrategy } from './strategies';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private validatorField: ValidatorService,
    private userRepository: UsersRepository
  ) {}
  public cpfStrategy = new CpfStrategy();
  public telephoneStrategy = new TelephoneStrategy();

  async create(createUserDto: CreateUserDto) {
    const dictionary = new Map<string, string>();
    dictionary
      .set('nr_cpf', createUserDto.cpf.replace(/[\s.-]*/gim, ''))
      .set('ds_email', createUserDto.email)
      .set('ds_username', createUserDto.username);

    var message = await this.validatorField.IsFieldRegistered(
      dictionary,
      'users'
    );

    message = this.cpfStrategy.validate(createUserDto, message);
    message = this.telephoneStrategy.validate(createUserDto, message);

    if (message.length > 0) return message;

    const user = await this.userRepository.create({
      ds_username: createUserDto.username,
      ds_password: createUserDto.password,
      ds_email: createUserDto.email,
      ds_user_name: createUserDto.firstName,
      ds_user_lastname: createUserDto.lastName,
      nr_cpf: createUserDto.cpf.replace(/[\s.-]*/gim, ''),
      fk_id_type_user: createUserDto.typeUser,
      telephone: {
        create: createUserDto.listTelephones.map(telephone => ({
          ds_telephone: telephone.telephoneDescription,
          nr_telephone: telephone.telephoneNumber.replace(/[\s()-]*/gim, '')
        }))
      }
    });
  }

  async findAll() {
    const listUser = await this.userRepository.findAll();

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
