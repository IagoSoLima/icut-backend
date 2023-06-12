import { Injectable } from '@nestjs/common';
import { Schedules } from '@prisma/client';
import { Strategy } from '~/common/strategy';
import { DateUtil } from '~/common/utils';
import { ScheduleService } from '~/schedule/schedule.service';

interface StrategyType {
  appointments: Schedules[];
  day: number;
  month: number;
  year: number;
  startHour: number;
  intervalMinutes: number;
  startDate: Date;
  endDate: Date;
}

@Injectable()
export class AvailableHoursInDayStrategy implements Strategy<StrategyType> {
  constructor(private readonly service: ScheduleService) {}

  validate(obj: StrategyType, message: string[]): string[] {
    const {
      appointments,
      day,
      month,
      year,
      startHour,
      endDate,
      startDate,
      intervalMinutes
    } = obj;

    const availability = this.service.availableHoursInDay({
      appointments,
      day,
      month,
      startHour,
      year
    });
    const startHourService = startDate.getHours();
    const endHourService = endDate.getHours();
    const startMinutesService = startDate.getMinutes();
    const endMinutesService = endDate.getMinutes();

    // const checkAvailableHoursToAppointment = availability.filter(available =>
    //   isWithinTimeRange({
    //     startHour: startDate.getHours(),
    //     endHour: endDate.getHours(),
    //     endMinutes: endDate.getMinutes(),
    //     startMinutes: startDate.getMinutes(),
    //     hour: available.hour,
    //     minutes: available.minutes
    //   })
    // );
    const indexFirstSlotToAppointment = availability.findIndex(
      available =>
        available.hour === startHourService &&
        available.minutes === startMinutesService
    );

    let indexLastSlotToAppointment = availability.findIndex(
      available =>
        available.hour === endHourService &&
        available.minutes === endMinutesService
    );

    if (indexLastSlotToAppointment === -1) {
      indexLastSlotToAppointment = availability.length;
    }

    const checkAvailableHoursToAppointment = [];

    for (
      let i = indexFirstSlotToAppointment;
      i < indexLastSlotToAppointment;
      i++
    ) {
      checkAvailableHoursToAppointment.push(availability[i]);
    }

    const isAvailableAllHoursToAppointment =
      checkAvailableHoursToAppointment.every(hour => hour.available === true);

    const diffInMinutes = DateUtil.differenceInMinutes(endDate, startDate);

    const IsEqualsQuantityOfHours =
      diffInMinutes / intervalMinutes ===
      checkAvailableHoursToAppointment.length;

    if (!isAvailableAllHoursToAppointment || !IsEqualsQuantityOfHours) {
      message.push('DATE_IS_NOT_AVAILABLE');
    }

    return message;
  }
}
