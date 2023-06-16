import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { DEFAULT_JOIN_ARRAY_ERRORS } from '~/app.vars';
import { GetUser } from '~/common/decorators';
import { UnexpectedError } from '~/common/errors';
import { UserPayload } from '~/common/interfaces';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { EstablishmentsService } from './establishments.service';
@ApiTags('Establishments')
@ApiBearerAuth()
@Controller('establishments')
export class EstablishmentsController {
  constructor(private readonly establishmentsService: EstablishmentsService) {}

  @Post()
  create(@Body() createEstablishmentDto: CreateEstablishmentDto) {
    return this.establishmentsService.create(createEstablishmentDto);
  }

  @Get()
  findAll() {
    return this.establishmentsService.findAll();
  }

  @Get('/adm/:id')
  findByAdmId(@Param('id') id: string) {
    return this.establishmentsService.findEstablishmentByAdmId(+id);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    try {
      return this.establishmentsService.findEstablishmentById(+id);
    } catch (err) {
      throw new UnexpectedError(err);
    }
  }

  @Get('/relation/:id')
  findEstablishmentRelation(@Param('id') id: string) {
    return this.establishmentsService.findEstablishmentRelation(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEstablishmentDto: UpdateEstablishmentDto
  ) {
    return this.establishmentsService.update(+id, updateEstablishmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.establishmentsService.remove(+id);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @Post('logo/:id')
  @UseInterceptors(FileInterceptor('file'))
  async avatar(
    @GetUser() user: UserPayload,
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File
  ) {
    try {
      const response = await this.establishmentsService.uploadLogo({
        id,
        user,
        file
      });

      return response;
      // return UserDto.factory(response);
    } catch (error) {
      const arrayError = error.message.split(DEFAULT_JOIN_ARRAY_ERRORS);
      throw new HttpException(arrayError, HttpStatus.BAD_REQUEST);
    }
  }
}
