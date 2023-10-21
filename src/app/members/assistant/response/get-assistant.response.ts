import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Assistant } from '@prisma/client';

/**https://www.prisma.io/typescript */

export class GetAssistantResponse implements Omit<Assistant, 'password'> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty({
    enum: $Enums.AssistantRole,
  })
  role: $Enums.AssistantRole;

  @ApiProperty()
  profileKey: string;

  @ApiProperty()
  profileURL: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
