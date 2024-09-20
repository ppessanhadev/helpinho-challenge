import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { CreateUserPayload } from '@domain/entities/CreateUserPayload';

const baseRoute = '/v1/users';

describe('POST /v1/users', () => {
  let app: INestApplication;
  const body: CreateUserPayload = {
    birthday: new Date().toISOString(),
    cpf: '98182425050',
    email: 'johndoe@nobody.com',
    name: 'John Doe',
    password: 'Strong@123',
  };

  beforeAll(() => {
    app = global.app;
  });

  it('should create a user and return a token', async () => {
    const response = await request(app.getHttpServer()).post(baseRoute).send(body);

    expect(response.status).toStrictEqual(201);
    expect(response.body).toStrictEqual({ token: expect.any(String) });
  });

  it('should throw an error when user already exists', async () => {
    const response = await request(app.getHttpServer()).post(baseRoute).send(body);

    expect(response.status).toStrictEqual(409);
    expect(response.body).toStrictEqual({
      message: 'User with the current email already exists.',
    });
  });
});
