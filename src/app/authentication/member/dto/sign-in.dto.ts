// Standard Packages
import { ApiProperty } from '@nestjs/swagger';
// Third-party Packages
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// Custom Packages
import { IsHongikEmailDomain } from '@app/authentication/decorator';

export class MemberSignInDto {
  @ApiProperty({ example: 'member@mail.hongik.ac.kr' })
  @IsEmail()
  @IsHongikEmailDomain()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
