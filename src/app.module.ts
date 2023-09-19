import { LoggerModule } from '@hoplin/nestjs-logger';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AlertModule } from './app/alert/alert.module';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { AuthenticationModule } from './app/authentication/authentication.module';
import { AuthorizationModule } from './app/authorization/authorization.module';
import { LmdbModule } from './app/lmdb/lmdb.module';
import { UlidModule } from './app/ulid/ulid.module';
import { configOptions } from './module-config/config.config';
import { LoggerModuleConfig } from './module-config/logger.config';
import { PrismaModule } from './app/prisma/prisma.module';
import { DevOnlyMiddleware } from '@app/middlewares';

@Module({
  imports: [
    LoggerModule.forRoot(LoggerModuleConfig),
    ConfigModule.forRoot(configOptions),
    UlidModule,
    LmdbModule,
    AlertModule.forRootAsync({
      imports: [ConfigModule],
      type: 'mail',
      useFactory: async (cfg: ConfigService) => {
        return {
          service: 'gmail',
          to: cfg.get<string>('EMAIL_TO'),
          auth: {
            user: cfg.get<string>('MAIL_ID'),
            password: cfg.get<string>('MAIL_PASSWORD'),
          },
        };
      },
      inject: [ConfigService],
    }),
    AuthenticationModule,
    AuthorizationModule,
    AlertModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  /** Controller in AppController is available only in dev mode */
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DevOnlyMiddleware).forRoutes(AppController);
  }
}
