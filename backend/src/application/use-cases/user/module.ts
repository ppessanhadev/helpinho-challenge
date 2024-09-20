import { Module } from '@nestjs/common';
import { CreateUserService } from './create';
import { UserRepositoryModule } from '@repositories/user/user.module';
import { LoginUserService } from './login';

@Module({
  imports: [UserRepositoryModule],
  providers: [CreateUserService, LoginUserService],
  exports: [CreateUserService, LoginUserService],
})
export class UserServiceModule {}
