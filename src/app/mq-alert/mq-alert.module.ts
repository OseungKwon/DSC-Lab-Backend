import { Module } from '@nestjs/common';
import { MqAlertService } from './mq-alert.service';
import {
  ClientProvider,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MqAlertController } from './mq-alert.controller';
import * as amqp from 'amqplib';
import { MQALERT, amqpConnectionBuilderFactory } from './mq-alert.constant';
import { Logger, LoggerModule } from '@hoplin/nestjs-logger';

@Module({
  imports: [LoggerModule.forFeature()],
  providers: [
    MqAlertService,
    {
      // Inject provider as async factory
      provide: MQALERT.MQ1_CONNECTION,
      useFactory: async (
        config: ConfigService,
        logger: Logger,
      ): Promise<amqp.Connection> => {
        const rmqConnectionURL = `amqp://${config.get<string>(
          'MQ1_USER',
        )}:${config.get<string>('MQ1_PASSWORD')}@${config.get<string>(
          'MQ1_URL',
        )}:${config.get<string>('MQ1_PORT')}`;
        const connection = await amqpConnectionBuilderFactory(rmqConnectionURL);
        connection.on('error', (err) => {
          logger.error(err);
        });
        return connection;
      },
      inject: [ConfigService, Logger],
    },
  ],
  exports: [MqAlertService],
  controllers: [MqAlertController],
})
export class MqAlertModule {}
