import { createToOrderModel } from '@mappers/order';
import { CreateOrderPayload } from '@domain/entities/CreateOrderPayload';
import { randomUUID } from 'crypto';

describe('createToOrderModel()', () => {
  it('should map to user model', () => {
    const body: CreateOrderPayload = {
      description: 'any description',
      goal: 1000,
      image: Buffer.from('qlqrcoisa'),
      title: 'Titlezinho',
    };

    const uuid = randomUUID();
    const model = createToOrderModel(body, uuid);

    expect(model).toStrictEqual({
      description: body.description,
      goal: body.goal,
      image: body.image.toString('base64'),
      title: body.title,
      user: {
        connect: { id: uuid },
      },
    });
  });
});
