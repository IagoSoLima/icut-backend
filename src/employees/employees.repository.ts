import { Injectable } from '@nestjs/common';
import { Employees, Prisma } from '@prisma/client';
import { PrismaService } from '~/common/prisma';

@Injectable()
export class EmployeesRepository {
  constructor(private prismaService: PrismaService) {}

  async createEmployee(data: Prisma.EmployeesCreateArgs) {
    await this.prismaService.employees.create(data);
  }

  async findOne(
    surveyWhereUniqueInput: Prisma.EmployeesWhereUniqueInput
  ): Promise<Employees | null> {
    return this.prismaService.employees.findUnique({
      where: surveyWhereUniqueInput
    });
  }
}
