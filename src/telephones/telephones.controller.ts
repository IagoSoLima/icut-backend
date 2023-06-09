import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { TelephoneService } from './telephones.service';
import { CreateTelephoneDto } from './dto/create-telephone.dto';
import { UpdateTelephoneDto } from './dto/update-telephone.dto';
import { Public } from '~/common/decorators';

@Controller('telephones')
@Public()
export class TelephonesController {
  constructor(private readonly telephonesService: TelephoneService) {}

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
