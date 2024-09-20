import { Body, Inject } from '@nestjs/common';

import { AuthService } from '@core';
import { Route, RouteAcronym } from '@common';
import TokenPresenter from '@presenters/TokenPresenter';
import { LoginUserService } from '@use-cases/user/login';
import { LoginUserPayload } from '@domain/entities/LoginUserPayload';
import { TokenResponse } from '@responses/TokenResponse';

@RouteAcronym('users')
export class LoginUserController {
  constructor(
    @Inject(AuthService)
    private authService: AuthService,

    @Inject(LoginUserService)
    private loginUserService: LoginUserService,
  ) {}

  @Route({
    summary: 'Endpoint to execute user login and return a token',
    path: '/login',
    method: 'POST',
    body: LoginUserPayload,
    response: TokenResponse,
    code: 200,
    errors: [409],
  })
  public async execute(@Body() body: LoginUserPayload) {
    const user = await this.loginUserService.execute(body);

    const token = this.authService.generateToken(user);

    return TokenPresenter.execute(token);
  }
}
