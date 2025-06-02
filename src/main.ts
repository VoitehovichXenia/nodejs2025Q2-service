import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as yaml from 'js-yaml';
import { readFile } from 'fs/promises';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const yamlFile = await readFile('./doc/api.yaml', 'utf8');

  if (yamlFile) {
    const documentFactory = () => yaml.load(yamlFile) as OpenAPIObject;
    SwaggerModule.setup('doc', app, documentFactory, {
      yamlDocumentUrl: '../doc/api.yaml'
    });
  }

  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 4000;
  console.log(`Nest.js app is listening on http://localhost:${port}/`);
  await app.listen(port);
}
bootstrap();
