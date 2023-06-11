import { Injectable } from '@nestjs/common';
import { TelephoneStrategy } from '~/telephones/strategies';
import { CreateTelephoneDto } from './dto/create-telephone.dto';
import { TelephoneDto } from './dto/telephone.dto';
import { UpdateTelephoneDto } from './dto/update-telephone.dto';
import { TelephoneRepository } from './telephone.repository';

@Injectable()
export class TelephoneService {
  constructor(private telephoneRepository: TelephoneRepository) {}

  private telephoneStrategy = new TelephoneStrategy();

  async create(createTelephoneDto: CreateTelephoneDto[]) {
    var message = this.telephoneStrategy.validate(
      createTelephoneDto,
      new Array<string>()
    );

    if (message.length > 0) return message;

    await this.telephoneRepository.create(
      createTelephoneDto.map(telephone => ({
        ds_telephone: telephone.telephoneDescription,
        nr_telephone: telephone.telephoneNumber.replace(/[\s()-]*/gim, ''),
        fk_id_user: telephone.userId
      }))
    );
  }

  async findAllByUserId(id: number) {
    var listTelephones = await this.telephoneRepository.getByUserId(id);
    var listTelephoneDto = listTelephones.map(telephone =>
      TelephoneDto.factory(telephone)
    );
    return listTelephoneDto;
  }

  async update(id: number, updateTelephoneDto: UpdateTelephoneDto) {
    await this.telephoneRepository.update({
      where: {
        id_telephone: id
      },
      data: {
        ds_telephone: updateTelephoneDto.telephoneDescription,
        nr_telephone: updateTelephoneDto.telephoneNumber.replace(
          /[\s()-]*/gim,
          ''
        )
      }
    });
  }

  async deleteByTelephoneId(id: number) {
    return await this.telephoneRepository.deleteByTelephoneId({
      where: {
        id_telephone: id
      }
    });
  }

  validateTelephone(data: CreateTelephoneDto[], message: string[]): string[] {
    message = this.telephoneStrategy.validate(data, message);
    return message;
  }
}
