import { Module } from '@nestjs/common';
import { UserControllerModule } from './user/module';

@Module({ imports: [UserControllerModule] })
export class ControllerModule {}
