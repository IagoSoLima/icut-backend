import { Test, TestingModule } from '@nestjs/testing';
import { TelephoneService } from './telephones.service';
import { TelephoneRepository } from './telephone.repository';
import { PrismaService } from '~/common/prisma';

describe('TelephonesService', () => {
  let service: TelephoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TelephoneService, TelephoneRepository, PrismaService]
    }).compile();

    service = module.get<TelephoneService>(TelephoneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
