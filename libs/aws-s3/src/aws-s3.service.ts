import { S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsS3Service {
  private s3Client: S3Client;

  constructor(private config: ConfigService) {
    /** Initiate S3Client */
    this.s3Client = new S3Client({
      region: config.get('AWS_S3_Region'),
      credentials: {
        accessKeyId: config.get('AWS_S3_AccessKeyId'),
        secretAccessKey: config.get('AWS_S3_AccessKey'),
      },
    });
  }
}
