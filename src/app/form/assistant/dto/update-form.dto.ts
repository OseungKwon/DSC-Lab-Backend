// Standard Packages
import { ApiProperty, PickType } from '@nestjs/swagger';

// Third-party Packages
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

// Custom Packages
import { FormDomain } from '@domain/form.domain';

export class UpdateFormDto extends PickType(FormDomain, [
  'title',
  'description',
  'isOpen',
  'isEditable',
  'opendAt',
  'closedAt',
] as const) {
  @ApiProperty({
    required: false,
  })
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

  @ApiProperty({
    required: false,
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  thumbnail?: string;
}
