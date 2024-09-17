import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';
import { DummyApiModule } from './api';
import { HttpExceptionFilter, validationPipeOptions } from '@core';

export const createTestingModule = async () => {
  return Test.createTestingModule({
    imports: [DummyApiModule],
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

export const shutdownServices = async (app: INestApplication) => {
  await app.close();
};
