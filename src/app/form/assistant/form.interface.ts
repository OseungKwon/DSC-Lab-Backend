import { FormFilterType } from '@infrastructure/paginator/form.filter';
import { PaginateOption } from '@infrastructure/paginator/paginate.decorator';
import { CommonReturnType } from '@infrastructure/types/type';
import { CreateFormDto } from './dto';

export interface AssistantFormInterface {
  listForm(
    aid: number,
    paginateOption: PaginateOption,
    formFilter: FormFilterType,
  ): CommonReturnType;

  getForm(aid: number, fid: number): CommonReturnType;

  createForm(aid: number, dto: CreateFormDto): CommonReturnType;
}
