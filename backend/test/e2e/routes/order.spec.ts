import { CreateOrderPayload } from '@domain/entities/CreateOrderPayload';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createUser } from '../aux/requests';
import { ListOrderParams } from '@domain/entities/ListOrderParams';

let token: string;
const baseRoute = '/v1/orders';

describe('POST /v1/orders', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = global.app;

    token = await createUser(app);
  });

  it('should create order attaching to user', async () => {
    const body: CreateOrderPayload = {
      description: 'random description',
      title: 'random title',
      goal: 21,
    };

    const response = await request(app.getHttpServer())
      .post(baseRoute)
      .send(body)
      .auth(token, { type: 'bearer' });

    expect(response.status).toStrictEqual(201);
    expect(response.body).toStrictEqual({
      id: expect.any(String),
      description: body.description,
      title: body.title,
      goal: body.goal,
    });
  });
});

describe('GET /v1/orders/search', () => {
  const route = baseRoute + '/search';

  it('should list all orders from the current user', async () => {
    const app: INestApplication = global.app;
    const query: ListOrderParams = {
      page: 1,
      limit: 10,
    };

    const response = await request(app.getHttpServer())
      .get(route)
      .query(query)
      .auth(token, { type: 'bearer' });

    expect(response.status).toStrictEqual(200);
    expect(response.body).toStrictEqual({
      orders: expect.any(Array),
      totalPages: expect.any(Number),
    });
  });
});
