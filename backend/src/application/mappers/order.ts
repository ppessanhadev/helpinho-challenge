import { CreateOrderPayload } from '@domain/entities/CreateOrderPayload';
import { Prisma } from '@prisma/client';

export const createToOrderModel = (
  body: CreateOrderPayload,
  userId: string,
  imageUrl: string,
): Prisma.OrderCreateInput => ({
  description: body.description,
  goal: body.goal,
  image: imageUrl,
  title: body.title,
  user: {
    connect: { id: userId },
  },
});
