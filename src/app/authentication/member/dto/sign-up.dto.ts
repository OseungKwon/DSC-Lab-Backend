import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class MemberSignUpDto {
  @ApiProperty({ example: 'student' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'nickname' })
  @IsString()
  @IsNotEmpty()
  nickname: string;

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
    enum: UserRole,
    example: UserRole.Student,
  })
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}
