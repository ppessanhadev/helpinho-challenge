import { bootstrapApplication } from '@angular/platform-browser';

import { appConfig } from '@/config';
import { BaseLayoutComponent } from '@/layout/base.component';

bootstrapApplication(BaseLayoutComponent, appConfig).catch((err) => console.error(err));
