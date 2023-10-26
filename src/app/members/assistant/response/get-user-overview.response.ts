// Standard Packages
import { ApiProperty } from '@nestjs/swagger';

// Third-party Packages

// Custom Packages

export class GetUserOverviewResponse {
  @ApiProperty()
  total: number;

  @ApiProperty()
  pending: number;

  @ApiProperty()
  approved: number;

  @ApiProperty()
  reject: number;
}
