import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ValidatorService {
  constructor(private prisma: PrismaService) {}

  async IsFieldRegistered(dictionary: Map<string, string>, tableName: string) {
    const message: string[] = new Array<string>();

    for (const [field, fieldValue] of dictionary) {
      var entity = await this.prisma[tableName].findMany({
        where: {
          [field]: fieldValue
        }
      });
      if (entity.length > 0) {
        message.push(`O valor ${fieldValue} ja está cadastrado`);
      }
    }
    return message;
  }
}
