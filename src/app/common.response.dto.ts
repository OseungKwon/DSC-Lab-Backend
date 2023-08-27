import { ApiProperty } from '@nestjs/swagger';

export class CommonResponseDto {
  @ApiProperty()
  msg: any;

  constructor(data: CommonResponseDto) {
    Object.assign(this, data);
  }
}
