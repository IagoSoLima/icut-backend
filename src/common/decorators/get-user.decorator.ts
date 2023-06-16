import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { UserPayload } from '~/common/interfaces';

export const GetUser = createParamDecorator(
  (_, ctx: ExecutionContext): UserPayload => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  }
);
