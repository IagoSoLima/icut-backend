import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/common/prisma';
//import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { ValidatorField } from './users.validators';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: UserDto) {
    const user = await this.prisma.users.findUnique({
      where: {
        nr_cpf: createUserDto.cpf
      }
    });

    const validatorField = new ValidatorField(this.prisma);

    const dictionary = new Map<string, string>();
    dictionary
      .set('nr_cpf', createUserDto.cpf)
      .set('ds_email', createUserDto.email);

    validatorField.IsFieldRegistered(dictionary, 'users');

    if (user !== null) return '';

    return this.prisma.users.create({
      data: new UserEntity(createUserDto)
    });
  }

  async findAll() {
    const listUser = await this.prisma.users.findMany();

    const listUserDto = listUser.map(user => new UserDto(user));

    return listUserDto;
  }

  async findOne(id: number) {
    const user = await this.prisma.users.findUnique({ where: { id_user: id } });

    if (user === null) return null;

    return new UserDto(user);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
