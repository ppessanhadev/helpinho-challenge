import { ValidationArguments, registerDecorator } from 'class-validator';
import {
  CombineDecoratorOption,
  DecoratorOption,
  combineDecorators,
  defaultMessage,
} from '@common';

export const IsTextDecorator = () => {
  return function (object: object, propertyName: string) {
    registerDecorator({
      propertyName,
      name: 'isText',
      target: object.constructor,
      validator: {
        validate(value: any) {
          return value && typeof value === 'string' && value.trim().length > 0;
        },
        defaultMessage(argument?: ValidationArguments) {
          return defaultMessage(argument.value, argument.property, 'text');
        },
      },
    });
  };
};

export const IsText = (option?: DecoratorOption) => {
  const config: CombineDecoratorOption = {
    example: option?.example || 'Some text',
    type: String,
    isArray: option?.isArray,
    required: option?.required,
  };

  return combineDecorators(config, IsTextDecorator);
};
