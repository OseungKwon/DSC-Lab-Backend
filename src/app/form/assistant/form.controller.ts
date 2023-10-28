// Standard packages
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

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
import { CreateFormDto, UpdateFormDto } from './dto';

@Controller()
@UseGuards(AssistantGuard)
@AssistantFormDocs.Controller
export class AssistantFormController implements AssistantFormInterface {
  constructor(private formService: AssistantFormService) {}

  @Get()
  @AssistantFormDocs.listForm
  listForm(
    @GetAssistant('id', ParseIntPipe) aid: number,
    @Paginate() paginateOption: PaginateOption,
    @FormFilter() formFilter: FormFilterType,
  ) {
    return this.formService.listForm(aid, paginateOption, formFilter);
  }

  @Get(':fid')
  @AssistantFormDocs.getForm
  getForm(
    @GetAssistant('id', ParseIntPipe) aid: number,
    @Param('fid', ParseIntPipe) fid: number,
  ) {
    return this.formService.getForm(aid, fid);
  }

  @Post()
  @AssistantFormDocs.createForm
  createForm(
    @GetAssistant('id', ParseIntPipe) aid: number,
    @Body() dto: CreateFormDto,
  ) {
    return this.formService.createForm(aid, dto);
  }

  @Patch(':fid')
  @AssistantFormDocs.updateForm
  updateForm(
    @GetAssistant('id', ParseIntPipe) aid: number,
    @Param('fid', ParseIntPipe) fid: number,
    @Body() dto: UpdateFormDto,
  ) {
    return this.formService.updateForm(aid, fid, dto);
  }
}
