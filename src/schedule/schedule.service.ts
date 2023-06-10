import { Injectable } from '@nestjs/common';
import { AppLogger } from '~/app.logger';
import { UserType } from '~/common/enum';
import { UnauthorizedError } from '~/common/errors';
import { CreateScheduleParamsDTO } from './dto';
import { ScheduleRepository } from './schedule.repository';

@Injectable()
export class ScheduleService {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly logger: AppLogger
  ) {
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
    return this.scheduleRepository.findAll({});
  }

  findOne(id: number) {
    return this.scheduleRepository.findOne({
      id_schedules: id
    });
  }

  update(id: number, updateScheduleDto) {
    return `This action updates a #${id} schedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
  }
}
