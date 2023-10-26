// Standard Packages
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

// Third-party Packages
import { LoggerModule } from '@hoplin/nestjs-logger';
import { AwsS3Module } from '@s3/aws-s3';
import { redisStore } from 'cache-manager-redis-yet';
import type { RedisClientOptions } from 'redis';

// Custom Packages
import { AlertModule } from './app/alert/alert.module';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { AuthenticationModule } from './app/authentication/authentication.module';
import { AuthorizationModule } from './app/authorization/authorization.module';
import { configOptions } from './module-config/config.config';
import { LoggerModuleConfig } from './module-config/logger.config';
import { PrismaModule } from './app/prisma/prisma.module';
import { DevOnlyMiddleware } from '@app/middlewares';
import { MembersModule } from '@app/members/members.module';
import { TaskModule } from '@app/scheduler-task/task.module';
import { MailModule } from '@app/mail/mail.module';

@Module({
  imports: [
    LoggerModule.forRoot(LoggerModuleConfig),
    ConfigModule.forRoot(configOptions),
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      store: redisStore,
      url: process.env.REDIS_URL,
    }),
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
    MailModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (cfg: ConfigService) => {
        return {
          gmailID: cfg.get<string>('MAIL_ID'),
          gmailPW: cfg.get<string>('MAIL_PASSWORD'),
        };
      },
      inject: [ConfigService],
    }),
    AuthenticationModule,
    AuthorizationModule,
    AlertModule,
    PrismaModule,
    MembersModule,
    TaskModule,
    AwsS3Module,
    ScheduleModule.forRoot(),
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
