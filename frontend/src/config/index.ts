import { provideRouter } from '@angular/router';
import { ApplicationConfig } from '@angular/core';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from '@/routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAngularSvgIcon(),
    provideEnvironmentNgxMask(),
  ],
};
