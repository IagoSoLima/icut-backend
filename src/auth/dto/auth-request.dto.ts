import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class AuthRequestDTO {
  @ApiProperty({
    type: String,
    description: 'Email do usuário para autenticar',
    example: 'email@teste.com'
  })
  @Expose({ name: 'email' })
  @Type(() => String)
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Senha do usuário para autenticar',
    example: '123456'
  })
  @Expose({ name: 'password' })
  @Type(() => String)
  @IsNotEmpty()
  password: string;
}
