import { loggerForRootParam } from '@hoplin/nestjs-logger/dist/types';

export const LoggerModuleConfig: loggerForRootParam = {
  applicationName: 'Hongik DSC Lab backend',
  logfileDirectory: `${__dirname}/../`,
  saveAsFile: true,
  levelNTimestamp: {
    logLevels: ['debug'],
    timestamp: true,
  },
};
