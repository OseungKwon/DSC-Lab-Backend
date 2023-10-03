import { Module } from '@nestjs/common';
import { AssistantMemberController } from '@app/members/assistant/member.controller';
import { AssistantMemberService } from '@app/members/assistant/member.service';

@Module({
  controllers: [AssistantMemberController],
  providers: [AssistantMemberService],
})
export class AssistantMemberModule {}
