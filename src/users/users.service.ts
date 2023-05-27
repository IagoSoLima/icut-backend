import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UserEntity } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { ValidatorField } from './users.validators';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: UserDto) {
    var user = await this.prisma.users.findUnique({
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
    var listUser = await this.prisma.users.findMany();

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
