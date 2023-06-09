import { Injectable } from '@nestjs/common';
import { CreateTelephoneDto } from './dto/create-telephone.dto';
import { PrismaService } from '~/common/prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class TelephoneRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.TelephonesUncheckedCreateInput) {
    await this.prismaService.telephones.create({ data: data });
  }

  async getByTelephoneId(id: number) {
    var listTelephone = await this.prismaService.telephones.findUnique({
      where: {
        id_telephone: id
      }
    });
  }

  async getByUserId(id: number) {
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
