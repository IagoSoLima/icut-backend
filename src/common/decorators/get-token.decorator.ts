import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { UserPayload } from '~/common/interfaces';

export const GetToken = createParamDecorator(
  (_, ctx: ExecutionContext): UserPayload => {
    const req = ctx.switchToHttp().getRequest();
    const token = req.headers.authorization.split(' ')[1];
    return token;
  }
);
