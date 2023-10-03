import { ApiProperty } from '@nestjs/swagger';

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
