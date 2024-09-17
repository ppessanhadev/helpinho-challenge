import { ApiProperty } from '@nestjs/swagger';

export class DummyResponse {
  constructor(dummy: string) {
    this.dummy = dummy;
  }

  @ApiProperty({ example: 'Dummy' })
  dummy: string;
}
