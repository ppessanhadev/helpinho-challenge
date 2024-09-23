import { Inject, Injectable } from '@nestjs/common';

import { createToOrderModel } from '@mappers/order';
import { OrderRepository } from '@repositories/order/order.repository';
import { CreateOrderPayload } from '@domain/entities/CreateOrderPayload';

@Injectable()
export class CreateOrderService {
  constructor(
    @Inject(OrderRepository)
    private orderRepository: OrderRepository,
  ) {}

  public async execute(body: CreateOrderPayload, userId: string) {
    const model = createToOrderModel(body, userId);

    return this.orderRepository.create(model);
  }
}
