import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { Callback, Context, Handler } from 'aws-lambda';
import { configure } from '@codegenie/serverless-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, Logger, ValidationPipe, VersioningType } from '@nestjs/common';

import { HttpExceptionFilter, validationPipeOptions } from '@core';
import { ControllerModule } from '@controllers/controller.module';

/**
 * Starts swagger index with an bearer auth
 * @param app Instance from nest application
 */
export const swaggerConfig = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Template API')
    .setDescription('Sample API for template project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);
};

/**
 * Configure server with helmet, cors, versioning and global pipes
 * @param app Instance from nest application
 */
const serverConfig = (app: INestApplication) => {
  app
    .enableVersioning({ type: VersioningType.URI, defaultVersion: '1' })
    .useGlobalPipes(new ValidationPipe(validationPipeOptions))
    .useGlobalFilters(new HttpExceptionFilter())
    .use(helmet())
    .enableCors();
};

const application = async () => {
  const app = await NestFactory.create(ControllerModule);

  serverConfig(app);
  swaggerConfig(app);

  return { app, serverless: configure({ app: app.getHttpAdapter().getInstance() }) };
};

/**
 * Starts nest server with route versioning and swagger
 * @param app Instance from nest application
 */
export const startServer = async () => {
  if (process.env.API_SERVERLESS) return;

  const port = process.env.PORT || 4000;
  const { app } = await application();

  await app.listen(port);

  const url = await app.getUrl();
  Logger.log(`Swagger is running on: ${url}/docs`, `NestApplication`);

  return app;
};

let server: Handler;

export async function lambda(event: any, ctx: Context, cb: Callback) {
  if (!server) {
    const { serverless } = await application();
    server = serverless;
  }

  return server(event, ctx, cb);
}

startServer();
