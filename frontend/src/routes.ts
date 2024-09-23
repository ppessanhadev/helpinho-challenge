import { Routes } from '@angular/router';
import { canActivateLogged, canActivateLogout } from './services/navigation.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@/app/home/home.component').then((m) => m.HomeComponent),
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('@/app/login/login.component').then((m) => m.LoginComponent),
    pathMatch: 'full',
    canActivate: [canActivateLogout],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('@/app/register/register.component').then((m) => m.RegisterComponent),
    pathMatch: 'full',
    canActivate: [canActivateLogout],
  },
  {
    path: 'helps',
    loadComponent: () => import('@/app/helps/helps.component').then((m) => m.HelpsComponent),
    pathMatch: 'full',
    canActivate: [canActivateLogged],
  },
  {
    path: 'new-help',
    loadComponent: () =>
      import('@/app/new-help/new-help.component').then((m) => m.NewHelpComponent),
    pathMatch: 'full',
    canActivate: [canActivateLogged],
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
