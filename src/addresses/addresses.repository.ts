import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '~/common/prisma';

@Injectable()
export class AddressesRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.AddressesCreateArgs) {
    return await this.prismaService.addresses.create(data);
  }
}
