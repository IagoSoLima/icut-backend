import { snakeKeys } from '~/common/utils';

export class ScheduleResponseDTO {
  id: number;
  client: string;
  service: string;
  startDate: Date;
  endDate: Date;
  paymentMethod: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;

  static factory(data: any) {
    return snakeKeys(data);
  }
}
