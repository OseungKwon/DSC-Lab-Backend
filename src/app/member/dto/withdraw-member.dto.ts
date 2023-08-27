import { MemberEntity } from '@domain/member/member.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class WithdrawMemberDto implements Partial<MemberEntity> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  constructor(data: WithdrawMemberDto) {
    Object.assign(this, data);
  }
}
