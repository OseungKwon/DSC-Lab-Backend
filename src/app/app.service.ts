// Standard Packages
import { Injectable } from '@nestjs/common';

// Third-party Packages

// Custom Packages

@Injectable()
export class AppService {
  getHello(): string {
    return 'hi';
  }
}
