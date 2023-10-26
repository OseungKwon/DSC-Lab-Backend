// Standard Packages
import { ApiProperty } from '@nestjs/swagger';

// Third-party Packages
import { UserRole } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

// Custom Packages
import { IsHongikEmailDomain } from '@app/authentication/decorator';

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

  @ApiProperty({ example: 'member@mail.hongik.ac.kr' })
  @IsEmail()
  @IsHongikEmailDomain()
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
