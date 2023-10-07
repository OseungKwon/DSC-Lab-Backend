import { SwaggerObject } from '@infrastructure/types/type';
import { FileErrorDocs } from '@infrastructure/util/multer-option.factory';
import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserMemberInterface } from './member.interface';
import { GetUserResponse } from './response/get-user.response';

export const UserMemberDocs: SwaggerObject<UserMemberInterface> = {
  Controller: applyDecorators(ApiTags('User - Member'), ApiBearerAuth()),
  getProfile: applyDecorators(
    ApiOperation({ description: '사용자의 프로필을 조회합니다.' }),
    ApiOkResponse({ type: GetUserResponse }),
  ),
  editProfile: applyDecorators(
    ApiOperation({
      description:
        '사용자의 정보를 조회합니다. 수정하지 않는 필드는 기존 값을 보내주어야 합니다.',
    }),
    ApiConsumes('multipart/form-data'),
    ApiOkResponse({ type: GetUserResponse }),
    ...FileErrorDocs(),
  ),
  serviceWithdraw: applyDecorators(
    ApiOperation({
      description: '사용자 회원 탈퇴입니다.',
    }),
    ApiOkResponse({ type: GetUserResponse }),
  ),
};
