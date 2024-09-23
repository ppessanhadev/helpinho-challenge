import { Order } from '@prisma/client';
import { OrderResponse } from '@responses/OrderResponse';

class OrderPresenter {
  public execute(data: Order) {
    return new OrderResponse(
      data.id,
      data.title,
      data.description,
      data.goal,
      data.image,
    );
  }
}
export default new OrderPresenter();
