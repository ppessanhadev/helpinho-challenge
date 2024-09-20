import { ApiProperty } from '@nestjs/swagger';
import { sign } from 'jsonwebtoken';

export class TokenResponse {
  constructor(token: string) {
    this.token = token;
  }

  @ApiProperty({ example: sign({ fake: 'token' }, 'secret') })
  token: string;
}
