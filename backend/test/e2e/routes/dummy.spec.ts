import { INestApplication } from '@nestjs/common';
import request from 'supertest';

describe('POST /dummy', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = global.app;
  });

  it('should return a dummy value', async () => {
    const response = await request(app.getHttpServer())
      .post('/v1/dummy')
      .send({ dummyName: 'dummy' });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ dummy: 'dummy' });
  });
});
