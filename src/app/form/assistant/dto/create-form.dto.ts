// Standard Packages
import { ApiProperty, PickType } from '@nestjs/swagger';

// Third-party Packages
import { FormDomain } from '@domain/form.domain';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFormDto extends PickType(FormDomain, ['title']) {
  @IsString()
  @IsNotEmpty()
  title: string;
}
