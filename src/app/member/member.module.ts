import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity } from '@domain/member/member.entity';
import { UlidModule } from '@app/ulid/ulid.module';
import { MqAlertModule } from '@app/mq-alert/mq-alert.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MemberEntity]),
    UlidModule,
    MqAlertModule,
  ],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
