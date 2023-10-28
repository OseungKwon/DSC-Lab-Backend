// Standard Packages
import { ApiProperty } from '@nestjs/swagger';
// Third-party Packages
import { $Enums, Form } from '@prisma/client';

export class FormDomain implements Form {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isOpen: boolean;

  @ApiProperty()
  isArchived: boolean;

  @ApiProperty()
  editable: boolean;

  @ApiProperty()
  accessType: $Enums.UserRole;

  @ApiProperty()
  opendAt: Date;

  @ApiProperty()
  closedAt: Date;

  @ApiProperty()
  assistantId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
