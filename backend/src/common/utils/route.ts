import { HttpCode, UseInterceptors, UsePipes, applyDecorators } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  RouteOption,
  baseMethod,
  OptionalApiBody,
  ApiResponses,
  BearerAuth,
  HasApiConsumes,
  HasFileInterceptor,
} from '@common';

export const Route = (option: RouteOption) => {
  const { method, summary, body, response } = option;
  const route = option.path || '';
  const defaultCode = baseMethod[method].statusCode;
  const code = option.code || defaultCode;
  const pipes = option.pipes || [];
  const description =
    option.description || `Default success response for ${method} method`;
  const interceptors = option.interceptors || [];
  const errors = option.errors || [];

  return applyDecorators(
    baseMethod[method].type(route),
    HttpCode(code),
    ApiOperation({ summary }),
    HasApiConsumes(option.isFile),
    HasFileInterceptor(option.isFile),
    OptionalApiBody(body, option.isFile),
    ApiResponse({ type: response, status: code, description }),
    ...ApiResponses(errors, method),
    UsePipes(...pipes),
    UseInterceptors(...interceptors),
    ...BearerAuth(option.isAuth),
  );
};
