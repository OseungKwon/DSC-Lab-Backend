import { ErrorCode } from '@infrastructure/types/type';
import { InternalServerErrorException } from '@nestjs/common';

export const ALERT_EXCEPTION_MSG = {
  WebHookURLLost: new ErrorCode(1300, 'WEBHOOK_URL_LOST'),
  EmailInformationLost: new ErrorCode(1301, 'EMAIL_INFO_LOST'),
};

//1300
export class WebHookURLLost extends InternalServerErrorException {
  constructor() {
    super(ALERT_EXCEPTION_MSG.WebHookURLLost);
  }
}

export class EmailInformationLost extends InternalServerErrorException {
  constructor() {
    super(ALERT_EXCEPTION_MSG.EmailInformationLost);
  }
}
