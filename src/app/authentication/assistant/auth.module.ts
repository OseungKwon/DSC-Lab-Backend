import { Module } from '@nestjs/common';
import { AssistantAuthController } from './auth.controller';
import { AssistantAuthService } from './auth.service';
import { AssistantJwtStrategy } from './strategy/assistant-jwt.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AssistantAuthController],
  providers: [AssistantAuthService, AssistantJwtStrategy],
})
export class AssistantModule {}
