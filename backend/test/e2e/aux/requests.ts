import request from 'supertest';
import { INestApplication } from '@nestjs/common';

import { CreateUserPayload } from '@domain/entities/CreateUserPayload';
import { TokenResponse } from '@responses/TokenResponse';

export const createUser = async (app: INestApplication) => {
  const body: CreateUserPayload = {
    birthday: new Date().toISOString(),
    cpf: '98182425050',
    name: 'John Doe',
    password: 'Strong@123',
    email: 'unexistantdoe@nobody.com',
  };

  const response = await request(app.getHttpServer()).post('/v1/users').send(body);

  return (response.body as TokenResponse).token;
};
