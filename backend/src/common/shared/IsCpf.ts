import { ValidationArguments, registerDecorator } from 'class-validator';
import {
  CombineDecoratorOption,
  DecoratorOption,
  combineDecorators,
  defaultMessage,
} from '@common';

export const IsCpfDecorator = () => {
  return function (object: object, propertyName: string) {
    registerDecorator({
      propertyName,
      name: 'isCpf',
      target: object.constructor,
      validator: {
        validate(value: any) {
          return typeof value == 'string' && (value.length == 11 || value.length == 14);
        },
        defaultMessage({ property, value }: ValidationArguments) {
          return defaultMessage(value, property, 'valid CPF');
        },
      },
    });
  };
};

export const IsCpf = (option?: DecoratorOption) => {
  const config: CombineDecoratorOption = {
    example: option?.example || '981.824.250-50',
    type: String,
    isArray: option?.isArray,
    required: option?.required,
  };

  return combineDecorators(config, IsCpfDecorator);
};
