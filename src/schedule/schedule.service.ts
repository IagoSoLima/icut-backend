import { Injectable } from '@nestjs/common';
import { AppLogger } from '~/app.logger';
import { UserType } from '~/common/enum';
import { UnauthorizedError } from '~/common/errors';
import { CreateScheduleParamsDTO } from './dto';

@Injectable()
export class ScheduleService {
  constructor(private readonly logger: AppLogger) {
    this.logger.setContext(ScheduleService.name);
  }

  create(params: CreateScheduleParamsDTO) {
    const { user } = params;

    if (user.userType === UserType.EMPLOYEE) {
      this.logger.error('Employee can not create schedule');
      throw new UnauthorizedError('Employee can not create schedule');
    }

    return 'This action adds a new schedule';
  }

  findAll() {
    return `This action returns all schedule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} schedule`;
  }

  update(id: number, updateScheduleDto) {
    return `This action updates a #${id} schedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
  }
}
