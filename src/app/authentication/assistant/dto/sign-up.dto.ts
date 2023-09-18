import { ApiProperty } from '@nestjs/swagger';
import { AssistantType } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class AssistantSignUpDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    enum: AssistantType,
  })
  @IsEnum(AssistantType)
  @IsNotEmpty()
  type: AssistantType;
}
