import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import { AppLogger } from '~/app.logger';
import { AppModule } from '~/app.module';
import { APP_PORT, APP_VERSION, APP_VERSION_PREFIX } from '~/app.vars';
import { enableCors } from '~/cors.service';
import { enableSwagger } from './swagger.service';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(), {
      logger: new AppLogger()
    });

    app.enableVersioning({
      type: VersioningType.URI,
      prefix: APP_VERSION_PREFIX,
      defaultVersion: APP_VERSION
    });

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        forbidUnknownValues: true
      })
    );

    enableCors(app);
    enableSwagger(app);

    app.use(helmet());
    app.use(rateLimit({ windowMs: 60 * 1000, max: 1000 }));

    const port = (process.env.PORT ?? APP_PORT) as number;

    await app.listen(port, () => {
      Logger.verbose(`Icut listening at http://localhost:${port} 🙌 `, 'Main');
    });
  } catch (err) {
    Logger.error(err);
  }
}
bootstrap();
