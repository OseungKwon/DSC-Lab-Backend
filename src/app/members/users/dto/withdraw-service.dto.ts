import { ApiProperty } from '@nestjs/swagger';

export class WithdrawServiceDTO {
  @ApiProperty()
  password: string;
}
