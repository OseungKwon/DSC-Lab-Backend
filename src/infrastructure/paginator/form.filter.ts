// Standard Packages
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export type FormFilterType = {
  Where: Prisma.FormWhereInput;
  Orderby: Prisma.FormOrderByWithRelationInput;
};

export enum IsOpenCategory {
  open = 'open',
  close = 'close',
}

export const SortOrder: Prisma.SortOrder[] = ['asc', 'desc'];

export const FormFilterDocs = [
  ApiQuery({
    name: 'search',
    description: '제목 검색',
    required: false,
  }),
  ApiQuery({
    name: 'category',
    required: false,
    enum: IsOpenCategory,
    description: 'Open form, Close form 카테고리',
  }),
  ApiQuery({
    name: 'order',
    required: false,
    enum: SortOrder,
    description: '생성일 기준 정렬',
  }),
];

export const FormFilter = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query;

    const filter: FormFilterType = {
      Where: {},
      Orderby: {},
    };

    // Search: By title
    const search = query.search || '';

    // MySQL is case insensitive as default
    filter.Where['title'] = {
      contains: search,
    };

    // Category
    const category = query?.category;
    if (category && Object.keys(IsOpenCategory).includes(category)) {
      switch (category) {
        case IsOpenCategory.open:
          filter.Where.isOpen = true;
          break;
        case IsOpenCategory.close:
          filter.Where.isOpen = false;
          break;
      }
    }

    // Orderby
    const order = query?.order;
    if (order && SortOrder.includes(order)) {
      filter.Orderby.createdAt = order;
    }
    filter.Orderby.createdAt = 'desc';
    return filter;
  },
);
