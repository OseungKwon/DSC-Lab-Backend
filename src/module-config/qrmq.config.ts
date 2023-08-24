import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export default (configService: ConfigService): MicroserviceOptions => {
  return {
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${configService.get<string>(
          'MQ1_USER',
        )}:${configService.get<string>(
          'MQ1_PASSWORD',
        )}@${configService.get<string>('MQ1_URL')}:${configService.get<string>(
          'MQ1_PORT',
        )}`,
      ],
      queue: configService.get<string>('MQ1_QUEUE'),
      queueOptions: {
        durable: false,
      },
    },
  };
};
