import { Module } from '@nestjs/common';
import { AssistantAuthController } from './auth.controller';
import { AssistantAuthService } from './auth.service';

@Module({
  controllers: [AssistantAuthController],
  providers: [AssistantAuthService],
})
export class AssistantModule {}
