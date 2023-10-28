import { FormDomain } from '@domain/form.domain';
import { PickType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateFormDto extends PickType(FormDomain, [
  'title',
  'description',
  'isOpen',
  'isEditable',
  'opendAt',
  'closedAt',
] as const) {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  isOpen: boolean;

  @IsBoolean()
  @IsOptional()
  isEditable: boolean;

  @IsDateString()
  @IsOptional()
  opendAt: Date;

  @IsDateString()
  @IsOptional()
  closedAt: Date;
}
