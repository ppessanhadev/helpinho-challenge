import { ApiBody } from '@nestjs/swagger';
import { ApiType } from '../types';

export const OptionalApiBody = (body?: ApiType) => {
  if (!body) {
    return () => {};
  }

  return ApiBody({ type: body });
};
