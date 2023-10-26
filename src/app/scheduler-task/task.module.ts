// Standard Packages
import { Module } from '@nestjs/common';

// Third-party Packages

// Custom Packages
import { DormantAccountHandlerService } from './dormant-account-handler.service';

@Module({
  providers: [DormantAccountHandlerService],
  exports: [DormantAccountHandlerService],
})
export class TaskModule {}
