import { Test, TestingModule } from '@nestjs/testing';
import { AppLogger } from '~/app.logger';
import { PrismaService } from '~/common/prisma';
import { ValidatorService } from '~/common/validators';
import { EstablishmentsRepository } from '~/establishments/establishments.repository';
import { EstablishmentsService } from './establishments.service';

describe('EstablishmentsService', () => {
  let service: EstablishmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstablishmentsService,
        EstablishmentsRepository,
        ValidatorService,
        AppLogger,
        PrismaService
      ]
    }).compile();

    service = module.get<EstablishmentsService>(EstablishmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
