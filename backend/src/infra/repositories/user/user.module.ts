import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { UserRepository } from './user.repository';

@Module({
  providers: [UserRepository, PrismaClient],
  exports: [UserRepository],
})
export class UserRepositoryModule {}
