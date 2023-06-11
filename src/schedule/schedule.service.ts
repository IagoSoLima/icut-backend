import { Injectable } from '@nestjs/common';
import { Schedules } from '@prisma/client';
import { AppLogger } from '~/app.logger';
import {
  DEFAULT_HOUR_START,
  DEFAULT_MINUTE_INCREMENT,
  DEFAULT_QUANTITY_HOURS_PER_DAY
} from '~/app.vars';
import { UserType } from '~/common/enum';
import { UnexpectedError } from '~/common/errors';
import { DateUtil } from '~/common/utils';
import { AvailableHoursInDayResponseDTO } from '~/schedule/dto/response';
import { AvailableHoursInDayStrategy } from '~/schedule/strategies/available-hours-in-day.stratgey';
import { ServicesRepository } from '~/services/services.repository';
import { CreateScheduleParamsDTO } from './dto';
import { ScheduleRepository } from './schedule.repository';

@Injectable()
export class ScheduleService {
  private availableHoursInDayStrategy: AvailableHoursInDayStrategy;

  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly servicesRepository: ServicesRepository,
    private readonly logger: AppLogger
  ) {
    this.logger.setContext(ScheduleService.name);
    this.availableHoursInDayStrategy = new AvailableHoursInDayStrategy(this);
  }

  async create(params: CreateScheduleParamsDTO) {
    const { user, dateStart, paymentMethod, serviceId, establishment } = params;

    if (user.userType === UserType.EMPLOYEE) {
      const errorLoggerMessage = 'Employee can not create schedule';
      const errorMessage = 'EMPLOYEE_CANT_CREATE';
      this.logger.fail({
        category: 'SCHEDULE_SERVICE_ERROR',
        error: errorLoggerMessage
      });
      throw new UnexpectedError(errorMessage);
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
      throw new UnexpectedError(errorMessage);
    }

    const dateIsPast = DateUtil.isPast(dateStart);

    if (dateIsPast) {
      const errorLoggerMessage = 'Date is past';
      const errorMessage = 'DATE_IS_PAST';
      this.logger.fail({
        category: 'SCHEDULE_SERVICE_ERROR',
        error: errorLoggerMessage
      });
      throw new UnexpectedError(errorMessage);
    }

    const [hour, minutes, seconds] = service.time_duration.split(':');

    const serviceDuration = {
      hours: dateStart.getHours() + Number(hour),
      minutes: dateStart.getMinutes() + Number(minutes),
      seconds: dateStart.getSeconds() + Number(seconds)
    };

    const endDate = DateUtil.set(new Date(dateStart), serviceDuration);

    const appointment = await this.scheduleRepository.findFirst({
      where: {
        dt_schedule_initial: dateStart,
        fk_id_establishment: establishment
      }
    });

    const firstSchedule = new Date(dateStart);
    firstSchedule.setHours(DEFAULT_HOUR_START);
    firstSchedule.setMinutes(0);

    const lastSchedule = new Date(dateStart);
    lastSchedule.setHours(DEFAULT_HOUR_START + DEFAULT_QUANTITY_HOURS_PER_DAY);
    lastSchedule.setMinutes(0);

    const appointments = await this.scheduleRepository.findAll({
      where: {
        fk_id_establishment: establishment,
        dt_schedule_initial: {
          gte: firstSchedule
        },
        dt_schedule_end: {
          lte: lastSchedule
        }
      }
    });

    const hasSomeHourAvailableThisService =
      this.availableHoursInDayStrategy.validate(
        {
          appointments,
          day: dateStart.getDate(),
          month: dateStart.getMonth() + 1,
          year: dateStart.getFullYear(),
          startHour: DEFAULT_HOUR_START,
          endDate,
          startDate: dateStart
        },
        []
      );

    if (appointment) {
      const errorLoggerMessage = 'Appointment already exists';
      const errorMessage = 'APPOINTMENT_ALREADY_EXISTS';
      this.logger.fail({
        category: 'SCHEDULE_SERVICE_ERROR',
        error: errorLoggerMessage
      });
      throw new UnexpectedError(errorMessage);
    }

    return await this.scheduleRepository.create({
      dt_schedule_initial: dateStart,
      dt_schedule_end: endDate,
      fk_id_service: serviceId,
      fk_id_establishment: establishment,
      fk_id_establishment_payment: paymentMethod,
      fk_id_user: user.id
    });
  }

  findAll() {
    return this.scheduleRepository.findAll({});
  }

  findOne(id: number) {
    return this.scheduleRepository.findOne({
      id_schedules: id
    });
  }

  update(id: number, updateScheduleDto) {
    return `This action updates a #${id} schedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
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

          return (
            (startHour(appointment) === hour &&
              startMinutes(appointment) === minutes) ||
            (endHour(appointment) === hour &&
              endMinutes(appointment) === minutes) ||
            (startHour(appointment) <= hour && endHour(appointment) >= hour)
          );
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
    establishmentId: number;
    day: number;
    month: number;
    year: number;
  }) {
    const { establishmentId } = params;
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
        fk_id_establishment: establishmentId,
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
    establishmentId: number;
    month: number;
    year: number;
  }) {
    const { establishmentId } = params;
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
        fk_id_establishment: establishmentId,
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
