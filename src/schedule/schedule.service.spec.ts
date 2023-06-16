import { Test, TestingModule } from '@nestjs/testing';
import { AppLogger } from '~/app.logger';
import { UserType } from '~/common/enum';
import { UserPayload } from '~/common/interfaces';
import { EmployeesRepository } from '~/employees/employees.repository';
import { EstablishmentsRepository } from '~/establishments/establishments.repository';
import { ScheduleRepository } from '~/schedule/schedule.repository';
import { AvailableHoursInDayStrategy } from '~/schedule/strategies';
import { ServicesRepository } from '~/services/services.repository';
import { ScheduleService } from './schedule.service';

describe('ScheduleService', () => {
  let service: ScheduleService;
  let repository: ScheduleRepository;
  let serviceRepository: ServicesRepository;
  let employeeRepository: EmployeesRepository;
  let availableHoursInDayStrategy: AvailableHoursInDayStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScheduleService,
        AppLogger,
        {
          provide: ServicesRepository,
          useValue: {
            findOne: jest.fn()
          }
        },
        {
          provide: EmployeesRepository,
          useValue: {
            findOne: jest.fn()
          }
        },
        {
          provide: EstablishmentsRepository,
          useValue: jest.fn()
        },
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
    repository = module.get<ScheduleRepository>(ScheduleRepository);
    serviceRepository = module.get<ServicesRepository>(ServicesRepository);
    employeeRepository = module.get<EmployeesRepository>(EmployeesRepository);

    availableHoursInDayStrategy = new AvailableHoursInDayStrategy(service);

    jest
      .spyOn(employeeRepository, 'findOne')
      .mockImplementationOnce(async () => Promise.resolve(null));

    serviceRepository.findOne = jest
      .fn()
      .mockImplementationOnce(async () =>
        Promise.resolve(serviceMockRepository)
      );

    repository.findAll = jest
      .fn()
      .mockImplementationOnce(async () =>
        Promise.resolve(schedulesMockRepository)
      );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(serviceRepository).toBeDefined();
    expect(employeeRepository).toBeDefined();
  });

  const schedule = {
    dateStart: new Date(),
    employee: 1,
    establishment: 1,
    paymentMethod: 1,
    serviceId: 1
  };

  const user = {
    id: 1,
    name: 'John Doe',
    email: 'XXXXXXXXXXXX',
    userType: UserType.CLIENT,
    userName: 'XXXXXXX',
    avatarUrl: 'https://example.com/image.jpg'
  } as UserPayload;

  const serviceMockRepository = {
    time_duration: '00:30:00',
    id: 1
  };

  const schedulesMockRepository = [
    {
      dt_schedule_initial: new Date('2021-01-01T08:30'),
      dt_schedule_end: new Date('2021-01-01T09:30'),
      fk_id_employee: 1,
      fk_id_user: 1,
      fk_id_service: 1
    },
    {
      dt_schedule_initial: new Date('2021-01-01T08:30'),
      dt_schedule_end: new Date('2021-01-01T09:30'),
      fk_id_employee: 2,
      fk_id_user: 2,
      fk_id_service: 4
    }
  ];

  // describe('create', () => {
  //   it('should throw an error if employee does not exist', async () => {
  //     jest
  //       .spyOn(employeeRepository, 'findOne')
  //       .mockImplementationOnce(async () => Promise.resolve(null));

  //     await expect(service.create({ ...schedule, user })).rejects.toThrowError(
  //       'Employee does not exist'
  //     );
  //   });

  //   it('should create a schedule', async () => {
  //     jest.spyOn(repository, 'create').mockImplementationOnce(async () =>
  //       Promise.resolve({
  //         id_schedules: 1
  //       } as any)
  //     );

  //     jest
  //       .spyOn(availableHoursInDayStrategy, 'validate')
  //       .mockImplementationOnce(() => []);

  //     schedule.dateStart = schedule.dateStart;
  //     expect(await service.create({ ...schedule, user })).toEqual(schedule);
  //   });
  // });
});
