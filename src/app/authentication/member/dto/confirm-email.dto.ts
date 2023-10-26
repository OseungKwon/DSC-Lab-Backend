// Standard Packages
import { ApiProperty } from '@nestjs/swagger';

// Third-party Packages
import { IsNotEmpty, IsNumber } from 'class-validator';

// Custom Packages

export class ConfirmEmailDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
