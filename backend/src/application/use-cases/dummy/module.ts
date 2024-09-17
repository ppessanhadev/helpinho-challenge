import { Module } from '@nestjs/common';
import { CreateDummyService } from './create';
import { DummyRepositoryModule } from '@repositories/dummy/dummy.module';

@Module({
  imports: [DummyRepositoryModule],
  providers: [CreateDummyService],
  exports: [CreateDummyService],
})
export class DummyServiceModule {}
