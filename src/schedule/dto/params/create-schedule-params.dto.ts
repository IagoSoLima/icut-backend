import { UserPayload } from '~/common/interfaces';

export type CreateScheduleParamsDTO = {
  user: UserPayload;
  service: number;
  dateStart: Date;
  paymentMethod: number;
};
