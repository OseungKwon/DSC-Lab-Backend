import { SwaggerObject } from '@infrastructure/types/type';
import { AssistantMemberInterface } from '@app/members/assistant/member.interface';
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
import { Status } from '@prisma/client';
import { GetAssistantResponse } from './response/get-assistant.response';
import { GetUserResponse } from './response/get-user.response';
import { GetUserOverviewResponse } from './response';

export const AssistantMemberDocs: SwaggerObject<AssistantMemberInterface> = {
  Controller: applyDecorators(ApiTags('User - Assistant'), ApiBearerAuth()),
  getProfile: applyDecorators(
    ApiOperation({ summary: '프로필을 조회합니다.' }),
    ApiOkResponse({ type: GetAssistantResponse }),
  ),
  editProfile: applyDecorators(
    ApiOperation({ summary: '프로필을 변경합니다.' }),
    ApiOkResponse({ type: GetAssistantResponse }),
    ApiUnauthorizedResponse({ description: '패스워드가 일치하지 않습니다.' }),
  ),
  getUserListOverview: applyDecorators(
    ApiOperation({
      summary: '사용자의 승인 상태 목록을 불러옵니다.',
    }),
    ApiOkResponse({ type: GetUserOverviewResponse }),
  ),
  getUserList: applyDecorators(
    ApiOperation({
      summary: '사용자 목록을 불러옵니다.',
      description: '학생회는 권한이 없습니다.',
    }),
    ApiQuery({
      name: 'status',
      enum: Status,
      description: 'stauts는 not required 입니다.',
      example: Status.Approved,
      required: false,
    }),
    ApiQuery({
      name: 'page',
      description: 'page 값 입니다. 1부터 작성해주세요',
      example: 1,
    }),
    ApiQuery({
      name: 'size',
      description:
        'size 값 입니다. 한페이지에 몇개의 게시물이 표시되는지에 대한 값입니다.',
      example: 10,
    }),
    ApiOkResponse({ type: GetUserResponse, isArray: true }),
    ApiBadRequestResponse({
      description: '해당 페이지에서 보여줄 수 있는 컨텐츠가 없습니다.',
    }),
  ),
  getUserInfo: applyDecorators(
    ApiOperation({
      summary: '사용자 정보를 불러옵니다.',
      description: '학생회는 권한이 없습니다.',
    }),
    ApiOkResponse({ type: GetUserResponse }),
    ApiBadRequestResponse({ description: '사용자를 찾을 수 없습니다.' }),
  ),
  changeUserStatus: applyDecorators(
    ApiOperation({ summary: '사용자의 Status를 변경합니다.' }),
    ApiOkResponse({ type: GetUserResponse }),
    ApiBadRequestResponse({ description: '사용자를 찾을 수 없습니다.' }),
  ),
};
