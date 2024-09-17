import * as swagger from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IsApiPropertyOptional, IsOptionalProperty } from '@common';

describe('IsOptionalProperty()', () => {
  it('should return a empty callback when required is true', () => {
    const isOptional = IsOptionalProperty(true);

    expect(isOptional.toString()).toStrictEqual('()=>{}');
  });

  it('should return IsOptional() when required is undefined', () => {
    const isOptional = IsOptionalProperty(undefined);

    expect(isOptional.toString()).toStrictEqual('()=>{}');
  });

  it('should return IsOptional() when required is false', () => {
    const isOptional = IsOptionalProperty(false);
    const decorator = IsOptional();

    expect(decorator.toString()).toStrictEqual(isOptional.toString());
  });
});

describe('@IsApiPropertyOptional()', () => {
  const example = 'example';

  beforeEach(() => {
    vi.spyOn(swagger, 'ApiProperty');
    vi.spyOn(swagger, 'ApiPropertyOptional');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should call ApiPropertyOptional when required is null', () => {
    IsApiPropertyOptional(null, String, 'example');

    expect(swagger.ApiPropertyOptional).toHaveBeenCalledWith({ example, type: String });
    expect(swagger.ApiProperty).toHaveBeenCalledTimes(0);
  });

  it('should call ApiPropertyOptional when required is undefined', () => {
    IsApiPropertyOptional(undefined, String, 'example');

    expect(swagger.ApiPropertyOptional).toHaveBeenCalledWith({ example, type: String });
    expect(swagger.ApiProperty).toHaveBeenCalledTimes(0);
  });

  it('should call ApiPropertyOptional when required is false', () => {
    IsApiPropertyOptional(false, String, 'example');

    expect(swagger.ApiPropertyOptional).toHaveBeenCalledWith({ example, type: String });
    expect(swagger.ApiProperty).toHaveBeenCalledTimes(0);
  });

  it('should call ApiProperty when required is true', () => {
    IsApiPropertyOptional(true, String, 'example');

    expect(swagger.ApiProperty).toHaveBeenCalledWith({ example, type: String });
    expect(swagger.ApiPropertyOptional).toHaveBeenCalledTimes(0);
  });
});
