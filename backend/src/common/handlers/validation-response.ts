import { DefaultExceptionResponse, ValidationExceptionResponse } from '@core';
import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

const ValidationApiResponse = ApiResponse({
  status: 400,
  type: ValidationExceptionResponse,
  description: 'Default validation error response',
});

const defineDefaultApiResponse = (errorStatus: number) => {
  const statusExists = Object.values(HttpStatus).includes(errorStatus);

  switch (true) {
    case !errorStatus:
      return undefined;

    case !statusExists:
      return undefined;

    case errorStatus == 400:
      return ValidationApiResponse;

    default:
      return ApiResponse({
        status: errorStatus,
        type: DefaultExceptionResponse,
        description: `Default error response`,
      });
  }
};

export const ApiResponses = (errors: number[], body: string) => {
  const apiErrors = errors.map(defineDefaultApiResponse).filter(Object);

  const containsValidationError = errors.includes(400);
  if (!containsValidationError && body != 'GET') {
    apiErrors.push(ValidationApiResponse);
  }

  if (apiErrors.length === 0) {
    return [() => {}];
  }

  return apiErrors;
};
