import { Module } from '@nestjs/common';

import { AuthModule } from '@core';
import { ListOrderController } from './list';
import { CreateOrderController } from './create';
import { OrderServiceModule } from '@use-cases/order/module';
import { UploadImageOrderController } from './upload';

@Module({
  imports: [AuthModule, OrderServiceModule],
  controllers: [CreateOrderController, ListOrderController, UploadImageOrderController],
})
export class OrderControllerModule {}
