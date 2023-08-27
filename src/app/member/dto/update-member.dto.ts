import { MemberEntity } from '@domain/member/member.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

/**
 * IsOptional필드의 경우, 빈값 (undefined, null, "")이 아닌 필드를 넣지 말도록 wiki에 적용
 */

export class UpdateMemberDto implements Partial<MemberEntity> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  nickname: string;

  @ApiProperty()
  @IsOptional()
  @Matches('/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/')
  phonenumber: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  changedPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  constructor(data: UpdateMemberDto) {
    Object.assign(this, data);
  }
}
