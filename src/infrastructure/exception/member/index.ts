import { ErrorCode, ErrorObject } from '@infrastructure/types/type';
import { BadRequestException, HttpException } from '@nestjs/common';

export const MEMBER_EXCEPTION_MSG: ErrorObject = {
  MemberNotFound: new ErrorCode(1000, 'MEMBER_NOT_FOUND'),
};

// Code : 1000
export class MemberNotFound extends BadRequestException {
  constructor() {
    super(MEMBER_EXCEPTION_MSG.MemberNotFound);
  }
}

export class TestExcept extends BadRequestException {
  constructor() {
    super('Testing');
  }
}
