import { Injectable } from '@nestjs/common';
import { Addresses, Establishments } from '@prisma/client';
import * as crypto from 'crypto';
import { AppLogger } from '~/app.logger';
import { DEFAULT_JOIN_ARRAY_ERRORS } from '~/app.vars';
import { UnexpectedError } from '~/common/errors';
import { UserPayload } from '~/common/interfaces';
import { S3AwsProvider } from '~/common/providers';
import { ImageTypeStrategy } from '~/common/strategy';
import { ValidatorService } from '~/common/validators';
import { EstablishmentsDto } from '~/establishments/dto/establishment.dto';
import { EstablishmentsRepository } from '~/establishments/establishments.repository';
import { CnpjStrategy } from '~/establishments/strategies';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';

@Injectable()
export class EstablishmentsService {
  private cnpjStrategy = new CnpjStrategy();
  private imageTypeStrategy = new ImageTypeStrategy(this.logger);
  private AwsS3Provider = new S3AwsProvider();
  private messageError: string[];

  constructor(
    private establishmentsRepository: EstablishmentsRepository,
    private validatorField: ValidatorService,
    private logger: AppLogger
  ) {
    this.logger.setContext(EstablishmentsService.name);
    this.messageError = [];
  }

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
    const listEstablishment = await this.establishmentsRepository.findAll({
      where: {
        service: {
          some: {}
        }
      },
      include: {
        address: true
      }
    });
    const listEstablishmentDto = listEstablishment.map(
      (
        establishment: Establishments & {
          address: Addresses[];
        }
      ) => EstablishmentsDto.factory(establishment)
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
        },
        include: {
          address: true
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
        where: { id_establishment: id }
      });
    if (establishment === null) {
      throw new UnexpectedError('Nao retornou nenhum estabelecimento');
    }
    return EstablishmentsDto.factory(establishment);
  }

  async update(id: number, updateEstablishmentDto: UpdateEstablishmentDto) {
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

    const messagesError = await this.validatorField.IsFieldRegistered(
      dictionary,
      'establishments'
    );
    messagesError.map(messageError => message.push(messageError));

    message = this.cnpjStrategy.validate(data, message);

    return message;
  }

  async uploadLogo(params: {
    id: number;
    file: Express.Multer.File;
    user: UserPayload;
  }): Promise<Establishments> {
    const { file, user, id } = params;

    const imageTypeStrategyError = this.imageTypeStrategy.validate(
      { file },
      []
    );
    if (imageTypeStrategyError.length > 0) {
      this.messageError.push(...imageTypeStrategyError);
    }

    if (this.messageError.length > 0) {
      const messageError = this.messageError.join(DEFAULT_JOIN_ARRAY_ERRORS);
      this.messageError = [];

      throw new UnexpectedError(messageError);
    }

    const fileExtension = '.' + file.originalname.split('.')[1];
    const fileType = file.mimetype.split('/')[1];
    const fileName = crypto.randomUUID() + fileExtension;
    const KEY = `establishments/logo/${user.id}/${fileName}`;
    const url = await this.AwsS3Provider.uploadFile(KEY, file.buffer, fileType);

    const userUpdated = await this.establishmentsRepository.update({
      data: {
        establishment_logo: url
      },
      where: {
        id_establishment: id
      }
    });

    return userUpdated;
  }
}
