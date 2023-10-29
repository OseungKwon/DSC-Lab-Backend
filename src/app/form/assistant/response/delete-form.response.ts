// Standard Packages
import { PickType } from '@nestjs/swagger';
// Custom Packages
import { FormDomain } from '@domain/form.domain';

export class DeleteFormResponse extends PickType(FormDomain, [
  'id',
  'title',
] as const) {}
