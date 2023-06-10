import { ApiProperty } from '@nestjs/swagger';
import { Establishments } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { snakeKeys } from '~/common/utils';

export class EstablishmentsDto {
  @ApiProperty({
    name: 'Nome do estabelecimento (Barbearia)',
    example: 'Bardearia do Iago',
    required: true,
    type: String
  })
  @Type(() => Number)
  id?: number;

  @ApiProperty({
    name: 'Nome do estabelecimento (Barbearia)',
    example: 'Bardearia do Iago',
    required: true,
    type: String
  })
  @Expose({ name: 'corporate_name' })
  @Type(() => String)
  @IsNotEmpty({
    message: 'Por favor forneça o nome do estabelecimento'
  })
  corporateName: string;

  @ApiProperty({
    name: 'Nome do representante do estabelecimento',
    example: 'Iago Lima',
    required: true,
    type: String
  })
  @Expose({ name: 'representative_name' })
  @Type(() => String)
  @IsNotEmpty({
    message: 'Por favor fornece o nome do representante do estabelecimento'
  })
  representativeName: string;

  @ApiProperty({
    name: 'CNPJ do estabelecimento',
    example: '00.000.000/0001-00',
    required: true,
    type: String
  })
  @Expose({ name: 'cnpj' })
  @Type(() => String)
  @IsNotEmpty({
    message: 'Por favor fornece o cnpj do estabelecimento'
  })
  cnpj: string;

  @ApiProperty({
    name: 'Email do estabelecimento',
    example: 'estabelecimento@estabelecimento.com',
    required: true,
    type: String
  })
  @Expose({ name: 'email_establishment' })
  @Type(() => String)
  @IsNotEmpty({
    message: 'Por favor fornece o cnpj do estabelecimento'
  })
  emailEstablishment: string;

  @ApiProperty({
    name: 'Logo do estabelecimento',
    example:
      'https://cdn.leroymerlin.com.br/products/kit_6_placas_decorativas_barbearia_barber_shop_salao_mdf_1567590343_992f_600x600.jpg',
    required: true,
    type: String
  })
  @Expose({ name: 'logo' })
  @Type(() => String)
  @IsNotEmpty({
    message: 'Por favor insira ologo'
  })
  logo: string;

  @ApiProperty({
    name: 'Logo do estabelecimento',
    example: 1,
    required: true,
    type: Number
  })
  @Expose({ name: 'id_user' })
  idAdm?: number;

  static factory(data: Establishments) {
    var formateddata = {
      id: data.id_establishment,
      corporateName: data.ds_corporate_name,
      representativeName: data.ds_representative_name,
      cnpj: data.nr_cnpj,
      emailEstablishment: data.ds_email,
      logo: data.establishment_logo,
      idAdm: data.id_user_administrator
    };
    return snakeKeys(formateddata);
  }
}
