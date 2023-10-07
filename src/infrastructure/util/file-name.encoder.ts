import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

/**
 * Why we need this?
 *
 * https://github.com/expressjs/multer/issues/1104
 *
 * https://github.com/mscdex/busboy/issues/20
 *
 * Multer는 내부적으로 busboy라는 패키지를 사용한다. Busboy는 FormData를 처리해주는 패키지이다.
 * Busboy는 내부적으로 charset을 latin1을 사용한다. 이로 인해서, Non-latine Charset는 Utf-8 변환과정이 필요하다.
 * 이 Pipe는 이 처리를 위해서 사용한다.
 * @UploadedFile() ParamDecorator에서 사용한다.
 */

@Injectable()
export class FileNameEncoderPipe implements PipeTransform {
  transform(file: Express.Multer.File, metadata: ArgumentMetadata) {
    if (file) {
      file.originalname = Buffer.from(file.originalname, 'latin1').toString(
        'utf-8',
      );
    }
  }
}
