// Standard Packages
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AssistantFormModule } from './assistant/form.module';
import { UserFormModule } from './user/form.module';

@Module({
  imports: [
    AssistantFormModule,
    RouterModule.register([
      {
        path: 'assistant',
        children: [
          {
            path: 'forms',
            module: AssistantFormModule,
          },
        ],
      },
      {
        path: 'user',
        children: [
          {
            path: 'forms',
            module: UserFormModule,
          },
        ],
      },
    ]),
  ],
})
export class FormModule {}
