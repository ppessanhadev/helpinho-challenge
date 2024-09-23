import { Inject, Query } from '@nestjs/common';

import { ListOrderService } from '@use-cases/order/list';
import { ListOrderParams } from '@domain/entities/ListOrderParams';
import { User } from '@middlewares/user';
import { Route, RouteAcronym } from '@common';
import { OrdersResponse } from '@responses/OrdersResponse';
import OrdersPresenter from '@presenters/OrdersPresenter';

@RouteAcronym('orders')
export class ListOrderController {
  constructor(
    @Inject(ListOrderService)
    private listOrderService: ListOrderService,
  ) {}

  @Route({
    path: 'search',
    method: 'GET',
    summary: 'Endpoint to fetch all orders paginated',
    response: OrdersResponse,
    isAuth: true,
  })
  public async execute(@User('id') userId: string, @Query() query: ListOrderParams) {
    const orders = await this.listOrderService.execute(query, userId);

    return OrdersPresenter.execute(orders.orders, orders.totalPages);
  }
}
