import { AppLogger } from '~/app.logger';
import { Strategy } from '~/common/strategy/strategy';

interface StrategyOptions {
  file: Express.Multer.File;
}
export class ImageTypeStrategy implements Strategy<StrategyOptions> {
  constructor(private readonly logger: AppLogger) {
    this.logger.setContext(ImageTypeStrategy.name);
  }

  validate(obj: StrategyOptions, message: string[]): string[] {
    const { file } = obj;

    const mimeTypeValid = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!mimeTypeValid.includes(file.mimetype)) {
      const errorLoggerMessage = 'Extension of the file is not valid';
      this.logger.fail({
        category: 'IMAGE_TYPE_STRATEGY_ERROR',
        error: errorLoggerMessage
      });
      message.push('IMAGE_EXTENSION_NOT_VALID');
    }

    return message;
  }
}
