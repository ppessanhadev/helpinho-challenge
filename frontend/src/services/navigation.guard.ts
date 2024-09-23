import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './user.service';

export const canActivateLogged: CanActivateFn = () => {
  const router = inject(Router);
  const userService = inject(UserService);

  if (!userService.select('logged')()) {
    return router.createUrlTree(['']);
  }

  return true;
};

export const canActivateLogout: CanActivateFn = () => {
  const router = inject(Router);
  const userService = inject(UserService);

  if (userService.select('logged')()) {
    return router.createUrlTree(['']);
  }

  return true;
};
