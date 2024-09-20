import { IsGoal } from '@shared/IsGoal';
import { validate } from 'class-validator';

describe('@IsGoal()', () => {
  class TestClass {
    @IsGoal()
    testProp?: any;
  }

  const testObject = new TestClass();

  it('should fail when given image is undefined', async () => {
    testObject.testProp = undefined;

    const errors = await validate(testObject);
    const { isNumber } = errors[0].constraints;

    expect(errors).toHaveLength(1);
    expect(isNumber).toStrictEqual(
      'The field testProp must be a decimal. Received: undefined',
    );
  });

  it('should fail when given image is blank spaces', async () => {
    testObject.testProp = '    ';

    const errors = await validate(testObject);
    const { isNumber } = errors[0].constraints;

    expect(errors).toHaveLength(1);
    expect(isNumber).toStrictEqual(
      'The field testProp must be a decimal. Received: blank string',
    );
  });

  it('should fail when given goal is a buffer', async () => {
    testObject.testProp = Buffer.from('test');

    const errors = await validate(testObject);
    const { isNumber } = errors[0].constraints;

    expect(errors).toHaveLength(1);
    expect(testObject.testProp).toBeInstanceOf(Buffer);
    expect(isNumber).toStrictEqual(
      'The field testProp must be a decimal. Received: test',
    );
  });

  it('should pass if goal is a integer or float number', async () => {
    testObject.testProp = 1;

    const errorsInt = await validate(testObject);
    expect(testObject.testProp).toBe(1);
    expect(errorsInt).toHaveLength(0);

    testObject.testProp = 1.5;

    const errorsFloat = await validate(testObject);
    expect(testObject.testProp).toBe(1.5);
    expect(errorsFloat).toHaveLength(0);
  });
});
