// Standard Pacakges
import { ApiProperty } from '@nestjs/swagger';

// Custom Pacakages
import { FormChoiceDomain } from '@domain/form-choice.domain';
import { FormQuestionDomain } from '@domain/form-question.domain';
import { FormSectionDomain } from '@domain/form-section.domain';
import { FormDomain } from '@domain/form.domain';

class FormQuestionWithRelation extends FormQuestionDomain {
  @ApiProperty({
    isArray: true,
    type: FormChoiceDomain,
  })
  choices: FormChoiceDomain;
}

class FormSectionWithRelation extends FormSectionDomain {
  @ApiProperty({
    isArray: true,
    type: FormQuestionWithRelation,
  })
  questions: FormQuestionWithRelation;
}

export class GetFormResponse extends FormDomain {
  @ApiProperty({
    isArray: true,
    type: FormSectionWithRelation,
  })
  sections: FormSectionWithRelation;
}
