import { PrismaClient } from '@prisma/client';

export const resetTables = async (database: PrismaClient) => {
  await Promise.all([database.order.deleteMany(), database.user.deleteMany()]);
};
