import { ApiProperty } from '@nestjs/swagger';

export class ExceptionField {
  @ApiProperty()
  field: string;

  @ApiProperty()
  detail: string;
}

export class ValidationExceptionResponse {
  @ApiProperty({ example: 'Validation' })
  error: string;

  @ApiProperty()
  message: 'Some of the properties are not valid';

  @ApiProperty({ type: [ExceptionField] })
  details: ExceptionField[];
}

export class DefaultExceptionResponse {
  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}

export type JwtPayload = {
  id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
};

export type TokenPayload = {
  id: string;
  email: string;
  name: string;
};
