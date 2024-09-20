import { Module } from '@nestjs/common';

import { AuthModule } from '@core';
import { CreateUserController } from './create';
import { UserServiceModule } from '@use-cases/user/module';
import { LoginUserController } from './login';

@Module({
  imports: [AuthModule, UserServiceModule],
  controllers: [CreateUserController, LoginUserController],
})
export class UserControllerModule {}
