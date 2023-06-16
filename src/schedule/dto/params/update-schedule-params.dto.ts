import { UserPayload } from '~/common/interfaces';

export type UpdateScheduleParamsDTO = {
  user: UserPayload;
  dateStart: Date;
};
