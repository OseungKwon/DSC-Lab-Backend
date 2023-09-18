import { SwaggerObject } from '@infrastructure/types/type';
import { MemberAuthInterface } from './auth.interface';
import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthResponse } from './response/auth.response';

export const MemberAuthDocs: SwaggerObject<MemberAuthInterface> = {
  Controller: applyDecorators(ApiTags('Auth - Member')),
  signup: applyDecorators(ApiOkResponse({ type: AuthResponse })),
  singin: applyDecorators(ApiOkResponse({ type: AuthResponse })),
};
