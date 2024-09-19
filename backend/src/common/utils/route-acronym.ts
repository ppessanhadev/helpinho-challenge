import { ApiTags } from '@nestjs/swagger';
import { applyDecorators, Controller } from '@nestjs/common';

const capitalize = (str: string) =>
  str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

const getTagName = (route: string) => {
  const names = route.split('-').join(' ');

  return capitalize(names).concat(' Route');
};

/**
 * @summary Applies @Controller() decorator and @ApiTagsDecorator
 * @param route - Indicates the primary group routes. This should be kebab-case
 */
export const RouteAcronym = (route: string) => {
  const tagName = getTagName(route);

  return applyDecorators(ApiTags(tagName), Controller(route));
};
