import { UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@core';

export const BearerAuth = (isAuth: boolean) => {
  if (!isAuth) {
    return [() => {}];
  }

  return [ApiBearerAuth(), UseGuards(JwtAuthGuard)];
};
