import { UserPayload } from '~/common/interfaces';

export type CreateScheduleParamsDTO = {
  user: UserPayload;
  serviceId: number;
  dateStart: Date;
  paymentMethod: number;
  establishment: number;
};
