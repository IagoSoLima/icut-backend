import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Optional } from '@nestjs/common';
import {
  AWS_ACCESS_KEY_ID,
  AWS_REGION,
  AWS_S3_BUCKET_NAME,
  AWS_S3_BUCKET_URL,
  AWS_SECRET_ACCESS_KEY
} from '~/app.vars';

export class S3AwsProvider {
  private s3: S3Client;

  constructor(@Optional() region?: string) {
    this.s3 = new S3Client({
      region: region ?? AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
      }
    });
  }

  async uploadFile(
    key: string,
    documentBuffer: string | Uint8Array | Buffer,
    type = 'image/*',
    bucket = AWS_S3_BUCKET_NAME
  ): Promise<string> {
    try {
      const a = await this.s3.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: documentBuffer,
          ContentType: type,
          ContentDisposition: 'inline'
        })
      );
      return this.generateURLBeforePut(key);
    } catch (err) {
      throw new Error('ERROR_TO_UPLOAD_S3');
    }
  }

  generateURLBeforePut(key: string): string {
    return AWS_S3_BUCKET_URL + key;
  }
}

export default S3AwsProvider;
