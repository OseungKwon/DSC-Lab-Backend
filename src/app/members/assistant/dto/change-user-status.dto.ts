import { Status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

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
