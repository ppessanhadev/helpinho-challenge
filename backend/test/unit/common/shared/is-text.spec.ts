import { validate } from 'class-validator';
import { IsText } from '@shared/IsText';

describe('@IsText()', () => {
  class TestClass {
    @IsText()
    testProp?: string;
  }

  const testObject = new TestClass();

  it('should fail when given text is undefined', async () => {
    testObject.testProp = undefined;

    const errors = await validate(testObject);
    const { isText } = errors[0].constraints;

    expect(errors).toHaveLength(1);
    expect(isText).toStrictEqual(
      'The field testProp must be a text. Received: undefined',
    );
  });

  it('should fail when given text is blank spaces', async () => {
    testObject.testProp = '    ';

    const errors = await validate(testObject);
    const { isText } = errors[0].constraints;

    expect(errors).toHaveLength(1);
    expect(isText).toStrictEqual(
      'The field testProp must be a text. Received: blank string',
    );
  });

  it('should fail when given text is empty', async () => {
    testObject.testProp = '';

    const errors = await validate(testObject);
    const { isText } = errors[0].constraints;

    expect(errors).toHaveLength(1);
    expect(isText).toStrictEqual(
      'The field testProp must be a text. Received: blank string',
    );
  });

  it('should fail when given text is incorrect', async () => {
    testObject.testProp = 123 as any;

    const errors = await validate(testObject);
    const { isText } = errors[0].constraints;

    expect(errors).toHaveLength(1);
    expect(isText).toStrictEqual('The field testProp must be a text. Received: 123');
  });

  it('should pass when given text is correct', async () => {
    testObject.testProp = 'test';

    const errors = await validate(testObject);

    expect(errors).toHaveLength(0);
  });
});
