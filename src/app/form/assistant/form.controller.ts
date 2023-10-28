// Standard packages
import { Controller, Get, UseGuards } from '@nestjs/common';

// Third-party Packages

// Custom Packages
import { AssistantFormInterface } from './form.interface';
import { AssistantFormService } from './form.service';
import { AssistantGuard } from '@app/authentication/assistant/guard/assistant-jwt.guard';
import { AssistantFormDocs } from './form.docs';
import { GetAssistant } from '@app/authorization/decorator/get-assistant.decorator';
import {
  Paginate,
  PaginateOption,
  FormFilter,
  FormFilterType,
} from '@infrastructure/paginator';

@Controller()
@UseGuards(AssistantGuard)
@AssistantFormDocs.Controller
export class AssistantFormController implements AssistantFormInterface {
  constructor(private formService: AssistantFormService) {}

  @Get()
  @AssistantFormDocs.listForm
  listForm(
    @GetAssistant('id') aid: number,
    @Paginate() paginateOption: PaginateOption,
    @FormFilter() formFilter: FormFilterType,
  ) {
    return this.formService.listForm(aid, paginateOption, formFilter);
  }
}
