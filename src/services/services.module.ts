import { Module } from '@nestjs/common';
import { AppLogger } from '~/app.logger';
import { PrismaService } from '~/common/prisma';
import { ServicesController } from '~/services/service.controller';
import { ServicesService } from '~/services/service.services';
import { ServicesRepository } from './services.repository';

const dependencies = [
  ServicesRepository,
  AppLogger,
  PrismaService,
  ServicesService
];

@Module({
  controllers: [ServicesController],
  providers: dependencies,
  exports: dependencies
})
export class ServicesModule {}
