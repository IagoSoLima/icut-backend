import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    name: 'username',
    example: 'username',
    required: true,
    type: String
  })
  @Expose({ name: 'username' })
  @Type(() => String)
  @IsNotEmpty({
    message: 'Por favor forneça um nome para o usuario'
  })
  username: string;

  @ApiProperty({
    name: 'password',
    example: 'SuaS3nha',
    required: true,
    type: String
  })
  @Expose({ name: 'password' })
  @Type(() => String)
  @IsNotEmpty({
    message: 'Por favor fornece a senha para o usuario'
  })
  password: string;

  @ApiProperty({
    name: 'email',
    example: 'teste@teste.com.br',
    required: true,
    type: String
  })
  @Expose({ name: 'email' })
  @Type(() => String)
  @IsNotEmpty({
    message: 'Por favor fornece o email do usuario'
  })
  email: string;

  @ApiProperty({
    name: 'first_name',
    example: 'Carlos',
    required: true,
    type: String
  })
  @Expose({ name: 'first_name' })
  @Type(() => String)
  @IsNotEmpty({
    message: 'Por favor fornece o primeiro nome do usuario'
  })
  firstName: string;

  @ApiProperty({
    name: 'last_name',
    example: 'Boyle',
    required: true,
    type: String
  })
  @Expose({ name: 'last_name' })
  @Type(() => String)
  @IsNotEmpty({
    message: 'Por favor fornece o sobrenome do usuario'
  })
  lastName: string;

  @ApiProperty({
    name: 'cpf',
    example: '000.000.000-00',
    required: true,
    type: String
  })
  @Expose({ name: 'cpf' })
  @Type(() => String)
  cpf: string;

  @ApiProperty({
    name: 'type_user',
    example: 1,
    required: true,
    type: Number
  })
  @Expose({ name: 'type_user' })
  @Type(() => Number)
  typeUser: number;
}
