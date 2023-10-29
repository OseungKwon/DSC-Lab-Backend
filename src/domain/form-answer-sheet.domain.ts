// Standard Packages
import { ApiProperty } from '@nestjs/swagger';

// Third-party Packages
import { FormAnswerSheet } from '@prisma/client';

export class FormAnswerSheetDomain implements FormAnswerSheet {
  @ApiProperty()
  id: number;

  @ApiProperty()
  completedAt: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  formId: number;
}
