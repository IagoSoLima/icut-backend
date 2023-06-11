import { Test, TestingModule } from '@nestjs/testing';
import { AppLogger } from '~/app.logger';
import { PrismaService } from '~/common/prisma';
import { TelephoneRepository } from './telephone.repository';
import { TelephoneService } from './telephones.service';

describe('TelephonesService', () => {
  let service: TelephoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TelephoneService,
        TelephoneRepository,
        PrismaService,
        AppLogger
      ]
    }).compile();

    service = module.get<TelephoneService>(TelephoneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
