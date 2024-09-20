import { CreateUserPayload } from '@domain/entities/CreateUserPayload';
import { createToUserModel } from '@mappers/user';

describe('createToUserModel()', () => {
  it('should map to user model', () => {
    const body: CreateUserPayload = {
      name: 'John Doe',
      email: 'johndoe@nobody.com',
      password: '1234',
      birthday: '11/05/1971',
      cpf: '14579334701',
    };

    const model = createToUserModel(body);

    expect(model).toStrictEqual({
      name: body.name,
      email: body.email,
      password: body.password,
      birthday: body.birthday,
      cpf: body.cpf,
    });
  });
});
