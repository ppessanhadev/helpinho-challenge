import { Route, RouteAcronym } from '@common';
import { CreateDummyPayload } from '@domain/entities/CreateDummy';
import { Body, Inject } from '@nestjs/common';
import DummyPresenter from '@presenters/DummyPresenter';
import { DummyResponse } from '@responses/DummyResponse';
import { CreateDummyService } from '@use-cases/dummy/create';

@RouteAcronym('Dummy Route')
export class CreateDummyController {
  constructor(
    @Inject(CreateDummyService)
    private dummyService: CreateDummyService,
  ) {}

  @Route({
    method: 'POST',
    summary: 'Endpoint to send and return a dummy value',
    body: CreateDummyPayload,
    response: DummyResponse,
  })
  public async handle(@Body() body: CreateDummyPayload) {
    const dummy = await this.dummyService.execute(body);

    return DummyPresenter.execute(dummy);
  }
}
