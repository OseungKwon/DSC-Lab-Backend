import { ApiProperty } from '@nestjs/swagger';

export type SwaggerTag = Record<string, string>;

export type AvailableStrategy = 'discord' | 'slack';

export interface AlertOption {
  strategy: AvailableStrategy;
  webhookURL: string;
}

export interface AlertOptionConfig {
  strategy: AvailableStrategy;
  configKey: string;
}

export type AlertForRootOption = AlertOption;

export type AlertForRootConfigOptions = AlertOptionConfig;

export class ErrorCode {
  errorCode: number;
  description: string;

  constructor(code: number, desc: any) {
    this.errorCode = code;
    this.description = desc;
  }
}

export class FilteredException {
  @ApiProperty()
  endpoint: string;
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  errorCode: number;
  @ApiProperty()
  message: any;

  constructor(data: FilteredException) {
    Object.assign(this, data);
  }
}

export type ErrorObject = {
  [P: string]: ErrorCode;
};
