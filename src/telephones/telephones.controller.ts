import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { TelephonesService } from './telephones.service';
import { CreateTelephoneDto } from './dto/create-telephone.dto';
import { UpdateTelephoneDto } from './dto/update-telephone.dto';

@Controller('telephones')
export class TelephonesController {
  constructor(private readonly telephonesService: TelephonesService) {}

  @Post()
  create(@Body() createTelephoneDto: CreateTelephoneDto) {
    return this.telephonesService.create(createTelephoneDto);
  }

  @Get()
  findAll() {
    return this.telephonesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.telephonesService.findOne(+id);
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
    return this.telephonesService.remove(+id);
  }
}
