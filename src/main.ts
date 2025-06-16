import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as yaml from 'js-yaml';
import { readFile } from 'fs/promises';
import { AppModule } from './app.module';
import { LoggerService } from './common/logger/logger.service';
import { ExceptionFilter } from './common/exceptionFilter/exceptionFilter.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });
  const logger = app.get(LoggerService);

  app.useLogger(logger);
  app.useGlobalFilters(new ExceptionFilter(logger));

  const yamlFile = await readFile('./doc/api.yaml', 'utf8');

  if (yamlFile) {
    const documentFactory = () => yaml.load(yamlFile) as OpenAPIObject;
    SwaggerModule.setup('doc', app, documentFactory, {
      yamlDocumentUrl: '../doc/api.yaml',
    });
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  process.on('uncaughtException', (err: Error) => {
    logger.error('Uncaught Exception', err?.stack);
  });

  process.on('unhandledRejection', (err: unknown) => {
    logger.error(
      'Unhandled Rejection',
      err instanceof Error ? err.stack : String(err),
    );
  });

  const port = process.env.PORT || 4000;
  logger.customLog(
    `Nest.js app is listening on http://localhost:${port}/`,
    'green',
  );
  await app.listen(port);
}
bootstrap();
