import { Injectable } from '@nestjs/common';
import { Employees, Prisma, Telephones, Users } from '@prisma/client';
import { UnexpectedError } from '~/common/errors';
import { PrismaService } from '~/common/prisma';

@Injectable()
export class EmployeesRepository {
  constructor(private prismaService: PrismaService) {}

  async createEmployee(data: Prisma.EmployeesUncheckedCreateInput) {
    try {
      await this.prismaService.employees.create({ data });
    } catch (err) {
      throw new UnexpectedError(err);
    }
  }

  async findEmployeesByEstablishmentId(
    id: number
  ): Promise<Array<
    Employees & { fk_user: Users & { telephone: Telephones[] } }
  > | null> {
    try {
      return await this.prismaService.employees.findMany({
        where: {
          fk_id_establishment: id
        },
        include: {
          fk_user: {
            include: {
              telephone: true
            }
          }
        }
      });
    } catch (err) {
      throw new UnexpectedError(err);
    }
  }

  async findOne(
    surveyWhereUniqueInput: Prisma.EmployeesWhereUniqueInput
  ): Promise<Employees | null> {
    return this.prismaService.employees.findUnique({
      where: surveyWhereUniqueInput
    });
  }
}
