import { ApiProperty } from '@nestjs/swagger';
import { AssistantType } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class AssistantSignUpDto {
  @ApiProperty({ example: 'assistant' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'assistant@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    enum: AssistantType,
    example: AssistantType.LabAssistant,
  })
  @IsEnum(AssistantType)
  @IsNotEmpty()
  type: AssistantType;
}
