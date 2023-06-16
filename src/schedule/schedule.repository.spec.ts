import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '~/common/prisma';
import { ScheduleRepository } from '~/schedule/schedule.repository';

describe('ScheduleRepository', () => {
  let repository: ScheduleRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScheduleRepository,
        {
          provide: PrismaService,
          useValue: {
            findUnique: jest.fn(),
            findMany: jest.fn()
          }
        }
      ]
    }).compile();

    repository = module.get<ScheduleRepository>(ScheduleRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
