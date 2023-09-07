import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configOptions } from './module-config/config.config';
import { LoggerModule } from '@hoplin/nestjs-logger';
import { UlidModule } from './app/ulid/ulid.module';
import { LoggerModuleConfig } from './module-config/logger.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './module-config/typeorm.config';
import { MemberModule } from './app/member/member.module';
import { AuthenticationModule } from './app/authentication/authentication.module';
import { AuthorizationModule } from './app/authorization/authorization.module';
import { AlertModule } from './app/alert/alert.module';

@Module({
  imports: [
    LoggerModule.forRoot(LoggerModuleConfig),
    ConfigModule.forRoot(configOptions),
    UlidModule,
    TypeOrmModule.forRootAsync(typeORMConfig),
    AlertModule.forRootAsync({
      imports: [ConfigModule],
      type: 'mail',
      useFactory: async (cfg: ConfigService) => {
        return {
          service: 'gmail',
          to: '',
          auth: {
            user: '',
            password: '',
          },
        };
      },
      inject: [ConfigService],
    }),
    MemberModule,
    AuthenticationModule,
    AuthorizationModule,
    AlertModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
