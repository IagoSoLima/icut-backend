import { Strategy } from '~/common/strategy';
import { CreateUserDto } from '../dto/create.user.dto';

const brazilianPhoneRegex = /^\d{2}\d{4,5}\d{4}$/;

export class TelephoneStrategy implements Strategy<CreateUserDto> {
  validate(obj: CreateUserDto, message: string[]): string[] {
    if (!obj.listTelephones) {
      message.push('Não foi cadastrado nenhum telefone para o usuario');
      return message;
    }

    obj.listTelephones.map(telephone => {
      if (
        !brazilianPhoneRegex.test(
          telephone.telephoneNumber.replace(/[\s()-]*/gim, '')
        )
      ) {
        message.push('Padrão de telefone errado do esperado');
        return message;
      }
    });

    return message;
  }
}
