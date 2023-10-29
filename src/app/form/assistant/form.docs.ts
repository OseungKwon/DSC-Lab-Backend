// Standard Packages
import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

// Third-party Packages

// Custom Packages
import { FormFilterDocs, PaginateDocs } from '@infrastructure/paginator';
import { SwaggerObject } from '@infrastructure/types/type';
import { AssistantFormInterface } from './form.interface';
import {
  GetFormResponse,
  ListFormResponse,
  CreateFormResponse,
  UpdateFormResponse,
  DeleteFormResponse,
} from './response';

export const AssistantFormDocs: SwaggerObject<AssistantFormInterface> = {
  Controller: applyDecorators(ApiTags('Form - Assistant'), ApiBearerAuth()),
  listForm: applyDecorators(
    ApiOperation({
      summary: '내가 만든 Form 조회',
    }),
    ApiOkResponse({
      type: ListFormResponse,
    }),
    ...PaginateDocs,
    ...FormFilterDocs,
  ),

  getForm: applyDecorators(
    ApiOperation({
      summary: 'Form 상세조회',
    }),
    ApiOkResponse({
      type: GetFormResponse,
    }),
  ),

  createForm: applyDecorators(
    ApiOperation({
      summary: 'Form 생성하기. 기본 Section, Question, Choice 생성됩니다.',
    }),
    ApiOkResponse({
      type: CreateFormResponse,
    }),
  ),

  updateForm: applyDecorators(
    ApiOperation({
      summary: 'Form 수정하기.',
    }),
    ApiOkResponse({
      type: UpdateFormResponse,
    }),
    ApiConsumes('multipart/form-data'),
  ),
  deleteForm: applyDecorators(
    ApiOperation({
      summary: 'Form 삭제하기',
    }),
    ApiOkResponse({
      type: DeleteFormResponse,
    }),
  ),
};
