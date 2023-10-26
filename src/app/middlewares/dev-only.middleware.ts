// Standard Packages
import { GoneException, NestMiddleware } from '@nestjs/common';

// Third-party Packages
import { Request, Response, NextFunction } from 'express';

// Custom Packages

/** If endpoint is for development mode only */
export class DevOnlyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    /**If mode is not dev mode */
    if (process.env.MODE !== 'dev') {
      throw new GoneException('This endpoint is for development only');
    }
    next();
  }
}
