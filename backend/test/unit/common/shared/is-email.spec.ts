import { validate } from 'class-validator';
import { IsEmail } from '@shared/IsEmail';

describe('@IsEmail()', () => {
  class TestClass {
    @IsEmail()
    testProp?: string;
  }

  const testObject = new TestClass();

  it('should fail when given email is undefined', async () => {
    testObject.testProp = undefined;

    const errors = await validate(testObject);
    const { isEmail } = errors[0].constraints;

    expect(errors).toHaveLength(1);
    expect(isEmail).toStrictEqual(
      'The field testProp must be a email. Received: undefined',
    );
  });

  it('should fail when given email is blank spaces', async () => {
    testObject.testProp = '    ';

    const errors = await validate(testObject);
    const { isEmail } = errors[0].constraints;

    expect(errors).toHaveLength(1);
    expect(isEmail).toStrictEqual(
      'The field testProp must be a email. Received: blank string',
    );
  });

  it('should fail when given email is empty', async () => {
    testObject.testProp = '';

    const errors = await validate(testObject);
    const { isEmail } = errors[0].constraints;

    expect(errors).toHaveLength(1);
    expect(isEmail).toStrictEqual(
      'The field testProp must be a email. Received: blank string',
    );
  });

  it('should fail when given email is incorrect', async () => {
    testObject.testProp = 'johndoe';

    const errors = await validate(testObject);
    const { isEmail } = errors[0].constraints;

    expect(errors).toHaveLength(1);
    expect(isEmail).toStrictEqual(
      'The field testProp must be a email. Received: johndoe',
    );
  });

  it('should pass when given email is correct', async () => {
    testObject.testProp = 'johndoe@nobody.com';

    const errors = await validate(testObject);

    expect(errors).toHaveLength(0);
  });
});
