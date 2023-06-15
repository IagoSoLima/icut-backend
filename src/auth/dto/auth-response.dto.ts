import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { DEFAULT_AVATAR_URL } from '~/app.vars';
import { snakeKeys } from '~/common/utils';
import { SignInResponse } from './sign-in-response.dto';

export class AuthResponseDTO {
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

  @ApiProperty({
    name: 'id_user',
    type: String,
    description: 'Id do usuário',
    example: 2
  })
  idUser: number;

  @ApiProperty({
    name: 'username',
    type: String,
    description: 'Nome de usuário para realizar a autenticação',
    example: 'teste'
  })
  username: string;

  @ApiProperty({
    name: 'email',
    type: String,
    description: 'Email do usuário',
    example: 'teste@teste.com'
  })
  email: string;

  @ApiProperty({
    name: 'name',
    type: String,
    description: 'Nome do usuário',
    example: 'teste'
  })
  name: string;

  @ApiProperty({
    name: 'user_lastname',
    type: String,
    description: 'Sobrenome do usuário',
    example: 'Da Silva'
  })
  userLastName: string;

  @ApiProperty({
    name: 'user_type',
    type: Number,
    description: 'Tipo do usuário',
    example: 1
  })
  userType: number;

  @ApiProperty({
    name: 'created_at',
    type: Date,
    description: 'Data de criação do usuário',
    example: '2022-01-01'
  })
  createdAt: Date;

  @ApiProperty({
    name: 'update_at',
    type: Date,
    description: 'Data de atualização do usuário',
    example: '2022-01-01'
  })
  updateAt: Date;

  @ApiProperty({
    name: 'deleted_at',
    type: Date,
    description: 'Data de exclusão do usuário',
    example: '2022-01-01'
  })
  deletedAt: Date | null;

  @ApiProperty({
    name: 'avatar_url',
    type: Boolean,
    description: 'Imagem de avatar do usuário',
    example: true
  })
  avatarUrl?: string | null;

  @ApiProperty({
    name: 'active',
    type: Boolean,
    description: 'Status do usuário',
    example: true
  })
  active: boolean;

  @ApiProperty()
  idEstablishment: number;

  static factory(data: SignInResponse) {
    let formatedData = {
      idUser: data.id,
      username: data.userName,
      email: data.email,
      name: data.name,
      userLastName: data.lastName,
      userType: data.userType,
      avatarUrl: data.avatarUrl || DEFAULT_AVATAR_URL,
      createdAt: data.createdAt,
      updateAt: data.updatedAt,
      deletedAt: data.deletedAt,
      active: data.active,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      expiresIn: data.expiresIn,
      idEstablishment: null
    };
    if (data.idEstablishment)
      formatedData = {
        ...formatedData,
        idEstablishment: data.idEstablishment
      };
    return snakeKeys(formatedData);
  }
}
