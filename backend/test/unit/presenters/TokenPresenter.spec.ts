import TokenPresenter from '@presenters/TokenPresenter';
import { TokenResponse } from '@responses/TokenResponse';

describe('TokenPresenter()', () => {
  it('should return a TokenResponse instance', () => {
    const token = 'fakeToken';
    const presenter = TokenPresenter.execute(token);

    expect(presenter).toBeInstanceOf(TokenResponse);
    expect(presenter).toEqual({ token: 'fakeToken' });
  });
});
