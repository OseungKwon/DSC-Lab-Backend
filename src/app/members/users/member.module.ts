import { Module } from '@nestjs/common';
import { UserMemberController } from './member.controller';
import { UserMemberService } from './member.service';
import { AwsS3Module } from '@s3/aws-s3';

@Module({
  imports: [AwsS3Module],
  controllers: [UserMemberController],
  providers: [UserMemberService],
})
export class UserMemberModule {}
