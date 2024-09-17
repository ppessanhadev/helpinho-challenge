import { Module } from '@nestjs/common';
import { DummyControllerModule } from './dummy/module';

@Module({ imports: [DummyControllerModule] })
export class ControllerModule {}
