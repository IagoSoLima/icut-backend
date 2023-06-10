import { CreateUserDto } from '~/users/dto/create.user.dto';

export class CreateAdmUser {
  static createAdmUserDto(createUserDto: CreateUserDto) {
    const user = {
      ds_username: createUserDto.username,
      ds_password: createUserDto.password,
      ds_email: createUserDto.email,
      ds_user_name: createUserDto.firstName,
      ds_user_lastname: createUserDto.lastName,
      nr_cpf: createUserDto.cpf.replace(/[\s.-]*/gim, ''),
      fk_id_type_user: createUserDto.typeUser,
      telephone: {
        create: createUserDto.listTelephones.map(telephone => ({
          ds_telephone: telephone.telephoneDescription,
          nr_telephone: telephone.telephoneNumber.replace(/[\s()-]*/gim, '')
        }))
      },
      establishment: {
        create: {
          ds_corporate_name: createUserDto.establishment.corporateName,
          ds_representative_name:
            createUserDto.establishment.representativeName,
          ds_email: createUserDto.establishment.emailEstablishment,
          nr_cnpj: createUserDto.establishment.cnpj.replace(
            /[\s.-/--]*/gim,
            ''
          ),
          establishment_logo: createUserDto.establishment.logo
        }
      }
    };
    return user;
  }
}
