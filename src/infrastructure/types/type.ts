import { ApiProperty } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export type SwaggerTag = Record<string, string>;

export type JwtPayload = {
  id: string;
  email: string;
};

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

  @ApiProperty()
  stackTrace?: string;

  constructor(data: FilteredException) {
    Object.assign(this, data);
  }
}

export type ErrorObject = {
  [P: string]: ErrorCode;
};

export type SwaggerObject<
  T extends object,
  K = ReturnType<typeof applyDecorators>,
> = {
  [k in keyof (T & {
    Controller?: K;
  })]: K;
};

export type CommonReturnType = Promise<ReturnType<any>> | ReturnType<any>;
