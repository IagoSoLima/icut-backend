import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateServiceDto } from '~/services/dto/create.service.dto';
import { ServicesService } from '~/services/service.services';
@ApiTags('Services')
@ApiBearerAuth()
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesServices: ServicesService) {}

  @Post()
  async create(@Body() createServiceDto: CreateServiceDto) {
    try {
      return await this.servicesServices.create(createServiceDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get('/establishment/:id')
  async findAllByEstablishmentId(@Param('id') id: string) {
    try {
      return await this.servicesServices.findAllByEstablishmentId(+id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get(':id')
  async findOneId(@Param('id') id: string) {
    try {
      return await this.servicesServices.findOne(+id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
