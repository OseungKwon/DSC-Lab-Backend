import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class WithdrawServiceDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
