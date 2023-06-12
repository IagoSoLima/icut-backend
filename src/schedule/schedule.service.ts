import { Injectable } from '@nestjs/common';
import { Schedules } from '@prisma/client';
import { AppLogger } from '~/app.logger';
import {
  DEFAULT_HOUR_START,
  DEFAULT_JOIN_ARRAY_ERRORS,
  DEFAULT_LIMIT_HOUR_TO_DO_ACTION_IN_SCHEDULE,
  DEFAULT_MINUTE_INCREMENT,
  DEFAULT_QUANTITY_HOURS_PER_DAY
} from '~/app.vars';
import { UserType } from '~/common/enum';
import { UnexpectedError } from '~/common/errors';
import { UserPayload } from '~/common/interfaces';
import { DateUtil } from '~/common/utils';
import { EmployeesRepository } from '~/employees/employees.repository';
import { EstablishmentsRepository } from '~/establishments/establishments.repository';
import { AvailableHoursInDayResponseDTO } from '~/schedule/dto/response';
import {
  AvailableHoursInDayStrategy,
  AvailableHoursStrategy,
  CheckHoursToDoActionStrategy
} from '~/schedule/strategies';
import { ServicesRepository } from '~/services/services.repository';
import { CreateScheduleParamsDTO } from './dto';
import { ScheduleRepository } from './schedule.repository';

@Injectable()
export class ScheduleService {
  private availableHoursInDayStrategy: AvailableHoursInDayStrategy;
  private availableHoursStrategy: AvailableHoursStrategy;
  private checkHoursToDoActionStrategy: CheckHoursToDoActionStrategy;
  private messageError: string[];

  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly servicesRepository: ServicesRepository,
    private readonly employeeRepository: EmployeesRepository,
    private readonly establishmentRepository: EstablishmentsRepository,
    private readonly logger: AppLogger
  ) {
    this.logger.setContext(ScheduleService.name);
    this.availableHoursInDayStrategy = new AvailableHoursInDayStrategy(this);
    this.availableHoursStrategy = new AvailableHoursStrategy();
    this.checkHoursToDoActionStrategy = new CheckHoursToDoActionStrategy();
    this.messageError = [];
  }

  async create(params: CreateScheduleParamsDTO) {
    const {
      user,
      dateStart,
      paymentMethod,
      serviceId,
      establishment,
      employee: employeeId
    } = params;

    if (user.userType === UserType.EMPLOYEE) {
      const errorLoggerMessage = 'Employee can not create schedule';
      const errorMessage = 'EMPLOYEE_CANT_CREATE';
      this.logger.fail({
        category: 'SCHEDULE_SERVICE_ERROR',
        error: errorLoggerMessage
      });

      this.messageError.push(errorMessage);
    }

    if (user.userType === UserType.ADMIN) {
      const errorLoggerMessage = 'Admin can not create schedule';
      const errorMessage = 'ADMIN_CANT_CREATE';
      this.logger.fail({
        category: 'SCHEDULE_SERVICE_ERROR',
        error: errorLoggerMessage
      });

      this.messageError.push(errorMessage);
    }

    const service = await this.servicesRepository.findOne({
      id_service: serviceId
    });

    if (!service) {
      const errorLoggerMessage = 'Service not found';
      const errorMessage = 'SERVICE_NOT_FOUND';
      this.logger.fail({
        category: 'SCHEDULE_SERVICE_ERROR',
        error: errorLoggerMessage
      });
      this.messageError.push(errorMessage);
    }

    const employee = this.employeeRepository.findOne({
      id_employees: employeeId
    });

    if (!employee) {
      const errorLoggerMessage = 'Employee not found';
      const errorMessage = 'EMPLOYEE_NOT_FOUND';
      this.logger.fail({
        category: 'SCHEDULE_SERVICE_ERROR',
        error: errorLoggerMessage
      });
      this.messageError.push(errorMessage);
    }

    const dateIsPast = DateUtil.isPast(dateStart);

    if (dateIsPast) {
      const errorLoggerMessage = 'Date is past';
      const errorMessage = 'DATE_IS_PAST';
      this.logger.fail({
        category: 'SCHEDULE_SERVICE_ERROR',
        error: errorLoggerMessage
      });

      this.messageError.push(errorMessage);
    }

    const [hour, minutes, seconds] = service.time_duration.split(':');

    const serviceDuration = {
      hours: dateStart.getHours() + Number(hour),
      minutes: dateStart.getMinutes() + Number(minutes),
      seconds: dateStart.getSeconds() + Number(seconds)
    };

    const endDate = DateUtil.set(new Date(dateStart), serviceDuration);

    const firstSchedule = new Date(dateStart);
    firstSchedule.setHours(DEFAULT_HOUR_START);
    firstSchedule.setMinutes(0);

    const lastSchedule = new Date(dateStart);
    lastSchedule.setHours(DEFAULT_HOUR_START + DEFAULT_QUANTITY_HOURS_PER_DAY);
    lastSchedule.setMinutes(0);

    const appointments = await this.scheduleRepository.findAll({
      where: {
        fk_id_establishment: establishment,
        fk_id_employee: employeeId,
        dt_schedule_initial: {
          gte: firstSchedule
        },
        dt_schedule_end: {
          lte: lastSchedule
        }
      }
    });

    const messageAvailableHoursInDayStrategy =
      this.availableHoursInDayStrategy.validate(
        {
          appointments,
          day: dateStart.getDate(),
          month: dateStart.getMonth() + 1,
          year: dateStart.getFullYear(),
          startHour: DEFAULT_HOUR_START,
          endDate,
          startDate: dateStart,
          intervalMinutes: DEFAULT_MINUTE_INCREMENT
        },
        []
      );
    const hasNotAnyHourAvailableThisService =
      messageAvailableHoursInDayStrategy.length > 0;

    if (hasNotAnyHourAvailableThisService) {
      const errorLoggerMessage = 'No hour available this service';
      const errorMessage = 'NO_HOUR_AVAILABLE_THIS_SERVICE';
      this.logger.fail({
        category: 'SCHEDULE_SERVICE_ERROR',
        error: errorLoggerMessage
      });
      this.messageError.push(errorMessage);
    }

    if (this.messageError.length > 0) {
      const messageError = this.messageError.join(DEFAULT_JOIN_ARRAY_ERRORS);
      this.messageError = [];

      throw new UnexpectedError(messageError);
    }

    return await this.scheduleRepository.create({
      dt_schedule_initial: dateStart,
      dt_schedule_end: endDate,
      fk_id_service: serviceId,
      fk_id_establishment: establishment,
      fk_id_employee: employeeId,
      fk_id_establishment_payment: paymentMethod,
      fk_id_user: user.id
    });
  }

  async findAll(params: { user: UserPayload }) {
    const { user } = params;
    if (user.userType === UserType.EMPLOYEE) {
      return this.scheduleRepository.findAll({
        where: {
          fk_id_employee: user.id
        }
      });
    }

    if (user.userType === UserType.CLIENT) {
      return this.scheduleRepository.findAll({
        where: {
          fk_id_user: user.id
        }
      });
    }

    const establishment =
      await this.establishmentRepository.findEstablishmentByAdmId({
        where: {
          id_user_administrator: user.id
        }
      });

    return this.scheduleRepository.findAll({
      where: {
        fk_id_establishment: establishment.id_establishment
      }
    });
  }

  findOne(id: number) {
    return this.scheduleRepository.findOne({
      id_schedules: id
    });
  }

  update(id: number, updateScheduleDto) {
    return `This action updates a #${id} schedule`;
  }

  async remove(id: number) {
    const appointment = await this.scheduleRepository.findOne({
      id_schedules: id
    });

    if (!appointment) {
      const errorLoggerMessage = 'Schedule not found';
      const errorMessage = 'SCHEDULE_NOT_FOUND';
      this.logger.fail({
        category: 'SCHEDULE_SERVICE_ERROR',
        error: errorLoggerMessage
      });
      this.messageError.push(errorMessage);
      const messageError = this.messageError.join(DEFAULT_JOIN_ARRAY_ERRORS);
      this.messageError = [];

      throw new Error(messageError);
    }

    const errorCheckHoursToDoActionStrategy =
      this.checkHoursToDoActionStrategy.validate(
        {
          date: appointment.dt_schedule_initial
        },
        []
      );

    const isTwoOrMoreHoursBeforeAppointment =
      errorCheckHoursToDoActionStrategy.length > 0;

    if (!isTwoOrMoreHoursBeforeAppointment) {
      const errorLoggerMessage = 'Schedule not found';

      const errorMessage = `EXECUTE_ACTION_BEFORE_${DEFAULT_LIMIT_HOUR_TO_DO_ACTION_IN_SCHEDULE}_HOURS`;
      this.logger.fail({
        category: 'SCHEDULE_SERVICE_ERROR',
        error: errorLoggerMessage
      });
      this.messageError.push(errorMessage);
    }

    if (this.messageError.length > 0) {
      const messageError = this.messageError.join(DEFAULT_JOIN_ARRAY_ERRORS);
      this.messageError = [];

      throw new UnexpectedError(messageError);
    }

    await this.scheduleRepository.delete({
      id_schedules: id
    });

    return;
  }

  availableHoursInDay(params: {
    appointments: Schedules[];
    day: number;
    month: number;
    year: number;
    startHour: number;
  }): AvailableHoursInDayResponseDTO[] {
    const { appointments, day, month, startHour, year } = params;

    const eachHourArray = Array.from(
      {
        length: DEFAULT_QUANTITY_HOURS_PER_DAY
      },
      (_i, index) => index + startHour
    );

    const minuteSlots = Array.from(
      {
        length: 60 / DEFAULT_MINUTE_INCREMENT
      },
      (_i, index) => index * DEFAULT_MINUTE_INCREMENT
    );

    const currentDate = new Date(Date.now());

    const availability = eachHourArray.flatMap(hour => {
      return minuteSlots.map(minutes => {
        const currentDateTime = new Date(year, month - 1, day, hour, minutes);

        const hasAppointment = appointments.find(appointment => {
          const startHour = appointment =>
            DateUtil.getHours(appointment.dt_schedule_initial);
          const startMinutes = appointment =>
            DateUtil.getMinutes(appointment.dt_schedule_initial);
          const endHour = appointment =>
            DateUtil.getHours(appointment.dt_schedule_end);
          const endMinutes = appointment =>
            DateUtil.getMinutes(appointment.dt_schedule_end);

          const available = this.availableHoursStrategy.validate(
            {
              endHour: endHour(appointment),
              endMinutes: endMinutes(appointment),
              startHour: startHour(appointment),
              startMinutes: startMinutes(appointment),
              hour,
              minutes
            },
            []
          );

          return available.length <= 0;
        });

        const compareDate = new Date(year, month - 1, day, hour, minutes);

        return {
          hour: currentDateTime.getHours(),
          minutes: currentDateTime.getMinutes(),
          available:
            !hasAppointment && DateUtil.isAfter(compareDate, currentDate)
        };
      });
    });

    return availability;
  }

  async listDayAvailableService(params: {
    employeeId: number;
    day: number;
    month: number;
    year: number;
  }) {
    const { employeeId } = params;
    let { day, month, year } = params;

    if (!day) day = new Date().getDate();
    if (!month) month = new Date().getMonth() + 1;
    if (!year) year = new Date().getFullYear();

    const firstSchedule = new Date(year, month - 1, day, DEFAULT_HOUR_START);
    const lastSchedule = new Date(
      year,
      month - 1,
      day,
      DEFAULT_HOUR_START + DEFAULT_QUANTITY_HOURS_PER_DAY
    );

    const appointments = await this.scheduleRepository.findAll({
      where: {
        fk_id_employee: employeeId,
        dt_schedule_initial: {
          gte: firstSchedule
        },
        dt_schedule_end: {
          lte: lastSchedule
        }
      }
    });

    const availability = this.availableHoursInDay({
      appointments,
      day,
      month,
      year,
      startHour: DEFAULT_HOUR_START
    });

    return availability;
  }

  async listProviderMonthAvailabilityService(params: {
    employeeId: number;
    month: number;
    year: number;
  }) {
    const { employeeId } = params;
    let { month, year } = params;

    if (!month) month = new Date().getMonth() + 1;
    if (!year) year = new Date().getFullYear();

    const numberOfSaysInMonth = DateUtil.getDaysInMonth(
      new Date(year, month - 1)
    );

    const eachDayArray = Array.from(
      {
        length: numberOfSaysInMonth
      },
      (_, index) => index + 1
    );

    const firstDay = 1;
    const lastDay = numberOfSaysInMonth;
    const firstSchedule = new Date(
      year,
      month - 1,
      firstDay,
      DEFAULT_HOUR_START
    );
    const lastSchedule = new Date(
      year,
      month - 1,
      lastDay,
      DEFAULT_HOUR_START + DEFAULT_QUANTITY_HOURS_PER_DAY
    );

    const appointments = await this.scheduleRepository.findAll({
      where: {
        fk_id_employee: employeeId,
        dt_schedule_initial: {
          gte: firstSchedule
        },
        dt_schedule_end: {
          lte: lastSchedule
        }
      }
    });

    const currentDate = new Date(Date.now());

    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(appointment => {
        return DateUtil.getDate(appointment.dt_schedule_initial) === day;
      });

      const compareDate = new Date(
        year,
        month - 1,
        day,
        DEFAULT_HOUR_START + DEFAULT_QUANTITY_HOURS_PER_DAY
      );

      const hoursInDay = this.availableHoursInDay({
        appointments: appointmentsInDay,
        day,
        month,
        year,
        startHour: DEFAULT_HOUR_START
      });

      const hasSomeHourAvailable = hoursInDay.some(hour => hour.available);

      return {
        day,
        available:
          hasSomeHourAvailable && DateUtil.isAfter(compareDate, currentDate)
      };
    });

    return availability;
  }
}
