import { Injectable } from '@nestjs/common';
import { Prisma, Schedules } from '@prisma/client';
import { PrismaService } from '~/common/prisma';

@Injectable()
export class ScheduleRepository {
  constructor(private prismaService: PrismaService) {}

  async findAll(params: {
    where?: Prisma.SchedulesWhereInput;
    include?: Prisma.SchedulesInclude;
  }): Promise<Schedules[] | []> {
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
      where: surveyWhereUniqueInput
    });
  }
}
