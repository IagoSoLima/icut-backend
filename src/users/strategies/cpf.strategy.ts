import { CreateUserDto } from '../dto/create.user.dto';
import { Strategy } from '~/common/strategy';

export class CpfStrategy implements Strategy<CreateUserDto> {
  validate(obj: CreateUserDto, message: string[]): string[] {
    if (typeof obj.cpf !== 'string') {
      message.push('CPF invalido');
      return message;
    }
    obj.cpf = obj.cpf.replace(/[\s.-]*/gim, '');
    if (
      !obj.cpf ||
      obj.cpf.length != 11 ||
      obj.cpf == '00000000000' ||
      obj.cpf == '11111111111' ||
      obj.cpf == '22222222222' ||
      obj.cpf == '33333333333' ||
      obj.cpf == '44444444444' ||
      obj.cpf == '55555555555' ||
      obj.cpf == '66666666666' ||
      obj.cpf == '77777777777' ||
      obj.cpf == '88888888888' ||
      obj.cpf == '99999999999'
    ) {
      message.push('CPF invalido');
      return message;
    }
    var soma = 0;
    var resto;
    for (var i = 1; i <= 9; i++)
      soma = soma + parseInt(obj.cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(obj.cpf.substring(9, 10))) {
      message.push('CPF invalido');
      return message;
    }
    soma = 0;
    for (var i = 1; i <= 10; i++)
      soma = soma + parseInt(obj.cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(obj.cpf.substring(10, 11))) {
      message.push('CPF invalido');
      return message;
    }
    return message;
  }
}
