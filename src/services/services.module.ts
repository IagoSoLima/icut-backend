import { Module } from '@nestjs/common';
import { AppLogger } from '~/app.logger';
import { PrismaService } from '~/common/prisma';
import { ServicesRepository } from './services.repository';

const dependencies = [ServicesRepository, AppLogger, PrismaService];

@Module({
  controllers: [],
  providers: dependencies,
  exports: dependencies
})
export class ServicesModule {}
