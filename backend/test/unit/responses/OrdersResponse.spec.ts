import { randomUUID } from 'crypto';
import { OrdersResponse } from '@responses/OrdersResponse';

describe('OrderResponse()', () => {
  it('should return a OrderResponse instance when only has required properties', () => {
    const orders = [
      {
        id: randomUUID(),
        title: 'title',
        description: 'description',
        goal: 1,
      },
    ];

    const totalPages = 20;

    const response = new OrdersResponse(orders, 20);

    expect(response).toBeInstanceOf(OrdersResponse);
    expect(response).toEqual({ orders, totalPages });
  });
});
