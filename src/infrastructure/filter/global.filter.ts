import { ArgumentsHost, Catch } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import * as Sentry from '@sentry/node';

@Catch()
export class GlobalFilter extends ExceptionsHandler {
  catch(exception: any, host: ArgumentsHost): void {
    Sentry.captureException(exception);
    super.catch(exception, host);
  }
}
