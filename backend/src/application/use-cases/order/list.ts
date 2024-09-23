import { Inject, Injectable } from '@nestjs/common';

import { ListOrderParams } from '@domain/entities/ListOrderParams';
import { OrderRepository } from '@repositories/order/order.repository';

@Injectable()
export class ListOrderService {
  constructor(
    @Inject(OrderRepository)
    private orderRepository: OrderRepository,
  ) {}

  public async execute(query: ListOrderParams, userId: string) {
    const { page, limit } = query;
    const orders = await this.orderRepository.list(page, limit, userId);
    const totalPages = await this.orderRepository.count(limit);

    return { orders, totalPages };
  }
}
