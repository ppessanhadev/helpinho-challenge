import { TokenResponse } from '@responses/TokenResponse';

class TokenPresenter {
  public execute(token: string) {
    return new TokenResponse(token);
  }
}

export default new TokenPresenter();
