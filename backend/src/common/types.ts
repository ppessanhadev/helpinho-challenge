import { NestInterceptor, PipeTransform, Type } from '@nestjs/common';

export type ApiType = string | (() => void) | Type<unknown> | [() => void] | undefined;

export type RouteOption = {
  summary: string;
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  path?: string | '';
  description?: string;
  code?: number;
  errors?: number[];
  body?: ApiType;
  response?: ApiType;
  pipes?: Array<PipeTransform>;
  interceptors?: Array<Type<NestInterceptor<any, any>>>;
  isAuth?: boolean;
  isFile?: boolean;
};

export type CombineDecoratorOption = {
  example: any;
  type: ApiType;
  required?: boolean;
  isArray?: boolean;
};

export type DecoratorOption = {
  example?: any;
  isArray?: boolean;
  required?: boolean;
};
