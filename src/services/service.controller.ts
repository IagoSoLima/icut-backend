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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateServiceDto } from '~/services/dto/create.service.dto';
import { UpdateServiceDto } from '~/services/dto/update.service.dto';
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

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateServiceDto
  ) {
    try {
      return await this.servicesServices.update(+id, updateUserDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.servicesServices.delete(+id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
