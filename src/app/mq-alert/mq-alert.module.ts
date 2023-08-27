import { Module } from '@nestjs/common';
import { MqAlertService } from './mq-alert.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MqAlertController } from './mq-alert.controller';
import * as amqp from 'amqplib';
import { Logger, LoggerModule } from '@hoplin/nestjs-logger';
import { RabbitMQConfig, RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ERR_MSG_EXG } from './mq-alert.constant';

@Module({
  imports: [
    LoggerModule.forFeature(),
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (cfg: ConfigService) => {
        return {
          uri: `amqp://${cfg.get<string>('MQ1_USER')}:${cfg.get<string>(
            'MQ1_PASSWORD',
          )}@${cfg.get<string>('MQ1_URL')}:${cfg.get<string>('MQ1_PORT')}`,
          exchanges: [
            {
              type: 'topic',
              name: ERR_MSG_EXG,
              options: {
                durable: true,
              },
            },
          ],
          channels: {
            default_channel: {
              prefetchCount: 2,
              default: true,
            },
          },
        };
      },
    }),
  ],
  providers: [MqAlertService],
  exports: [MqAlertService],
  controllers: [MqAlertController],
})
export class MqAlertModule {}
