import { Injectable } from '@nestjs/common';
import { AppLogger } from '~/app.logger';
import { UnexpectedError } from '~/common/errors';
import { PrismaService } from '~/common/prisma';
import { CreateServiceDto } from '~/services/dto/create.service.dto';
import { ServicesDto } from '~/services/dto/services.dto';
import { UpdateServiceDto } from '~/services/dto/update.service.dto';
import { ServicesRepository } from '~/services/services.repository';

@Injectable()
export class ServicesService {
  constructor(
    private prismaService: PrismaService,
    private servicesRepository: ServicesRepository,
    private logger: AppLogger
  ) {}

  async create(data: CreateServiceDto) {
    try {
      return await this.servicesRepository.create({
        ds_service: data.descriptionService,
        nr_valor: data.valor,
        time_duration: data.timeDuration,
        fk_id_establishment: data.idEstablishment,
        fk_id_type_service: data.typeService
      });
    } catch (error) {
      const errorLoggerMessage = 'Services cant be created';
      const errorMessage = 'SERVICES_SERVICE_ERROR';
      this.logger.fail({
        category: 'SERVICES_NOT_FOUND',
        error: errorLoggerMessage
      });

      throw new UnexpectedError(errorMessage);
    }
  }

  async findAllByEstablishmentId(id: number) {
    try {
      const listEstablishment = await this.servicesRepository.findAll({
        where: { fk_id_establishment: id }
      });

      return listEstablishment.map(establishment =>
        ServicesDto.factory(establishment)
      );
    } catch (error) {
      const errorLoggerMessage =
        'Services not found for submitted id establishment';
      const errorMessage = 'SERVICES_NOT_FOUND';
      this.logger.fail({
        category: 'SERVICES_NOT_FOUND',
        error: errorLoggerMessage
      });

      throw new UnexpectedError(errorMessage);
    }
  }

  async findOne(id: number) {
    try {
      const service = await this.servicesRepository.findOne({
        id_service: id
      });

      return ServicesDto.factory(service);
    } catch (error) {
      const errorLoggerMessage =
        'Service not found for submitted id establishment';
      const errorMessage = 'SERVICES_NOT_FOUND';
      this.logger.fail({
        category: 'SERVICES_NOT_FOUND',
        error: errorLoggerMessage
      });

      throw new UnexpectedError(errorMessage);
    }
  }

  async update(id: number, data: UpdateServiceDto) {
    return this.servicesRepository.update({
      where: {
        id_service: id
      },
      data: {
        ds_service: data.descriptionService,
        nr_valor: data.valor,
        time_duration: data.timeDuration,
        fk_id_type_service: data.typeService
      }
    });
  }

  async delete(id: number) {
    try {
      return await this.servicesRepository.delete({ id_service: id });
    } catch (error) {
      throw new UnexpectedError(error);
    }
  }
}
