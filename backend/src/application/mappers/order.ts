import { CreateOrderPayload } from '@domain/entities/CreateOrderPayload';
import { Prisma } from '@prisma/client';

export const createToOrderModel = (
  body: CreateOrderPayload,
  userId: string,
): Prisma.OrderCreateInput => ({
  description: body.description,
  goal: body.goal,
  image: body.image.toString('base64'),
  title: body.title,
  user: {
    connect: { id: userId },
  },
});
