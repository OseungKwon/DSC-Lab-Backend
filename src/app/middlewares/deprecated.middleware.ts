import { GoneException, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/** If API is deprecated */
export class DeprecatedMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    throw new GoneException(
      'This api has been deprecated and no longer maintained',
    );
  }
}
