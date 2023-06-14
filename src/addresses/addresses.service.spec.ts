import { Test, TestingModule } from '@nestjs/testing';
import { AddressesRepository } from '~/addresses/addresses.repository';
import { PrismaService } from '~/common/prisma';
import { AddressesService } from './addresses.service';

describe('AddressesService', () => {
  let service: AddressesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressesService, AddressesRepository, PrismaService]
    }).compile();

    service = module.get<AddressesService>(AddressesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
