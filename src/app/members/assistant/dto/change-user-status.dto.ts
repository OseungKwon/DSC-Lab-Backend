// Standard Packages
import { ApiProperty } from '@nestjs/swagger';

// Third-party Packages
import { Status } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

// Custom Packages

export class ChangeUserStatusDto {
  @ApiProperty({
    enum: Status,
  })
  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  reason: string;
}
