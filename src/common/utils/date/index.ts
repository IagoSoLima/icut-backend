import { differenceInHours } from './difference-in-hours.util';
import { differenceInMinutes } from './difference-in-minutes.util';
import { format } from './format.util';
import { getDate } from './get-date.util';
import { getDaysInMonth } from './get-days-in-month.util';
import { getHours } from './get-hours.util';
import { getMinutes } from './get-minutes.util';
import { getSeconds } from './get-seconds.util';
import { getYesterdayDate } from './get-yesterday-date.util';
import { isAfter } from './is-after.util';
import { isDate } from './is-date.util';
import { isPast } from './is-past.util';
import { parse } from './parse.util';
import { set } from './set.util';

const DateUtil = {
  differenceInMinutes,
  differenceInHours,
  format,
  getYesterdayDate,
  getDate,
  getHours,
  getMinutes,
  getSeconds,
  getDaysInMonth,
  isPast,
  isAfter,
  isDate,
  parse,
  set
};

export { DateUtil };
