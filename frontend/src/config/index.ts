import { provideRouter } from '@angular/router';
import { ApplicationConfig } from '@angular/core';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from '@/routes';
import { JwtHelperService } from '@auth0/angular-jwt';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAngularSvgIcon(),
    JwtHelperService,
  ],
};
