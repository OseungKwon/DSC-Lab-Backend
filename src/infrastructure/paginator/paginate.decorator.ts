// Standard Packages
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export type PaginateOption = {
  skip: number;
  take: number;
};

export const PaginateDocs = [
  ApiQuery({
    name: 'skip',
    description: '페이지 번호. 유효하지 않은 값에 대해 기본값 1',
    required: false,
  }),
  ApiQuery({
    name: 'limit',
    description: '페이지별 데이터 수. 유효하지 않은 값에 대해 기본값 10',
    required: false,
  }),
];

export const Paginate = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query;
    const skip = paginateOptionValidator(parseInt(query.skip), 'skip');
    const take = paginateOptionValidator(parseInt(query.limit), 'take');
    return {
      skip: (skip - 1) * take,
      take: take,
    };
  },
);

function paginateOptionValidator(value: number, type: keyof PaginateOption) {
  switch (type) {
    case 'skip':
      if (!value || value < 1) {
        return 1;
      }
      return value;
    case 'take':
      if (!value || value < 1) {
        return 10;
      }
      return value;
  }
}
