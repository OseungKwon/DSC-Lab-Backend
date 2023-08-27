import { validateTypeArray } from '@app/member/validate-type.filter';
import { ErrorCode, ErrorObject } from '@infrastructure/types/type';
import { BadRequestException, HttpException } from '@nestjs/common';

export const MEMBER_EXCEPTION_MSG = {
  MemberNotFound: new ErrorCode(1000, 'MEMBER_NOT_FOUND'),
  EmailUnavailable: new ErrorCode(1001, 'EMAIL_UNAVAILABLE'),
  NicknameUnavailable: new ErrorCode(1002, 'NICKNAME_UNAVAILABLE'),
  UnsupportedValidationType: new ErrorCode(
    1003,
    `VALIDATION_TYPE_SHOULD_BE_ONE_OF_'${validateTypeArray.join(', ')}'`,
  ),
};

// Code : 1000
export class MemberNotFound extends BadRequestException {
  constructor() {
    super(MEMBER_EXCEPTION_MSG.MemberNotFound);
  }
}

// 1001
export class EmailUnavailable extends BadRequestException {
  constructor() {
    super(MEMBER_EXCEPTION_MSG.EmailUnavailable);
  }
}

// 1002
export class NicknameUnavailable extends BadRequestException {
  constructor() {
    super(MEMBER_EXCEPTION_MSG.NicknameUnavailable);
  }
}

// 1003
export class UnsupportedValidationType extends BadRequestException {
  constructor() {
    super(MEMBER_EXCEPTION_MSG.UnsupportedValidationType);
  }
}
