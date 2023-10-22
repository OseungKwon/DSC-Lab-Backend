import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ConfirmEmailDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
