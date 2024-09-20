import { ValidationArguments, registerDecorator } from 'class-validator';
import {
  CombineDecoratorOption,
  DecoratorOption,
  combineDecorators,
  defaultMessage,
} from '@common';

export const IsImageDecorator = () => {
  return function (object: object, propertyName: string) {
    registerDecorator({
      propertyName,
      name: 'isImage',
      target: object.constructor,
      validator: {
        validate(value: any) {
          return value && Buffer.isBuffer(value);
        },
        defaultMessage(argument?: ValidationArguments) {
          return defaultMessage(argument.value, argument.property, 'buffer image');
        },
      },
    });
  };
};

export const IsImage = (option?: DecoratorOption) => {
  const config: CombineDecoratorOption = {
    example: option?.example || Buffer.alloc(1024),
    type: Buffer,
    isArray: option?.isArray,
    required: option?.required,
  };

  return combineDecorators(config, IsImageDecorator);
};
