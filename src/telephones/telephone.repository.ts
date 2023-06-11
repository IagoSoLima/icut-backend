import { Injectable } from '@nestjs/common';
import { Prisma, Telephones } from '@prisma/client';
import { PrismaService } from '~/common/prisma';

@Injectable()
export class TelephoneRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.TelephonesCreateManyInput[]) {
    await this.prismaService.telephones.createMany({ data: data });
  }

  async getByTelephoneId(id: number): Promise<Telephones | null> {
    return await this.prismaService.telephones.findUnique({
      where: {
        id_telephone: id
      }
    });
  }

  async getByUserId(id: number): Promise<Telephones[] | []> {
    return await this.prismaService.telephones.findMany({
      where: {
        fk_id_user: id
      }
    });
  }

  async update(data: Prisma.TelephonesUpdateArgs) {
    return await this.prismaService.telephones.update(data);
  }

  async deleteByTelephoneId(data: Prisma.TelephonesDeleteArgs) {
    return await this.prismaService.telephones.delete(data);
  }
}
