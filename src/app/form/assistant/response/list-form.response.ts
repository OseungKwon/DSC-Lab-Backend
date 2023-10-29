// Custom Package
import { FormDomain } from '@domain/form.domain';
import { ApiProperty } from '@nestjs/swagger';

class ListFormAggregate {
  @ApiProperty()
  all: number;

  @ApiProperty()
  open: number;

  @ApiProperty()
  close: number;
}

class CountSheet {
  @ApiProperty()
  sheets: number;
}

class ListFormData extends FormDomain {
  @ApiProperty({
    type: CountSheet,
  })
  _count: CountSheet;
}

export class ListFormResponse {
  @ApiProperty({
    type: ListFormAggregate,
  })
  aggregate: ListFormAggregate;

  @ApiProperty({
    isArray: true,
    type: ListFormData,
  })
  data: ListFormData;
}
