import { IsImage } from '@shared/IsImage';
import { validate } from 'class-validator';

describe('@IsImage()', () => {
  class TestClass {
    @IsImage()
    testProp?: any;
  }

  const testObject = new TestClass();

  it('should fail when given image is undefined', async () => {
    testObject.testProp = undefined;

    const errors = await validate(testObject);
    const { isImage } = errors[0].constraints;

    expect(errors).toHaveLength(1);
    expect(isImage).toStrictEqual(
      'The field testProp must be a buffer image. Received: undefined',
    );
  });

  it('should fail when given image is blank spaces', async () => {
    testObject.testProp = '    ';

    const errors = await validate(testObject);
    const { isImage } = errors[0].constraints;

    expect(errors).toHaveLength(1);
    expect(isImage).toStrictEqual(
      'The field testProp must be a buffer image. Received: blank string',
    );
  });

  it('should pass if receives a buffer', async () => {
    testObject.testProp = Buffer.from('test');
    const errors = await validate(testObject);

    expect(errors).toHaveLength(0);
  });
});
