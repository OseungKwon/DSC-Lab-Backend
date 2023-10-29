// Standard Packages
import { ApiProperty } from '@nestjs/swagger';
// Third-party Pacakages
import { $Enums, FormQuestion } from '@prisma/client';

export class FormQuestionDomain implements FormQuestion {
  @ApiProperty()
  id: number;

  @ApiProperty()
  content: string;

  @ApiProperty()
  order: number;

  @ApiProperty({
    enum: $Enums.FormQuestionType,
  })
  type: $Enums.FormQuestionType;

  @ApiProperty()
  sectionId: number;

  @ApiProperty()
  formSectionId: number;
}
