import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/common/prisma';

@Injectable()
export abstract class BaseRepository<T> {
  public _tableName: string;

  constructor(private prisma: PrismaService) {}

  async create(item: T) {
    return await this.prisma[this._tableName].create({
      data: item
    });
  }

  async findAll() {
    return await this.prisma[this._tableName].findMany();
  }

  async findOne(id: number) {}
}
