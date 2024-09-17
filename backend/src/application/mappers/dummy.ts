import { Prisma } from '@prisma/client';
import { CreateDummyPayload } from '@domain/entities/CreateDummy';

export const toCreateDummyInput = (
  dummy: CreateDummyPayload,
): Prisma.DummyCreateInput => ({
  name: dummy.dummyName,
});
