import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { MBtoByte } from './mb-to-byte.converter';
import { UnprocessableEntityException } from '@nestjs/common';
import {
  ApiPayloadTooLargeResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

/**
 *
 * 파일 사이즈에 대한 제한은 강제합니다.
 *
 * 사유 : 리소스 낭비 방지
 */
export interface MulterOptionFactoryInput {
  /** Limited file size */
  size: number;
  /** Limited file extension as regular expression */
  extension?: RegExp;
}

export const FileErrorDocs = () => {
  return [
    ApiPayloadTooLargeResponse({
      description: '제한된 파일 사이즈를 초과하였습니다.',
    }),
    ApiUnprocessableEntityResponse({
      description: '지원되지 않는 확장자입니다.',
    }),
  ];
};

/** Require to use in @FileInterceptor */
export const FileLimitFactory = ({
  size,
  extension,
}: MulterOptionFactoryInput): MulterOptions => {
  return {
    limits: {
      fileSize: MBtoByte(size),
    },
    fileFilter: (req, file, cb) => {
      /** If extension not found or file extension matches */
      if (!extension || file.originalname.toLowerCase().match(extension)) {
        cb(null, true);
      } else {
        cb(
          new UnprocessableEntityException(
            `Invalid file type. Require extension of ${extension}`,
          ),
          false,
        );
      }
    },
  };
};
