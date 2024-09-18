import { Routes } from '@angular/router';

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
  },
  {
    path: 'register',
    loadComponent: () =>
      import('@/app/register/register.component').then((m) => m.RegisterComponent),
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
