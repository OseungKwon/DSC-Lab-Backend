import { AlertService } from '@app/alert/alert.strategy.interface';
import { ErrorCode, FilteredException } from '@infrastructure/types/type';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request } from 'express';

@Catch()
export class InternalExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly alertService: AlertService,
  ) {}

  async catch(exception: any, host: ArgumentsHost) {
    console.error(exception);
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    // Get error endpoint
    const endpoint = ctx.getRequest<Request>().originalUrl;
    // Get error response body
    const errorResponse =
      exception instanceof HttpException ? exception.getResponse() : undefined;
    // Get error response status code
    const statusCode =
      exception instanceof HttpException ? exception.getStatus() : 500;
    // Get stack trace
    const stackTrace = exception?.stack;

    let errorCodeInstance: ErrorCode;
    /**
     * If it's error with not handled
     *
     */
    if (!(errorResponse instanceof ErrorCode)) {
      // Set as default 500 Internal Server Error
      errorCodeInstance = new ErrorCode(
        5000,
        'Urgent : Unhandled Error. Please make issue to repository and progress hotfix ASAP.',
      );
    } else {
      errorCodeInstance = errorResponse;
    }

    const resBody = new FilteredException({
      endpoint,
      statusCode,
      errorCode: errorCodeInstance?.errorCode,
      message: errorCodeInstance?.description,
      stackTrace,
    });
    // Do not await this - Performance Issue
    this.alertService.sendError(resBody);

    httpAdapter.reply(ctx.getResponse(), resBody, statusCode);
  }
}
