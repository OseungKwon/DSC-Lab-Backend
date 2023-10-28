// Standard Packages
import { ApiProperty } from '@nestjs/swagger';

// Third-party Packages
import { FormSection } from '@prisma/client';

export class FormSectionDomain implements FormSection {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  order: number;

  @ApiProperty()
  formId: number;
}
