import { OrderResponse } from '@responses/OrderResponse';
import { randomUUID } from 'crypto';

describe('OrderResponse()', () => {
  it('should return a OrderResponse instance when only has required properties', () => {
    const order = {
      id: randomUUID(),
      title: 'title',
      description: 'description',
      goal: 1,
    };

    const response = new OrderResponse(
      order.id,
      order.title,
      order.description,
      order.goal,
    );

    expect(response).toBeInstanceOf(OrderResponse);
    expect(response).toEqual({
      id: order.id,
      title: order.title,
      description: order.description,
      goal: order.goal,
    });
  });

  it('should return OrderResponse instance when has all properties', () => {
    const order = {
      id: randomUUID(),
      title: 'title',
      description: 'description',
      goal: 1,
      image: 'https://s3.bucket',
    };

    const response = new OrderResponse(
      order.id,
      order.title,
      order.description,
      order.goal,
      order.image,
    );

    expect(response).toBeInstanceOf(OrderResponse);
    expect(response).toEqual({
      id: order.id,
      title: order.title,
      description: order.description,
      goal: order.goal,
      image: order.image,
    });
  });
});
