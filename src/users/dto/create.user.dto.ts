import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateEstablishmentDto } from '~/establishments/dto/create-establishment.dto';
import { CreateTelephoneDto } from '~/telephones/dto/create-telephone.dto';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  cpf: string;

  @ApiProperty()
  @IsNotEmpty()
  typeUser: number;

  @ApiProperty()
  @IsNotEmpty()
  listTelephones: Array<CreateTelephoneDto>;

  @ApiProperty()
  establishment?: CreateEstablishmentDto;
}
