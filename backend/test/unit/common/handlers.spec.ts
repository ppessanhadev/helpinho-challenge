import * as common from '@nestjs/common';
import * as swagger from '@nestjs/swagger';
import { Route, RouteAcronym } from '@common';
import { DefaultExceptionResponse, JwtAuthGuard } from '@core';

vi.mock('@nestjs/common', async (importOriginal) => {
  const original = await importOriginal<any>();
  return {
    ...original,
    __esModule: true,
    ...vi.importActual('@nestjs/common'),
  };
});

vi.mock('@nestjs/swagger', async (importOriginal) => {
  const original = await importOriginal<any>();

  return {
    ...original,
    __esModule: true,
    ...vi.importActual('@nestjs/swagger'),
  };
});

describe('@RouteAcronym()', () => {
  beforeAll(() => {
    vi.spyOn(common, 'Controller');
    vi.spyOn(swagger, 'ApiTags');
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  it('should execute decorator, sanitize route and return the current tag', () => {
    const tagName = 'Test Acronym Route';
    const route = 'test-acronym';

    RouteAcronym(route);

    expect(swagger.ApiTags).toHaveBeenCalledWith(tagName);
    expect(common.Controller).toHaveBeenCalledWith(route);
  });
});

describe('@Route()', () => {
  const routeOption = {
    summary: 'Test Summary',
    method: 'POST',
    errors: [409],
    body: String,
    code: 200,
    response: String,
    description: 'Test Description',
    path: 'test-path',
    isAuth: true,
  } as any;

  afterAll(() => {
    vi.clearAllMocks();
  });

  it('should call decorator and apply the correct summary in ApiResponse', () => {
    vi.spyOn(swagger, 'ApiOperation');
    Route(routeOption);

    expect(swagger.ApiOperation).toHaveBeenCalledWith({
      summary: routeOption.summary,
    });
  });

  it('should call decorator and apply the correct status code in HttpCode', () => {
    vi.spyOn(common, 'HttpCode');
    Route(routeOption);

    expect(common.HttpCode).toHaveBeenCalledWith(routeOption.code);
  });

  it('should call decorator and apply the correct body in ApiBody', () => {
    vi.spyOn(swagger, 'ApiBody');
    Route(routeOption);

    expect(swagger.ApiBody).toHaveBeenCalledWith({ type: routeOption.body });
  });

  it('should call decorator and apply the correct response in ApiResponse', () => {
    vi.spyOn(swagger, 'ApiResponse');
    Route(routeOption);

    expect(swagger.ApiResponse).toHaveBeenCalledTimes(2);
    expect(swagger.ApiResponse).toHaveBeenNthCalledWith(1, {
      type: routeOption.response,
      status: routeOption.code,
      description: routeOption.description,
      isArray: false,
    });

    expect(swagger.ApiResponse).toHaveBeenNthCalledWith(2, {
      status: 409,
      type: DefaultExceptionResponse,
      description: 'Default error response',
      isArray: false,
    });
  });

  it('should call decorator and apply auth in UseGuards', () => {
    vi.spyOn(common, 'UseGuards');
    Route(routeOption);

    expect(common.UseGuards).toHaveBeenCalledWith(JwtAuthGuard);
  });

  it('should call decorator and ApiBearerAuth', () => {
    vi.spyOn(swagger, 'ApiBearerAuth');
    Route(routeOption);

    expect(swagger.ApiBearerAuth).toHaveBeenCalled();
  });
});
