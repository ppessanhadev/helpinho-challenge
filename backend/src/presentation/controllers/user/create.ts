import { Body, Inject } from '@nestjs/common';

import { AuthService } from '@core';
import { Route, RouteAcronym } from '@common';
import { TokenResponse } from '@responses/TokenResponse';
import { CreateUserService } from '@use-cases/user/create';
import { CreateUserPayload } from '@domain/entities/CreateUserPayload';

import TokenPresenter from '@presenters/TokenPresenter';

@RouteAcronym('users')
export class CreateUserController {
  constructor(
    @Inject(AuthService)
    private authService: AuthService,

    @Inject(CreateUserService)
    private createUserService: CreateUserService,
  ) {}

  @Route({
    method: 'POST',
    summary: 'Create new user on database',
    body: CreateUserPayload,
    response: TokenResponse,
    pipes: [],
  })
  public async execute(@Body() body: CreateUserPayload) {
    const user = await this.createUserService.execute(body);
    const token = this.authService.generateToken(user);

    return TokenPresenter.execute(token);
  }
}
