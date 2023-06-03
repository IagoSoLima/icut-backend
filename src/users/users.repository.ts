import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { PrismaService } from '~/common/prisma';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(item: UserEntity) {
    return await this.prisma.users.create({
      data: item
    });
  }

  async findAll() {
    return await this.prisma.users.findMany();
  }

  async findOne(id: number) {}

  async getByEmail(email: string) {
    return await this.prisma.users.findFirst({
      where: {
        ds_email: email
      }
    });
  }
}
