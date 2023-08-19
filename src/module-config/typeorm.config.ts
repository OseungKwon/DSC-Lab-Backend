import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => {
    return {
      type: 'mysql',
      host: config.get<string>('DATABASE_HOST'),
      port: +config.get<string>('DATABASE_PORT'),
      username: config.get<string>('DATABASE_USER'),
      password: config.get<string>('DATABASE_PASSWORD'),
      database: config.get<string>('DATABASE_DEFAULT'),
      entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
      synchronize: process.env.API_MODE === 'dev',
      logging: true,
    };
  },
};
