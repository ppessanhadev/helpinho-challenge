import { ValidationError } from 'class-validator';
import { BadRequestException, ValidationPipeOptions } from '@nestjs/common';
import { ExceptionField } from './types';

const createValidationException = (errors: ValidationError[]) => {
  const exception: ExceptionField[] = errors.map((error) => ({
    field: error.property,
    detail: error.constraints[Object.keys(error.constraints)[0]],
  }));

  return new BadRequestException({
    error: 'Validation',
    message: 'Some of the properties are not valid',
    details: exception,
  });
};

export const validationPipeOptions: ValidationPipeOptions = {
  transform: true,
  transformOptions: { enableImplicitConversion: true },
  forbidNonWhitelisted: true,
  forbidUnknownValues: false,
  exceptionFactory: createValidationException,
};
