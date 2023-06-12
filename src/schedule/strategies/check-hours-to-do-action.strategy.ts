import { DEFAULT_LIMIT_HOUR_TO_DO_ACTION_IN_SCHEDULE } from '~/app.vars';
import { Strategy } from '~/common/strategy';
import { DateUtil } from '~/common/utils';

interface StrategyParams {
  date: Date;
}

export class CheckHoursToDoActionStrategy implements Strategy<StrategyParams> {
  validate(obj: StrategyParams, message: string[]): string[] {
    const { date } = obj;

    const currentDate = new Date(Date.now());

    const differenceInHours = DateUtil.differenceInHours(date, currentDate);

    const isTwoOrMoreHoursBeforeAppointment =
      differenceInHours >= DEFAULT_LIMIT_HOUR_TO_DO_ACTION_IN_SCHEDULE;

    if (!isTwoOrMoreHoursBeforeAppointment) {
      const errorMessage = `EXECUTE_ACTION_BEFORE_${DEFAULT_LIMIT_HOUR_TO_DO_ACTION_IN_SCHEDULE}_HOURS`;
      message.push(errorMessage);
    }

    return message;
  }
}
