// Standard Packages
import { GoneException, NestMiddleware } from '@nestjs/common';

// Third-party Packages
import { Request, Response, NextFunction } from 'express';

// Custom Packages

/** If API is deprecated */
export class DeprecatedMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    throw new GoneException(
      'This api has been deprecated and no longer maintained',
    );
  }
}
