// Standard Packages
import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

// Third-party Packages

// Custom Packages
import { AssistantFormInterface } from './form.interface';
import { FormFilterType, PaginateOption } from '@infrastructure/paginator';

@Injectable()
export class AssistantFormService implements AssistantFormInterface {
  constructor(private prisma: PrismaService) {}

  listForm(
    aid: number,
    paginateOption: PaginateOption,
    formFilter: FormFilterType,
  ) {
    console.log(formFilter);
    return this.prisma.form.findMany({
      ...paginateOption,
      where: {
        assistantId: aid,
        ...formFilter.Where,
      },
      orderBy: { ...formFilter.Orderby },
    });
  }
}
