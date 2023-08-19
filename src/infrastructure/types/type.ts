import { ApiProperty } from '@nestjs/swagger';

export type SwaggerTag = Record<string, string>;

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
  statusCode: number;
  @ApiProperty()
  errorCode: number;
  @ApiProperty()
  message: string;

  constructor(data: FilteredException) {
    Object.assign(this, data);
  }
}

export type ErrorObject = {
  [P: string]: ErrorCode;
};
