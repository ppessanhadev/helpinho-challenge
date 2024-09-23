import { Inject, Injectable } from '@nestjs/common';
import { Order, Prisma, PrismaClient } from '@prisma/client';

import { Repository } from '@core';

@Injectable()
export class OrderRepository extends Repository<
  Prisma.OrderUpdateInput | Prisma.OrderCreateInput,
  Order
> {
  constructor(
    @Inject(PrismaClient)
    database: PrismaClient,
  ) {
    super(database, 'order');
  }

  public async list(page: number, limit: number, userId: string) {
    return super.find<Prisma.OrderFindManyArgs>({
      where: { userId },
      skip: page,
      take: limit,
    });
  }
}
