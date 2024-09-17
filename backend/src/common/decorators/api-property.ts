import { IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApiType } from '@common';

export const IsApiPropertyOptional = (
  required: boolean,
  type: ApiType | ApiType[],
  example: any,
) => {
  if (required) {
    return ApiProperty({ example, type });
  }

  return ApiPropertyOptional({ example, type });
};

export const IsOptionalProperty = (required: boolean) => {
  if (required === undefined || required) {
    return () => {};
  }

  return IsOptional();
};
