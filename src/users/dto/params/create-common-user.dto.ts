import { DEFAULT_AVATAR_URL } from '~/app.vars';
import { CreateUserDto } from '~/users/dto/create.user.dto';

export class CreateCommonUser {
  static createCommonUserDto(createUserDto: CreateUserDto) {
    const user = {
      ds_username: createUserDto.username,
      ds_password: createUserDto.password,
      ds_email: createUserDto.email,
      ds_user_name: createUserDto.firstName,
      ds_user_lastname: createUserDto.lastName,
      nr_cpf: createUserDto.cpf.replace(/[\s.-]*/gim, ''),
      fk_id_type_user: createUserDto.typeUser,
      avatar_image: DEFAULT_AVATAR_URL,
      telephone: {
        create: createUserDto.listTelephones.map(telephone => ({
          ds_telephone: telephone.telephoneDescription,
          nr_telephone: telephone.telephoneNumber.replace(/[\s()-]*/gim, '')
        }))
      }
    };
    return user;
  }
}
