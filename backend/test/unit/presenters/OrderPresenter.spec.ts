import { randomUUID } from 'crypto';

import { OrderResponse } from '@responses/OrderResponse';

import OrderPresenter from '@presenters/OrderPresenter';
import { Order } from '@prisma/client';

describe('OrderPresenter()', () => {
  it('should return a OrderPresenter instance', () => {
    const order: Order = {
      id: randomUUID(),
      title: 'title',
      description: 'description',
      goal: 1,
      userId: randomUUID(),
      image: 'https://s3.bucket',
    };

    const presenter = OrderPresenter.execute(order);

    expect(presenter).toBeInstanceOf(OrderResponse);
    expect(presenter).toEqual({
      id: order.id,
      title: order.title,
      description: order.description,
      goal: order.goal,
      image: order.image,
    });
  });
});
