import { HttpCode, UsePipes, applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RouteOption } from '../types';
import { BearerAuth } from '../handlers/bearer';
import { baseMethod } from '../handlers/method';
import { ApiResponses } from '../handlers/validation-response';
import { OptionalApiBody } from '../handlers/optional-api-body';

export const Route = (option: RouteOption) => {
  const { method, summary, body, response } = option;
  const route = option.path || '';
  const defaultCode = baseMethod[method].statusCode;
  const code = option.code || defaultCode;
  const pipes = option.pipes || [];
  const description =
    option.description || `Default success response for ${method} method`;
  const errors = option.errors || [];

  return applyDecorators(
    baseMethod[method].type(route),
    HttpCode(code),
    ApiOperation({ summary }),
    OptionalApiBody(body),
    ApiResponse({ type: response, status: code, description }),
    ...ApiResponses(errors, method),
    UsePipes(...pipes),
    ...BearerAuth(option.isAuth),
  );
};
