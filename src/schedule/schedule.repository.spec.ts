import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '~/common/prisma';
import { ScheduleRepository } from '~/schedule/schedule.repository';

describe('ScheduleRepository', () => {
  let repository: ScheduleRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScheduleRepository,
        {
          provide: PrismaService,
          useValue: {
            schedules: {
              findUnique: jest.fn(),
              findMany: jest.fn(),
              findFirst: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn()
            }
          }
        }
      ]
    }).compile();

    repository = module.get<ScheduleRepository>(ScheduleRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(PrismaService).toBeDefined();
  });

  describe('create', () => {
    it('should create a schedule', async () => {
      const schedule = {
        dt_schedule_initial: new Date(),
        dt_schedule_end: new Date(),
        fk_id_employee: 1,
        fk_id_establishment: 1,
        fk_id_service: 1,
        fk_id_user: 2,
        fk_id_establishment_payment: 1
      };

      prismaService.schedules.create = jest
        .fn()
        .mockImplementationOnce(async () => Promise.resolve(schedule));

      const result = await repository.create(schedule);

      expect(result).toEqual(schedule);
    });
  });

  describe('update', () => {
    it('should update a schedule', async () => {
      const schedule = {
        dt_schedule_initial: new Date(),
        dt_schedule_end: new Date(),
        fk_id_employee: 1,
        fk_id_establishment: 1,
        fk_id_service: 1,
        fk_id_user: 2,
        fk_id_establishment_payment: 1
      };

      prismaService.schedules.update = jest
        .fn()
        .mockImplementationOnce(async () => Promise.resolve(schedule));

      const result = await repository.update({
        where: {
          id_schedules: 1
        },
        data: schedule
      });

      expect(result).toEqual(schedule);
    });
  });
  describe('delete', () => {
    it('should delete a schedule', async () => {
      const schedule = {
        dt_schedule_initial: new Date(),
        dt_schedule_end: new Date(),
        fk_id_employee: 1,
        fk_id_establishment: 1,
        fk_id_service: 1,
        fk_id_user: 2,
        fk_id_establishment_payment: 1
      };

      prismaService.schedules.delete = jest
        .fn()
        .mockImplementationOnce(async () => Promise.resolve(schedule));

      const result = await repository.delete({
        id_schedules: 1
      });

      expect(result).toEqual(schedule);
    });
  });
  describe('findAll', () => {
    it('should find all schedules', async () => {
      const schedules = [
        {
          dt_schedule_initial: new Date(),
          dt_schedule_end: new Date(),
          fk_id_employee: 1,
          fk_id_establishment: 1,
          fk_id_service: 1,
          fk_id_user: 2,
          fk_id_establishment_payment: 1
        }
      ];

      prismaService.schedules.findMany = jest
        .fn()
        .mockImplementationOnce(async () => Promise.resolve(schedules));

      const result = await repository.findAll({});

      expect(result).toEqual(schedules);
    });
  });
  describe('findOne', () => {
    it('should find one schedule', async () => {
      const schedule = {
        dt_schedule_initial: new Date(),
        dt_schedule_end: new Date(),
        fk_id_employee: 1,
        fk_id_establishment: 1,
        fk_id_service: 1,
        fk_id_user: 2,
        fk_id_establishment_payment: 1
      };

      prismaService.schedules.findUnique = jest
        .fn()
        .mockImplementationOnce(async () => Promise.resolve(schedule));

      const result = await repository.findOne({
        id_schedules: 1
      });

      expect(result).toEqual(schedule);
    });
  });
  describe('findFirst', () => {
    it('should find first schedule', async () => {
      const schedule = {
        dt_schedule_initial: new Date(),
        dt_schedule_end: new Date(),
        fk_id_employee: 1,
        fk_id_establishment: 1,
        fk_id_service: 1,
        fk_id_user: 2,
        fk_id_establishment_payment: 1
      };

      prismaService.schedules.findFirst = jest
        .fn()
        .mockImplementationOnce(async () => Promise.resolve(schedule));

      const result = await repository.findFirst({});

      expect(result).toEqual(schedule);
    });
  });
});
