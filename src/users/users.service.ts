import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { AddressesService } from '~/addresses/addresses.service';
import { AppLogger } from '~/app.logger';
import { DEFAULT_JOIN_ARRAY_ERRORS } from '~/app.vars';
import { UserType } from '~/common/enum';
import { UnexpectedError } from '~/common/errors';
import { UserPayload } from '~/common/interfaces';
import { S3AwsProvider } from '~/common/providers';
import { ImageTypeStrategy } from '~/common/strategy';
import { ValidatorService } from '~/common/validators';
import { EmployeesService } from '~/employees/employees.service';
import { EstablishmentsService } from '~/establishments/establishments.service';
import { TelephoneService } from '~/telephones/telephones.service';
import { CreateAdmUser, CreateCommonUser } from '~/users/dto/params';
import { CreateEmployeeUser } from '~/users/dto/params/create-employee-user';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserDto } from './dto/user.dto';
import { CpfStrategy } from './strategies';
import { UsersRepository } from './users.repository';
@Injectable()
export class UsersService {
  private messageError: string[];

  constructor(
    private validatorField: ValidatorService,
    private userRepository: UsersRepository,
    private establishmentsService: EstablishmentsService,
    private telephoneService: TelephoneService,
    private employeeService: EmployeesService,
    private addressesService: AddressesService,
    private logger: AppLogger
  ) {
    this.messageError = [];
  }
  private cpfStrategy = new CpfStrategy();
  private imageTypeStrategy = new ImageTypeStrategy(this.logger);
  private AwsS3Provider = new S3AwsProvider();

  async create(createUserDto: CreateUserDto) {
    try {
      const message = await this.validadeUser(
        createUserDto,
        new Array<string>()
      );
      const hash = bcrypt.hashSync(createUserDto.password, 5);
      createUserDto.password = hash;

      if (message.length > 0) {
        const messageError = message.join(DEFAULT_JOIN_ARRAY_ERRORS);
        throw new UnexpectedError(messageError);
      }

      switch (createUserDto.typeUser) {
        case UserType.CLIENT:
          return await this.userRepository.create(
            CreateCommonUser.createCommonUserDto(createUserDto)
          );

        case UserType.ADMIN:
          const employee = await this.userRepository.createAdm(
            CreateAdmUser.createAdmUserDto(createUserDto)
          );
          await this.employeeService.create({
            idEstablishment: employee.establishment[0].id_establishment,
            idUser: employee.id_user
          });
          await this.addressesService.create({
            address: createUserDto.address.address,
            cep: createUserDto.address.cep,
            city: createUserDto.address.city,
            state: createUserDto.address.state,
            idEstablishment: employee.establishment[0].id_establishment
          });
          break;

        case UserType.EMPLOYEE:
          return await this.userRepository.create(
            CreateEmployeeUser.createEmployeeUserDto(createUserDto)
          );

        default:
          message.push('Nao houve atribuição de tipo do usuario');
          return message;
      }
    } catch (error) {
      throw new UnexpectedError(error);
    }
  }

  async findAll() {
    const listUser = await this.userRepository.findAll({
      include: { telephone: true }
    });

    const listUserDto = listUser.map(user =>
      UserDto.factoryUserTelephone(user)
    );

    return listUserDto;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ id_user: id });

    if (user === null) return null;

    return UserDto.factoryUser(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.userRepository.update({
        where: { id_user: id },
        data: {
          ds_username: updateUserDto.username,
          ds_email: updateUserDto.email,
          ds_user_name: updateUserDto.firstName,
          ds_user_lastname: updateUserDto.lastName,
          fk_id_type_user: updateUserDto.typeUser
        }
      });
    } catch (err) {
      throw new UnexpectedError(err);
    }
  }

  async remove(id: number) {
    return await this.userRepository.deleteByID({ id_user: id });
  }

  async validadeUser(
    data: CreateUserDto,
    message: string[]
  ): Promise<string[]> {
    const dictionary = new Map<string, string>();
    dictionary
      .set('nr_cpf', data.cpf.replace(/[\s.-]*/gim, ''))
      .set('ds_email', data.email)
      .set('ds_username', data.username);

    message = await this.validatorField.IsFieldRegistered(dictionary, 'users');
    message = this.cpfStrategy.validate(data, message);
    message = this.telephoneService.validateTelephone(
      data.listTelephones,
      message
    );

    if (data.typeUser === UserType.ADMIN) {
      message = await this.establishmentsService.validateEstablishments(
        data.establishment,
        message
      );
    }

    return message;
  }

  async uploadAvatar(params: {
    file: Express.Multer.File;
    user: UserPayload;
  }): Promise<Users> {
    const { file, user } = params;

    const imageTypeStrategyError = this.imageTypeStrategy.validate(
      { file },
      []
    );
    if (imageTypeStrategyError.length > 0) {
      this.messageError.push(...imageTypeStrategyError);
    }

    if (this.messageError.length > 0) {
      const messageError = this.messageError.join(DEFAULT_JOIN_ARRAY_ERRORS);
      this.messageError = [];

      throw new UnexpectedError(messageError);
    }

    const fileExtension = '.' + file.originalname.split('.')[1];
    const fileType = file.mimetype.split('/')[1];
    const fileName = crypto.randomUUID() + fileExtension;
    const KEY = `users/avatar/${user.id}/${fileName}`;
    const url = await this.AwsS3Provider.uploadFile(KEY, file.buffer, fileType);

    const userUpdated = await this.userRepository.update({
      data: {
        avatar_image: url
      },
      where: {
        id_user: user.id
      }
    });

    return userUpdated;
  }
}
