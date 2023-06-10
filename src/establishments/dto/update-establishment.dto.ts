import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateEstablishmentDto {
  @ApiProperty()
  @IsNotEmpty()
  corporateName: string;

  @ApiProperty()
  @IsNotEmpty()
  representativeName: string;

  @ApiProperty()
  @IsNotEmpty()
  cnpj: string;

  @ApiProperty()
  @IsNotEmpty()
  emailEstablishment: string;

  @ApiProperty()
  @IsNotEmpty()
  logo: string;

  @ApiProperty()
  @IsNotEmpty()
  idAdm?: number;
}
