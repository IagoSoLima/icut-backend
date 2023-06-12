import * as bcrypt from 'bcryptjs';

export class PasswordEncrypty {
  static passwordEncrypter(password: string): string {
    return bcrypt.hashSync(password, 5);
  }

  static passwordCompare(password: string, encryptPassword): boolean {
    return bcrypt.compareSync(password, encryptPassword);
  }
}
