import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppLogger } from '~/app.logger';
import { BaseController } from '~/common/controllers';
import { Public } from '~/common/decorators';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UsersService } from './users.service';
@ApiTags('Usuarios')
@Controller('users')
@Public()
export class UsersController extends BaseController {
  constructor(
    private readonly usersService: UsersService,
    readonly logger: AppLogger
  ) {
    super(logger, UsersController.name);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const response = await this.usersService.create(createUserDto);

    if (Array.isArray(response)) {
      throw new HttpException(response, HttpStatus.PRECONDITION_FAILED);
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
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
