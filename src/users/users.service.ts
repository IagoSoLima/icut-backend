import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UserEntity } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { Users } from '@prisma/client';
import { ValidatorService } from 'src/common/validators';
@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private validatorField: ValidatorService
  ) {}

  async create(createUserDto: UserDto) {
    const dictionary = new Map<string, string>()
      .set('nr_cpf', createUserDto.cpf)
      .set('ds_email', createUserDto.email);

    var message = await this.validatorField.IsFieldRegistered(
      dictionary,
      'users'
    );

    if (message.length > 0) return message;

    return this.prisma.users.create({
      data: new UserEntity(createUserDto)
    });
  }

  async findAll() {
    var listUser = await this.prisma.users.findMany();

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
