import { PrismaClient } from '@prisma/client';

export const resetTables = async (database: PrismaClient) => {
  await database.dummy.deleteMany();
};
