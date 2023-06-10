import { Injectable } from '@nestjs/common';
import { Prisma, Services } from '@prisma/client';
import { PrismaService } from '~/common/prisma';

@Injectable()
export class ServicesRepository {
  constructor(private prismaService: PrismaService) {}

  async findAll(params: {
    where?: Prisma.ServicesWhereInput;
    include?: Prisma.ServicesInclude;
  }): Promise<Services[] | []> {
    const { where, include } = params;
    return this.prismaService.services.findMany({
      where,
      include
    });
  }

  async findOne(
    surveyWhereUniqueInput: Prisma.ServicesWhereUniqueInput
  ): Promise<Services | null> {
    return this.prismaService.services.findUnique({
      where: surveyWhereUniqueInput
    });
  }
}
