import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { GetUser, Public } from '~/common/decorators';
import { BadRequestDto, UnauthorizedRequestDto } from '~/common/dtos';
import { LocalAuthGuard } from '~/common/guards';
import { UserPayload } from '~/common/interfaces';
import { AuthService } from './auth.service';
import { AuthRequestDTO, AuthResponseDTO } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiCreatedResponse({ type: AuthResponseDTO })
  @ApiBadRequestResponse({ type: BadRequestDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedRequestDto })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() params: AuthRequestDTO, @GetUser() user: UserPayload) {
    try {
      const response = await this.authService.signIn(user);
      return AuthResponseDTO.factory(response);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  // @Post('/refresh')
  // async refresh() {}
}
