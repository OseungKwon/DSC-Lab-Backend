import { ConfigModuleOptions } from '@nestjs/config';
import databaseConfig from 'src/config/config/database.config';
import paginationConfig from 'src/config/config/pagination.config';

/**
 * API MODE는 환경자체에서 설정해줄것
 *
 * Docker환경의 경우 Docker ENV로 설정해줄것
 */

export const configOptions: ConfigModuleOptions = {
  isGlobal: true,
  cache: true,
  envFilePath: `${__dirname}/../config/env/${
    process.env.API_MODE || 'dev'
  }.env`,
  load: [databaseConfig, paginationConfig],
};
