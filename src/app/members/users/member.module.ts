// Standard Packages
import { Module } from '@nestjs/common';
// Third-party Packages

// Custom Packages
import { AwsS3Module } from '@s3/aws-s3';
import { UserMemberController } from './member.controller';
import { UserMemberService } from './member.service';

@Module({
  imports: [AwsS3Module],
  controllers: [UserMemberController],
  providers: [UserMemberService],
})
export class UserMemberModule {}
