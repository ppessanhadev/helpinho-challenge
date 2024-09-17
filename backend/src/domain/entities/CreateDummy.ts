import { ApiProperty } from '@nestjs/swagger';

export class CreateDummyPayload {
  @ApiProperty()
  dummyName: string;
}
