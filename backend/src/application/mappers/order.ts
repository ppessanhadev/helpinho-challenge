import { CreateOrderPayload } from '@domain/entities/CreateOrderPayload';
import { ListOrderParams } from '@domain/entities/ListOrderParams';
import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';

export const createToOrderModel = (
  body: CreateOrderPayload,
  userId: string,
): Prisma.OrderCreateInput => {
  const id = randomUUID();

  return {
    id,
    description: body.description,
    goal: body.goal,
    title: body.title,
    user: {
      connect: { id: userId },
    },
  };
};

export const toUploadOrder = (id: string, image: string): Prisma.OrderUpdateInput => ({
  id,
  image,
});
