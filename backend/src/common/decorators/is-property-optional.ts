import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export const IsApiPropertyOptional = (required: boolean, example: any) => {
  if (required) {
    return ApiProperty({ example });
  }

  return ApiPropertyOptional({ example });
};
