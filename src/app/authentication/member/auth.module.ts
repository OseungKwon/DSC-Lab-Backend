import { Module } from '@nestjs/common';
import { MemberController } from './auth.controller';
import { MemberService } from './auth.service';
import { UserJwtStrategy } from './strategy/user-jwt.strategy';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  controllers: [MemberController],
  providers: [MemberService, UserJwtStrategy],
})
export class MemberModule {}
