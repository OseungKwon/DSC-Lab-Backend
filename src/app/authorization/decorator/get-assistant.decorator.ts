// Standard Packages
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Third-party Packages
import { Request } from 'express';

// Custom Packages

export const GetAssistant = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request?.user;
    return key ? user[key] : user;
  },
);
