import { RemoveMaskPipe } from '@pipes/RemoveMask';

describe('RemoveMaskPipe()', () => {
  const pipe = new RemoveMaskPipe('cpf');

  it('should not transform when value is a string', () => {
    const result = pipe.transform('some string');

    expect(result).toStrictEqual('some string');
  });

  it('should not transform when value is not found', () => {
    const object = {
      age: 11,
    };

    const result = pipe.transform(object);

    expect(result).toStrictEqual(object);
  });

  it('should remove mask from the given value', () => {
    const object = {
      cpf: '979.124.080-96',
      age: 11,
    };

    const result = pipe.transform(object);

    expect(result).toStrictEqual({
      cpf: '97912408096',
      age: 11,
    });
  });
});
