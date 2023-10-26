// Standard Packages
import { Module } from '@nestjs/common';

// Third-party Packages

// Custom Packages

import { AssistantMemberService } from '@app/members/assistant/member.service';
import { AssistantMemberController } from './member.controller';
import { AwsS3Module } from '@s3/aws-s3';

@Module({
  imports: [AwsS3Module],
  controllers: [AssistantMemberController],
  providers: [AssistantMemberService],
})
export class AssistantMemberModule {}
