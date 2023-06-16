import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppLogger } from '~/app.logger';
import { JWT_REFRESH_EXPIRES_IN, JWT_SECRET_EXPIRES_IN } from '~/app.vars';
import { UserPayload } from '~/common/interfaces';
import { PasswordEncrypty } from '~/common/utils';
import { UsersRepository } from '~/users/users.repository';
import { RefreshTokenResponse, SignInParams, SignInResponse } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
    private readonly logger: AppLogger
  ) {
    this.logger.setContext(AuthService.name);
  }

  async validateUser(params: SignInParams): Promise<UserPayload | null> {
    const { email, password } = params;
    const user = await this.usersRepository.getByEmail(email);

    if (user && PasswordEncrypty.passwordCompare(password, user.ds_password)) {
      const result: UserPayload = {
        id: user.id_user,
        email: user.ds_email,
        userName: user.ds_username,
        name: user.ds_user_name,
        lastName: user.ds_user_lastname,
        avatarUrl: user.avatar_image,
        active: user.active,
        createdAt: user.created_at,
        updatedAt: user.update_at,
        deletedAt: user.deleted_at,
        userType: user.fk_id_type_user
      };
      if (user.establishment && user.establishment.length > 0)
        result.idEstablishment = user.establishment[0].id_establishment;
      return result;
    }
    return null;
  }

  async login(user: UserPayload): Promise<SignInResponse> {
    const payload: UserPayload = {
      ...user
    };

    return {
      ...payload,
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: JWT_SECRET_EXPIRES_IN
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: JWT_REFRESH_EXPIRES_IN
      }),
      expiresIn: JWT_SECRET_EXPIRES_IN
    };
  }

  async refreshToken(user: UserPayload): Promise<RefreshTokenResponse> {
    const payload = await this.login(user as UserPayload);
    return {
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
      expiresIn: payload.expiresIn
    };
  }
}
