import { validate } from 'class-validator';
import { IsPaginationRange } from '@shared/IsPaginationRange';

describe('@IsPaginationRange()', () => {
  class TestClass {
    @IsPaginationRange()
    testProp?: any;
  }

  const testObject = new TestClass();

  it('should fail when given number is undefined', async () => {
    testObject.testProp = undefined;

    const errors = await validate(testObject);
    const { isPaginationRange } = errors[0].constraints;

    expect(errors).toHaveLength(1);
    expect(isPaginationRange).toStrictEqual(
      'The field testProp must be a integer. Received: undefined',
    );
  });

  it('should fail when given number is blank spaces', async () => {
    testObject.testProp = '    ';

    const errors = await validate(testObject);
    const { isPaginationRange } = errors[0].constraints;

    expect(errors).toHaveLength(1);
    expect(isPaginationRange).toStrictEqual(
      'The field testProp must be a integer. Received: blank string',
    );
  });

  it('should fail when given number is empty', async () => {
    testObject.testProp = '';

    const errors = await validate(testObject);
    const { isPaginationRange } = errors[0].constraints;

    expect(errors).toHaveLength(1);
    expect(isPaginationRange).toStrictEqual(
      'The field testProp must be a integer. Received: blank string',
    );
  });

  it('should fail when given number is a float', async () => {
    testObject.testProp = 1.5;

    const errors = await validate(testObject);
    const { isPaginationRange } = errors[0].constraints;

    expect(errors).toHaveLength(1);
    expect(isPaginationRange).toStrictEqual(
      'The field testProp must be a integer. Received: 1.5',
    );
  });

  it('should fail when given number is 0', async () => {
    testObject.testProp = 0;

    const errors = await validate(testObject);
    const { isPaginationRange } = errors[0].constraints;

    expect(errors).toHaveLength(1);
    expect(isPaginationRange).toStrictEqual(
      'The field testProp must have a value greater than 0. Received: 0',
    );
  });

  it('should fail when given number is lesser 0', async () => {
    testObject.testProp = -2;

    const errors = await validate(testObject);
    const { isPaginationRange } = errors[0].constraints;

    expect(errors).toHaveLength(1);
    expect(isPaginationRange).toStrictEqual(
      'The field testProp must have a value greater than 0. Received: -2',
    );
  });

  it('should pass when given number is correct', async () => {
    testObject.testProp = 1;

    const errors = await validate(testObject);

    expect(errors).toHaveLength(0);
  });
});
