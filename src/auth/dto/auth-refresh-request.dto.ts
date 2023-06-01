import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class AuthRefreshRequestDTO {
  @ApiProperty({
    name: 'refresh_token',
    type: String,
    description: 'Token para revalidar o usuário',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoidGVzdGUiLCJpYXQiOjE2ODUzMDA4ODUsIm'
  })
  @Expose({ name: 'refresh_token' })
  @Type(() => String)
  @IsNotEmpty()
  refreshToken: string;
}
