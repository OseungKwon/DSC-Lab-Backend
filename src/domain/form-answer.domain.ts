// Standard Packages
import { ApiProperty } from '@nestjs/swagger';

// Third-party Packages
import { FormAnswer } from '@prisma/client';

export class FormAnswerDomain implements FormAnswer {
  @ApiProperty()
  id: number;

  @ApiProperty()
  sheetId: number;

  @ApiProperty()
  questionId: number;

  @ApiProperty()
  formQuestionId: number;

  @ApiProperty()
  formAnswerSheetId: number;
}
