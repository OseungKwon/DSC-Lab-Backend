import { CheckType } from '@domain/member/member.enum';
import { UnsupportedValidationType } from '@infrastructure/exception/member';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

export const validateTypeArray: string[] = Object.keys(CheckType).map((x) => {
  return CheckType[x];
});

@Injectable()
export class CheckTypeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!validateTypeArray.includes(value)) {
      throw new UnsupportedValidationType();
    }
    return value;
  }
}
