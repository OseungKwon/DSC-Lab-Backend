// Standard Packages
import { ApiProperty } from '@nestjs/swagger';

// Third-party Packages
import { IsString, IsNotEmpty } from 'class-validator';

// Custom Packages

export class AssistantSignInDto {
  @ApiProperty({ example: 'assistant@mail.hongik.ac.kr' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
