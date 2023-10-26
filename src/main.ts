// Standard Packages
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

// Third-party Packages
import * as Sentry from '@sentry/node';

// Custom Packages
import { SwaggerDefinition } from '@infrastructure/swagger';
import { AppModule } from './app.module';
import { GlobalFilter } from '@infrastructure/filter';

async function bootstrap() {
  // Nest.js Http REST Service
  const app = await NestFactory.create(AppModule);
  const adapter = app.getHttpAdapter();

  // Intiate Sentry
  Sentry.init({
    environment: process.env.ENVIRONMNET,
    dsn: process.env.SENTRY_DNS,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.Express({ app: adapter.getInstance() }),
    ],
  });

  // Nest Application config
  app.enableCors();
  // app.useGlobalFilters(
  //   new InternalExceptionFilter(app.get(HttpAdapterHost), alertService),
  // );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Apply Global Filter
  app.useGlobalFilters(new GlobalFilter(adapter));

  // Swagger document
  const { config, options } = SwaggerDefinition();
  const document = SwaggerModule.createDocument(app, config.build());
  SwaggerModule.setup('docs', app, document, options);

  await app.listen(3000);
}
bootstrap();
