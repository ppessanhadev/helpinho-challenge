import { compareHash, generateHash } from '@common';

describe('generateHash()', () => {
  it('should hash the password', async () => {
    const password = 'randompassword';
    const hashedPassword = await generateHash(password);

    expect(hashedPassword).not.toEqual(password);
    expect(hashedPassword).toStrictEqual(expect.any(String));
  });
});

describe('compareHash()', () => {
  const password = 'randompassword';

  it('should return false when the password is different from the hashed password', async () => {
    const hashedPassword = await generateHash(password);

    const result = await compareHash('differentpassword', hashedPassword);

    expect(result).toBeFalsy();
  });

  it('should return true when the password is the same as the hashed password', async () => {
    const hashedPassword = await generateHash(password);

    const result = await compareHash(password, hashedPassword);

    expect(result).toBeTruthy();
  });
});
