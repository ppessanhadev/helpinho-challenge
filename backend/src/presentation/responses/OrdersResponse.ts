import { ApiProperty } from '@nestjs/swagger';
import { OrderResponse } from './OrderResponse';

export class OrdersResponse {
  constructor(orders: OrderResponse[], totalPages: number) {
    this.orders = orders;
    this.totalPages = totalPages;
  }

  @ApiProperty({ type: () => [OrderResponse] })
  orders: OrderResponse[];

  @ApiProperty({ example: 20 })
  totalPages: number;
}
