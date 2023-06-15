import { Injectable } from '@nestjs/common';
import { Prisma, Services } from '@prisma/client';
import { PrismaService } from '~/common/prisma';

@Injectable()
export class ServicesRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.ServicesUncheckedCreateInput) {
    return await this.prismaService.services.create({ data });
  }

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

  async update(data: Prisma.ServicesUpdateArgs): Promise<Services | null> {
    return await this.prismaService.services.update(data);
  }

  async delete(
    data: Prisma.ServicesWhereUniqueInput
  ): Promise<Services | null> {
    return await this.prismaService.services.delete({
      where: data
    });
  }
}
