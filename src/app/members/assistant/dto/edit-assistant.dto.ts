// Standard Packages
import { ApiProperty } from '@nestjs/swagger';

// Third-party Packages
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

// Custom Packages

export class EditAssistantDto {
  @ApiProperty({
    example: 'assistant-name',
    description: '사용자가 변경하지 않으면, 기존 값을 대입',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'password',
    required: false,
  })
  @IsString()
  @IsOptional()
  changedPassword: string;

  @ApiProperty({
    example: 'password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    required: false,
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  profile?: Express.Multer.File;
}
