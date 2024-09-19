import { IsIsoDate } from '@shared/IsIsoString';
import { validate } from 'class-validator';

describe('@IsIsoDate()', () => {
  class TestClass {
    @IsIsoDate({ example: '2021-01-01' })
    testProp?: string;
  }

  const testObject = new TestClass();

  it('should fail when given value is undefined', async () => {
    testObject.testProp = undefined;

    const errors = await validate(testObject);
    const { isDateString } = errors[0].constraints;

    expect(errors).toHaveLength(1);
    expect(isDateString).toStrictEqual(
      'The field testProp must be a ISO date. Received: undefined',
    );
  });

  it('should fail when given value is null', async () => {
    testObject.testProp = null;

    const errors = await validate(testObject);
    const { isDateString } = errors[0].constraints;

    expect(errors).toHaveLength(1);
    expect(isDateString).toStrictEqual(
      'The field testProp must be a ISO date. Received: null',
    );
  });

  it('should fail when given value is blank spaces', async () => {
    testObject.testProp = '    ';

    const errors = await validate(testObject);
    const { isDateString } = errors[0].constraints;

    expect(errors).toHaveLength(1);
    expect(isDateString).toStrictEqual(
      'The field testProp must be a ISO date. Received: blank string',
    );
  });

  it('should fail when given value is empty', async () => {
    testObject.testProp = '';

    const errors = await validate(testObject);
    const { isDateString } = errors[0].constraints;

    expect(errors).toHaveLength(1);
    expect(isDateString).toStrictEqual(
      'The field testProp must be a ISO date. Received: blank string',
    );
  });

  it('should fail when given value is not a string', async () => {
    testObject.testProp = 123 as any;

    const errors = await validate(testObject);
    const { isDateString } = errors[0].constraints;

    expect(errors).toHaveLength(1);
    expect(isDateString).toStrictEqual(
      'The field testProp must be a ISO date. Received: 123',
    );
  });

  it('should fail when given value is not a ISO date', async () => {
    testObject.testProp = '2021-01-32';

    const errors = await validate(testObject);
    const { isDateString } = errors[0].constraints;

    expect(errors).toHaveLength(1);
    expect(isDateString).toStrictEqual(
      'The field testProp must be a ISO date. Received: 2021-01-32',
    );
  });

  it('should pass when given value is a ISO date', async () => {
    testObject.testProp = new Date('2021-01-01').toISOString();

    const errors = await validate(testObject);

    expect(errors).toHaveLength(0);
  });
});
