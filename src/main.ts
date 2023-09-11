import { AlertService } from '@app/alert/alert.strategy.interface';
import { InternalExceptionFilter } from '@infrastructure/exception/exception.filter';
import swaggerConfig from '@infrastructure/swagger/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  // Nest.js Http REST Service
  const app = await NestFactory.create(AppModule);
  const alertService = app.get<AlertService>(AlertService);
  // Nest Application config
  app.enableCors();
  app.setGlobalPrefix('v1');
  app.useGlobalFilters(
    new InternalExceptionFilter(app.get(HttpAdapterHost), alertService),
  );
  app.useGlobalPipes(new ValidationPipe());
  // Swagger document
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
