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
            path: 'form',
            module: AssistantFormModule,
          },
        ],
      },
      {
        path: 'user',
        children: [
          {
            path: 'form',
            module: UserFormModule,
          },
        ],
      },
    ]),
  ],
})
export class FormModule {}
