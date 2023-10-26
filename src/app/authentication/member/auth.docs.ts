// Standard Packages
import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

// Third-party Packages

// Custom Packages
import { CommonResponseDto } from '@app/common.response.dto';
import { SwaggerObject } from '@infrastructure/types/type';
import { MemberAuthInterface } from './auth.interface';
import { AuthResponse } from './response/auth.response';
import { CredentialResponse } from './response/credential.response';
import { UserUniqueCredential } from './type';

export const MemberAuthDocs: SwaggerObject<MemberAuthInterface> = {
  Controller: applyDecorators(ApiTags('Auth - Member')),
  signup: applyDecorators(
    ApiOperation({ summary: '회원가입을 진행합니다.' }),
    ApiOkResponse({ type: AuthResponse }),
    ApiBadRequestResponse({ description: '중복된 Credential' }),
  ),
  singin: applyDecorators(
    ApiOperation({ summary: '로그인을 진행합니다.' }),
    ApiOkResponse({ type: AuthResponse }),
    ApiBadRequestResponse({ description: '존재하지 않는 회원' }),
    ApiUnauthorizedResponse({ description: '잘못된 비밀번호' }),
  ),
  credential: applyDecorators(
    ApiOperation({
      summary:
        "Unique 값에 대한 값을 체크합니다. 'type' query에는 'nickname', 'email', 'groupId' 중 하나가 와야합니다.",
    }),
    ApiQuery({
      name: 'type',
      enum: UserUniqueCredential,
    }),
    ApiQuery({
      name: 'value',
      type: 'string',
    }),
    ApiOkResponse({ type: CredentialResponse }),
    ApiBadRequestResponse({ description: '지원하지 않는 Credential Type' }),
  ),
  confirmEmail: applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: '사용자 이메일 인증을 위한 이메일을 전송합니다.',
    }),
    ApiOkResponse({ type: CommonResponseDto }),
    ApiBadRequestResponse({
      description: [
        'ID에 해당하는 사용자가 없습니다.',
        '사용자가 이미 인증을 완료했습니다.',
      ].join(','),
    }),
  ),
  confirmEmailCode: applyDecorators(
    ApiOperation({ summary: '이메일 코드를 인증합니다.' }),
  ),
};
