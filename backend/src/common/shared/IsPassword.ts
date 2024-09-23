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
      minLowercase: 0,
      minNumbers: 0,
      minSymbols: 0,
      minUppercase: 0,
    },
    {
      message: ({ value, property }) =>
        defaultMessage(value, property, 'strong password'),
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
