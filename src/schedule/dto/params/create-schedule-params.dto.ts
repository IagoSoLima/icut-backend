import { UserPayload } from '~/common/interfaces';

export type CreateScheduleParamsDTO = {
  user: UserPayload;
  service: number;
  dateStart: string;
  paymentMethod: number;
};
