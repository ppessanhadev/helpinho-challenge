import { randomUUID } from 'crypto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrderResponse {
  constructor(
    id: string,
    title: string,
    description: string,
    goal: number,
    image?: string,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.goal = goal;
    this.image = image || undefined;
  }

  @ApiProperty({ example: randomUUID() })
  id: string;

  @ApiProperty({ example: 'Nice Order!' })
  title: string;

  @ApiProperty({ example: 'Nice description' })
  description: string;

  @ApiProperty({ example: 23 })
  goal: number;

  @ApiPropertyOptional({ example: 'https://s3.bucket' })
  image?: string;
}
