import { Injectable } from '@nestjs/common';
import { Establishments } from '@prisma/client';
import { UnexpectedError } from '~/common/errors';
import { ValidatorService } from '~/common/validators';
import { EstablishmentsDto } from '~/establishments/dto/establishment.dto';
import { EstablishmentsRepository } from '~/establishments/establishments.repository';
import { CnpjStrategy } from '~/establishments/strategies';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';

@Injectable()
export class EstablishmentsService {
  private cnpjStrategy = new CnpjStrategy();

  constructor(
    private establishmentsRepository: EstablishmentsRepository,
    private validatorField: ValidatorService
  ) {}

  async create(createEstablishmentDto: CreateEstablishmentDto) {
    return await this.establishmentsRepository.createEstablishment({
      ds_corporate_name: createEstablishmentDto.corporateName,
      ds_representative_name: createEstablishmentDto.representativeName,
      ds_email: createEstablishmentDto.emailEstablishment,
      nr_cnpj: createEstablishmentDto.cnpj,
      establishment_logo: createEstablishmentDto.logo,
      id_user_administrator: createEstablishmentDto.idAdm
    });
  }

  async findAll() {
    var listEstablishment = await this.establishmentsRepository.findAll({});
    var listEstablishmentDto = listEstablishment.map(
      (establishment: Establishments) =>
        EstablishmentsDto.factory(establishment)
    );
    return listEstablishmentDto;
  }

  async findEstablishmentRelation(id: number) {
    return await this.establishmentsRepository.findEstablishmentRelation({
      id_establishment: id
    });
  }

  async findEstablishmentByAdmId(id: number) {
    const establishment =
      await this.establishmentsRepository.findEstablishmentByAdmId({
        where: {
          id_user_administrator: id
        }
      });
    if (establishment === null) {
      throw new UnexpectedError('Nao retornou nenhum estabelecimento');
    }
    return EstablishmentsDto.factory(establishment);
  }

  async findEstablishmentById(id: number) {
    const establishment =
      await this.establishmentsRepository.findEstablishmentById({
        id_establishment: id
      });
    if (establishment === null) {
      throw new UnexpectedError('Nao retornou nenhum estabelecimento');
    }
    return EstablishmentsDto.factory(establishment);
  }

  async update(id: number, updateEstablishmentDto: UpdateEstablishmentDto) {
    console.log(updateEstablishmentDto);
    return await this.establishmentsRepository.update({
      where: { id_establishment: id },
      data: {
        ds_corporate_name: updateEstablishmentDto.corporateName,
        ds_representative_name: updateEstablishmentDto.representativeName,
        ds_email: updateEstablishmentDto.emailEstablishment,
        nr_cnpj: updateEstablishmentDto.cnpj,
        establishment_logo: updateEstablishmentDto.logo,
        id_user_administrator: updateEstablishmentDto.idAdm
      }
    });
  }

  remove(id: number) {
    return `This action removes a #${id} establishment`;
  }

  async validateEstablishments(
    data: CreateEstablishmentDto,
    message: string[]
  ): Promise<string[]> {
    const dictionary = new Map<string, string>();
    dictionary.set('nr_cnpj', data.cnpj.replace(/[\s.-/]*/gim, ''));

    var messagesError = await this.validatorField.IsFieldRegistered(
      dictionary,
      'establishments'
    );
    messagesError.map(messageError => message.push(messageError));

    message = this.cnpjStrategy.validate(data, message);

    return message;
  }
}
