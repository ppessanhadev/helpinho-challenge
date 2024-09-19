import {
  CombineDecoratorOption,
  DecoratorOption,
  combineDecorators,
  defaultMessage,
} from '@common';
import { IsEmail as IsValidEmail } from 'class-validator';

const IsEmailDecorator = () =>
  IsValidEmail(
    {},
    {
      message: ({ value, property }) => defaultMessage(value, property, 'email'),
    },
  );

export const IsEmail = (option?: DecoratorOption) => {
  const config: CombineDecoratorOption = {
    example: 'johndoe@nobody.com',
    type: String,
    isArray: option?.isArray,
    required: option?.required,
  };

  return combineDecorators(config, IsEmailDecorator);
};
