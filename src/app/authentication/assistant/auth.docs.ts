// Standard Packages
import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
// Third-party Packages

// Custom Packages
import { SwaggerObject } from '@infrastructure/types/type';
import { AuthResponse } from '../member/response/auth.response';
import { CredentialResponse } from '../member/response/credential.response';
import { AssistantAuthInterface } from './auth.interface';
import { AssistantUniqueCredential } from './type';

export const AsssistantAuthDocs: SwaggerObject<AssistantAuthInterface> = {
  Controller: applyDecorators(ApiTags('Auth - Assistant')),
  signup: applyDecorators(
    ApiOperation({ summary: '회원가입을 진행합니다.' }),
    ApiOkResponse({ type: AuthResponse }),
    ApiBadRequestResponse({ description: '중복된 Credential' }),
  ),
  signin: applyDecorators(
    ApiOperation({ summary: '로그인을 진행합니다.' }),
    ApiOkResponse({ type: AuthResponse }),
    ApiBadRequestResponse({ description: '존재하지 않는 회원' }),
    ApiUnauthorizedResponse({ description: '잘못된 비밀번호' }),
  ),
  credential: applyDecorators(
    ApiOperation({
      summary:
        "Unique 값에 대한 값을 체크합니다. 'type' query에는 'email'이 와야합니다.",
    }),
    ApiQuery({
      name: 'type',
      enum: AssistantUniqueCredential,
    }),
    ApiQuery({
      name: 'value',
      type: 'string',
    }),
    ApiOkResponse({ type: CredentialResponse }),
    ApiBadRequestResponse({ description: '지원하지 않는 Credential Type' }),
  ),
};
