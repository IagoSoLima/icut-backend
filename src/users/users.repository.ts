import { Injectable } from '@nestjs/common';
import { Prisma, Users as UsersModel } from '@prisma/client';
import { PrismaService } from '~/common/prisma';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(params: {
    where?: Prisma.UsersWhereInput;
    include?: Prisma.UsersInclude;
  }): Promise<UsersModel[]> {
    const { where, include } = params;
    return await this.prismaService.users.findMany({
      where,
      include
    });
  }

  async get(
    surveyWhereUniqueInput: Prisma.UsersWhereUniqueInput
  ): Promise<UsersModel | null> {
    return await this.prismaService.users.findUnique({
      where: surveyWhereUniqueInput
    });
  }

  async getByEmail(email: string) {
    return await this.prismaService.users.findFirst({
      where: {
        ds_email: email
      }
    });
  }
}
