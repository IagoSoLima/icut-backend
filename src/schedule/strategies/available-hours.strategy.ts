import { Strategy } from '~/common/strategy';
import { isWithinTimeRange } from '~/common/utils';

interface StrategyType {
  startHour: number;
  endHour: number;
  startMinutes: number;
  endMinutes: number;
  hour: number;
  minutes: number;
}

export class AvailableHoursStrategy implements Strategy<StrategyType> {
  validate(obj: StrategyType, message: string[]): string[] {
    const { startHour, endHour, startMinutes, endMinutes, hour, minutes } = obj;

    if (
      !isWithinTimeRange({
        endHour,
        endMinutes,
        hour,
        minutes,
        startHour,
        startMinutes
      })
    ) {
      message.push('IS_NOT_AVAILABLE');
    }
    return message;
  }
}
