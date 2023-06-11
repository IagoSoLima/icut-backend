import { Module } from '@nestjs/common';
import { PrismaService } from '~/common/prisma';
import { ValidatorService } from '~/common/validators';
import { EstablishmentsRepository } from '~/establishments/establishments.repository';
import { EstablishmentsController } from './establishments.controller';
import { EstablishmentsService } from './establishments.service';

@Module({
  controllers: [EstablishmentsController],
  providers: [
    EstablishmentsService,
    EstablishmentsRepository,
    PrismaService,
    ValidatorService
  ]
})
export class EstablishmentsModule {}
