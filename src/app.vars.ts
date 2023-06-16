import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

const configService = new ConfigService();

export const NODE_ENV = configService.get<string>('NODE_ENV');
export const APP_PORT = configService.get<number>('APP_PORT');
export const APP_VERSION = configService.get<string>('APP_VERSION') ?? '';
export const APP_VERSION_PREFIX =
  configService.get<string>('APP_VERSION_PREFIX') ?? '';
export const APP_CONTAINER_NAME =
  configService.get<string>('APP_CONTAINER_NAME');

export const IS_PROD = NODE_ENV === 'production';
export const IS_TEST = NODE_ENV === 'test';
export const IS_DEV = !IS_TEST && !IS_PROD;

export const CACHE_MAX_NUMBER = configService.get<string>('CACHE_MAX_NUMBER');
export const CACHE_TIME_TO_LIVE =
  configService.get<string>('CACHE_TIME_TO_LIVE');

export const JWT_SECRET = configService.get<string>('JWT_SECRET') ?? 'secret';
export const JWT_SECRET_EXPIRES_IN = Number(
  configService.get<number>('JWT_SECRET_EXPIRES_IN')
);
export const JWT_REFRESH_EXPIRES_IN = Number(
  configService.get<number>('JWT_REFRESH_EXPIRES_IN')
);
export const IS_PUBLIC_KEY = 'isPublic';

export const DEFAULT_JOIN_ARRAY_ERRORS = '$,{}]';

export const DEFAULT_HOUR_START = 8;
export const DEFAULT_QUANTITY_HOURS_PER_DAY = 10;
export const DEFAULT_MINUTE_INCREMENT = 30;
export const DEFAULT_LIMIT_HOUR_TO_DO_ACTION_IN_SCHEDULE = 2;

export const AWS_REGION = configService.get<string>('AWS_REGION');
export const AWS_ACCESS_KEY_ID = configService.get<string>('AWS_ACCESS_KEY_ID');
export const AWS_SECRET_ACCESS_KEY = configService.get<string>(
  'AWS_SECRET_ACCESS_KEY'
);
export const AWS_S3_BUCKET_NAME =
  configService.get<string>('AWS_S3_BUCKET_NAME');
export const AWS_S3_BUCKET_URL = configService.get<string>('AWS_S3_BUCKET_URL');

export const DEFAULT_AVATAR_URL =
  'https://icut-bucket.s3.sa-east-1.amazonaws.com/public/default-avatar.jpg';
export const DEFAULT_LOGO_URL =
  'https://icut-bucket.s3.sa-east-1.amazonaws.com/public/default-barber-shop.jpg';
