import { PrismaService } from '~/common/prisma';

export class ValidatorField {
  constructor(private prisma: PrismaService) {}

  async IsFieldRegistered(dictionary: Map<string, string>, tableName: string) {
    dictionary.forEach(async (fieldValue: string, field: string) => {
      console.log(`${field} - ${fieldValue}`);

      // var entity = await this.prisma[tableName].findUnique({
      //   where: {
      //     [field]: [field.valueOf]
      //   }
      // })
    });
  }
}
