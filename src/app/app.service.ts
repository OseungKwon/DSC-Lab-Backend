import { Injectable } from '@nestjs/common';
import { MqAlertService } from './mq-alert/mq-alert.service';
import { ErrorCode } from '@infrastructure/types/type';

@Injectable()
export class AppService {
  constructor(private readonly mqa: MqAlertService) {}
  getHello(): string {
    this.mqa.reportUnexpectedErrorMessage(new ErrorCode(10000, 'hello'));
    return 'hi';
  }
}
