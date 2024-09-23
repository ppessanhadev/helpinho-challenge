import { Body, Inject } from '@nestjs/common';

import { User } from '@middlewares/user';
import { RouteAcronym, Route } from '@common';
import { OrderResponse } from '@responses/OrderResponse';
import { CreateOrderService } from '@use-cases/order/create';
import { CreateOrderPayload } from '@domain/entities/CreateOrderPayload';

import OrderPresenter from '@presenters/OrderPresenter';

@RouteAcronym('orders')
export class CreateOrderController {
  constructor(
    @Inject(CreateOrderService)
    private createOrderService: CreateOrderService,
  ) {}

  @Route({
    method: 'POST',
    summary: 'Creates new order for the logged in user',
    body: CreateOrderPayload,
    response: OrderResponse,
    isAuth: true,
  })
  public async execute(@User('id') userId: string, @Body() body: CreateOrderPayload) {
    const order = await this.createOrderService.execute(body, userId);

    return OrderPresenter.execute(order);
  }
}
