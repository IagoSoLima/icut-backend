import { Injectable } from '@nestjs/common';
import { AddressesRepository } from '~/addresses/addresses.repository';
import { UnexpectedError } from '~/common/errors';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressesService {
  constructor(private addressesRepository: AddressesRepository) {}
  async create(createAddressDto: CreateAddressDto) {
    try {
      return await this.addressesRepository.create({
        data: {
          ds_address: createAddressDto.address,
          ds_city: createAddressDto.city,
          ds_state: createAddressDto.state,
          nr_cep: createAddressDto.cep.replace('-', ''),
          fk_id_establishment: createAddressDto.idEstablishment
        }
      });
    } catch (error) {
      throw new UnexpectedError(error);
    }
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }
}
