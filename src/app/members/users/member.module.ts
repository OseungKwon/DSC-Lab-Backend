import { Module } from '@nestjs/common';
import { UserMemberController } from './member.controller';
import { UserJwtStrategy } from '@app/authentication/member/strategy/user-jwt.strategy';
import { UserMemberService } from './member.service';

@Module({
  controllers: [UserMemberController],
  providers: [UserMemberService],
})
export class UserMemberModule {}
