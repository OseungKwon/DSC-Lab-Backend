// Standard Packages
import { ApiProperty } from '@nestjs/swagger';

// Third-party Packages

// Custom Packages

export class CommonResponseDto {
  @ApiProperty()
  msg: any;

  constructor(data: CommonResponseDto) {
    Object.assign(this, data);
  }
}
