import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '~/common/prisma';
import { ServicesRepository } from './services.repository';

describe('ServicesRepository', () => {
  let repository: ServicesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServicesRepository,
        {
          provide: PrismaService,
          useValue: {
            findUnique: jest.fn(),
            findMany: jest.fn()
          }
        }
      ]
    }).compile();

    repository = module.get<ServicesRepository>(ServicesRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
