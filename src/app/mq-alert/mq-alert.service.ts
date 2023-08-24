import { Inject, Injectable } from '@nestjs/common';
import { MQALERT } from './mq-alert.constant';
import * as amqp from 'amqplib';
import { ConfigType } from '@nestjs/config';
import { Logger } from '@hoplin/nestjs-logger';

/**
 * https://dev.to/hmake98/create-nestjs-microservices-using-rabbitmq-part-1-441m
 *
 */
@Injectable()
export class MqAlertService {
  private connection: amqp.Connection;
  constructor(
    @Inject(MQALERT.MQ1_CONNECTION)
    private readonly mq1Connection: amqp.Connection,
    private readonly logger: Logger,
  ) {}
}
