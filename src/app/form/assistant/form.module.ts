// Standard Packages
import { Module } from '@nestjs/common';

// Third-party Packages

// Custom Packages
import { AssistantFormController } from './form.controller';
import { AssistantFormService } from './form.service';

@Module({
  controllers: [AssistantFormController],
  providers: [AssistantFormService],
})
export class AssistantFormModule {}
