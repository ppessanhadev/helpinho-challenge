import { ApiBody } from '@nestjs/swagger';
import { ApiType } from '../types';

export const OptionalApiBody = (body?: ApiType, isFile?: boolean) => {
  if (isFile) {
    return ApiBody({
      schema: {
        type: 'string',
        format: 'binary',
      },
    });
  } else if (!body) {
    return () => {};
  }

  return ApiBody({ type: body });
};
