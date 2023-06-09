import { Module } from '@nestjs/common';
import { TelephoneService } from './telephones.service';
import { TelephonesController } from './telephones.controller';
import { TelephoneRepository } from './telephone.repository';
import { PrismaService } from '~/common/prisma';

@Module({
  controllers: [TelephonesController],
  providers: [TelephoneService, TelephoneRepository, PrismaService]
})
export class TelephonesModule {}
