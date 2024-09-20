import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';
import { resetTables } from './database';
import { ControllerModule } from '@controllers/controller.module';
import { HttpExceptionFilter, validationPipeOptions } from '@core';
import { PrismaClient } from '@prisma/client';

export const createTestingModule = async () => {
  return Test.createTestingModule({
    imports: [ControllerModule],
    providers: [],
  }).compile();
};

export const createNestApplication = async (testingModule: TestingModule) => {
  const app = testingModule.createNestApplication();

  await app
    .useGlobalPipes(new ValidationPipe(validationPipeOptions))
    .useGlobalFilters(new HttpExceptionFilter())
    .enableVersioning({ type: VersioningType.URI, defaultVersion: '1' })
    .init();

  return app;
};

export const shutdownServices = async (app: INestApplication, database: PrismaClient) => {
  await resetTables(database);
  await app.close();
};
