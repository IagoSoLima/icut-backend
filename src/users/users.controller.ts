import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiNoContentResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: UserDto) {
    var response = await this.usersService.create(createUserDto);

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
      return Error(err);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
