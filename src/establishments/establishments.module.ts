import { Module } from '@nestjs/common';
import { AppLogger } from '~/app.logger';
import { PrismaService } from '~/common/prisma';
import { ValidatorService } from '~/common/validators';
import { EstablishmentsRepository } from '~/establishments/establishments.repository';
import { EstablishmentsController } from './establishments.controller';
import { EstablishmentsService } from './establishments.service';

const dependencies = [
  EstablishmentsService,
  EstablishmentsRepository,
  PrismaService,
  ValidatorService,
  AppLogger
];

@Module({
  controllers: [EstablishmentsController],
  providers: dependencies,
  exports: dependencies
})
export class EstablishmentsModule {}
