import { Module } from '@nestjs/common';

import { ListOrderService } from './list';
import { CreateOrderService } from './create';
import { OrderRepositoryModule } from '@repositories/order/order.module';

@Module({
  imports: [OrderRepositoryModule],
  providers: [CreateOrderService, ListOrderService],
  exports: [CreateOrderService, ListOrderService],
})
export class OrderServiceModule {}
