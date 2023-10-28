// Standard Packages
import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

// Third-party Packages

// Custom Packages
import { SwaggerObject } from '@infrastructure/types/type';
import { AssistantFormInterface } from './form.interface';
import { FormFilterDocs, PaginateDocs } from '@infrastructure/paginator';

export const AssistantFormDocs: SwaggerObject<AssistantFormInterface> = {
  Controller: applyDecorators(ApiTags('Form - Assistant'), ApiBearerAuth()),
  listForm: applyDecorators(
    ApiOperation({
      summary: '내가 만든 설문 조회',
    }),
    ...PaginateDocs,
    ...FormFilterDocs,
  ),
};
