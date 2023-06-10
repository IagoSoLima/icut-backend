import { Test, TestingModule } from '@nestjs/testing';
import { AppLogger } from '~/app.logger';
import { PrismaService } from '~/common/prisma';
import { ScheduleRepository } from '~/schedule/schedule.repository';
import { ServicesRepository } from '~/services/services.repository';
import { ScheduleService } from './schedule.service';

describe('ScheduleService', () => {
  let service: ScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScheduleService,
        AppLogger,
        ScheduleRepository,
        ServicesRepository,
        PrismaService,
        {
          provide: ScheduleRepository,
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
          }
        }
      ]
    }).compile();

    service = module.get<ScheduleService>(ScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
