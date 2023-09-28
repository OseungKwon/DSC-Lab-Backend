import { AlertService } from '@app/alert/alert.strategy.interface';
import { InternalExceptionFilter } from '@infrastructure/exception/exception.filter';
import { SwaggerDefinition } from '@infrastructure/swagger';
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
  app.useGlobalFilters(
    new InternalExceptionFilter(app.get(HttpAdapterHost), alertService),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  // Swagger document
  const { config, options } = SwaggerDefinition();
  const document = SwaggerModule.createDocument(app, config.build());
  SwaggerModule.setup('docs', app, document, options);

  await app.listen(5500);
}
bootstrap();
