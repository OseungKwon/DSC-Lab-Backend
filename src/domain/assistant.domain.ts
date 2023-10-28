// Standard Packages
import { ApiProperty } from '@nestjs/swagger';

// Third-party Packages
import { $Enums, Assistant } from '@prisma/client';

export class AssistantDomain implements Assistant {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  profileKey: string;

  @ApiProperty()
  profileURL: string;

  @ApiProperty({
    enum: $Enums.AssistantRole,
  })
  role: $Enums.AssistantRole;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
