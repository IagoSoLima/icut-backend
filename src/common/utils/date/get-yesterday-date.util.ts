import { format } from './format.util';

export const getYesterdayDate = (formatting = 'yyyy-MM-dd'): string => {
  const today = new Date();
  const yesterday = new Date(today);

  yesterday.setDate(yesterday.getDate() - 1);

  return format(yesterday, formatting);
};
