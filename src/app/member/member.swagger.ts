import { CommonResponseDto } from '@app/common.response.dto';
import { MemberEntity } from '@domain/member/member.entity';
import { MEMBER_EXCEPTION_MSG } from '@infrastructure/exception/member';
import { FilteredException } from '@infrastructure/types/type';
import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { validateTypeArray } from './filter/validate-type.filter';
import { AUTHENTICATION_EXCEPTION_MSG } from '@infrastructure/exception/authentication';

export class MemberDocs {
  public static getAll() {
    return applyDecorators(
      ApiOperation({
        summary: '모든 회원 정보를 가져옵니다.',
        description: 'Pagination의 기본값은 page : 0, size : 10 입니다',
      }),
      ApiQuery({
        name: 'page',
        required: false,
        description: '불러올 페이지',
      }),
      ApiQuery({
        name: 'size',
        required: false,
        description: '불러올 게시물 갯수',
      }),
      ApiOkResponse({
        type: MemberEntity,
        isArray: true,
      }),
    );
  }

  public static getById() {
    return applyDecorators(
      ApiOperation({
        summary: 'id를 통해 회원 정보를 가져옵니다',
      }),
      ApiOkResponse({
        type: MemberEntity,
      }),
      ApiBadRequestResponse({
        type: FilteredException,
        description: [MEMBER_EXCEPTION_MSG.MemberNotFound.description].join(
          ', ',
        ),
      }),
    );
  }

  public static isAvailableValue() {
    return applyDecorators(
      ApiOperation({
        summary:
          '해당 값이 사용가능한 값인지 확인합니다. Unique Value에 대한 체크입니다.',
      }),
      ApiOkResponse({
        type: CommonResponseDto,
      }),
      ApiParam({
        name: 'type',
        required: true,
        description: `${validateTypeArray.join(', ')} 중 하나여야 합니다.`,
      }),
    );
  }

  public static createMember() {
    return applyDecorators(
      ApiOperation({
        summary: '회원가입을 진행합니다.',
      }),
      ApiOkResponse({
        type: MemberEntity,
      }),
      ApiBadRequestResponse({
        type: FilteredException,
        description: [
          MEMBER_EXCEPTION_MSG.EmailUnavailable.description,
          MEMBER_EXCEPTION_MSG.NicknameUnavailable.description,
        ].join(','),
      }),
    );
  }

  public static updateMember() {
    return applyDecorators(
      ApiOperation({
        summary: '회원정보를 수정합니다',
      }),
      ApiOkResponse({
        type: MemberEntity,
      }),
      ApiBadRequestResponse({
        type: FilteredException,
        description: [
          MEMBER_EXCEPTION_MSG.NicknameUnavailable.description,
          MEMBER_EXCEPTION_MSG.MemberNotFound.description,
        ].join(', '),
      }),
      ApiUnauthorizedResponse({
        type: FilteredException,
        description: [
          AUTHENTICATION_EXCEPTION_MSG.PasswordUnmatched.description,
        ].join(', '),
      }),
    );
  }

  public static withdrawMember() {
    return applyDecorators(
      ApiOperation({
        summary: '회원탈퇴를 진행합니다',
      }),
      ApiOkResponse({
        type: CommonResponseDto,
      }),
      ApiBadRequestResponse({
        type: FilteredException,
        description: [MEMBER_EXCEPTION_MSG.MemberNotFound.description].join(
          ', ',
        ),
      }),
      ApiUnauthorizedResponse({
        type: FilteredException,
        description: [
          AUTHENTICATION_EXCEPTION_MSG.PasswordUnmatched.description,
        ].join(', '),
      }),
    );
  }
}
