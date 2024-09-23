import { Order } from '@prisma/client';
import { OrderResponse } from '@responses/OrderResponse';
import { OrdersResponse } from '@responses/OrdersResponse';

class OrdersPresenter {
  public execute(data: Order[], totalPages) {
    const orders = data.map(
      (order) =>
        new OrderResponse(
          order.id,
          order.title,
          order.description,
          order.goal,
          order.image,
        ),
    );

    return new OrdersResponse(orders, totalPages);
  }
}
export default new OrdersPresenter();
