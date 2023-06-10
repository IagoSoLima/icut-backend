import { Injectable } from '@nestjs/common';
import { AppLogger } from '~/app.logger';
import {
  DEFAULT_HOUR_START,
  DEFAULT_MINUTE_INCREMENT,
  DEFAULT_QUANTITY_HOURS_PER_DAY
} from '~/app.vars';
import { UserType } from '~/common/enum';
import { UnexpectedError } from '~/common/errors';
import { DateUtil } from '~/common/utils';
import { ServicesRepository } from '~/services/services.repository';
import { CreateScheduleParamsDTO } from './dto';
import { ScheduleRepository } from './schedule.repository';

@Injectable()
export class ScheduleService {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly servicesRepository: ServicesRepository,
    private readonly logger: AppLogger
  ) {
    this.logger.setContext(ScheduleService.name);
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

    const appointment = await this.scheduleRepository.findFirst({
      where: { dt_schedule_initial: dateStart, fk_id_service: serviceId }
    });

    if (appointment) {
      const errorLoggerMessage = 'Appointment already exists';
      const errorMessage = 'APPOINTMENT_ALREADY_EXISTS';
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

    //TO DO verificar disponibilidade

    // verificar se não nada no intervalo de tempo

    const [hour, minutes, seconds] = service.time_duration.split(':');

    const serviceDuration = {
      hours: dateStart.getHours() + Number(hour),
      minutes: dateStart.getMinutes() + Number(minutes),
      seconds: dateStart.getSeconds() + Number(seconds)
    };

    const endDate = DateUtil.set(new Date(dateStart), serviceDuration);

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

    const hourStart = DEFAULT_HOUR_START;
    const eachHourArray = Array.from(
      {
        length: DEFAULT_QUANTITY_HOURS_PER_DAY
      },
      (_i, index) => index + hourStart
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

  async ListProviderMonthAvailabilityService(params: {
    establishmentId: number;
    month: number;
    year: number;
  }) {
    const { establishmentId } = params;
    const { month, year } = params;

    const numberOfSaysInMonth = DateUtil.getDaysInMonth(
      new Date(year, month - 1)
    );

    const eachDayArray = Array.from(
      {
        length: numberOfSaysInMonth
      },
      (_, index) => index + 1
    );
  }
}
