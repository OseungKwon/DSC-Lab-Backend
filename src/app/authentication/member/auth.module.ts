// Standard Packages
import { Module } from '@nestjs/common';

// Third-party Packages

// Custom Packages
import { MemberController } from './auth.controller';
import { MemberService } from './auth.service';
import { UserJwtStrategy } from './strategy/user-jwt.strategy';

@Module({
  controllers: [MemberController],
  providers: [MemberService, UserJwtStrategy],
})
export class MemberModule {}
