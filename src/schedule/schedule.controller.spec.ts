import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';

jest.mock('class-transformer', () => {
  return {
    ...jest.requireActual('class-transformer'),
    Type: typeReturn => {
      typeReturn();
      return jest.requireActual('class-transformer').Type(typeReturn);
    }
  };
});

describe('ScheduleController', () => {
  let controller: ScheduleController;
  let service: ScheduleService;

  const user = {
    id: 'id'
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleController],
      providers: [
        {
          provide: ScheduleService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            listDayAvailableService: jest.fn(),
            listProviderMothAvailableService: jest.fn()
          }
        }
      ]
    }).compile();

    controller = module.get<ScheduleController>(ScheduleController);
    service = module.get<ScheduleService>(ScheduleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call create method', async () => {
      const createSpy = jest.spyOn(controller, 'create');
      const dto = {
        serviceId: 1,
        dateStart: '2020-01-01T08:30:00',
        paymentMethod: 1,
        establishment: 1,
        employee: 1
      } as any;

      await controller.create(dto, user);

      expect(createSpy).toHaveBeenCalledWith(dto, user);
    });

    it('should be create a schedule', async () => {
      const dto = {
        serviceId: 1,
        dateStart: '2020-01-01T08:30:00',
        paymentMethod: 1,
        establishment: 1,
        employee: 1
      } as any;

      service.create = jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve(dto));

      const response = await controller.create(dto, user);

      expect(response).toEqual({
        service_id: 1,
        date_start: '2020-01-01T08:30:00',
        payment_method: 1,
        establishment: 1,
        employee: 1
      });
    });

    it('should be throw an error', async () => {
      const dto = {
        serviceId: 1,
        dateStart: '2020-01-01T08:30:00',
        paymentMethod: 1,
        establishment: 1,
        employee: 1
      } as any;

      service.create = jest
        .fn()
        .mockImplementationOnce(() => Promise.reject(new Error()));

      await expect(controller.create(dto, user)).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should call findAll method', async () => {
      const findAllSpy = jest.spyOn(controller, 'findAll');

      await controller.findAll(user);

      expect(findAllSpy).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call findOne method', async () => {
      const findOneSpy = jest.spyOn(controller, 'findOne');
      const id = '2';

      service.findOne = jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve({}));

      await controller.findOne(id);

      expect(findOneSpy).toHaveBeenCalledWith(id);
    });

    it('should be return a schedule', async () => {
      const id = '2';

      service.findOne = jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve({}));

      const response = await controller.findOne(id);

      expect(response).toEqual({});
    });

    it('should be throw an error', async () => {
      const id = '2';

      service.findOne = jest
        .fn()
        .mockImplementationOnce(() => Promise.reject(new Error()));

      await expect(controller.findOne(id)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should call update method', async () => {
      const updateSpy = jest.spyOn(controller, 'update');
      const id = '2';
      const dto = {
        serviceId: 1,
        dateStart: '2020-01-01T08:30:00',
        paymentMethod: 1,
        establishment: 1,
        employee: 1
      } as any;

      await controller.update(id, dto, user);

      expect(updateSpy).toHaveBeenCalledWith(id, dto, user);
    });

    it('should be return a schedule', async () => {
      const id = '2';
      const dto = {
        serviceId: 1,
        dateStart: '2020-01-01T08:30:00',
        paymentMethod: 1,
        establishment: 1,
        employee: 1
      } as any;

      service.update = jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve(dto));

      const response = await controller.update(id, dto, user);

      expect(response).toEqual({
        service_id: 1,
        date_start: '2020-01-01T08:30:00',
        payment_method: 1,
        establishment: 1,
        employee: 1
      });
    });

    it('should be throw an error', async () => {
      const id = '2';
      const dto = {
        serviceId: 1,
        dateStart: '2020-01-01T08:30:00',
        paymentMethod: 1,
        establishment: 1,
        employee: 1
      } as any;

      service.update = jest
        .fn()
        .mockImplementationOnce(() => Promise.reject(new Error()));

      await expect(controller.update(id, dto, user)).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should call remove method', async () => {
      const removeSpy = jest.spyOn(controller, 'remove');
      const id = '2';

      await controller.remove(id);

      expect(removeSpy).toHaveBeenCalledWith(id);
    });

    it('should be return a schedule', async () => {
      const id = '2';

      service.remove = jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve({}));

      const response = await controller.remove(id);

      expect(response).toEqual({});
    });

    it('should be throw an error', async () => {
      const id = '2';

      service.remove = jest
        .fn()
        .mockImplementationOnce(() => Promise.reject(new Error()));

      await expect(controller.remove(id)).rejects.toThrow();
    });
  });

  describe('listDayAvailableService', () => {
    it('should call listDayAvailableService method', async () => {
      const listDayAvailableServiceSpy = jest.spyOn(
        controller,
        'listDayAvailableService'
      );
      const query = {
        day: 20,
        month: 1,
        year: 2020
      };

      const employeeId = 1;

      await controller.listDayAvailableService(employeeId, query);

      service.listDayAvailableService = jest
        .fn()
        .mockImplementationOnce(async () => Promise.resolve({}));

      expect(listDayAvailableServiceSpy).toHaveBeenCalledWith(
        employeeId,
        query
      );
    });

    it('should be return a schedule', async () => {
      const query = {
        day: 20,
        month: 1,
        year: 2020
      };

      const employeeId = 1;

      service.listDayAvailableService = jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve({}));

      const response = await controller.listDayAvailableService(
        employeeId,
        query
      );

      expect(response).toEqual({});
    });

    it('should be throw an error', async () => {
      const query = {
        day: 20,
        month: 1,
        year: 2020
      };

      const employeeId = 1;

      service.listDayAvailableService = jest
        .fn()
        .mockImplementationOnce(() => Promise.reject(new Error('ERROR')));

      await expect(
        controller.listDayAvailableService(employeeId, query)
      ).rejects.toThrow();
    });
  });

  describe('listProviderMothAvailableService', () => {
    it('should call listProviderMothAvailableService method', async () => {
      const listMonthAvailableService = jest.spyOn(
        controller,
        'listMonthAvailableService'
      );
      const query = {
        month: 1,
        year: 2020
      };
      const employeeId = 1;

      service.listProviderMonthAvailabilityService = jest
        .fn()
        .mockImplementationOnce(async () => Promise.resolve({}));
      await controller.listMonthAvailableService(employeeId, query);

      expect(listMonthAvailableService).toHaveBeenCalledWith(employeeId, query);
    });
    it('should be return a schedule', async () => {
      const query = {
        month: 1,
        year: 2020
      };
      const employeeId = 1;

      service.listProviderMonthAvailabilityService = jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve({}));

      const response = await controller.listMonthAvailableService(
        employeeId,
        query
      );

      expect(response).toEqual({});
    });
    it('should be throw an error', async () => {
      const query = {
        month: 1,
        year: 2020
      };
      const employeeId = 1;

      service.listProviderMonthAvailabilityService = jest
        .fn()
        .mockImplementationOnce(() => Promise.reject(new Error('ERROR')));

      await expect(
        controller.listMonthAvailableService(employeeId, query)
      ).rejects.toThrow();
    });
  });
});
