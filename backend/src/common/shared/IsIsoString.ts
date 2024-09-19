import { IsDateString } from 'class-validator';
import {
  CombineDecoratorOption,
  DecoratorOption,
  combineDecorators,
  defaultMessage,
} from '@common';

const IsIsoDateDecorator = () => {
  return IsDateString(
    {},
    {
      message: ({ value, property }) => {
        return defaultMessage(value, property, 'ISO date');
      },
    },
  );
};

export const IsIsoDate = (option?: DecoratorOption) => {
  const config: CombineDecoratorOption = {
    example: new Date().toISOString(),
    type: String,
    isArray: option?.isArray,
    required: option?.required,
  };

  return combineDecorators(config, IsIsoDateDecorator);
};
