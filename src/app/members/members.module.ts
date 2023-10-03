import { Module } from '@nestjs/common';
import { AssistantMemberModule } from './assistant/member.module';
import { UserMemberModule } from './users/member.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    AssistantMemberModule,
    UserMemberModule,
    RouterModule.register([
      {
        path: 'user',
        children: [
          {
            path: 'member',
            module: UserMemberModule,
          },
        ],
      },
      {
        path: 'assistant',
        children: [
          {
            path: 'member',
            module: AssistantMemberModule,
          },
        ],
      },
    ]),
  ],
})
export class MembersModule {}
