// Standard Packages
import { ApiProperty } from '@nestjs/swagger';
// Third-party Packages

// Custom Packages

export class CredentialResponse {
  @ApiProperty()
  result: boolean;
}
