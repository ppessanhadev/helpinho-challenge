import { INestApplication } from '@nestjs/common';
import request from 'supertest';

const baseUrl = '/v1/dummy';

describe('HttpExceptionFilter', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = global.app;
  });

  it('should sanitize the validation error correctly', async () => {
    const url = baseUrl + '/validate';
    const response = await request(app.getHttpServer()).post(url);

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      message: 'Some of the properties are not valid',
      details: [
        {
          field: 'name',
          detail: 'name must be a string',
        },
      ],
    });
  });

  it('should return the name with status 201', async () => {
    const url = baseUrl + '/validate';
    const response = await request(app.getHttpServer())
      .post(url)
      .send({ name: 'John Doe' });

    expect(response.status).toBe(201);
    expect(response.body).toStrictEqual({ name: 'John Doe' });
  });
});
