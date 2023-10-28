import { FormFilterType } from '@infrastructure/paginator/form.filter';
import { PaginateOption } from '@infrastructure/paginator/paginate.decorator';
import { CommonReturnType } from '@infrastructure/types/type';

export interface AssistantFormInterface {
  listForm(
    aid: number,
    paginateOption: PaginateOption,
    formFilter: FormFilterType,
  ): CommonReturnType;
}
