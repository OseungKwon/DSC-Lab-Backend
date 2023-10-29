// Standard Packages
import { ApiProperty } from '@nestjs/swagger';

// Third-party Packages
import { FormChoice } from '@prisma/client';

export class FormChoiceDomain implements FormChoice {
  @ApiProperty()
  id: number;

  @ApiProperty()
  content: string;

  @ApiProperty()
  order: number;

  @ApiProperty()
  questionId: number;
}
