// Standard Packages
import { ApiProperty } from '@nestjs/swagger';

// Third-party Packages
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

// Custom Packages

export class EditProfileDto {
  @ApiProperty({
    required: true,
    example: 'Changed Name',
    description: '사용자가 변경하지 않으면, 기존 값을 대입',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    example: 'Changed Nickname',
    description: '사용자가 변경하지 않으면, 기존 값을 대입',
  })
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @ApiProperty({
    required: false,
    example: 'password',
  })
  @IsString()
  @IsOptional()
  changedPassword?: string;

  @ApiProperty()
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
