import { Strategy } from '~/common/strategy';
import { CreateTelephoneDto } from '~/telephones/dto/create-telephone.dto';

const brazilianPhoneRegex = /^\d{2}\d{4,5}\d{4}$/;

export class TelephoneStrategy implements Strategy<CreateTelephoneDto[]> {
  validate(obj: CreateTelephoneDto[], message: string[]): string[] {
    if (!obj) {
      message.push('Não foi cadastrado nenhum telefone para o usuario');
      return message;
    }

    obj.map(telephone => {
      if (
        !brazilianPhoneRegex.test(
          telephone.telephoneNumber.replace(/[\s()-]*/gim, '')
        )
      ) {
        message.push(
          'Padrão de telefone diferente do esperado (Ex:(11)98765-4321)'
        );
      }
    });

    return message;
  }
}
