import { Module } from '@nestjs/common';
import { DormantAccountHandlerService } from './dormant-account-handler.service';

@Module({
  providers: [DormantAccountHandlerService],
  exports: [DormantAccountHandlerService],
})
export class TaskModule {}
