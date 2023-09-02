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
