import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { TokenPayload } from '@core';

export const User = createParamDecorator(
  (data: keyof TokenPayload, context: ExecutionContext) => {
    const http = context.switchToHttp();
    const request = http.getRequest();

    const { user } = request;

    return data ? user[data] : user;
  },
);
