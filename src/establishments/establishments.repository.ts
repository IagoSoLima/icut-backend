import { Injectable } from '@nestjs/common';
import { Establishments, Prisma } from '@prisma/client';
import { PrismaService } from '~/common/prisma';

@Injectable()
export class EstablishmentsRepository {
  constructor(private prismaService: PrismaService) {}

  async createEstablishment(data: Prisma.EstablishmentsUncheckedCreateInput) {
    return await this.prismaService.establishments.create({ data });
  }

  async findAll(params: {
    where?: Prisma.EstablishmentsWhereInput;
    include?: Prisma.EstablishmentsInclude;
  }): Promise<Establishments[] | []> {
    const { where, include } = params;
    return await this.prismaService.establishments.findMany({
      where,
      include
    });
  }

  async findEstablishmentRelation(
    surveyWhereUniqueInput: Prisma.EstablishmentsWhereUniqueInput
  ): Promise<Establishments | null> {
    return await this.prismaService.establishments.findUnique({
      where: surveyWhereUniqueInput,
      include: {
        employee: true,
        fk_id_user: true
      }
    });
  }

  async update(data: Prisma.EstablishmentsUpdateArgs) {
    return await this.prismaService.establishments.update(data);
  }
}
