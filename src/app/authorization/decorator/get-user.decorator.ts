// Standard Packages
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

// Third-party Packages
import { Request } from 'express';

// Custom Packages

export const GetUser = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request?.user;

    return key ? user[key] : user;
  },
);
