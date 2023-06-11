import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { GetUser } from '~/common/decorators';
import { BadRequestDto, UnauthorizedRequestDto } from '~/common/dtos';
import { UserPayload } from '~/common/interfaces';
import {
  CreateScheduleRequestDTO,
  ListDayAvailableServiceQueryDTO,
  ListMonthAvailableServiceQueryDTO,
  UpdateScheduleRequestDTO
} from './dto';
import { ScheduleResponseDTO } from './dto/response';
import { ScheduleService } from './schedule.service';

@ApiTags('Schedule')
@ApiBearerAuth()
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @ApiBody({ type: CreateScheduleRequestDTO })
  @ApiResponse({ type: ScheduleResponseDTO })
  @ApiBadRequestResponse({ type: BadRequestDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedRequestDto })
  @HttpCode(HttpStatus.OK)
  @Post()
  async create(
    @Body() body: CreateScheduleRequestDTO,
    @GetUser() user: UserPayload
  ) {
    try {
      const response = await this.scheduleService.create({ user, ...body });
      return ScheduleResponseDTO.factory(response);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  @ApiResponse({ type: Array<ScheduleResponseDTO> })
  @ApiBadRequestResponse({ type: BadRequestDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedRequestDto })
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.scheduleService.findAll();
  }

  @ApiResponse({ type: ScheduleResponseDTO })
  @ApiBadRequestResponse({ type: BadRequestDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedRequestDto })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const response = await this.scheduleService.findOne(+id);
      return ScheduleResponseDTO.factory(response);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @ApiBody({ type: UpdateScheduleRequestDTO })
  @ApiResponse({ type: ScheduleResponseDTO })
  @ApiBadRequestResponse({ type: BadRequestDto })
  @Put(':id')
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

  @ApiOkResponse({ status: 201, description: 'Return not content' })
  @ApiUnauthorizedResponse({ type: UnauthorizedRequestDto })
  @ApiBadRequestResponse({ type: BadRequestDto })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return this.scheduleService.remove(+id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @ApiQuery({ type: ListDayAvailableServiceQueryDTO })
  @ApiOkResponse({ status: 201, description: 'Return not content' })
  @ApiUnauthorizedResponse({ type: UnauthorizedRequestDto })
  @ApiBadRequestResponse({ type: BadRequestDto })
  @Get('day-available/:establishmentId')
  async listDayAvailableService(
    @Param('establishmentId') establishmentId: number,
    @Query() query: ListDayAvailableServiceQueryDTO
  ) {
    try {
      const { day, month, year } = query;
      return this.scheduleService.listDayAvailableService({
        establishmentId,
        day,
        month,
        year
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @ApiQuery({ type: ListMonthAvailableServiceQueryDTO })
  @ApiOkResponse({ status: 201, description: 'Return not content' })
  @ApiUnauthorizedResponse({ type: UnauthorizedRequestDto })
  @ApiBadRequestResponse({ type: BadRequestDto })
  @Get('month-available/:establishmentId')
  async listMonthAvailableService(
    @Param('establishmentId') establishmentId: number,
    @Query() query: ListDayAvailableServiceQueryDTO
  ) {
    try {
      const { month, year } = query;
      return this.scheduleService.listProviderMonthAvailabilityService({
        establishmentId,
        month,
        year
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
