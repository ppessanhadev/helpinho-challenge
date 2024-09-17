import { PrismaClient } from '@prisma/client';
import { createNestApplication, createTestingModule, shutdownServices } from './server';

beforeAll(async () => {
  const module = await createTestingModule();

  const app = await createNestApplication(module);

  const date = new Date('2022-12-25T08:30:00');
  vi.useFakeTimers({ now: date });

  global.app = app;
  global.database = app.get<PrismaClient>(PrismaClient);
});

afterAll(async () => {
  const { app, database } = global as any;

  await shutdownServices(app, database);
});
