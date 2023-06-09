import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { PrismaService } from '~/common/prisma';
import { Prisma, Telephones, Users } from '@prisma/client';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UsersRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.UsersUncheckedCreateInput): Promise<Users> {
    return await this.prismaService.users.create({ data });
  }

  async findAll() {
    return await this.prismaService.users.findMany({
      include: {
        telephone: true
      }
    });
  }

  async findOne(
    surveyWhereUniqueInput: Prisma.UsersWhereUniqueInput
  ): Promise<Users & { telephone: Telephones[] }> {
    return await this.prismaService.users.findUnique({
      where: surveyWhereUniqueInput,
      include: {
        telephone: true
      }
    });
  }

  async getByEmail(email: string) {
    return await this.prismaService.users.findFirst({
      where: {
        ds_email: email
      }
    });
  }

  async update(data: Prisma.UsersUpdateArgs) {
    return await this.prismaService.users.update(data);
  }

  async deleteByID(surveyWhereUniqueInput: Prisma.UsersWhereUniqueInput) {
    return await this.prismaService.users.delete({
      where: surveyWhereUniqueInput
    });
  }
}
