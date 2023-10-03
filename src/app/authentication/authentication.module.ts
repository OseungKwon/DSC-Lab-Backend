import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AssistantModule } from './assistant/auth.module';
import { MemberModule } from './member/auth.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    AssistantModule,
    MemberModule,
    RouterModule.register([
      {
        path: 'user',
        children: [
          {
            path: 'auth',
            module: MemberModule,
          },
        ],
      },
      {
        path: 'assistant',
        children: [
          {
            path: 'auth',
            module: AssistantModule,
          },
        ],
      },
    ]),
  ],
})
export class AuthenticationModule {}
