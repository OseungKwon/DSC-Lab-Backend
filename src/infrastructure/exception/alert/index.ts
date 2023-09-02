import { ErrorCode } from '@infrastructure/types/type';
import { InternalServerErrorException } from '@nestjs/common';

export const ALERT_EXCEPTION_MSG = {
  WebHookURLLost: new ErrorCode(1300, 'WEBHOOK_URL_LOST'),
};

//1300
export class WebHookURLLost extends InternalServerErrorException {
  constructor() {
    super(ALERT_EXCEPTION_MSG.WebHookURLLost);
  }
}
