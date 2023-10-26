// Standard Packages
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RouterModule } from '@nestjs/core';

// Third-party Packages

// Custom Packages
import { AssistantModule } from './assistant/auth.module';
import { MemberModule } from './member/auth.module';

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
