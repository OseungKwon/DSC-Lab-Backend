// Standard Packages
import { Module } from '@nestjs/common';

// Third-party Packages

// Custom Packages
import { AssistantAuthController } from './auth.controller';
import { AssistantAuthService } from './auth.service';
import { AssistantJwtStrategy } from './strategy/assistant-jwt.strategy';

@Module({
  controllers: [AssistantAuthController],
  providers: [AssistantAuthService, AssistantJwtStrategy],
})
export class AssistantModule {}
