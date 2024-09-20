import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { CreateUserPayload } from '@domain/entities/CreateUserPayload';
import { LoginUserPayload } from '@domain/entities/LoginUserPayload';

const baseRoute = '/v1/users';

const email = 'johndoe@nobody.com';
const password = 'Strong@123';

describe('POST /v1/users', () => {
  let app: INestApplication;
  const body: CreateUserPayload = {
    birthday: new Date().toISOString(),
    cpf: '98182425050',
    name: 'John Doe',
    password,
    email,
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

describe('POST /v1/users/login', () => {
  const route = baseRoute + '/login';
  let app: INestApplication;
  beforeAll(() => {
    app = global.app;
  });

  it('should return error when email is invalid', async () => {
    const body: LoginUserPayload = {
      email: 'wrongdoe@someerror.com',
      password,
    };

    const response = await request(app.getHttpServer()).post(route).send(body);

    expect(response.status).toStrictEqual(401);
    expect(response.body).toStrictEqual({
      message: 'Email or password incorrect',
    });
  });

  it('should return error when password is invalid', async () => {
    const body: LoginUserPayload = {
      email,
      password: 'Weak@123',
    };

    const response = await request(app.getHttpServer()).post(route).send(body);

    expect(response.status).toStrictEqual(401);
    expect(response.body).toStrictEqual({
      message: 'Email or password incorrect',
    });
  });

  it('should execute login correctly', async () => {
    const body: LoginUserPayload = { email, password };

    const response = await request(app.getHttpServer()).post(route).send(body);

    expect(response.status).toStrictEqual(200);
    expect(response.body).toStrictEqual({ token: expect.any(String) });
  });
});
