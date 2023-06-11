import { Module } from '@nestjs/common';
import { AppLogger } from '~/app.logger';
import { PrismaService } from '~/common/prisma';
import { TelephoneRepository } from './telephone.repository';
import { TelephonesController } from './telephones.controller';
import { TelephoneService } from './telephones.service';

@Module({
  controllers: [TelephonesController],
  providers: [TelephoneService, TelephoneRepository, PrismaService, AppLogger]
})
export class TelephonesModule {}
