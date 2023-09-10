import { CheckType, validateTypeArray } from '@domain/member/member.enum';
import { UnsupportedValidationType } from '@infrastructure/exception/member';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CheckTypeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!validateTypeArray.includes(value)) {
      throw new UnsupportedValidationType();
    }
    return value;
  }
}
export { validateTypeArray };
