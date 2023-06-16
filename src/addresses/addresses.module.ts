import { Module } from '@nestjs/common';
import { AddressesRepository } from '~/addresses/addresses.repository';
import { PrismaService } from '~/common/prisma';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';

@Module({
  controllers: [AddressesController],
  providers: [AddressesService, AddressesRepository, PrismaService]
})
export class AddressesModule {}
