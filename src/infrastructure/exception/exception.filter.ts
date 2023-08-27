import { MqAlertService } from '@app/mq-alert/mq-alert.service';
import { ErrorCode, FilteredException } from '@infrastructure/types/type';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpExceptionBody,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { QueryFailedError, TypeORMError } from 'typeorm';

@Catch()
export class InternalExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly mqAlert: MqAlertService,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    ctx.getResponse<Response>().url;
    // Get error response body
    const errorResponse =
      exception instanceof HttpException ? exception.getResponse() : undefined;
    // Get error response status code
    const statusCode =
      exception instanceof HttpException ? exception.getStatus() : 500;

    let errorCodeInstance: ErrorCode;
    /**
     * If it's error with not handled
     *
     */
    if (!(errorResponse instanceof ErrorCode)) {
      errorCodeInstance = new ErrorCode(5000, exception);
      this.mqAlert.reportUnexpectedErrorMessage(errorCodeInstance);
    }
    const resBody = new FilteredException({
      statusCode,
      errorCode: errorCodeInstance?.errorCode,
      message: errorCodeInstance?.description,
    });

    httpAdapter.reply(ctx.getResponse(), resBody, statusCode);
  }
}
