import { Module } from '@nestjs/common';
import { CreateDummyController } from './create';
import { UseCaseModule } from '@use-cases/module';

@Module({
  imports: [UseCaseModule],
  controllers: [CreateDummyController],
})
export class DummyControllerModule {}
