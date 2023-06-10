import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { GetUser } from '~/common/decorators';
import { UserPayload } from '~/common/interfaces';
import { CreateScheduleRequestDTO, UpdateScheduleRequestDTO } from './dto';
import { ScheduleResponseDTO } from './dto/response';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  async create(
    @Body() body: CreateScheduleRequestDTO,
    @GetUser() user: UserPayload
  ) {
    try {
      const response = await this.scheduleService.create({ user, ...body });
      return ScheduleResponseDTO.factory(response);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get()
  findAll() {
    return this.scheduleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const response = await this.scheduleService.findOne(+id);
      return ScheduleResponseDTO.factory(response);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleRequestDTO
  ) {
    try {
      const response = await this.scheduleService.update(
        +id,
        updateScheduleDto
      );
      return ScheduleResponseDTO.factory(response);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return this.scheduleService.remove(+id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
