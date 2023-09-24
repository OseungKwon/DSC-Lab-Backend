import { ConfigModuleOptions } from '@nestjs/config';

/**
 * API MODE는 환경자체에서 설정해줄것
 *
 * Docker환경의 경우 Docker ENV로 설정해줄것
 */

export const configOptions: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: `${process.env.MODE === 'test' ? 'test.env' : '.env'}`,
  cache: true,
};
