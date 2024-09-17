import { Response, Request } from 'express';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { ValidationExceptionResponse } from './types';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const errorResponse = exception.getResponse() as ValidationExceptionResponse;

    const { method, url } = request;
    const { message, details } = errorResponse;
    const loggerType = status >= 500 ? 'error' : 'warn';

    Logger[loggerType](
      `${method} request sent at ${url} with error: ${message}`,
      'HttpExceptionFilter',
    );

    return response.status(status).json({ message, details });
  }
}
