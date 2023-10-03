import { SwaggerObject } from '@infrastructure/types/type';
import { UserMemberInterface } from './member.interface';
import { UseGuards, applyDecorators } from '@nestjs/common';
import { UserJwtStrategy } from '@app/authentication/member/strategy/user-jwt.strategy';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

export const UserMemberDocs: SwaggerObject<UserMemberInterface> = {
  Controller: applyDecorators(ApiTags('User - Member'), ApiBearerAuth()),
  getProfile: applyDecorators(
    ApiOperation({ description: '사용자의 프로필을 조회합니다.' }),
  ),
  editProfile: applyDecorators(
    ApiOperation({
      description:
        '사용자의 정보를 조회합니다. 수정하지 않는 필드는 기존 값을 보내주어야 합니다.',
    }),
  ),
  serviceWithdraw: applyDecorators(
    ApiOperation({
      description: '사용자 회원 탈퇴입니다.',
    }),
  ),
};
