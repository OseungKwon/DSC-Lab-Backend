// Standard Packages
import { ApiOperation, ApiProperty } from '@nestjs/swagger';
// Third-party Packages
import { $Enums, Form } from '@prisma/client';

export class FormDomain implements Form {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({
    required: false,
  })
  description: string;

  @ApiProperty({
    required: false,
  })
  thumbnail: string;

  @ApiProperty({
    required: false,
  })
  isOpen: boolean;

  @ApiProperty()
  isArchived: boolean;

  @ApiProperty({
    required: false,
  })
  isEditable: boolean;

  @ApiProperty({
    required: false,
  })
  opendAt: Date;

  @ApiProperty({
    required: false,
  })
  closedAt: Date;

  @ApiProperty()
  assistantId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
