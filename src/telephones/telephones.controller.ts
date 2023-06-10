import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AppLogger } from '~/app.logger';
import { BaseController } from '~/common/controllers';
import { CreateTelephoneDto } from './dto/create-telephone.dto';
import { UpdateTelephoneDto } from './dto/update-telephone.dto';
import { TelephoneService } from './telephones.service';

@ApiTags('Telephones')
@ApiBearerAuth()
@Controller('telephones')
export class TelephonesController extends BaseController {
  constructor(
    private readonly telephonesService: TelephoneService,
    readonly logger: AppLogger
  ) {
    super(logger, TelephonesController.name);
  }

  @Post()
  create(@Body() createTelephoneDto: CreateTelephoneDto) {
    return this.telephonesService.create(createTelephoneDto);
  }

  @Get(':id')
  findAllByUserId(@Param('id') id: string) {
    return this.telephonesService.findAllByUserId(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTelephoneDto: UpdateTelephoneDto
  ) {
    return this.telephonesService.update(+id, updateTelephoneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.telephonesService.deleteByTelephoneId(+id);
  }
}
