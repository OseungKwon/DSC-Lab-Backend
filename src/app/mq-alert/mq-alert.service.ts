import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Logger } from '@hoplin/nestjs-logger';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ErrorCode } from '@infrastructure/types/type';
import { ERR_MSG_EXG, ERR_MSG_TPC } from './mq-alert.constant';

/**
 * https://dev.to/hmake98/create-nestjs-microservices-using-rabbitmq-part-1-441m
 *
 */
@Injectable()
export class MqAlertService {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    private readonly logger: Logger,
  ) {}

  public async reportUnexpectedErrorMessage(msg: ErrorCode) {
    if (!(msg instanceof ErrorCode)) {
      this.logger.error(
        `Wrong type of message - Expected : ErrorCode / Given : ${typeof msg}`,
      );
    } else {
      this.amqpConnection.publish<ErrorCode>(ERR_MSG_EXG, ERR_MSG_TPC, msg);
    }
  }
}
