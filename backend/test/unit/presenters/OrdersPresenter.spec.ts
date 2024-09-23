import { randomUUID } from 'crypto';

import { Order } from '@prisma/client';
import { OrdersResponse } from '@responses/OrdersResponse';

import OrdersPresenter from '@presenters/OrdersPresenter';

describe('OrderPresenter()', () => {
  it('should return a OrderPresenter instance', () => {
    const orders: Order[] = [
      {
        id: randomUUID(),
        title: 'title',
        description: 'description',
        goal: 1,
        userId: randomUUID(),
        image: 'https://s3.bucket',
      },
    ];
    const totalPages = 20;

    const presenter = OrdersPresenter.execute(orders, totalPages);

    expect(presenter).toBeInstanceOf(OrdersResponse);
    expect(presenter).toEqual({ orders: expect.any(Array), totalPages });
  });
});
