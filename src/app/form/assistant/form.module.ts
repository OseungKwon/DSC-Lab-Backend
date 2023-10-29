// Standard Packages
import { Module } from '@nestjs/common';

// Third-party Packages

// Custom Packages
import { AssistantFormController } from './form.controller';
import { AssistantFormService } from './form.service';
import { AwsS3Module } from '@s3/aws-s3';

@Module({
  imports: [AwsS3Module],
  controllers: [AssistantFormController],
  providers: [AssistantFormService],
})
export class AssistantFormModule {}
