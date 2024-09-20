import {
  CombineDecoratorOption,
  DecoratorOption,
  combineDecorators,
  defaultMessage,
} from '@common';
import { IsNumber } from 'class-validator';

const IsGoalDecorator = () =>
  IsNumber(
    {},
    {
      message: ({ value, property }) => defaultMessage(value, property, 'decimal'),
    },
  );

export const IsGoal = (option?: DecoratorOption) => {
  const config: CombineDecoratorOption = {
    example: 2.5,
    type: Number,
    isArray: option?.isArray,
    required: option?.required,
  };

  return combineDecorators(config, IsGoalDecorator);
};
