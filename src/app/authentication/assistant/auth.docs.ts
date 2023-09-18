import { SwaggerObject } from '@infrastructure/types/type';
import { AssistantAuthInterface } from './auth.interface';
import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthResponse } from '../member/response/auth.response';

export const AsssistantAuthDocs: SwaggerObject<AssistantAuthInterface> = {
  Controller: applyDecorators(ApiTags('Auth - Assistant')),
  signup: applyDecorators(ApiOkResponse({ type: AuthResponse })),
  signin: applyDecorators(ApiOkResponse({ type: AuthResponse })),
};
