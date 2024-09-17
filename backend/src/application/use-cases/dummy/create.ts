import { Inject, Injectable } from '@nestjs/common';
import { CreateDummyPayload } from '@domain/entities/CreateDummy';
import { DummyRepository } from '@repositories/dummy/dummy.repository';
import { toCreateDummyInput } from '@mappers/dummy';

@Injectable()
export class CreateDummyService {
  constructor(
    @Inject(DummyRepository)
    private dummyRepository: DummyRepository,
  ) {}

  public execute(body: CreateDummyPayload) {
    const dummyInput = toCreateDummyInput(body);

    return this.dummyRepository.create(dummyInput);
  }
}
