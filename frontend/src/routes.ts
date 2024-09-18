import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@/app/home/home.component').then((m) => m.HomeComponent),
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
