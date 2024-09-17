import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

const sanitizeTagName = (tagName: string) => {
  const tags = tagName.split(' ').slice(0, -1);
  const route = tags.map((tag) => tag.toLowerCase());

  return route.join('-');
};

export const RouteAcronym = (tagName: string) => {
  const route = sanitizeTagName(tagName);

  return applyDecorators(ApiTags(tagName), Controller(route));
};
