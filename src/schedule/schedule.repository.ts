import { Injectable } from '@nestjs/common';
import { Prisma, Schedules } from '@prisma/client';
import { PrismaService } from '~/common/prisma';

@Injectable()
export class ScheduleRepository {
  constructor(private prismaService: PrismaService) {}

  async findAll(params: {
    where?: Prisma.SchedulesWhereInput;
    include?: Prisma.SchedulesInclude;
  }): Promise<Schedules[]> {
    const { where, include } = params;
    return this.prismaService.schedules.findMany({
      where,
      include
    });
  }

  async findOne(
    surveyWhereUniqueInput: Prisma.SchedulesWhereUniqueInput
  ): Promise<Schedules | null> {
    return this.prismaService.schedules.findUnique({
      where: surveyWhereUniqueInput,
      include: {
        fk_users: {
          include: {
            telephone: true
          }
        },
        fk_service: {
          include: {
            fk_type_service: true
          }
        },
        fk_employee: {
          include: {
            fk_user: true
          }
        },
        fk_establishment: true,
        fk_establishment_payment: {
          include: {
            fk_type_payment: true
          }
        }
      }
    });
  }

  async findFirst(params: {
    where?: Prisma.SchedulesWhereInput;
    include?: Prisma.SchedulesInclude;
  }): Promise<Schedules | null> {
    const { where, include } = params;
    return this.prismaService.schedules.findFirst({
      where,
      include
    });
  }

  async create(data: Prisma.SchedulesUncheckedCreateInput): Promise<Schedules> {
    return this.prismaService.schedules.create({ data });
  }

  async update(params: {
    where: Prisma.SchedulesWhereUniqueInput;
    data: Prisma.SchedulesUncheckedUpdateInput;
  }): Promise<Schedules> {
    const { where, data } = params;
    return this.prismaService.schedules.update({
      where,
      data
    });
  }

  async delete(where: Prisma.SchedulesWhereUniqueInput): Promise<Schedules> {
    return this.prismaService.schedules.delete({ where });
  }
}
