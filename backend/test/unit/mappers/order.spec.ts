import { createToOrderModel } from '@mappers/order';
import { CreateOrderPayload } from '@domain/entities/CreateOrderPayload';

describe('createToOrderModel()', () => {
  it('should map to user model', () => {
    const body: CreateOrderPayload = {
      description: 'any description',
      goal: 1000,
      title: 'Titlezinho',
    };

    const uuid = crypto.randomUUID();
    const model = createToOrderModel(body, uuid);

    expect(model).toStrictEqual({
      id: expect.any(String),
      description: body.description,
      goal: body.goal,
      title: body.title,
      user: {
        connect: { id: uuid },
      },
    });
  });
});
