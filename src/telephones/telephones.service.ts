import { Injectable } from '@nestjs/common';
import { CreateTelephoneDto } from './dto/create-telephone.dto';
import { UpdateTelephoneDto } from './dto/update-telephone.dto';
import { TelephoneRepository } from './telephone.repository';
import { TelephoneDto } from './dto/telephone.dto';

@Injectable()
export class TelephoneService {
  constructor(private telephoneRepository: TelephoneRepository) {}

  async create(createTelephoneDto: CreateTelephoneDto) {
    await this.telephoneRepository.create({
      ds_telephone: createTelephoneDto.telephoneDescription,
      nr_telephone: createTelephoneDto.telephoneNumber.replace(
        /[\s()-]*/gim,
        ''
      ),
      fk_id_user: createTelephoneDto.userId
    });
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
}
