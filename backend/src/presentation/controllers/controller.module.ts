import { Module } from '@nestjs/common';
import { UserControllerModule } from './user/module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    UserControllerModule,
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
  ],
})
export class ControllerModule {}
