import { ApiProperty } from '@nestjs/swagger';
import { MemberRole } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class MemberSignUpDto {
  @ApiProperty({ example: 'student' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'member@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'B8890??' })
  @IsString()
  @IsNotEmpty()
  groupId: string;

  @ApiProperty({
    enum: MemberRole,
    example: MemberRole.Student,
  })
  @IsEnum(MemberRole)
  @IsNotEmpty()
  role: MemberRole;
}
