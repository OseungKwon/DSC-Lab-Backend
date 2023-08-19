import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule } from '@nestjs/swagger';
import swaggerConfig from '@infrastructure/swagger/swagger.config';
import { InternalExceptionFilter } from '@infrastructure/exception/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('v1');
  app.useGlobalFilters(new InternalExceptionFilter(app.get(HttpAdapterHost)));
  // Swagger document
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();
