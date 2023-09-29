import { ApiProperty } from '@nestjs/swagger';

export class CredentialResponse {
  @ApiProperty()
  result: boolean;
}
