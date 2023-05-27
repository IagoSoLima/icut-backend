import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import { AppLogger } from '~/app.logger';
import { AppModule } from '~/app.module';
import { APP_PORT, APP_VERSION, APP_VERSION_PREFIX } from '~/app.vars';
import { enableCors } from '~/cors.service';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(), {
      logger: new AppLogger()
    });
    const config = new DocumentBuilder()

      .setTitle('ICut - API')

      .setDescription('The Median API description')

      .setVersion('0.1')

      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('swagger', app, document);
    await app.listen(4000);
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
    app.use(helmet());
    app.use(rateLimit({ windowMs: 60 * 1000, max: 1000 }));

    const port = (process.env.PORT ?? APP_PORT) as number;

    await app.listen(port, () => {
      Logger.verbose(`Icut listening at http://localhost:${port} 🙌 `, 'Main');
    });
  } catch (err) {}
}
bootstrap();
