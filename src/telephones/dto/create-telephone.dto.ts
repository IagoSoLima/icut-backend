import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTelephoneDto {
  @ApiProperty()
  @IsNotEmpty()
  userId?: number;

  @ApiProperty()
  @IsNotEmpty()
  telephoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  telephoneDescription: string;
}
