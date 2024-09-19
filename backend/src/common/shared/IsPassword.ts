import { IsStrongPassword } from 'class-validator';
import {
  CombineDecoratorOption,
  DecoratorOption,
  combineDecorators,
  defaultMessage,
} from '@common';

const IsPasswordDecorator = () =>
  IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    {
      message: ({ value, property }) => defaultMessage(value, property, 'password'),
    },
  );

export const IsPassword = (option?: DecoratorOption) => {
  const config: CombineDecoratorOption = {
    example: option?.example || 'P@ssw0rd',
    type: String,
    isArray: option?.isArray,
    required: option?.required,
  };

  return combineDecorators(config, IsPasswordDecorator);
};
