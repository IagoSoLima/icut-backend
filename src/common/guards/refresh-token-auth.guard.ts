import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshTokenAuthGuard extends AuthGuard('refresh-token') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const refreshToken = context.switchToHttp().getRequest().body[
      'refresh_token'
    ];
    const hasRefreshToken = refreshToken !== undefined;

    if (hasRefreshToken) {
      context.switchToHttp().getRequest().headers['authorization'] =
        'Bearer ' + refreshToken;
    }

    return super.canActivate(context);
  }
}
