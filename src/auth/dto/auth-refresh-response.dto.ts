import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { snakeKeys } from '~/common/utils';
import { SignInResponse } from './sign-in-response.dto';

export class AuthRefreshResponseDTO {
  @ApiProperty({
    name: 'access_token',
    type: String,
    description: 'Token de autenticação do usuário',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoidGVzdGUiLCJpYXQiOjE2ODUzMDA4ODUsImV4cCI6MTY4NTMwMDk0NX0.fj9lnO78a6pD-gtEnsziW21wRKmwB_ObB1Xgkmw33P8'
  })
  accessToken: string;

  @ApiProperty({
    name: 'refresh_token',
    type: String,
    description: 'Token de revalidar o usuário',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoidGVzdGUiLCJpYXQiOjE2ODUzMDA4ODUsIm'
  })
  refreshToken: string;

  @ApiProperty({
    type: Number,
    name: 'expires_in',
    description: 'Tempo em segundos da expiração do token de autenticação',
    example: 3600
  })
  @Type(() => Number)
  expiresIn: number;

  static factory(data: SignInResponse) {
    const formatedData = {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      expiresIn: data.expiresIn
    };

    return snakeKeys(formatedData);
  }
}
