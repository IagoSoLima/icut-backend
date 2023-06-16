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
import { AppLogger } from '~/app.logger';
import { DEFAULT_JOIN_ARRAY_ERRORS } from '~/app.vars';
import { BaseController } from '~/common/controllers';
import { GetUser, Public } from '~/common/decorators';
import { UserPayload } from '~/common/interfaces';
import { UserDto } from '~/users/dto';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UsersService } from './users.service';
@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController extends BaseController {
  constructor(
    private readonly usersService: UsersService,
    readonly logger: AppLogger
  ) {
    super(logger, UsersController.name);
  }

  @Post()
  @Public()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      const arrayError = error.message.split(DEFAULT_JOIN_ARRAY_ERRORS);
      throw new HttpException(arrayError, HttpStatus.PRECONDITION_FAILED);
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.usersService.findOne(+id);

      if (user !== null) return user;

      throw new HttpException('Usuario nao existe', HttpStatus.NO_CONTENT);
    } catch (err) {
      this.reportLoggerAndThrowException(err);
    }
  }

  @Patch(':id')
  @Public()
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.usersService.update(+id, updateUserDto);
    } catch (error) {
      const arrayError = error.message.split(DEFAULT_JOIN_ARRAY_ERRORS);
      throw new HttpException(arrayError, HttpStatus.PRECONDITION_FAILED);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
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
  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async avatar(
    @GetUser() user: UserPayload,
    @UploadedFile() file: Express.Multer.File
  ) {
    try {
      const response = await this.usersService.uploadAvatar({
        user,
        file
      });
      return UserDto.factory(response);
    } catch (error) {
      const arrayError = error.message.split(DEFAULT_JOIN_ARRAY_ERRORS);
      throw new HttpException(arrayError, HttpStatus.BAD_REQUEST);
    }
  }
}
