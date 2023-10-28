// Standard Packages
import { BadRequestException, Injectable } from '@nestjs/common';

// Third-party Packages

// Custom Packages
import { AssistantFormInterface } from './form.interface';
import { FormFilterType, PaginateOption } from '@infrastructure/paginator';
import { PrismaService } from '@app/prisma/prisma.service';
import { CreateFormDto } from './dto';

@Injectable()
export class AssistantFormService implements AssistantFormInterface {
  constructor(private prisma: PrismaService) {}

  async listForm(
    aid: number,
    paginateOption: PaginateOption,
    formFilter: FormFilterType,
  ) {
    const forms = await this.prisma.form.findMany({
      ...paginateOption,
      where: {
        assistantId: aid,
        ...formFilter.Where,
      },
      orderBy: { ...formFilter.Orderby },
      include: {
        _count: {
          select: {
            sheets: true,
          },
        },
      },
    });

    delete formFilter.Where['isOpen'];

    /** Aggregate per category */
    const aggreate = await this.prisma.form.groupBy({
      by: ['isOpen'],
      _count: {
        _all: true,
      },
    });

    const aggregateResult = {
      all: 0,
      open: 0,
      close: 0,
    };

    aggreate.forEach((group) => {
      aggregateResult.all += group._count._all;
      switch (group.isOpen) {
        case true:
          aggregateResult.open += group._count._all;
          break;
        case false:
          aggregateResult.close += group._count._all;
          break;
      }
    });

    return {
      aggregate: aggregateResult,
      data: forms,
    };
  }

  async getForm(aid: number, fid: number) {
    try {
      const form = await this.prisma.form.findUniqueOrThrow({
        where: {
          id: fid,
          assistantId: aid,
        },
        include: {
          sections: {
            include: {
              questions: {
                include: {
                  choices: true,
                },
              },
            },
          },
        },
      });
      return form;
    } catch (err) {
      throw new BadRequestException('FORM_NOT_FOUND');
    }
  }

  async createForm(aid: number, dto: CreateFormDto) {
    const { title } = dto;
    const createdForm = await this.prisma.form.create({
      data: {
        title,
        assistantId: aid,
        sections: {
          create: [
            {
              title: 'New Section',
              order: 1,
              questions: {
                create: [
                  {
                    content: 'New Question',
                    order: 1,
                    type: 'CHOICE',
                    choices: {
                      create: this.createDefaulChoices(),
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      include: {
        sections: {
          include: {
            questions: {
              include: {
                choices: true,
              },
            },
          },
        },
      },
    });
    return createdForm;
  }

  private createDefaulChoices() {
    return [1, 2, 3, 4].map((num) => {
      return {
        content: `Choice No.${num}`,
        order: num,
      };
    });
  }
}
