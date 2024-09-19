import { validate } from 'class-validator';
import { IsCpf } from '@shared/IsCpf';

describe('@IsCpf()', () => {
  class TestClass {
    @IsCpf()
    testProp?: string;
  }

  const testObject = new TestClass();

  it('should fail when given cpf is undefined', async () => {
    testObject.testProp = undefined;

    const errors = await validate(testObject);
    const { isCpf } = errors[0].constraints;

    expect(errors).toHaveLength(1);
    expect(isCpf).toStrictEqual('The field testProp must be a cpf. Received: undefined');
  });

  it('should fail when given cpf is blank spaces', async () => {
    testObject.testProp = '    ';

    const errors = await validate(testObject);
    const { isCpf } = errors[0].constraints;

    expect(errors).toHaveLength(1);
    expect(isCpf).toStrictEqual(
      'The field testProp must be a cpf. Received: blank string',
    );
  });

  it('should fail when given cpf is empty', async () => {
    testObject.testProp = '';

    const errors = await validate(testObject);
    const { isCpf } = errors[0].constraints;

    expect(errors).toHaveLength(1);
    expect(isCpf).toStrictEqual(
      'The field testProp must be a cpf. Received: blank string',
    );
  });

  it('should fail when given cpf is incorrect', async () => {
    testObject.testProp = 123 as any;

    const errors = await validate(testObject);
    const { isCpf } = errors[0].constraints;

    expect(errors).toHaveLength(1);
    expect(isCpf).toStrictEqual('The field testProp must be a cpf. Received: 123');
  });

  it('should pass when given cpf is correct', async () => {
    testObject.testProp = '98182425050';

    const errors = await validate(testObject);

    expect(errors).toHaveLength(0);
  });
});
