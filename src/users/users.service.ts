import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { Users } from '@prisma/client';
import { ValidatorService } from '~/common/validators';
import { PrismaService } from '~/common/prisma';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private validatorField: ValidatorService,
    private userRepository: UsersRepository
  ) {
    this.userRepository._tableName = 'users';
  }

  async create(createUserDto: UserDto) {
    const dictionary = new Map<string, string>();
    dictionary
      .set('nr_cpf', createUserDto.cpf)
      .set('ds_email', createUserDto.email);

    var message = await this.validatorField.IsFieldRegistered(
      dictionary,
      'users'
    );

    if (message.length > 0) return message;

    this.userRepository.create(new UserEntity(createUserDto));
  }

  async findAll() {
    const listUser = await this.userRepository.findAll();

    const listUserDto = listUser.map((user: Users) => new UserDto(user));

    return listUserDto;
  }

  async findOne(id: number) {
    const user = await this.prisma.users.findUnique({ where: { id_user: id } });

    if (user === null) return null;

    return new UserDto(user);
  }

  async update(id: number, updateUserDto: UserDto) {
    const userUpdate = new UserEntity(updateUserDto);

    //TODO Pensar em um validator para update de unique

    return this.prisma.users.update({
      where: { id_user: id },
      data: userUpdate
    });
  }

  remove(id: number) {
    return this.prisma.users.delete({
      where: {
        id_user: id
      }
    });
  }
}
