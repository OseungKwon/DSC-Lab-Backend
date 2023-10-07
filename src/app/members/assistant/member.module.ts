import { Module } from '@nestjs/common';

import { AssistantMemberService } from '@app/members/assistant/member.service';
import { AssistantMemberController } from './member.controller';

@Module({
  controllers: [AssistantMemberController],
  providers: [AssistantMemberService],
})
export class AssistantMemberModule {}
