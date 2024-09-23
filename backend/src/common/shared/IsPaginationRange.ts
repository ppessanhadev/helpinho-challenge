import { ValidationArguments, registerDecorator } from 'class-validator';
import {
  CombineDecoratorOption,
  DecoratorOption,
  combineDecorators,
  defaultMessage,
} from '@common';

export const IsPaginationRangeDecorator = () => {
  return function (object: object, propertyName: string) {
    registerDecorator({
      propertyName,
      name: 'isPaginationRange',
      target: object.constructor,
      validator: {
        validate(value: any) {
          return (
            value && typeof value === 'number' && Number.isInteger(value) && value > 0
          );
        },
        defaultMessage({ value, property }: ValidationArguments) {
          if (typeof value == 'number' && Number.isInteger(value) && value <= 0) {
            return `The field ${property} must have a value greater than 0. Received: ${value}`;
          }

          return defaultMessage(value, property, 'integer');
        },
      },
    });
  };
};

export const IsPaginationRange = (option?: DecoratorOption) => {
  const config: CombineDecoratorOption = {
    example: option?.example || 1,
    type: Number,
    isArray: option?.isArray,
    required: option?.required,
  };

  return combineDecorators(config, IsPaginationRangeDecorator);
};
