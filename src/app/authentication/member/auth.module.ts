import { Module } from '@nestjs/common';
import { MemberController } from './auth.controller';
import { MemberService } from './auth.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [MemberController],
  providers: [MemberService],
  exports: [],
})
export class MemberModule {}
