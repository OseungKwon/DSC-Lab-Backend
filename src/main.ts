import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule } from '@nestjs/swagger';
import swaggerConfig from '@infrastructure/swagger/swagger.config';
import { InternalExceptionFilter } from '@infrastructure/exception/exception.filter';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Nest.js Http REST Service
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  // Nest.js Microservice - Rabbit MQ
  const microserviceRMQ = app.connectMicroservice<MicroserviceOptions>({
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
      noAck: false,
      prefetchCount: 1,
      queue: configService.get<string>('MQ1_QUEUE'),
      queueOptions: {
        durable: false,
      },
    },
  });
  // Nest Application config
  app.enableCors();
  app.setGlobalPrefix('v1');
  app.useGlobalFilters(new InternalExceptionFilter(app.get(HttpAdapterHost)));
  app.useGlobalPipes(new ValidationPipe());
  // Swagger document
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
