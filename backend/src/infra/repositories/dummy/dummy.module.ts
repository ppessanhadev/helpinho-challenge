import { Module } from '@nestjs/common';
import { DummyRepository } from './dummy.repository';

@Module({
  providers: [DummyRepository],
  exports: [DummyRepository],
})
export class DummyRepositoryModule {}
