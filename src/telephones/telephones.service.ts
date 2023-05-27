import { Injectable } from '@nestjs/common';
import { CreateTelephoneDto } from './dto/create-telephone.dto';
import { UpdateTelephoneDto } from './dto/update-telephone.dto';

@Injectable()
export class TelephonesService {
  create(createTelephoneDto: CreateTelephoneDto) {
    return 'This action adds a new telephone';
  }

  findAll() {
    return `This action returns all telephones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} telephone`;
  }

  update(id: number, updateTelephoneDto: UpdateTelephoneDto) {
    return `This action updates a #${id} telephone`;
  }

  remove(id: number) {
    return `This action removes a #${id} telephone`;
  }
}
