import { Injectable } from '@nestjs/common';
import { BaseRepository } from '~/common/repository/base.repository';
import { UserEntity } from './entities/user.entity';
import { PrismaService } from '~/common/prisma';

@Injectable()
export class UsersRepository extends BaseRepository<UserEntity> {}
