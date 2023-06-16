import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateTelephoneDto {
  @ApiProperty({
    name: 'user_id',
    example: 1,
    required: false,
    type: Number
  })
  @Expose({ name: 'user_id' })
  @Type(() => Number)
  userId?: number;

  @ApiProperty({
    name: 'telephone_number',
    example: '(00)00000-0000 | (00)0000-0000',
    required: true,
    type: String
  })
  @Expose({ name: 'telephone_number' })
  @Type(() => String)
  @IsNotEmpty({
    message: 'Por favor forneca um numero de telefone'
  })
  telephoneNumber: string;

  @ApiProperty({
    name: 'telephone_description',
    example: 'Meu telefone',
    required: true,
    type: String
  })
  @Expose({ name: 'telephone_description' })
  @Type(() => String)
  @IsNotEmpty({
    message: 'Por favor forneca uma descrição do telefone'
  })
  telephoneDescription: string;
}
