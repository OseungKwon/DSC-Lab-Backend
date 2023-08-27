import { MemberEntity } from '@domain/member/member.entity';
import { Approved, Role, Sex } from '@domain/member/member.enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

/**
 * IsOptional필드의 경우, 빈값 (undefined, null, "")이 아닌 필드를 넣지 말도록 wiki에 적용
 */

export class CreateMemberDto implements Partial<MemberEntity> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    enum: Role,
  })
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @ApiProperty({
    enum: Sex,
  })
  @IsNotEmpty()
  @IsEnum(Sex)
  sex: Sex;

  @ApiProperty({
    description: "DateString타입으로, 'YYYY-MM-DD'포맷을 지켜주세요",
  })
  @IsNotEmpty()
  @IsDateString()
  birth: Date;

  @ApiProperty({
    description: '하이픈이 포함된 휴대전화만 가능합니다. 필수필드 아닙니다.',
    required: false,
  })
  @IsOptional()
  @Matches('/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/')
  phonenumber: string;

  constructor(data: CreateMemberDto) {
    Object.assign(this, data);
  }
}
