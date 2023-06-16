import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import type { NestExpressApplication } from '@nestjs/platform-express';
// import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { rawBody: true });
  app.enableCors();
  app.useBodyParser('json', { limit: '50mb' });
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  // app.use('/stripe/webhooks', bodyParser.raw({ type: 'application/json' }));
  // app.use(bodyParser.json());

  await app.listen(3000);
}
bootstrap();
