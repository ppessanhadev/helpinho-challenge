import { CombineDecoratorOption } from '@common';
import { applyDecorators } from '@nestjs/common';
import { IsApiPropertyOptional, IsOptionalProperty } from './api-property';

/**
 * @description - This function apply all default decorators and concat new decorators
 */
export const combineDecorators = (
  option: CombineDecoratorOption,
  ...fns: (() => void)[]
) => {
  const { required } = option;
  const decorators = fns.map((fn) => fn.call(null));
  const type = option.isArray ? [option.type] : option.type;

  return applyDecorators(
    IsOptionalProperty(required),
    IsApiPropertyOptional(required, type, option.example),
    ...decorators,
  );
};
