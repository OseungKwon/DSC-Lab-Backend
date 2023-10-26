// Standard Packages
import { ApiProperty } from '@nestjs/swagger';

// Third-party Packages
import { AssistantRole } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

// Custom Packages
import { IsHongikEmailDomain } from '@app/authentication/decorator';

export class AssistantSignUpDto {
  @ApiProperty({ example: 'assistant' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'assistant@mail.hongik.ac.kr' })
  @IsEmail()
  @IsHongikEmailDomain()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    enum: AssistantRole,
    example: AssistantRole.LabAssistant,
  })
  @IsEnum(AssistantRole)
  @IsNotEmpty()
  role: AssistantRole;
}
