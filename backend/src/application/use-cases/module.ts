import { Module } from '@nestjs/common';
import { DummyServiceModule } from './dummy/module';

@Module({
  imports: [DummyServiceModule],
  exports: [DummyServiceModule],
})
export class UseCaseModule {}
