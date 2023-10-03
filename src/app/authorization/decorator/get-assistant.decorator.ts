import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Assistant } from '@prisma/client';

export const GetAssistant = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request?.user;
    return key ? user[key] : user;
  },
);
