import { Strategy } from '~/common/strategy';
import { CreateEstablishmentDto } from '~/establishments/dto/create-establishment.dto';

export class CnpjStrategy implements Strategy<CreateEstablishmentDto> {
  validate(obj: CreateEstablishmentDto, message: string[]): string[] {
    if (obj.cnpj === undefined) {
      message.push('CNPJ invalido');
      return message;
    }

    var strCNPJ = obj.cnpj.replace(/[\s.-/--]*/gim, '');

    if (
      strCNPJ === '00000000000000' ||
      strCNPJ === '11111111111111' ||
      strCNPJ === '22222222222222' ||
      strCNPJ === '33333333333333' ||
      strCNPJ === '44444444444444' ||
      strCNPJ === '55555555555555' ||
      strCNPJ === '66666666666666' ||
      strCNPJ === '77777777777777' ||
      strCNPJ === '88888888888888' ||
      strCNPJ === '99999999999999' ||
      strCNPJ.length !== 14
    ) {
      message.push('CNPJ invalido');
      return message;
    }

    var tamanho = strCNPJ.length - 2;
    var numeros = strCNPJ.substring(0, tamanho);
    var digitos = strCNPJ.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += +numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    var resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != +digitos.charAt(0)) {
      message.push('CNPJ invalido');
      return message;
    }

    tamanho = tamanho + 1;
    numeros = strCNPJ.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let k = tamanho; k >= 1; k--) {
      soma += +numeros.charAt(tamanho - k) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != +digitos.charAt(1)) {
      message.push('CNPJ invalido');
      return message;
    }

    return message;
  }
}
