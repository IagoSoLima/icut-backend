import { Injectable } from '@nestjs/common';
import { Schedules } from '@prisma/client';
import { Strategy } from '~/common/strategy';
import { ScheduleService } from '~/schedule/schedule.service';

interface StrategyType {
  appointments: Schedules[];
  day: number;
  month: number;
  year: number;
  startHour: number;
  startDate: Date;
  endDate: Date;
}

@Injectable()
export class AvailableHoursInDayStrategy implements Strategy<StrategyType> {
  constructor(private readonly service: ScheduleService) {}

  validate(obj: StrategyType, message: string[]): string[] {
    const { appointments, day, month, year, startHour, endDate, startDate } =
      obj;

    const availability = this.service.availableHoursInDay({
      appointments,
      day,
      month,
      startHour,
      year
    });

    const availableHours = availability.filter(hour => hour.available === true);
    const checkAvailableHoursToAppointment = availableHours.filter(
      available =>
        available.hour <= startDate.getHours() &&
        available.hour >= endDate.getHours()
    );

    if (checkAvailableHoursToAppointment.length <= 0) {
      message.push('DATE_IS_NOT_AVAILABLE');
    }

    return message;
  }
}
