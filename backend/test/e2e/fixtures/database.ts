import { PrismaClient } from '@prisma/client';

export const resetTables = async (database: PrismaClient) => {
  return database.user.deleteMany();
};
