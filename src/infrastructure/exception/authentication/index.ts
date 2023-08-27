import { ErrorCode } from '@infrastructure/types/type';
import { UnauthorizedException } from '@nestjs/common';

export const AUTHENTICATION_EXCEPTION_MSG = {
  PasswordUnmatched: new ErrorCode(1100, 'PASSWORD_UNMATCHED'),
};

// 1100
export class PasswordUnmatched extends UnauthorizedException {
  constructor() {
    super(AUTHENTICATION_EXCEPTION_MSG.PasswordUnmatched);
  }
}
