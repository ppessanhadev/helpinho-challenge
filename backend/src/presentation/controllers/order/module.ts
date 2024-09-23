import { Module } from '@nestjs/common';

import { AuthModule } from '@core';
import { ListOrderController } from './list';
import { CreateOrderController } from './create';
import { OrderServiceModule } from '@use-cases/order/module';

@Module({
  imports: [AuthModule, OrderServiceModule],
  controllers: [CreateOrderController, ListOrderController],
})
export class OrderControllerModule {}
