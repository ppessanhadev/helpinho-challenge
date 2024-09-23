import { Module } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [OrderRepository, PrismaClient],
  exports: [OrderRepository],
})
export class OrderRepositoryModule {}
