import { validate } from 'class-validator';
import { IsPassword } from '@shared/IsPassword';

describe('@IsPassword()', () => {
  class TestClass {
    @IsPassword()
    testProp?: string;
  }

  const testObject = new TestClass();

  it('should fail when given password is undefined', async () => {
    testObject.testProp = undefined;

    const errors = await validate(testObject);
    const { isStrongPassword } = errors[0].constraints;

    expect(errors).toHaveLength(1);
    expect(isStrongPassword).toStrictEqual(
      'The field testProp must be a strong password. Received: undefined',
    );
  });

  it('should fail when given password is blank spaces', async () => {
    testObject.testProp = '    ';

    const errors = await validate(testObject);
    const { isStrongPassword } = errors[0].constraints;

    expect(errors).toHaveLength(1);
    expect(isStrongPassword).toStrictEqual(
      'The field testProp must be a strong password. Received: blank string',
    );
  });

  it('should fail when given password is empty', async () => {
    testObject.testProp = '';

    const errors = await validate(testObject);
    const { isStrongPassword } = errors[0].constraints;

    expect(errors).toHaveLength(1);
    expect(isStrongPassword).toStrictEqual(
      'The field testProp must be a strong password. Received: blank string',
    );
  });

  it('should fail when given password does not have the minumum length', async () => {
    testObject.testProp = 'Stron@1';

    const errors = await validate(testObject);
    const { isStrongPassword } = errors[0].constraints;

    expect(errors).toHaveLength(1);
    expect(isStrongPassword).toStrictEqual(
      'The field testProp must be a strong password. Received: Stron@1',
    );
  });

  it('shouldn`t fail when given password does not have the minimum lowercase characters', async () => {
    testObject.testProp = 'STRONG@1';

    const errors = await validate(testObject);
    expect(errors).toHaveLength(0);
  });

  it('shouldn`t fail when given password does not have the minimum uppercase characters', async () => {
    testObject.testProp = 'strong@1';

    const errors = await validate(testObject);
    expect(errors).toHaveLength(0);
  });

  it('shouldn`t fail when given password does not have the minimum number characters', async () => {
    testObject.testProp = 'Strong@@';

    const errors = await validate(testObject);
    expect(errors).toHaveLength(0);
  });

  it('shouldn`t fail when given password does not have the minimum special characters', async () => {
    testObject.testProp = 'Strong11';

    const errors = await validate(testObject);
    expect(errors).toHaveLength(0);
  });

  it('should pass when given text is correct', async () => {
    testObject.testProp = 'Strong@1';

    const errors = await validate(testObject);
    expect(errors).toHaveLength(0);
  });
});
