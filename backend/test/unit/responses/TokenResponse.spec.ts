import { TokenResponse } from '@responses/TokenResponse';

describe('TokenResponse()', () => {
  it('should create a token response instance', () => {
    const response = new TokenResponse('fakeToken');

    expect(response).toBeInstanceOf(TokenResponse);
    expect(response).toEqual({ token: 'fakeToken' });
  });
});
